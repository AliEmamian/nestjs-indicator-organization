import { Indicator, indexType } from '../../entities/indicator.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IndicatorRepository extends Repository<Indicator> {
  constructor(private readonly dataSource: DataSource) {
    super(Indicator, dataSource.createEntityManager());
  }

  async createIndicator(payload: Indicator): Promise<Indicator> {
    try {
      return await this.save(payload)
    }
    catch (e) {
      throw e;
    }
  }

  async getOne(id: string): Promise<Indicator> {
    const Indicator = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);

    return await Indicator
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.id = :id', { id: id })
      .getOne();
  }

  async edit(id: string, filter: Indicator): Promise<boolean> {
    const columns = Object.keys(this.metadata.propertiesMap);
    const partialFilter = columns.reduce((acc, curr) => {
      if (filter[curr] !== undefined) {
        acc[curr] = filter[curr];
      }
      return acc;
    }, {});

    const res = await this.update(id, partialFilter);

    if (res.affected === 0) {
      throw new NotFoundException('Indicator Not Found!');
    }
    return true;
  }

  async getAllIndicator(): Promise<Indicator[]> {
    try {
      const Indicator = this.createQueryBuilder('p');
      const columns = Object.keys(this.metadata.propertiesMap);
      return await Indicator
        .select(columns.map(column => `p.${column}`))
        .getMany();
    } catch (e) {
      throw e
    }
  }

  async removeIndicator(id: string): Promise<boolean> {
    await this.delete(id)
    return true
  }

  async getIndicatorsByParentIndicatorId(parentIndicatorId:string,month:string): Promise<Indicator[]> {
    try {
      const Indicator = this.createQueryBuilder('p');
      const columns = Object.keys(this.metadata.propertiesMap);
      return await Indicator
        .select(columns.map(column => `p.${column}`))
        .where('p.parentIndicatorId = :parentIndicatorId', { parentIndicatorId: parentIndicatorId })
        .andWhere('p.month = :month', { month: month })
        .getMany();
    } catch (e) {
      throw e
    }
  }

}
