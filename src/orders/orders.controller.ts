import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Order } from './entities/order.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: CreateOrderDto })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    return await this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateOrderStatusDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Request() req: any,
  ) {
    return await this.ordersService.update(
      +id,
      updateOrderStatusDto,
      req.user.id,
    );
  }
  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @Put('cancel/:id')
  async cancelled(@Param('id') id: string, @Request() req: any) {
    return await this.ordersService.cancelled(+id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
