import { Department } from '../../entities/department.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DepartmentRepository extends Repository<Department> {
  constructor(private readonly dataSource: DataSource) {
    super(Department, dataSource.createEntityManager());
  }

  async createDepartment(payload: Department): Promise<Department> {
    try {
      return await this.save(payload)
    }
    catch (e) {
      throw e;
    }
  }

  async getOne(id: string): Promise<Department> {
    const Department = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);

    return await Department
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.id = :id', { id: id })
      .getOne();
  }

  async edit(id: string, filter: Department): Promise<boolean> {
    const columns = Object.keys(this.metadata.propertiesMap);
    const partialFilter = columns.reduce((acc, curr) => {
      if (filter[curr] !== undefined) {
        acc[curr] = filter[curr];
      }
      return acc;
    }, {});

    const res = await this.update(id, partialFilter);

    if (res.affected === 0) {
      throw new NotFoundException('Department Not Found!');
    }
    return true;
  }

  async getAllDepartment(): Promise<Department[]> {
    try {
      const Department = this.createQueryBuilder('p');
      const columns = Object.keys(this.metadata.propertiesMap);
      return await Department
        .select(columns.map(column => `p.${column}`))
        .getMany();
    } catch (e) {
      throw e
    }
  }

  async removeDepartment(id: string): Promise<boolean> {
    await this.delete(id)
    return true
  }

}
