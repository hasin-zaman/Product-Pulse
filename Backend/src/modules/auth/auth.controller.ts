import { Body, Controller, Get, Post, HttpCode, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Public } from 'src/utils/is-public.decorator';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    @UseGuards(ThrottlerGuard)
    @Throttle(5, 60)
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto.userName, authDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.admin;
    }

}
