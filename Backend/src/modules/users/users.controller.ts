import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/is-public.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Public()
    @Post()
    @UseGuards(ThrottlerGuard)
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getUsers(@Query() paginationDto: PaginationDto){
        return this.userService.getUsers(paginationDto);
    }

    @Get('details')
    getUsersDetails() {
        return this.userService.getUsersDetails();
    }

    @Get(':cnic')
    getUser(@Param('cnic') cnic: string){
        return this.userService.getUser(cnic);
    }

    @Patch(':cnic')
    @UsePipes(ValidationPipe)
    updateUser(@Param('cnic') cnic: string, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUser(cnic, userDto);
    }

    @Delete(':cnic')
    deleteUser(@Param('cnic') cnic: string) {
        return this.userService.deleteUser(cnic);
    }
}