import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsBoolean()
	isActive: boolean;
}
