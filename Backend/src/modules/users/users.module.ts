import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/product.entity";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Product])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule{}