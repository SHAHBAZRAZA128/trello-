import {Get, UseGuards, Request, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Request() req) {
		return this.authService.login(req.user);

	}

	
	// @Get('profile')
	// getProfile(@Request() req) {
	//   return "im protected route";
	// }

}