import { Module } from '@nestjs/common';

import { AppController } from './server.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'broker',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          password: 'yourpassword',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
