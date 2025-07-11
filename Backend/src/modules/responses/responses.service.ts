import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseStatus } from 'src/enums/response-status';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { Admin } from '../admins/admin.entity';
import { Product } from '../products/product.entity';
import { Response } from './response.entity';
import { ResponseParams } from './response.type';

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Response) private responseRepository: Repository<Response>,
    ) {}

    async postResponse(id: number, userName: string, responseDetails: ResponseParams) {
        if (Object.keys(responseDetails).length === 0) {
            throw new BadRequestException('Request body cannot be empty.');
        }

        const product = await this.findProduct(id);
        const admin = await this.findAdmin(userName);

        const response = this.responseRepository.create({ 
            ...responseDetails, 
            product, 
            admin 
        });

        return await this.responseRepository.save(response);
    }

    async getResponses(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;

        const responses = await this.responseRepository.find({ 
            skip, 
            take: limit, 
            relations: ['product', 'admin'] 
        });

        const totalResponses = await this.responseRepository.count();

        return {
            page, 
            totalResponses, 
            totalPages: Math.ceil(totalResponses / limit), 
            responses
        };
    }

    async getResponse(id: number) {
        return await this.findResponse(id);
    }

    async updateStatus(id: number) {
        await this.findResponse(id);
        return await this.responseRepository.update(
            { responseId: id }, 
            { status: ResponseStatus.READ }
        );
    }

    private async findAdmin(userName: string) {
        const admin = await this.adminRepository.findOneBy({ userName });

        if (!admin) {
            throw new NotFoundException('Admin not found.');
        }
        return admin;
    }

    private async findProduct(id: number) {
        const product = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .where('product.productId = :id', { id })
            .getOne();

        if (!product) {
            throw new NotFoundException('Product not found.');
        }
        return product;
    }

    private async findResponse(id: number) {
        const response = await this.responseRepository
            .createQueryBuilder('response')
            .leftJoinAndSelect('response.product', 'product')
            .leftJoinAndSelect('response.admin', 'admin')
            .where('response.responseId = :id', { id })
            .getOne();

        if (!response) {
            throw new NotFoundException('Response not found.');
        }
        return response;
    }
}