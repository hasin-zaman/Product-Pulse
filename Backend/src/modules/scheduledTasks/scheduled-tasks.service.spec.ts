import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductState } from "../../enums/product-state";
import { ProductStatus } from "../../enums/product-status";
import { ProductType } from "../../enums/product-type";
import { Repository } from "typeorm";
import { Product } from "../products/product.entity";
import { ScheduledTasksService } from "./scheduled-tasks.service";

const createMockRepository = () => ({
    find: (jest.fn() as jest.Mock).mockResolvedValue([]),
    save: jest.fn()
});

describe('ScheduledTasksService', () => {
    let service: ScheduledTasksService;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ScheduledTasksService,
            {
              provide: getRepositoryToken(Product),
              useFactory: createMockRepository,
            },
          ],
        }).compile();
    
        service = module.get<ScheduledTasksService>(ScheduledTasksService);
        productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update states of products correctly', async () => {
        const currentTime = new Date();
        
        const thresholdTimePending = new Date(currentTime);
        thresholdTimePending.setDate(thresholdTimePending.getDate() - 7);

        const thresholdTimeCritical = new Date(currentTime);
        thresholdTimeCritical.setDate(thresholdTimeCritical.getDate() - 14);

        const testTime1 = new Date(currentTime);
        testTime1.setDate(testTime1.getDate() - 8);

        const testTime2 = new Date(currentTime);
        testTime2.setDate(testTime2.getDate() - 15);

        const testTime3 = new Date(thresholdTimeCritical);
        testTime3.setMinutes(testTime3.getMinutes() - 1);

        const testTime4 = new Date(thresholdTimeCritical);
        testTime4.setMinutes(testTime4.getMinutes() + 1);

        const testTime5 = new Date(thresholdTimePending);
        testTime5.setMinutes(testTime5.getMinutes() - 1);

        const testTime6 = new Date(thresholdTimePending);
        testTime6.setMinutes(testTime6.getMinutes() + 1);

        const mockProducts: Product[] = [
            {
                productId: 1,
                type: ProductType.EDIBLE,
                subject: "Product",
                description: "Product description...",
                status: ProductStatus.UNREAD,
                state: ProductState.NEW,
                createdAt: testTime1,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime1,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    products: []
                },
                responses: []
            },
            {
                productId: 2,
                type: ProductType.NON_EDIBLE,
                subject: "Product",
                description: "Product description...",
                status: ProductStatus.IN_PROCESS,
                state: ProductState.PENDING,
                createdAt: testTime2,
                user: {
                    cnic: '12345-1234567-2',
                    name: 'Hamza',
                    address: 'Block-7, Gulistan-e-Jauhar',
                    district: 'Karachi',
                    mobile: '03331234567',
                    createdAt: testTime2,
                    phone: '02112345678',
                    email: 'abc@gmail.com',
                    products: []
                },
                responses: []
            },
        ];

        const filteredMockProducts = mockProducts.filter(
            (product) => 
              product.createdAt < thresholdTimePending && product.status !== ProductStatus.RESOLVED
        );

        (productRepository.find as jest.Mock).mockResolvedValue(filteredMockProducts);

        await service.updateStatesOfProducts();

        expect(productRepository.save).toHaveBeenCalledTimes(mockProducts.length - 4);

        expect(filteredMockProducts[0].state).toBe(ProductState.PENDING);
        expect(filteredMockProducts[1].state).toBe(ProductState.CRITICAL);
        expect(filteredMockProducts[2].state).toBe(ProductState.CRITICAL);
        expect(filteredMockProducts[3].state).toBe(ProductState.CRITICAL);
        expect(filteredMockProducts[4].state).toBe(ProductState.PENDING);
        expect(filteredMockProducts[5].state).toBe(ProductState.PENDING);
    });
});