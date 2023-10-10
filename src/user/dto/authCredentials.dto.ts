
import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class authCredentialsDto {

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@MinLength(6)
	@IsString()
	password: string;
	
}
