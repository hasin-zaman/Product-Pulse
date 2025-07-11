import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateAdminDto {

    @IsString()
    @MaxLength(20, { message: 'Maximum length of username should be 20 characters.' })
    @MinLength(6, { message: 'Minimum length of username should be 6 characters.' })
    @IsNotEmpty({ message: 'Username is required.' })
    userName: string;

    @MinLength(6, { message: 'Minimum length of name should be 6 characters.' })
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;

    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/\d/, { message: 'Password must contain at least one digit.' })
    @Matches(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
    @MinLength(8, { message: 'Minimum length should be 8 characters.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;

    @IsEnum(Role, { message: 'Invalid enum value for role.' })
    @IsNotEmpty({ message: 'Role is required.' })
    role: Role;
}

export class UpdateAdminDto {

    @IsOptional()
    @IsNotEmpty({ message: 'Name is required.' })
    @MinLength(6, { message: 'Minimum length of name should be 6 characters.' })
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'User name is required.' })
    @MinLength(6, { message: 'Minimum length of username should be 6 characters.' })
    @MaxLength(20, { message: 'Maximum length of username should be 20 characters.' })
    userName: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Minimum length should be 8 characters.' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/\d/, { message: 'Password must contain at least one digit.' })
    @Matches(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
    password: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Role is required.' })
    @IsEnum(Role, { message: 'Invalid enum value for role.' })
    role: Role;
}