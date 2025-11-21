import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';

@Module({
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
