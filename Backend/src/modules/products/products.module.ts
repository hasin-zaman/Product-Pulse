import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { ProductsController } from "./products.controller";
import { Product } from "./product.entity";
import { ProductsService } from "./products.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Product])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}