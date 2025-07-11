import { Controller, Query, Post, Get, Body, Param, Patch, Delete, UsePipes, ValidationPipe, Request, ForbiddenException } from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { PaginationDto } from "src/utils/pagination.dto";
import { Roles } from "src/utils/roles.decorator";
import { CreateAdminDto, UpdateAdminDto } from "./admin.dto";
import { AdminsService } from "./admins.service";

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminService: AdminsService){}

    @Post()
    @Roles(Role.ADMIN)
    @UsePipes(ValidationPipe)
    createAdmin(@Body() adminDto: CreateAdminDto) {
        return this.adminService.createAdmin(adminDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getAdmins(@Query() paginationDto: PaginationDto) {
        return this.adminService.getAdmins(paginationDto);
    }

    @Get(':userName')
    @Roles(Role.ADMIN)
    getAdmin(@Param('userName') userName: string) {
        return this.adminService.getAdmin(userName);
    }

    @Patch(':userName')
    @UsePipes(ValidationPipe)
    updateAdmin(@Request() req, @Param('userName') userName: string, @Body() adminDto: UpdateAdminDto) {
        if(req.admin.userName!=userName){
            throw new ForbiddenException('You are only allowed to update your own details.')
        }
        return this.adminService.updateAdmin(userName, adminDto);
    }

    @Delete(':userName')
    @Roles(Role.ADMIN)
    deleteAdmin(@Param('userName') userName: string) {
        return this.adminService.deleteAdmin(userName);
    }
}