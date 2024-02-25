import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('add')
  add(data: number[]): number {
    return data.reduce((a, b) => a + b, 0);
  }

  @EventPattern('one.sub')
  sub(data: number[]) {
    const x = data.reduce((a, b) => a - b, 0);
    console.log('sub2', x);
  }
}
