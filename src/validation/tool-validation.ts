import { z, ZodType } from "zod";

export class ToolValidation {
  static readonly createToolSchema: ZodType = z
    .string()
    .min(3, { message: "Nama Tool Minimal 3 Karatker dan Maksimal 50 Karakter" })
    .max(50, { message: "Nama Tool Minimal 3 Karatker dan Maksimal 50 Karakter" });
}
