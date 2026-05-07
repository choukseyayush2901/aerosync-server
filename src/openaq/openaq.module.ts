import { Module } from '@nestjs/common';
import { OpenaqService } from './openaq.service';
import { HttpModule } from '@nestjs/axios';
import { OpenaqController } from './openaq.controller';

@Module({
  imports: [HttpModule],
  providers: [OpenaqService],
  controllers: [OpenaqController],
})
export class OpenaqModule {}
