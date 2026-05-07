import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Vercel frontend ko block na kare, isliye CORS enable karna zaroori hai
  app.enableCors();

  // Render ka dynamic PORT use karo, warna default 3333.
  // '0.0.0.0' lagana zaroori hai taaki external connections allow hon.
  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
