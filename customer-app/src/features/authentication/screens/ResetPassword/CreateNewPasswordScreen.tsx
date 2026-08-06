import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    CreateNewPasswordSchema,
    CreateNewPasswordFormData,
} from "../../validation/CreateNewPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Controller, useForm } from "react-hook-form";

export default function CreateNewPasswordScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateNewPasswordFormData>({
        resolver: zodResolver(CreateNewPasswordSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: CreateNewPasswordFormData) => {
        router.replace("/password-reset-success");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#111111"
                barStyle="light-content"
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Create New Password
                </Text>

                <Text style={styles.subtitle}>
                    Create a strong password to keep your
                    WOSHO account secure.
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

                        <View style={styles.lockContainer}>
                            <View style={styles.lockCircle}>
                                <Ionicons
                                    name="lock-closed"
                                    size={70}
                                    color="#16A34A"
                                />
                            </View>
                        </View>

                        {/* New Password */}
                        <Text style={styles.label}>NEW PASSWORD</Text>

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.password && styles.errorInput,
                                    ]}
                                >
                                    <Ionicons name="lock-closed-outline" size={22} color="#777" />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter new password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />

                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={22}
                                            color="#777"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        )}

                        {/* Confirm Password */}
                        <Text style={[styles.label, { marginTop: 25 }]}>
                            CONFIRM PASSWORD
                        </Text>

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value } }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.confirmPassword && styles.errorInput,
                                    ]}
                                >
                                    <Ionicons name="lock-closed-outline" size={22} color="#777" />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm new password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={!showConfirmPassword}
                                        value={value}
                                        onChangeText={onChange}
                                    />

                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Ionicons
                                            name={
                                                showConfirmPassword ? "eye-off-outline" : "eye-outline"
                                            }
                                            size={22}
                                            color="#777"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                        )}


                        <View style={styles.requirementsHeader}>
                            <Text style={styles.requirementsTitle}>
                                Password must contain at least:
                            </Text>
                        </View>
                        <View style={styles.rules}>
                            <Text style={styles.rule}>
                                ✓ 8 characters
                            </Text>

                            <Text style={styles.rule}>
                                ✓ One uppercase letter
                            </Text>

                            <Text style={styles.rule}>
                                ✓ One lowercase letter
                            </Text>

                            <Text style={styles.rule}>
                                ✓ One number
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                !isValid && styles.buttonDisabled,
                            ]}
                            disabled={!isValid}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.buttonText}>
                                Save Password
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
    },

    header: {
        paddingTop: 60,
        paddingHorizontal: 30,
        paddingBottom: 35,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 34,
        fontWeight: "700",
        marginTop: 20,
    },

    subtitle: {
        color: "#BBBBBB",
        fontSize: 17,
        marginTop: 10,
        lineHeight: 25,
    },

    card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },

    lockContainer: {
        alignItems: "center",
        marginBottom: 30,
    },

    lockCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#F3FAF6",
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        color: "#666666",
        fontWeight: "700",
        marginBottom: 10,
        fontSize: 15,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#D8D8D8",
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 60,
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 17,
        color: "#111111",
    },

    errorInput: {
        borderColor: "#E53935",
    },

    errorText: {
        color: "#E53935",
        fontSize: 13,
        marginTop: 6,
        marginLeft: 2,
    },
    requirementsHeader: {
        marginTop: 30,
        marginBottom: 10,
    },

    requirementsTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#cf2a27",
    },


    rules: {
        marginTop: 8,
    },

    rule: {
        fontSize: 15,
        color: "#666666",
        marginBottom: 10,
    },

    button: {
        marginTop: 35,
        backgroundColor: "#111111",
        height: 60,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#999999",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },
});