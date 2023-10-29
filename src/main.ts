import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce ')
    .setDescription('The ecommerce API description')
    .setVersion('1.0')
    .addTag('ecommerce')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    customSiteTitle: 'Ecommerce',
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(8000);
}
bootstrap();
