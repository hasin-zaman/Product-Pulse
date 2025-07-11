import { IsNotEmpty } from "class-validator";

export class PaginationDto {
    
    @IsNotEmpty({ message: 'Page is required.' })
    page: number;

    @IsNotEmpty({ message: 'Limit is required.' })
    limit: number;

}