import z from "zod";


//zod validation schema
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters")
    .max(20, "username must be at most 20 characters"),
  email: z.email("Invalid Email adress"),
  password: z
    .string()
    .min(8, "the password must contain minimum of 8 characters"),
});

export const signinSchema = z.object({
  email: z.email("Invalid Email adress"),
  password: z
    .string()
    .min(8, "the password must contain minimum of 8 characters"),
});
