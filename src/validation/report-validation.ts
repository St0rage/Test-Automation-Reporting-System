import { z, ZodType } from "zod";

export class ReportValidation {
  static readonly reportSchema: ZodType = z.object({
    project: z.string().min(3).max(50),
    scenario: z.string().min(2).max(100),
    test_case: z.string().min(3).max(100),
    tool: z.string().min(3).max(50),
    author: z.string().min(3).max(50),
  });
}
