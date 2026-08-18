import React from 'react'
import { z } from "zod";
import { StyleSheet } from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const mobileRegex = /^[0-9]{10}$/;

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .superRefine((value, ctx) => {
            const isEmail = emailRegex.test(value);
            // const isMobile = mobileRegex.test(value);

            if (!isEmail /* && !isMobile */) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Enter a valid email",
                });
            }
        }),
});

const styles = StyleSheet.create({

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

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
