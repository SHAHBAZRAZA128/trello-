import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('card/:id')
  create(
    @Param('id') cardId: string, @User('userId') userId: string, @Body() data: CreateCommentDto,
  ) {
    return this.commentService.create(cardId, userId, data);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOrThrowError(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

}
