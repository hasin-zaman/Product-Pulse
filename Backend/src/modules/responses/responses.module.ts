import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admins/admin.entity";
import { Product } from "../products/product.entity";
import { Response } from "./response.entity";
import { ResponsesController } from "./responses.controller";
import { ResponsesService } from "./responses.service";

@Module({
    imports: [TypeOrmModule.forFeature([Admin, Product, Response])],
    controllers: [ResponsesController],
    providers: [ResponsesService]
})
export class ResponsesModule{}