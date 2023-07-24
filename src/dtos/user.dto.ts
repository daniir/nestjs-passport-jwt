export interface UserBase {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
};

export interface UserDto extends Partial<UserBase> {
    id: string;
};

export type TokenPayload = {
    sub: string,
    username: string,
};