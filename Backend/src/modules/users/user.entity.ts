import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "../products/product.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryColumn({
        nullable: false,
        type: 'varchar',
        length: 15,
        unique: true
    })
    cnic: string;

    @Column({
        nullable: false
    })
    name: string

    @Column({
        nullable: false
    })
    address: string

    @Column({
        nullable: false
    })
    district: string

    @Column({
        nullable: true
    })
    phone: string

    @Column({
        nullable: false
    })
    mobile: string
    
    @Column({
        nullable: true
    })
    email: string

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date

    @OneToMany(() => Product, product => product.user)
    products: Product[];
}