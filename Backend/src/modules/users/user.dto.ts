import { IsNotEmpty, IsEmail, Length, IsOptional, IsNumberString } from 'class-validator';
import { CNICFormat } from 'src/validation/cnicFormat';

export class CreateUserDto {

    @IsNotEmpty({ message: 'Cnic is required.' })
    @CNICFormat()
    cnic: string;

    @IsNotEmpty({ message: 'Complainant name is required.' })
    name: string;

    @IsNotEmpty({ message: 'Address is required.' })
    address: string;

    @IsNotEmpty({ message: 'District is required.' })
    district: string;

    @IsOptional()
    @Length(11, 12, { message: 'Phone number must be 11 or 12 digits. Example: 02112345678' })
    phone: string;

    @IsNotEmpty({ message: 'Mobile is required.' })
    @Length(11, 12, { message: 'Mobile number must be 11 or 12 digits. Example: 03331234567, 923331234567' })
    mobile: string;

    @IsOptional()
    @IsEmail()
    email: string;
}

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty({ message: 'Cnic is required.' })
    @CNICFormat()
    cnic: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Complainant name is required.' })
    name: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Address is required.' })
    address: string;

    @IsOptional()
    @IsNotEmpty({ message: 'District is required.' })
    district: string;

    @IsOptional()
    @IsNumberString()
    @Length(11, 12, { message: 'Phone number must be 11 or 12 digits. Example: 02112345678' })
    phone: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Mobile is required.' })
    @IsNumberString()
    @Length(11, 12, { message: 'Mobile number must be 11 or 12 digits. Example: 03331234567, 923331234567' })
    mobile: string;

    @IsOptional()
    @IsEmail()
    email: string;
}