import { ForgotPasswordDto, LoginDto, LoginResponseDto, RegisterDto, ResetPasswordDto } from "../types/auth";
import apiClient from "./apiClient";

export async function registerUser(data: RegisterDto) {
    await apiClient.post("/Auth/register", data);
}

export async function loginUser(data: LoginDto) {
    const response = await apiClient.post("/Auth/login", data);
    return response.data as LoginResponseDto;
}

export async function ForgotPassword(data: ForgotPasswordDto) {
    const response = await apiClient.post("/Password/forgot-password", data);
    return response.data;
}

export async function ResetPassword(data: ResetPasswordDto) {
    const response = await apiClient.post("/Password/reset-password", data);
    return response.data;
}