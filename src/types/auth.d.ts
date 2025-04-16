export type User = {
    id: string;
    username: string;
    password: string;
    email: string;
}

export type RegisterResponse = {
    message: string;
}

export type LoginResponse = {
    token: string;
    user: User;
}