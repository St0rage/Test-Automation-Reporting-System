import { z, ZodType } from "zod";

export class UserValidation {
  static readonly createUserSchema: ZodType = z.object({
    name: z
      .string()
      .min(3, { message: "Nama Minimal 3 Karatker dan Maksimal 50 Karakter" })
      .max(50, { message: "Nama Minimal 3 Karatker dan Maksimal 50 Karakter" }),
    username: z
      .string()
      .min(3, { message: "Username Minimal 3 Karatker dan Maksimal 30 Karakter" })
      .max(30, { message: "Username Minimal 3 Karatker dan Maksimal 30 Karakter" }),
  });
}
