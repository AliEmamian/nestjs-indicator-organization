import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { Indicator, indexType } from '../../entities/indicator.entity';
import axios from 'axios'

@Injectable()
export class IndicatorService {
  constructor(
    private repository: IndicatorRepository,
  ) { }

  onModuleInit() { }

  public async createIndicator(payload: Indicator): Promise<Indicator> {

    try {
      return await this.repository.createIndicator(payload);
    }
    catch (e) {
      throw new BadRequestException('invalid INPUT');
    }
  }

  public async getIndicator(id: string): Promise<Indicator> {
    try {
      let Indicator = await this.repository.getOne(id)
      if (!Indicator)
        throw new BadRequestException('invalid');
      return Indicator
    } catch (e) {
      throw e;
    }
  }

  public async updateIndicator(id: string, body: Indicator): Promise<boolean> {
    try {
      let Indicator = await this.repository.getOne(id)
      if (!Indicator)
        throw new BadRequestException('not found Indicator');

      return await this.repository.edit(id, body)
    } catch (e) {
      throw e;
    }
  }

  public async getAllIndicator(): Promise<Indicator[]> {
    try {
      return await this.repository.getAllIndicator()
    } catch (e) {
      throw e;
    }
  }

  public async removeIndicator(id: string): Promise<boolean> {
    try {
      return await this.repository.removeIndicator(id)
    } catch (e) {
      throw e;
    }
  }

  public async calculateIndicatorValue(id: string,month:string): Promise<number> {
    try {
      let indicator = await this.repository.getOne(id)
      if (!indicator)
        throw new BadRequestException('invalid');
      let type = this.detectChildIndex(indicator.type)
      if (type == indexType.AMALKARDI) {
        let indexes = await this.repository.getIndicatorsByParentIndicatorId(id,month)
        let sum = 0;
        indexes.forEach(item => {
          sum += Number(item.value)
        })

        const value = sum / indexes.length
        return value
      }
      else if (type == indexType.MIANI) {
        let indexes = await this.repository.getIndicatorsByParentIndicatorId(id,month)
        let totalSum = 0;
        // indexes.forEach(async (item) => {
        for (let i = 0; i < indexes.length; i++) {
          let sum = 0;
          let subIndexes = await this.repository.getIndicatorsByParentIndicatorId(indexes[i].id,month)
          
          for (let j = 0; j < subIndexes.length; j++) {
            sum += Number(subIndexes[j].value)
          }
          totalSum += sum / subIndexes.length
        }

        const value = totalSum / indexes.length
        return value
      }
      else
        return indicator.value
    } catch (e) {
      throw e;
    }
  }

  private detectChildIndex(type: indexType) {
    if (type == indexType.KALAN) {
      return indexType.MIANI
    }
    else if (type == indexType.MIANI) {
      return indexType.AMALKARDI
    }
    else {
      return null;
    }
  }
}
