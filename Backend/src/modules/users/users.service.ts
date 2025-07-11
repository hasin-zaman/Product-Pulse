import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from './user.entity';
import { UserParams } from './user.type';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async createUser(userDetails: UserParams) {
        if (Object.keys(userDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const existingUser = await this.userRepository.findOneBy({ cnic: userDetails.cnic });
        if(existingUser) {
            throw new ConflictException('This CNIC has already been registered.');
        }

        const user = this.userRepository.create({ ...userDetails });
        return await this.userRepository.save(user);
    }

    async getUsers(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const users = await this.userRepository.find({ 
            skip, 
            take: limit, 
            relations: ['products'] 
        });

        const totalUsers = await this.userRepository.count();

        return {
            page, 
            totalUsers, 
            totalPages: Math.ceil(totalUsers/limit), 
            users
        };
    }

    async getUsersDetails() {
        const totalUsers = await this.userRepository.count();
        return { totalUsers };
    }

    async getUser(cnic: string) {
        return await this.findUser(cnic);
    }

    async updateUser(cnic: string, userDetails: UserParams) {
        if (Object.keys(userDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        await this.findUser(cnic);

        if(userDetails.cnic) {
            const existingUser = await this.userRepository.findOneBy({ cnic: userDetails.cnic });
            if(existingUser) {
                throw new ConflictException('This CNIC has already been registered.');
            }
        }

        return await this.userRepository.update({ cnic }, { ...userDetails });
    }

    async deleteUser(cnic: string) {
        const user = await this.findUser(cnic);

        await this.productRepository.delete({ user });

        const deleteUser = await this.userRepository.delete({ cnic });

        if(deleteUser.affected === 0) {
            throw new InternalServerErrorException('Failed to delete user.');
        }

        return deleteUser;
    }
    
    private async findUser(cnic: string) {
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
}