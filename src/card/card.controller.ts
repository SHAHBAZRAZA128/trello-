import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Post('list/:id')
  async create(
    @Param('id', ParseUUIDPipe) listId: string,
    @Body() createCardDto: CreateCardDto
  ) {
    return this.cardService.create(listId, createCardDto);
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.findOrThrowError(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.remove(id);
  }
  
}
