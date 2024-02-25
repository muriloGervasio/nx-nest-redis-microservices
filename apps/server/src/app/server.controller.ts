import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { lastValueFrom, tap } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('broker')
    private readonly client: ClientProxy
  ) {}

  @Get('sync')
  async getData() {
    this.client.emit('one.sub', [1, 2]).subscribe(console.log);
    this.client.send('add', [1, 2]).subscribe((r) => console.log('res', r));
  }

  @EventPattern('one.sub')
  sub(data: number[]) {
    const x = data.reduce((a, b) => a - b, 0);
    console.log('sub3', x);
  }

  @MessagePattern('add')
  sub2(data: number[]) {
    const x = data.reduce((a, b) => a - b, 0);
    return x;
  }
}
