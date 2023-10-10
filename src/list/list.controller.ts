import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';



@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }


  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Post('board/:id')
  create(@Param('id', ParseUUIDPipe) board: string, @Body() createListDto: CreateListDto
  ) {
    return this.listService.create(board, createListDto);
  }


  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listService.findOrThrowError(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.listService.remove(id);
  }



}
