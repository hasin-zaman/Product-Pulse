import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/product.entity";
import { User } from "../users/user.entity";
import { AdminsController } from "./admins.controller";
import { Admin } from "./admin.entity";
import { AdminsService } from "./admins.service";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, User, Product])],
    controllers: [AdminsController],
    providers: [AdminsService],
    exports: [AdminsService]
})
export class AdminsModule{}
