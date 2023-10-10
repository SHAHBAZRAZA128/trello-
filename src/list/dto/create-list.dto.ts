import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { ListPosition } from '../entities/list.entity'; // Import the ListPosition enum from your entity file

export class CreateListDto {

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsEnum(ListPosition)
	position: ListPosition;
}
