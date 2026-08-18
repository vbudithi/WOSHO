import { z } from "zod";

const mobileRegex = /^[0-9]{10}$/;

export const otpLoginSchema = z.object({
    mobileNumber: z
        .string()
        .trim()
        .nonempty("Mobile Number is required")
        .regex(mobileRegex, "Enter a valid mobile number"),

});

export type OTPLoginFormData = z.infer<typeof otpLoginSchema>;