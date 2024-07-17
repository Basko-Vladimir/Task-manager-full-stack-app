import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(4200);

  // Code just for read current used port
  const server = app.getHttpServer();
  const address = server.address();
  const port = typeof address === 'string' ? address : address.port;

  console.info(`Application is running on: ${port}`);
}

bootstrap();
