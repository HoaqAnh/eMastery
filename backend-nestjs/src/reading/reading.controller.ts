import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  create(@Body() createReadingDto: CreateReadingDto) {
    return this.readingService.create(createReadingDto);
  }

  @Get()
  findAll() {
    return this.readingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingService.update(+id, updateReadingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingService.remove(+id);
  }
}
