import { ResponseStatus } from "../../enums/response-status";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";
import { Admin } from "../admins/admin.entity";

@Entity({ name: 'responses' })
export class Response {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'response_id'
    })
    responseId: number;

    @Column({
        nullable: false,
        default: ''
    })
    response: string;
    
    @Column({
        nullable: false,
        type: 'enum',
        enum: ResponseStatus,
        default: ResponseStatus.UNREAD
    })
    status: ResponseStatus;

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;

    @ManyToOne(() => Product, product => product.responses)
    product: Product;

    @ManyToOne(() => Admin, admin => admin.responses)
    admin: Admin;
}