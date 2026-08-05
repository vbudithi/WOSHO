import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function EmailSentScreen() {

    const { email } = useLocalSearchParams<{ email: string }>();

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.iconCircle}>
                <Ionicons
                    name="mail-open"
                    size={90}
                    color="#16A34A"
                />
            </View>

            <Text style={styles.subtitle}>
                If an account exists for
            </Text>

            <Text style={styles.email}>
                {email}
            </Text>

            <Text style={styles.subtitle}>
                we'll send you a password reset link shortly.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/create-new-password")}
            >
                <Text style={styles.buttonText}>
                    Continue
                </Text>
            </TouchableOpacity>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#FFF",
    },

    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: "#F3FAF6",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        marginTop: 30,
    },

    subtitle: {
        marginTop: 15,
        fontSize: 17,
        color: "#666",
        textAlign: "center",
    },

    email: {
        marginTop: 8,
        color: "#16A34A",
        fontWeight: "700",
        fontSize: 18,
    },

    button: {
        marginTop: 50,
        width: "60%",
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