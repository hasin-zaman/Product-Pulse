import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {

    const salt=bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
} 

export function comparePasswords(password: string, hashedPassword: string){
    return bcrypt.compareSync(password, hashedPassword);
}