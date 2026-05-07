import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS enable karna taaki React app ise access kar sake
  app.enableCors({
    origin: '*', // Abhi testing ke liye sabko allow kar rahe hain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Backend ko port 3333 par chala rahe hain taaki 3000 frontend ke liye free rahe
  await app.listen(process.env.PORT ?? 3333);
  console.log('🚀 Backend is running on: http://localhost:3333');
}
bootstrap();
