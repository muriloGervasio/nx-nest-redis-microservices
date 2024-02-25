import { Module } from '@nestjs/common';

import { AppController } from './consumer1.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
