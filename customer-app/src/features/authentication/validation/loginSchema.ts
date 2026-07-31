import { z } from "zod";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mobileRegex =
    /^[0-9]{10}$/;

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email or Mobile Number is required")
        .superRefine((value, ctx) => {
            const isEmail = emailRegex.test(value);
            const isMobile = mobileRegex.test(value);

            if (!isEmail && !isMobile) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Enter a valid email or mobile number",
                });
            }
        }),

    password: z
        .string()
        .trim()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;