import { z } from "zod";

export const login = z.object({
  email: z.string().email({
    message: "Please provide a valid email address."
  }),
  password: z.string().min(4, "Password field must have a minimum of 4 characters.")
});

export const createList = z.object({
  title: z.string().min(3, "Name must be greater than 3 characters.").max(20),
  visibility: z.enum(["public", "private", "restricted"], {
    invalid_type_error: "Does not seem to be a valid value for visibility.",
  }),
  description: z.string().max(300).nullish(),
});