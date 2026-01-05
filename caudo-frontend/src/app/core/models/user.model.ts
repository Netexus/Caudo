export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'coder';
    createdAt?: Date;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
    };
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'coder';
}

export interface LoginRequest {
    email: string;
    password: string;
}
