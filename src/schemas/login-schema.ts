import z from "zod";
import { emailRegex } from "../utils/utils";

export const loginSchema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Email inválido",
  }),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;