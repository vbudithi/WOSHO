import z from "zod";

export const customerRegistrationSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, "First name is required")
            .min(2, "FIrst name must be atleast 2 characters")
            .max(50, "First name must not exceed 50 characters")
            .regex(
                /^[A-Za-z\s'-]+$/,
                "First name can only contain letters."
            ),

        lastName: z
            .string()
            .trim()
        ,
        email: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Enter a valid email address."),
        mobileNumber: z
            .string()
            .trim()
            .min(1, "Mobile number is required")
            .regex(
                /^(?:\+91|0)?[6-9]\d{9}$/,
                "Enter a valid mobile number."
            ),
        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters.")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter."
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter."
            )
            .regex(
                /[0-9]/,
                "Password must contain at least one number."
            )
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character."
            ),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),

    })

    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type CustomerRegistrationFormData = z.infer<typeof customerRegistrationSchema>;