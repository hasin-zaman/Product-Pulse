import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/users/user.entity';
import { Product } from './modules/products/product.entity';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminsModule } from './modules/admins/admins.module';
import { Admin } from './modules/admins/admin.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './utils/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { Response } from './modules/responses/response.entity';
import { ResponsesModule } from './modules/responses/responses.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksModule } from './modules/scheduledTasks/scheduled-tasks.module';

@Module({
  imports: [ScheduledTasksModule, AdminsModule, UsersModule, ProductsModule, ResponsesModule, AuthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}), 
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [Admin, User, Product, Response],
      timezone: 'Asia/Karachi',
      synchronize: true
    }),
    inject: [ConfigService]
  })],
  controllers: [AppController],
  providers: [AppService, JwtService, {provide: APP_GUARD, useClass: AuthGuard}, {provide: APP_GUARD, useClass: RolesGuard}],
})
export class AppModule {}
