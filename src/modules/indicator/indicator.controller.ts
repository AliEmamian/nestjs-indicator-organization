import {
  Controller,
  Inject,
  Post,
  Param,
  Body,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { Indicator } from '@entities/indicator.entity';
import { query } from 'express';


@Controller()
export class IndicatorController {

  @Inject(IndicatorService)
  private readonly service: IndicatorService;

  @Post()
  private async createIndicator(@Body() payload): Promise<Indicator> {
    return await this.service.createIndicator(payload);
  }

  @Get('')
  private async findAllIndicator(): Promise<Indicator[]> {
    return await this.service.getAllIndicator();
  }

  @Get(':id')
  private async findIndicator(@Param('id') id: string): Promise<Indicator> {
    return await this.service.getIndicator(id);
  }

  @Put(':id')
  private async updateIndicator(@Param('id') id: string, @Body() body): Promise<boolean> {
    let res = await this.service.updateIndicator(id, body);;
    return res;
  }

  @Delete(':id')
  private async deleteeIndicator(@Param('id') id: string): Promise<boolean> {
    return await this.service.removeIndicator(id);;
  }

  @Get('/value/:id')
  private async calculateIndicatorValue(@Param('id') id: string,@Query('month') month:string): Promise<{res:number}> {
    const res = await this.service.calculateIndicatorValue(id,month);
    return {
      res
    }
  }
}