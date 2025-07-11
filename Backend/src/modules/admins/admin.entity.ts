import { Role } from "../../enums/role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Response } from "../responses/response.entity";

@Entity({ name: 'admins' })
export class Admin {

  @PrimaryColumn({
    type: 'varchar',
    length: 255
  })
  userName: string;

  @Column({
    nullable: false,
    default: ''
  })
  name: string;

  @Column({
    nullable: false,
    default: ''
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role
  })
  role: Role;

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @OneToMany(() => Response, (response) => response.admin)
  responses: Response[];
}
