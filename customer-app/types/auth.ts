export interface RegisterDto {
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNumber: string;
    password: string;
}

export interface LoginDto {
    emailAddress: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    role: string;
    expiresAt: string;
}