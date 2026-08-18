import { z } from "zod";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mobileRegex =
    /^[0-9]{10}$/;

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Enter a valid email address.")
        .superRefine((value, ctx) => {
            const isEmail = emailRegex.test(value);
            const isMobile = mobileRegex.test(value);

            if (!isEmail && !isMobile) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Enter a valid email number",
                });
            }
        }),

    password: z
        .string()
        .trim()
        .nonempty("Password cannot be empty.")
});

export type LoginFormData = z.infer<typeof loginSchema>;