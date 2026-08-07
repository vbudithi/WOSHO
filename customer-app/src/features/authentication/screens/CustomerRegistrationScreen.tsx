import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
export default function CustomerRegistrationScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleContinue = () => {

        router.push("/otp");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111111" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Create Account
                </Text>
                <Text style={styles.subtitle}>
                    Join WOSHO and enjoy a seamless
                    car wash experience.
                </Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                < View style={styles.card}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarCircle}>
                                <Ionicons
                                    name="person"
                                    size={70}
                                    color="#16A34A"
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>
                            FIRST NAME
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="#777"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter first name"
                                placeholderTextColor="#999"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <Text style={[styles.label, { marginTop: 22 }]}>
                            LAST NAME
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter last name"
                                placeholderTextColor="#999"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                        <Text style={[styles.label, { marginTop: 22 }]}>
                            EMAIL ADDRESS
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter email address"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <Text style={[styles.label, { marginTop: 22 }]}>
                            MOBILE NUMBER
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="call-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter mobile number"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />
                        </View>
                        <Text style={[styles.label, { marginTop: 22 }]}>
                            PASSWORD
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
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
                                    color="#777"
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={[styles.label, { marginTop: 22 }]}>
                            CONFIRM PASSWORD
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                placeholderTextColor="#999"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
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
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleContinue}>
                            <Text style={styles.buttonText}>
                                Continue
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
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
});
