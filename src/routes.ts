
import { Routes } from 'nest-router';
import { DepartmentModule } from './modules/department/department.module'; 
import { IndicatorModule } from '@modules/indicator/indicator.module';

export const routes: Routes = [
  {
    path: '/department',
    module: DepartmentModule,
  },
  {
    path: '/indicator',
    module: IndicatorModule,
  }
];
