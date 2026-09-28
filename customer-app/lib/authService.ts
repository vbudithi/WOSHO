import { LoginDto, LoginResponseDto, RegisterDto } from "../types/auth";
import apiClient from "./apiClient";

export async function registerUser(data: RegisterDto) {
    await apiClient.post("/Auth/register", data);
}

export async function loginUser(data: LoginDto) {
    const response = await apiClient.post("/Auth/login", data);
    return response.data as LoginResponseDto;
}