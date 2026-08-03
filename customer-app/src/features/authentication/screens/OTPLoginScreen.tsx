import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import OTPTextView from "react-native-otp-textinput";

export default function OTPScreen() {
    const { mobileNumber } = useLocalSearchParams();

    const handleVerify = () => {
        //  OTP API

        router.replace("/home");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#111"
                barStyle="light-content"
            />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Verify OTP
                </Text>

                <Text style={styles.subtitle}>
                    We've sent a 6-digit verification code

                </Text>

                <Text style={styles.mobile}>
                    {mobileNumber}
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
                <View style={styles.card}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.lockContainer}>
                            <View style={styles.lockCircle}>
                                <Ionicons
                                    name="shield-checkmark"
                                    size={70}
                                    color="#16A34A"
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>
                            VERIFICATION CODE
                        </Text>

                        <OTPTextView
                            inputCount={6}
                            tintColor="#16A34A"
                            offTintColor="#DDD"
                            textInputStyle={styles.otpInput}
                        />

                        <Text style={styles.info}>
                            Didn't receive the code?
                        </Text>

                        <TouchableOpacity>
                            <Text style={styles.resend}>
                                Resend OTP
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleVerify}
                        >
                            <Text style={styles.buttonText}>
                                Verify OTP
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
        backgroundColor: "#111",
    },

    header: {
        paddingTop: 60,
        paddingHorizontal: 30,
        paddingBottom: 35,
    },

    backButton: {
        marginBottom: 20,
    },

    title: {
        color: "#FFF",
        fontSize: 34,
        fontWeight: "700",
    },

    subtitle: {
        color: "#BBB",
        marginTop: 10,
        fontSize: 17,
    },

    mobile: {
        color: "#16A34A",
        marginTop: 6,
        fontWeight: "700",
        fontSize: 18,
    },

    card: {
        flex: 1,
        backgroundColor: "#FFF",
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
        color: "#666",
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },

    otpInput: {
        borderWidth: 1,
        borderRadius: 12,
        width: 48,
        height: 58,
        fontSize: 22,
        fontWeight: "700",
    },

    info: {
        textAlign: "center",
        color: "#666",
        marginTop: 30,
        fontSize: 16,
    },

    resend: {
        textAlign: "center",
        color: "#16A34A",
        fontWeight: "700",
        marginTop: 8,
        fontSize: 17,
    },

    button: {
        marginTop: 40,
        height: 60,
        backgroundColor: "#111",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
    },

});