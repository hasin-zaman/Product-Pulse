import { ProductState } from "../../enums/product-state";
import { ProductStatus } from "../../enums/product-status";
import { ProductType } from "../../enums/product-type";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Response } from "../responses/response.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'products'})
export class Product {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'product_id'
    })
    productId: number

    @Column({
        nullable: false,
        type: 'enum',
        enum: ProductType
    })
    type: ProductType

    @Column({
        nullable: false,
        default: ''
    })
    subject: string

    @Column({
        nullable: false,
        type: 'text'
    })
    description: string
    
    @Column({
        nullable: false,
        type: 'enum',
        enum: ProductStatus,
        default: ProductStatus.UNREAD
    })
    status: ProductStatus

    @Column({
        nullable: false,
        type: 'enum',
        enum: ProductState,
        default: ProductState.NEW
    })
    state: ProductState

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date

    @ManyToOne(() => User, user => user.products)
    user: User

    @OneToMany(() => Response, response => response.product)
    responses: Response[];
}