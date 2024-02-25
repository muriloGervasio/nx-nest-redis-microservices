import { Module } from '@nestjs/common';

import { AppController } from './server.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'broker',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@localhost:5672/'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
