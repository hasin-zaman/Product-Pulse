import { IsNotEmpty } from "class-validator";

export class PostResponseDto {
    
    @IsNotEmpty({ message: 'Response is required.' })
    response: string;

}