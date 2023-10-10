import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { UserService } from './user.service';
import { authCredentialsDto } from './dto/authCredentials.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  signup(@Body() authCredentialsDto: authCredentialsDto) {
    return this.userService.signup(authCredentialsDto);
  }

  @Get()  
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOrThrowError(id);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: authCredentialsDto) {
    return this.userService.update(id, updateUserDto);
  }

}
