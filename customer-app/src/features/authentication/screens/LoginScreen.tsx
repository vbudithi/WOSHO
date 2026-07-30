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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111111" />

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../assets/WOSHO_logo.png")}
                    style={styles.logo}
                    resizeMode="contain"

                />
                <Text style={styles.title}>Welcome back.</Text>
                <Text style={styles.subtitle}>
                    Log in to book your next wash.
                </Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
                {/* Email */}
                <Text style={styles.label}>EMAIL OR MOBILE</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter email or mobile"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password */}
                <Text style={[styles.label, { marginTop: 24 }]}>PASSWORD</Text>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color="#6B7280"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>

                {/* Login */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.line} />
                    <Text style={styles.or}>or</Text>
                    <View style={styles.line} />
                </View>

                {/* OTP */}
                <TouchableOpacity style={styles.otpButton}>
                    <Text style={styles.otpText}>Continue with OTP</Text>
                </TouchableOpacity>

                {/* Signup */}
                <View style={styles.signupRow}>
                    <Text style={styles.signupText}>New to WOSHO? </Text>

                    <TouchableOpacity>
                        <Text style={styles.signupLink}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },

    header: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 28,
    },

    logo: {
        width: 300,
        height: 130,
        alignSelf: "center",
    },

    title: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "800",
    },

    subtitle: {
        color: "#B5B5B5",
        fontSize: 16,
        marginTop: 5,
    },

    card: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 28,
        paddingTop: 35,
    },

    label: {
        color: "#70757D",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },

    input: {
        borderWidth: 1.5,
        borderColor: "#222",
        borderRadius: 18,
        paddingHorizontal: 20,
        height: 62,
        fontSize: 18,
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 18,
        paddingHorizontal: 20,
        height: 62,
    },

    passwordInput: {
        flex: 1,
        fontSize: 18,
    },

    showText: {
        fontSize: 18,
        color: "#6F7682",
        fontWeight: "600",
    },

    forgotContainer: {
        alignSelf: "flex-end",
        marginTop: 16,
    },

    forgot: {
        color: "#0F6A4F",
        fontSize: 18,
        fontWeight: "500",
    },

    loginButton: {
        marginTop: 35,
        height: 62,
        borderRadius: 18,
        backgroundColor: "#111",
        justifyContent: "center",
        alignItems: "center",
    },

    loginText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "400",
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 35,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E5E5",
    },

    or: {
        marginHorizontal: 16,
        color: "#9A9A9A",
        fontSize: 18,
    },

    otpButton: {
        height: 62,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E3E3E3",
        justifyContent: "center",
        alignItems: "center",
    },

    otpText: {
        fontSize: 22,
        fontWeight: "500",
        color: "#111",
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
    },

    signupText: {
        color: "#6F7682",
        fontSize: 18,
    },

    signupLink: {
        color: "#0F6A4F",
        fontSize: 18,
        fontWeight: "500",
    },
});