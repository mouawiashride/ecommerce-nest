import { Category } from 'src/categories/entities/category.entity';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { OrdersProducts } from 'src/orders/entities/Orders-products.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shippings } from 'src/orders/entities/shipping.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'test',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  cache:false,
  entities: [User,Category,Product,LocalFile,Review,Order,OrdersProducts,Shippings],
  synchronize: true,
};

export default config;
