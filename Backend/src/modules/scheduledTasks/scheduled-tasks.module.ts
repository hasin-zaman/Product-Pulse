import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/product.entity";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ScheduledTasksService]
})
export class ScheduledTasksModule{}