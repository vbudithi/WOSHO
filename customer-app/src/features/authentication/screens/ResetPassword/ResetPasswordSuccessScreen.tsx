import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ResetPasswordSuccessScreen() {
    const handleContinue = () => {
        router.replace("/");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#111111"
                barStyle="light-content"
            />

            <View style={styles.card}>

                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="checkmark-circle"
                            size={120}
                            color="#16A34A"
                        />
                    </View>
                </View>

                <Text style={styles.title}>
                    Password Updated!
                </Text>

                <Text style={styles.subtitle}>
                    Your password has been reset successfully.
                </Text>

                <Text style={styles.subtitle}>
                    You can now sign in using your new password.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>
                        Back to Login
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#111111",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 40,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },

        elevation: 8,
    },

    iconContainer: {
        marginBottom: 30,
    },

    iconCircle: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "#F3FAF6",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#111111",
        textAlign: "center",
    },

    subtitle: {
        marginTop: 10,
        fontSize: 17,
        color: "#666666",
        textAlign: "center",
        lineHeight: 26,
    },

    button: {
        width: "100%",
        height: 60,
        backgroundColor: "#111111",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },

});