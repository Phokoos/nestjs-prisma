import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BigLoggingMiddleware } from './common/middleware/logger-big.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(BigLoggingMiddleware);

  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [ProductModule],
  });

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'My API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
