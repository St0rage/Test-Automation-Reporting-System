import { z, ZodType } from "zod";

export class ProjectValidation {
  static readonly createProjectSchema: ZodType = z.object({
    name: z
      .string()
      .min(3, { message: "Nama Minimal 3 Karatker dan Maksimal 50 Karakter" })
      .max(50, { message: "Nama Minimal 3 Karatker dan Maksimal 50 Karakter" }),
    toolId: z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Tool Tidak Boleh Kosong" }
    ),
    teamId: z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Team Tidak Boleh Kosong" }
    ),
  });

  static readonly editProjectDashboardSchema: ZodType = z.object({
    manualModule: z
      .string()
      .min(1, { message: "Required" })
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num);
        },
        { message: "Hanya dapat input angka" }
      ),
    manualScenario: z
      .string()
      .min(1, { message: "Required" })
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num);
        },
        { message: "Hanya dapat input angka" }
      ),
    manualTestcase: z
      .string()
      .min(1, { message: "Required" })
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num);
        },
        { message: "Hanya dapat input angka" }
      ),
    possibleTestcase: z
      .string()
      .min(1, { message: "Required" })
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num);
        },
        { message: "Hanya dapat input angka" }
      ),
  });

  static readonly editProjectAdditionalSchema: ZodType = z.object({
    repository: z.string().min(1, { message: "Required" }),
    jira: z.string().min(1, { message: "Required" }),
    externalRsc: z.string().min(1, { message: "Required" }),
    testScript: z.string().min(1, { message: "Required" }),
  });

  static readonly createProjectModuleSchema: ZodType = z
    .string()
    .min(3, { message: "Nama Module Minimal 3 Karakter dan Maksimal 50 Karakter" })
    .max(50, { message: "Nama Module Minimal 3 Karakter dan Maksimal 50 Karakter" });
}
