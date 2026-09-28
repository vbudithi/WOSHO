import { RegisterDto } from "../types/auth";
import apiClient from "./apiClient";

export async function registerUser(data: RegisterDto) {
    await apiClient.post("/Auth/register", data);
}