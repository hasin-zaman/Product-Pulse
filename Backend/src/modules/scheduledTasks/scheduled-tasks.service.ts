import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductState } from "../../enums/product-state";
import { ProductStatus } from "../../enums/product-status";
import { In, LessThan, Repository } from "typeorm";
import { Product } from "../products/product.entity";

@Injectable()
export class ScheduledTasksService {
    private readonly logger = new Logger(ScheduledTasksService.name);

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    @Cron('15 11 * * *', { timeZone: 'Asia/Karachi' })
    async updateStatesOfProducts() {
        this.logger.debug('Checking and updating states of products.');

        const currentTime = new Date();

        const thresholdTimePending = new Date(currentTime);
        thresholdTimePending.setDate(thresholdTimePending.getDate() - 7);

        const thresholdTimeCritical = new Date(currentTime);
        thresholdTimeCritical.setDate(thresholdTimeCritical.getDate() - 14);

        const products = await this.productRepository.find({ 
            where: { 
                createdAt: LessThan(thresholdTimePending), 
                status: In([ProductStatus.UNREAD, ProductStatus.IN_PROCESS]) 
            } 
        });

        this.logger.debug(`Found ${products.length} products needing state updates`);
        this.logger.debug(`Pending threshold: ${thresholdTimePending}`);
        this.logger.debug(`Critical threshold: ${thresholdTimeCritical}`);

        for (const product of products) {
            if (product.createdAt <= thresholdTimeCritical) {
                product.state = ProductState.CRITICAL;
            } else {
                product.state = ProductState.PENDING;
            }
            await this.productRepository.save(product);
        }

        this.logger.debug('Completed product state updates');
    }    
}