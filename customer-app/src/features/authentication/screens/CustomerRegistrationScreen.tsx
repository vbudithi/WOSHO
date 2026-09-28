import { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
    CustomerRegistrationFormData,
    customerRegistrationSchema,
} from "../validation/customerRegistrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "../../../../lib/authService";

export default function CustomerRegistrationScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [rules, setRules] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerRegistrationFormData>({
        resolver: zodResolver(customerRegistrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            mobileNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const validatePassword = (password: string) => {
        return {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        };
    };

    const handleRegister = async (
        data: CustomerRegistrationFormData
    ) => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await registerUser({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                emailAddress: data.emailAddress.trim(),
                mobileNumber: data.mobileNumber.trim(),
                password: data.password,
            });

            console.log("Registration successful:", response);

            router.push({
                pathname: "/otp",
                params: {
                    mobileNumber: data.mobileNumber,
                    purpose: "registration",
                },
            });


            Alert.alert(
                "Registration Successful",
                "Your WOSHO account has been created successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/login"),
                    },
                ]
            );
        } catch (error: any) {
            console.log("Registration error:", error);

            let message =
                "Registration failed. Please try again.";

            if (error?.response?.data?.message) {
                message = error.response.data.message;
            } else if (error?.request) {
                message =
                    "Unable to connect to the WOSHO server. Please check that the API is running.";
            } else if (error?.message) {
                message = error.message;
            }

            Alert.alert("Registration Failed", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#111111"
            />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace("/");
                        }
                    }}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Create Account
                </Text>

                <Text style={styles.subtitle}>
                    Join WOSHO and enjoy a seamless
                    {"\n"}car wash experience.
                </Text>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >
                <View style={styles.card}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Avatar */}
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarCircle}>
                                <Ionicons
                                    name="person"
                                    size={70}
                                    color="#16A34A"
                                />
                            </View>
                        </View>

                        {/* First Name */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            First Name*
                        </Text>

                        <Controller
                            control={control}
                            name="firstName"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.firstName &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="person-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="First Name"
                                        placeholderTextColor="#999"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}
                        />

                        {errors.firstName && (
                            <Text style={styles.errorText}>
                                {errors.firstName.message}
                            </Text>
                        )}

                        {/* Last Name */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            Last Name
                        </Text>

                        <Controller
                            control={control}
                            name="lastName"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.lastName &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="person-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Last Name"
                                        placeholderTextColor="#999"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}
                        />

                        {errors.lastName && (
                            <Text style={styles.errorText}>
                                {errors.lastName.message}
                            </Text>
                        )}

                        {/* Email */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            Email*
                        </Text>

                        <Controller
                            control={control}
                            name="emailAddress"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.emailAddress &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="mail-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your Email"
                                        placeholderTextColor="#999"
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                </View>
                            )}
                        />

                        {errors.emailAddress && (
                            <Text style={styles.errorText}>
                                {errors.emailAddress.message}
                            </Text>
                        )}

                        {/* Mobile Number */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            Phone No*
                        </Text>

                        <Controller
                            control={control}
                            name="mobileNumber"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.mobileNumber &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="call-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mobile Number"
                                        placeholderTextColor="#999"
                                        keyboardType="phone-pad"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                </View>
                            )}
                        />

                        {errors.mobileNumber && (
                            <Text style={styles.errorText}>
                                {errors.mobileNumber.message}
                            </Text>
                        )}

                        {/* Password */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            Password*
                        </Text>

                        <Controller
                            control={control}
                            name="password"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.password &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={
                                            !showPassword
                                        }
                                        value={value}
                                        onChangeText={(text) => {
                                            onChange(text);
                                            setRules(
                                                validatePassword(
                                                    text
                                                )
                                            );
                                        }}
                                        onBlur={onBlur}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name={
                                                showPassword
                                                    ? "eye-off-outline"
                                                    : "eye-outline"
                                            }
                                            size={22}
                                            color="#777"
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

                        {/* Confirm Password */}
                        <Text
                            style={[
                                styles.label,
                                styles.fieldSpacing,
                            ]}
                        >
                            Confirm Password*
                        </Text>

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                },
                            }) => (
                                <View
                                    style={[
                                        styles.inputContainer,
                                        errors.confirmPassword &&
                                        styles.errorInput,
                                    ]}
                                >
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={22}
                                        color="#777"
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry={
                                            !showConfirmPassword
                                        }
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name={
                                                showConfirmPassword
                                                    ? "eye-off-outline"
                                                    : "eye-outline"
                                            }
                                            size={22}
                                            color="#777"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>
                                {
                                    errors.confirmPassword
                                        .message
                                }
                            </Text>
                        )}

                        {/* Password Requirements */}
                        <View
                            style={
                                styles.requirementsContainer
                            }
                        >
                            <Text
                                style={
                                    styles.requirementsTitle
                                }
                            >
                                🔐 Password Requirements
                            </Text>

                            <View
                                style={
                                    styles.requirementsList
                                }
                            >
                                <Text
                                    style={[
                                        styles.requirement,
                                        rules.length &&
                                        styles.requirementValid,
                                    ]}
                                >
                                    {rules.length ? "✓" : "•"}{" "}
                                    8+ characters
                                </Text>

                                <Text
                                    style={[
                                        styles.requirement,
                                        rules.upper &&
                                        styles.requirementValid,
                                    ]}
                                >
                                    {rules.upper ? "✓" : "•"}{" "}
                                    Uppercase letter
                                </Text>

                                <Text
                                    style={[
                                        styles.requirement,
                                        rules.lower &&
                                        styles.requirementValid,
                                    ]}
                                >
                                    {rules.lower ? "✓" : "•"}{" "}
                                    Lowercase letter
                                </Text>

                                <Text
                                    style={[
                                        styles.requirement,
                                        rules.number &&
                                        styles.requirementValid,
                                    ]}
                                >
                                    {rules.number ? "✓" : "•"}{" "}
                                    Number
                                </Text>

                                <Text
                                    style={[
                                        styles.requirement,
                                        rules.special &&
                                        styles.requirementValid,
                                    ]}
                                >
                                    {rules.special ? "✓" : "•"}{" "}
                                    Special character
                                </Text>
                            </View>
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                loading &&
                                styles.buttonDisabled,
                            ]}
                            onPress={handleSubmit(
                                handleRegister
                            )}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#FFFFFF"
                                />
                            ) : (
                                <Text
                                    style={
                                        styles.buttonText
                                    }
                                >
                                    Continue
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View
                            style={styles.bottomSpacing}
                        />
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

    avatarContainer: {
        alignItems: "center",
        marginBottom: 35,
    },

    avatarCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#F3FAF6",
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        color: "#666666",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 10,
    },

    fieldSpacing: {
        marginTop: 22,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        borderWidth: 1.5,
        borderColor: "#D8D8D8",
        borderRadius: 16,
        paddingHorizontal: 16,
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 17,
        color: "#111111",
    },

    button: {
        marginTop: 35,
        height: 60,
        backgroundColor: "#111111",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },

    errorInput: {
        borderColor: "#E53935",
    },

    buttonDisabled: {
        backgroundColor: "#666666",
    },

    backButton: {
        marginBottom: 5,
    },

    keyboardView: {
        flex: 1,
    },

    errorText: {
        color: "#E53935",
        fontSize: 13,
        marginTop: 6,
        marginLeft: 2,
    },

    bottomSpacing: {
        height: 30,
    },

    requirementsContainer: {
        marginTop: 25,
        marginBottom: 15,
        alignItems: "center",
    },

    requirementsTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#111",
        marginBottom: 10,
    },

    requirementsList: {
        gap: 6,
    },

    requirement: {
        fontSize: 15,
        color: "#555",
        marginVertical: 3,
    },

    requirementValid: {
        color: "green",
        fontWeight: "600",
    },
});