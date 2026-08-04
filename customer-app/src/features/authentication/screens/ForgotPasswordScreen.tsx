import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar, TextInput, TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../validation/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Controller, useForm } from "react-hook-form";

export default function ForgotPasswordScreen() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log("Forgot Password:", data);

        // Forgot Password API

        router.push("/otp");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    No worries! Enter your registered email to reset your password
                </Text>
            </View>

            <View style={styles.card}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.lockContainer}>
                        <View style={styles.lockCircle}>
                            <Ionicons
                                name="lock-closed"
                                size={60}
                                color="#16A34A"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>EMAIL</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <View
                                style={[
                                    styles.inputContainer,
                                    errors.email && styles.errorInput,
                                ]}
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={22}
                                    color="#666"
                                    style={{ marginRight: 10 }}
                                />

                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Email"
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        )}
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>
                            {errors.email.message}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.buttonText}>
                            Continue
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.line} />

                        <Text style={styles.or}>or</Text>

                        <View style={styles.line} />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Remember your password?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Text style={styles.loginLink}>
                                Back to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#111",
    },

    header: {
        paddingTop: 60,
        paddingHorizontal: 30,
        paddingBottom: 40,
    },

    backButton: {
        marginBottom: 25,
    },

    title: {
        color: "#FFF",
        fontSize: 34,
        fontWeight: "700",
    },

    subtitle: {
        color: "#B3B3B3",
        fontSize: 17,
        marginTop: 10,
    },

    card: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 28,
    },

    label: {
        fontWeight: "700",
        marginBottom: 10,
        color: "#666",
    },

    input: {
        height: 60,
        borderWidth: 1.5,
        borderColor: "#D8D8D8",
        borderRadius: 16,
        paddingHorizontal: 18,
        fontSize: 17,
        color: "#111111",
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 16,
        height: 60,
        paddingHorizontal: 18,
        backgroundColor: "#FFF",
    },

    inputField: {
        flex: 1,
        fontSize: 17,
        color: "#000",
    },

    button: {
        marginTop: 30,
        height: 60,
        backgroundColor: "#111111",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
    },
    errorInput: {
        borderColor: "#E53935",
    },

    errorText: {
        color: "#E53935",
        fontSize: 13,
        marginTop: 5,
        marginLeft: 3,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",

    },

    footerText: {
        color: "#70757A",
        fontSize: 16,
    },
    loginLink: {
        color: "#0F6A4F",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 5,
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
        marginHorizontal: 15,
        color: "#888",
    },
    lockContainer: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 40,
    },

    lockCircle: {
        width: 110,
        height: 110,
        borderRadius: 70,
        backgroundColor: "#d0dfd6",
        justifyContent: "center",
        alignItems: "center",
    },

});
