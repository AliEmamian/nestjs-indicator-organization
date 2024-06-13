import {
  Controller,
  Inject,
  Post,
  Param,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from '@entities/department.entity';


@Controller()
export class DepartmentController {

  @Inject(DepartmentService)
  private readonly service: DepartmentService;

  @Post()
  private async createDepartment(@Body() payload): Promise<Department> {
    return await this.service.createDepartment(payload);
  }

  @Get('')
  private async findAllDepartment(): Promise<Department[]> {
    return await this.service.getAllDepartment();
  }

  @Get(':id')
  private async findDepartment(@Param('id') id: string): Promise<Department> {
    return await this.service.getDepartment(id);
  }

  @Put(':id')
  private async updateDepartment(@Param('id') id: string, @Body() body): Promise<boolean> {
    let res = await this.service.updateDepartment(id, body);;
    return res;
  }

  @Delete(':id')
  private async deleteeDepartment(@Param('id') id: string): Promise<boolean> {
    return await this.service.removeDepartment(id);;
  }
}