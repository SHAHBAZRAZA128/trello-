import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes'
import { User } from 'src/user/user.decorator';


@Controller('/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @User('userId') userId: string) {
    return this.boardService.create(createBoardDto, userId);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.findOrThrowError(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.remove(id);
  }
}
