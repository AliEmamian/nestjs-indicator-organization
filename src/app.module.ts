import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { DepartmentModule } from './modules/department/department.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { DepartmentRepository } from './modules/department/department.repository';
import { IndicatorModule } from '@modules/indicator/indicator.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RouterModule.forRoutes(routes),
    DepartmentModule,
    IndicatorModule
  ],
  controllers: [AppController],
  providers: [
    DepartmentRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataBaseErrorInterceptor,
    },
  ],
})
export class AppModule {

}
