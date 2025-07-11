import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminsModule } from '../admins/admins.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AdminsModule, JwtModule.registerAsync({
    imports: [ConfigModule], 
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>('SECRET_ACCESS_TOKEN'),
      signOptions: { expiresIn: '100000h' }
    }),
    inject: [ConfigService],
  }),    
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
