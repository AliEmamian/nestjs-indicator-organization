import { Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';
import { IndicatorRepository } from './indicator.repository';


@Module({
  imports: [],
  exports: [IndicatorService, IndicatorRepository],
  controllers: [IndicatorController],
  providers: [
    IndicatorRepository,
    IndicatorService,
  ],
})
export class IndicatorModule {}
