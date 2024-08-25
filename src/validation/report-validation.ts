import { z, ZodType } from "zod";

export class ReportValidation {
  static readonly reportSchema: ZodType = z.object({
    project: z.string().min(3).max(50),
    scenario: z.string().min(2).max(100),
    test_case: z.string().min(3).max(100),
    tool: z.string().min(3).max(50),
    activity: z.string().min(3).max(50),
    author: z.string().min(3).max(50),
  });

  static readonly reportDetailSchema: ZodType = z.object({
    title: z.string().min(3).max(80),
    description: z.string().min(3).max(400),
    result: z
      .string()
      .refine((val) => parseInt(val, 10) >= 1 && parseInt(val, 10) <= 3, {
        message:
          "String number must be between 1 = 'DONE', 2 = 'PASSED', 3 = 'FAILED'",
      }),
  });
}
