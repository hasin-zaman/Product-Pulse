import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ProductState } from "src/enums/product-state";
import { ProductStatus } from "src/enums/product-status";
import { ProductType } from "src/enums/product-type";

export class RegisterProductDto {

    @IsNotEmpty({ message: 'Product type is required.' })
    @IsEnum(ProductType, { message: 'Invalid enum value for product type. Should be `General` or `Child Related`' })
    type: ProductType

    @IsNotEmpty({ message: 'Subject is required.' })
    @Length(1, 100, { message: 'Max limit for subject is 100 characters.' })
    subject: string
    
    @IsNotEmpty({ message: 'Product description is required.' })
    description: string;

    @IsOptional()
    @IsEnum(ProductStatus, { message: 'Invalid enum value for product status.' })
    status: ProductStatus;

    @IsOptional()
    @IsEnum(ProductState, { message: 'Invalid enum value for product state.' })
    state: ProductState;
}