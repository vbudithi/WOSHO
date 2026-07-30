import React from 'react'
import LoginScreen from '@/features/authentication/screens/LoginScreen'
import SignUpScreen from '@/features/authentication/screens/SignUpScreen'
import ForgotPasswordScreen from '@/features/authentication/screens/ForgotPasswordScreen'
import OTPScreen from '@/features/authentication/screens/OTPScreen'
import { createNativeStackNavigator } from 'expo-router/build/react-navigation/native-stack/navigators/createNativeStackNavigator'

const Stack = createNativeStackNavigator()
export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Forgot-password" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
        </Stack.Navigator>

    )
}
