import { Role } from "src/enums/role.enum";

export type AdminParams = {
    userName: string;
    name: string;
    password: string;
    role: Role;
}