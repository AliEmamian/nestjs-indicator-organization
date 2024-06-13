import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { Department } from '../../entities/department.entity';
import axios from 'axios'

@Injectable()
export class DepartmentService {
  constructor(
    private repository: DepartmentRepository,
  ) { }

  onModuleInit() { }
  public async createDepartment(payload: Department):Promise<Department> {

    try {
      return await this.repository.createDepartment(payload);
    }
    catch (e) {
      throw new BadRequestException('invalid INPUT');
    }
  }

  public async getDepartment(id: string):Promise<Department> {
    try {
      let Department = await this.repository.getOne(id)
      if (!Department)
        throw new BadRequestException('invalid');
      return Department
    } catch (e) {
      throw e;
    }
  }

  public async updateDepartment(id: string, body: Department):Promise<boolean> {
    try {
      let Department = await this.repository.getOne(id)
      if (!Department)
        throw new BadRequestException('not found Department');

      return await this.repository.edit(id, body)
    } catch (e) {
      throw e;
    }
  }

  public async getAllDepartment():Promise<Department[]> {
    try {
      return await this.repository.getAllDepartment()
    } catch (e) {
      throw e;
    }
  } 

  public async removeDepartment(id:string):Promise<boolean> {
    try {
      return await this.repository.removeDepartment(id)
    } catch (e) {
      throw e;
    }
  } 

  
}
