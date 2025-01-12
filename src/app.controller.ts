import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DepartmentRepository } from './modules/department/department.repository';

@Controller()
export class AppController {
  constructor(private Repository: DepartmentRepository) {}

  @Get('/heartbeat')
  public async heartBeat(): Promise<void> {
    // Check that the connection to db is established
    try {
      console.log('heartBeat');
      
      await this.Repository.findOne({ where: {} });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
