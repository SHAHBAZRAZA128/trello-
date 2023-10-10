
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) { }


	
	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		
		if (user) {
			// Compare the input password with the hashed password stored in the database
			const passwordMatch = await bcrypt.compare(password, user.password);
			
			if (passwordMatch) {
				// If passwords match, remove the password field and return the user
				const { password, ...result } = user;
			return result;
		  }
		}
	  
		return null; // Return null if user doesn't exist or password doesn't match
	  }


	async login(user: any) {
		
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}



}