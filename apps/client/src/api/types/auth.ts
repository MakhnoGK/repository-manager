export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
};

export type RegisterRequest = LoginRequest;
export type RegisterResponse = RegisterResponse;
