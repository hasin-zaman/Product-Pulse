import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '../../utils/bcrypt';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminParams } from './admin.type';
import { PaginationDto } from 'src/utils/pagination.dto';

@Injectable()
export class AdminsService {
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}
    
    async createAdmin(adminDetails: AdminParams){

        if (Object.keys(adminDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        const existingAdmin=await this.adminRepository.findOneBy({ userName: adminDetails.userName });
        if(existingAdmin){
            throw new ConflictException('This user name is already in use.');
        }

        const password=hashPassword(adminDetails.password);

        const admin=this.adminRepository.create({ ...adminDetails, password });
        await this.adminRepository.save(admin);
        return { message: 'Admin registered successfully!' };
    }

    async getAdmins(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
        const skip = (page-1) * limit;

        const admins =  await this.adminRepository.find({ skip, take: limit });

        const totalAdmins = await this.adminRepository.count();

        return {page, totalAdmins, totalPages: Math.ceil(totalAdmins/limit), admins};
    }

    async getAdmin(userName: string) {
        return await this.findAdmin(userName);
    }

    async getAdminWithoutResponses(userName: string) {
        return await this.adminRepository.findOneBy({ userName });
    }

    async updateAdmin(userName: string, adminDetails: AdminParams) {

        if (Object.keys(adminDetails).length === 0) {
            throw new BadRequestException('Req.body cannot be empty.');
        }

        if(adminDetails.hasOwnProperty('password')){
            adminDetails.password=hashPassword(adminDetails.password);
        }

        try {
            const admin = await this.adminRepository.update({ userName: userName }, { ...adminDetails });
            return { message: 'Admin updated successfully!', admin };
        } catch (error) {
            // Check if the error is a foreign key constraint violation
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
              throw new BadRequestException('Cannot update the admin due to a foreign key constraint violation.');
            }
      
            throw error;
        }
    }

    async deleteAdmin(userName: string) {
        return await this.adminRepository.delete({ userName: userName });
    }
    
    private async findAdmin(userName: string){
        const admin=await this.adminRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.responses', 'responses')
        .where('admin.userName = :userName', { userName })
        .getOne();

        if(!admin){
            throw new NotFoundException('Admin Not Found.');
        }
        return admin;
    }
}