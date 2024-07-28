import { z, ZodType } from "zod";

export class ReportValidation {
  static readonly reportSchema: ZodType = z.object({
    project: z.string().min(3).max(50),
    scenario: z.string().min(2).max(100),
    test_case: z.string().min(3).max(100),
    tool: z.string().min(3).max(50),
    author: z.string().min(3).max(50),
  });

  static readonly reportDetailSchema: ZodType = z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(3),
    result: z
      .string()
      .transform((value) => value.toUpperCase())
      .refine((value) => ["PASSED", "FAILED"].includes(value), {
        message: "result must be either 'PASSED' or 'FAILED'",
      }),
  });
}
