import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "src/products/entities/product.entity";
import { Cart } from "./cart.dto";
@Entity({name:"orders_products"})
export class cartsProducts {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"decimal",precision:10,scale:2,default:0})
    product_unit_price:number;

    @Column()
    product_quantity:number;

    @ManyToOne(()=>Cart,cart=>cart.products)
    cart:Cart;


    @ManyToOne(()=>Product,product=>product.products,{cascade:true})
    product:Product;
}