import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';


@Module({
  imports: [],
  exports: [DepartmentService, DepartmentRepository],
  controllers: [DepartmentController],
  providers: [
    DepartmentRepository,
    DepartmentService,
  ],
})
export class DepartmentModule {}
