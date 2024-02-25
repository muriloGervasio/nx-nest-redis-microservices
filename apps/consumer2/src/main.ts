import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      consumerTag: 'consumer2',
      urls: ['amqp://rabbitmq:rabbitmq@localhost:5672/'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  const port = process.env.PORT || 3002;
  await app.listen(port);
  await app.startAllMicroservices();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
