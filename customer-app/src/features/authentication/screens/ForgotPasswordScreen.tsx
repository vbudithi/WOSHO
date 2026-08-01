import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
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
            emailOrMobile: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log("Forgot Password:", data);

        // TODO:
        // Call Forgot Password API

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
                    Enter your email or mobile number to reset your password
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>EMAIL OR MOBILE</Text>
                <Controller
                    control={control}
                    name="emailOrMobile"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                errors.emailOrMobile && styles.errorInput,
                            ]}
                            placeholder="Enter email or mobile"
                            placeholderTextColor="#999"
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="none"
                        />
                    )}
                />

                {errors.emailOrMobile && (
                    <Text style={styles.errorText}>
                        {errors.emailOrMobile.message}
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
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 16,
        height: 60,
        paddingHorizontal: 18,
        fontSize: 17,
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

});
