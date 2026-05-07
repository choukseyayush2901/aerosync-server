import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaqModule } from './openaq/openaq.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [OpenaqModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
