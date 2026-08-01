import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "../validation/loginSchema";
import { router } from "expo-router";


export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormData) => {
        console.log("Login Data:", data);
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111" />

            <View style={styles.header}>
                <Image source={require("../assets/WOSHO_logo.png")} style={styles.logo} resizeMode="contain" />

                <Text style={styles.title}>Welcome back.</Text>

                <Text style={styles.subtitle}>
                    Log in to book your next wash.
                </Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.card}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* EMAIL */}

                        <Text style={styles.label}>EMAIL OR MOBILE</Text>

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.email && styles.errorInput,
                                    ]}
                                    placeholder="Enter email or mobile"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            )}
                        />

                        {errors.email && (
                            <Text style={styles.errorText}>
                                {errors.email.message}
                            </Text>
                        )}

                        {/* PASSWORD */}

                        <Text style={[styles.label, { marginTop: 22 }]}>
                            PASSWORD
                        </Text>

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <View
                                    style={[
                                        styles.passwordContainer,
                                        errors.password && styles.errorInput,
                                    ]}
                                >
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Enter password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />

                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <Ionicons
                                            name={
                                                showPassword
                                                    ? "eye-off-outline"
                                                    : "eye-outline"
                                            }
                                            size={22}
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {errors.password && (
                            <Text style={styles.errorText}>
                                {errors.password.message}
                            </Text>
                        )}

                        {/* Forgot */}

                        <TouchableOpacity style={styles.forgotContainer}
                            onPress={() => router.push("/forgot-password")}>
                            <Text style={styles.forgot}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>

                        {/* Login */}

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.loginText}>
                                Log in
                            </Text>
                        </TouchableOpacity>

                        {/* Divider */}

                        <View style={styles.divider}>
                            <View style={styles.line} />

                            <Text style={styles.or}>or</Text>

                            <View style={styles.line} />
                        </View>

                        {/* OTP */}

                        <TouchableOpacity style={styles.otpButton}>
                            <Text style={styles.otpText}>
                                Continue with OTP
                            </Text>
                        </TouchableOpacity>

                        {/* Signup */}

                        <View style={styles.signupRow}>
                            <Text style={styles.signupText}>
                                New to WOSHO?
                            </Text>

                            <TouchableOpacity>
                                <Text style={styles.signupLink}>
                                    {" "}Create account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
    },

    header: {
        paddingTop: 20,
        paddingHorizontal: 28,
        paddingBottom: 20,
    },

    logo: {
        width: 300,
        height: 120,
        alignSelf: "center",
        marginBottom: 20,
    },

    title: {
        color: "#FFF",
        fontSize: 38,
        fontWeight: "700",
    },

    subtitle: {
        color: "#B3B3B3",
        fontSize: 18,
        marginTop: 6,
    },

    card: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 28,
    },

    label: {
        fontSize: 15,
        color: "#666",
        fontWeight: "700",
        marginBottom: 8,
    },

    input: {
        height: 60,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 16,
        paddingHorizontal: 18,
        fontSize: 17,
    },

    passwordContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    passwordInput: {
        flex: 1,
        fontSize: 17,
    },

    errorInput: {
        borderColor: "#E53935",
    },

    errorText: {
        color: "#E53935",
        marginTop: 5,
        marginLeft: 3,
        fontSize: 13,
    },

    forgotContainer: {
        alignSelf: "flex-end",
        marginTop: 16,
    },

    forgot: {
        color: "#0F6A4F",
        fontWeight: "600",
    },

    loginButton: {
        height: 60,
        backgroundColor: "#111",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 28,
    },

    loginText: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "700",
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 28,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#DDD",
    },

    or: {
        marginHorizontal: 12,
        color: "#888",
    },

    otpButton: {
        height: 60,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    otpText: {
        fontWeight: "700",
        fontSize: 18,
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },

    signupText: {
        color: "#666",
        fontSize: 17,
    },

    signupLink: {
        color: "#0F6A4F",
        fontWeight: "700",
        fontSize: 17,
    },
});