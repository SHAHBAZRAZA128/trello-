import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { User } from 'src/user/user.decorator';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }


  @Post('/:BoardId')
  async create(@Body() createMemberDto, @Param('BoardId') BoardId: string, @User('userId') userId) {
    return await this.memberService.create(BoardId, userId ,createMemberDto);

  }

  @Get('/board/:BoardId/member')
  async getAllMembersByBoardId(@Param('BoardId') BoardId: string) {
    return await this.memberService.getAllMembersByBoardId(BoardId);

  }
  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }

  @Delete(':memberId')
  async delete(@Param('memberId') memberId: string) {
    await this.memberService.delete(memberId);
    return { message: 'Member deleted successfully' };
  }



  // @Get()
  // async findAll(): Promise<MemberEntity[]> {
  //   return await this.memberService.findAll();
  // }




  // @Get(':id')
  // async findOne(@Param('id') id: string) {

  //   return await this.memberService.findOne(id);

  // }

  // @Post()
  // async create(@Body() memberData){
  //   return await this.memberService.create(memberData);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() memberData){
  //   return await this.memberService.update(id, memberData);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string){
  //   await this.memberService.remove(id);
  // }
}
