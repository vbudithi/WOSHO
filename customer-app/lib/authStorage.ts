import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "wosho_access_token";

export async function saveAccessToken(token: string) {
    if (Platform.OS === "web") {
        localStorage.setItem(TOKEN_KEY, token);
        return;
    }

    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getAccessToken() {
    if (Platform.OS === "web") {
        return localStorage.getItem(TOKEN_KEY);
    }

    return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeAccessToken() {
    if (Platform.OS === "web") {
        localStorage.removeItem(TOKEN_KEY);
        return;
    }

    await SecureStore.deleteItemAsync(TOKEN_KEY);
}