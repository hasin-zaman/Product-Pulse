import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../../utils/bcrypt';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
    constructor(private adminService: AdminsService, private jwtService: JwtService) {}4

    async login(userName: string, pass: string): Promise<any> {
        const admin=await this.adminService.getAdminWithoutResponses(userName);

        if(!comparePasswords(pass, admin.password)){
            throw new UnauthorizedException('Invalid username or password.');
        }

        const { password, ...data } = admin;

        const payload = { name: admin.name, userName: admin.userName, role: admin.role, createdAt: admin.createdAt };

        const accessToken=await this.jwtService.signAsync(payload);

        return {accessToken: accessToken, admin: data, message: 'Successfully logged in!'};
    }
}
