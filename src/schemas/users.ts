import * as z from "zod";

const userSchema = z.object({
    username: z.string().min(1).max(255),
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    first_name: z.string().min(1).max(255),
    second_names: z.string().min(1).max(255).optional(),
    surname: z.string().min(1).max(255),
    identity_document: z.string().min(1).max(255),
    verified: z.boolean().default(false),
    dob: z.date().min(new Date("1900-01-01")),
    verification_code: z.string().min(1).max(255).nullable(),
    password_reset_code: z.string().min(1).max(255).nullable(),
    disabled: z.boolean().default(false)
  });

  export default userSchema;