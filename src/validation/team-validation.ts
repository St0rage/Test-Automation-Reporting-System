import { z, ZodType } from "zod";

export class TeamValidation {
  static readonly createTeamSchema: ZodType = z
    .string()
    .min(3, { message: "Nama Team Minimal 3 Karatker dan Maksimal 30 Karakter" })
    .max(30, { message: "Nama Team Minimal 3 Karatker dan Maksimal 30 Karakter" });
}
