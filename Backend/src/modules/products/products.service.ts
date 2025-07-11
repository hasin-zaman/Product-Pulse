import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductState } from 'src/enums/product-state';
import { ProductStatus } from 'src/enums/product-status';
import { ProductType } from 'src/enums/product-type';
import productEnumMapping from 'src/utils/product-enum-mapping';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from './product.entity';
import { ProductParams } from './product.type';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async registerProduct(cnic: string, productDetails: ProductParams) {
        if (Object.keys(productDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const user = await this.findUser(cnic);
        const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

        const product = this.productRepository.create({ ...productDetails, user });
        return await this.productRepository.save(product);
    }

    async getProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const products = await this.productRepository.find({ 
            skip, 
            take: limit, 
            relations: ['user'] 
        });

        const totalProducts = await this.productRepository.count();
        return {
            page, 
            totalProducts, 
            totalPages: Math.ceil(totalProducts/limit), 
            products
        };
    }

    async getProductsDetails() {
        const totalProducts = await this.productRepository.count();
        const totalEdibleProducts = await this.productRepository.countBy({ type: ProductType.EDIBLE });
        const totalNonEdibleProducts = await this.productRepository.countBy({ type: ProductType.NON_EDIBLE });
        const totalUnreadProducts = await this.productRepository.countBy({ status: ProductStatus.UNREAD });
        const totalInProcessProducts = await this.productRepository.countBy({ status: ProductStatus.IN_PROCESS });
        const totalResolvedProducts = await this.productRepository.countBy({ status: ProductStatus.RESOLVED });
        const totalNewProducts = await this.productRepository.countBy({ state: ProductState.NEW });
        const totalPendingProducts = await this.productRepository.countBy({ state: ProductState.PENDING });
        const totalCriticalProducts = await this.productRepository.countBy({ state: ProductState.CRITICAL });

        return { 
            totalProducts, 
            totalEdibleProducts, 
            totalNonEdibleProducts, 
            totalUnreadProducts, 
            totalInProcessProducts, 
            totalResolvedProducts, 
            totalNewProducts, 
            totalPendingProducts, 
            totalCriticalProducts 
        };
    }

    async filterProducts(paginationDto: PaginationDto, filter: string, value: string) {
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const filterableFields = {
            type: 'type',
            status: 'status',
            state: 'state'
        }

        let where = {};

        if(filter && filterableFields[filter]) {
            let enumValue;
            if(filter === 'type') {
                enumValue = productEnumMapping.ProductTypeEnumMapping[value];
                if(enumValue === undefined) { 
                    throw new BadRequestException(`Invalid type value. Choose from valid values: ${Object.keys(productEnumMapping.ProductTypeEnumMapping).join(', ')}`);
                }
            }
            else if(filter === 'status') {
                enumValue = productEnumMapping.ProductStatusEnumMapping[value];
                if(enumValue === undefined) { 
                    throw new BadRequestException(`Invalid status value. Choose from valid values: ${Object.keys(productEnumMapping.ProductStatusEnumMapping).join(', ')}`);
                }
            }
            else if(filter === 'state') {
                enumValue = productEnumMapping.ProductStateEnumMapping[value];
                if(enumValue === undefined) { 
                    throw new BadRequestException(`Invalid state value. Choose from valid values: ${Object.keys(productEnumMapping.ProductStateEnumMapping).join(', ')}`);
                }
            }

            where[filterableFields[filter]] = enumValue;
        } else {
            throw new BadRequestException(`Invalid filter parameter. Choose from valid parameters: ${Object.keys(filterableFields).join(', ')}`);
        }

        const products = await this.productRepository.find({ 
            skip, 
            take: limit, 
            relations: ['user'], 
            where 
        });

        const totalProducts = await this.productRepository.countBy(where);
        return {
            page, 
            totalProducts, 
            totalPages: Math.ceil(totalProducts/limit), 
            products
        };
    }

    async getProduct(id: number) {
        return await this.findProduct(id);
    }

    async updateStatus(id: number, status: string) {
        const enumStatus = productEnumMapping.ProductStatusEnumMapping[status];
        if(enumStatus === undefined) { 
            throw new BadRequestException(`Invalid status value. Choose from valid values: ${Object.keys(productEnumMapping.ProductStatusEnumMapping).join(', ')}`);
        }
        
        await this.findProduct(id);
        return await this.productRepository.update({ productId: id }, { status: enumStatus });
    }

    async deleteProduct(id: number) {
        const product = await this.findProduct(id);
        const deleteProduct = await this.productRepository.delete({ productId: id });

        if(deleteProduct.affected === 0) {
            throw new InternalServerErrorException('Failed to delete product.');
        }

        const user = await this.findUserWithProducts(product.user.cnic);
        if(user && user.products.length === 0) {
            const deleteUser = await this.userRepository.delete({ cnic: user.cnic });
            if(deleteUser.affected === 0) {
                throw new InternalServerErrorException('Failed to delete user.');
            }
        }

        return deleteProduct;
    }

    private async findUser(cnic: string) {
        const user = await this.userRepository.findOneBy({ cnic });
        if(!user) {
            throw new NotFoundException('User Not Found.');
        }
        return user;
    }

    private async findUserWithProducts(cnic: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.products', 'products')
            .where('user.cnic = :cnic', { cnic })
            .getOne();

        if(!user) {
            throw new NotFoundException('User Not Found.');
        }
        return user;
    }

    private async findProduct(id: number) {
        const product = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .leftJoinAndSelect('product.responses', 'responses')
            .where('product.productId = :id', { id })
            .getOne();

        if(!product) {
            throw new NotFoundException('Product Not Found.');
        }
        return product;
    }
}