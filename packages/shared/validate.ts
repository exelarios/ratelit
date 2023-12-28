import { z } from "zod";

export const login = z.object({
  email: z.string().email({
    message: "Please provide a valid email address."
  }),
  password: z.string().min(4, "Password field must have a minimum of 4 characters.")
});

export const createList = z.object({
  title: z.string().min(3, "Name must be greater than 3 characters.").max(40),
  visibility: z.enum(["PUBLIC", "PRIVATE", "RESTRICTED"], {
    errorMap: () => {
      return {
        message: "Doesn't seem to a valid value for visibility."
      }
    }
  }),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().max(300).optional(),
});

export const register = z.object({
  firstName: z.string().min(1, "First name must not be empty.").max(20, "First name should not exceed 20 characters."),
  lastName: z.string().min(1, "Last name must not be empty.").max(20, "Last name should not exceed 20 characters."),
  email: z.string().email({
    message: "Please provide a valid email address."
  }),
  password: z.string().min(4, "Password field must have a minimum of 4 characters.")
});