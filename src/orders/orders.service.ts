import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProducts } from './entities/Orders-products.entity';
import { Shippings } from './entities/shipping.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/order-status.enum';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(OrdersProducts)
    private readonly orderProducts: Repository<OrdersProducts>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
    currentUser: number,
  ): Promise<Order> {
    const shipping = new Shippings();

    Object.assign(shipping, createOrderDto.shippingAddress);

    const orderEntity = new Order();
    orderEntity.shippingAddress = shipping;

    orderEntity.user = await this.userService.findOne(currentUser);

    const orderTbl = await this.order.save(orderEntity);

    const orderdproductEntity: {
      order: Order;
      product: Product;
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      const order = orderTbl;
      const product = await this.productService.findOne(
        createOrderDto.orderedProducts[i].id,
      );
      const product_quantity =
        createOrderDto.orderedProducts[i].product_quantity;
      const product_unit_price =
        createOrderDto.orderedProducts[i].product_unit_price;


      orderdproductEntity.push({
        order,
        product_quantity,
        product_unit_price,
        product,
      });
    }
    const orderedproduct = await this.orderProducts
      .createQueryBuilder()
      .insert()
      .into(OrdersProducts)
      .values(orderdproductEntity)
      .execute();
      console.log(orderedproduct);
    return await this.findOne(orderTbl.id);
  }

  async findAll(): Promise<Order[]> {
    return await this.order.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: { product: true },
      },
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.order.findOne({
      where: { id },
      relations: {
        shippingAddress: true,
        user: true,
        products: { product: true },
      },
    });
  }

  async findOneByProductId(id: number) {
    return await this.orderProducts.findOne({
      where: {
        product: { id },
      },
      relations: {
        product: true,
      },
    });
  }

  async update(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
    currentUser: User,
  ) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('Order not found');
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(`order aleady ${order.status}`);
    }
    if (
      order.status === OrderStatus.PROCESSING &&
      updateOrderStatusDto.status != OrderStatus.SHIPPED
    ) {
      throw new BadRequestException(`Delivery before shipped !!! `);
    }

    if (
      updateOrderStatusDto.status === OrderStatus.SHIPPED &&
      order.status === OrderStatus.SHIPPED
    ) {
      return order;
    }
    if (updateOrderStatusDto.status === OrderStatus.SHIPPED) {
      order.shippedAt = new Date();
    }
    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      order.deliveredAt = new Date();
    }
    order.status = updateOrderStatusDto.status;
    order.updatedBy = currentUser;
    order = await this.order.save(order);

    if (updateOrderStatusDto.status === OrderStatus.DELIVERED) {
      await this.stockUpdate(order, OrderStatus.DELIVERED);
    }

    return order;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async stockUpdate(order: Order, status: string) {
    for (const op of order.products) {
      await this.productService.updateStock(
        op.product.id,
        op.product_quantity,
        status,
      );
    }
  }

  async cancelled(id: number, currentUser: User) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('order not found');

    if (order.status === OrderStatus.CANCELLED) return order;

    order.status = OrderStatus.CANCELLED;
    order.updatedBy = currentUser;
    order = await this.order.save(order);
    await this.stockUpdate(order, OrderStatus.CANCELLED);
    return order;
  }
}
