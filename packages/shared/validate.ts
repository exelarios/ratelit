import { z } from "zod";

export const login = z.object({
  email: z.string().email({
    message: "Please provide a valid email address."
  }),
  password: z.string().min(4, "Password field must have a minimum of 4 characters.")
});