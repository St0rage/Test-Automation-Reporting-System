import { platform } from "os";
import { z, ZodType } from "zod";

export class ReportValidation {
  // static readonly reportSchema: ZodType = z.object({
  //   project: z.string().min(3).max(50),
  //   scenario: z.string().min(2).max(100),
  //   test_case: z.string().min(3).max(100),
  //   tool: z.string().min(3).max(50),
  //   activity: z.string().min(3).max(50),
  //   author: z.string().min(3).max(50),
  // });

  static readonly reportSchema: ZodType = z.object({
    project: z.object({
      name: z
        .string({
          required_error: "'name': Required",
          invalid_type_error: "name': Expected string, received number",
        })
        .min(3, { message: "'name': String must contain at least 3 character(s)" })
        .max(50, { message: "'name': String must contain at most 50 character(s)" }),
      platform: z
        .string({
          required_error: "'platform': Required",
          invalid_type_error: "platform': Expected string, received number",
        })
        .min(3, { message: "'platform': String must contain at least 3 character(s)" })
        .max(20, { message: "'platform': String must contain at most 20 character(s)" }),
      tool: z
        .string({
          required_error: "'tool': Required",
          invalid_type_error: "tool': Expected string, received number",
        })
        .min(3, { message: "'tool': String must contain at least 3 character(s)" })
        .max(50, { message: "'tool': String must contain at most 50 character(s)" }),
    }),
    scenario: z.string().min(2).max(100),
    test_case: z.object({
      name: z
        .string({
          required_error: "'name': Required",
          invalid_type_error: "name': Expected string, received number",
        })
        .min(3, { message: "'name': String must contain at least 3 character(s)" })
        .max(100, { message: "'name': String must contain at most 100 character(s)" }),
      unique_id: z
        .string({
          required_error: "'unique_id': Required",
          invalid_type_error: "unique_id': Expected string, received number",
        })
        .min(3, { message: "'unique_id': String must contain at least 3 character(s)" })
        .max(50, { message: "'unique_id': String must contain at most 50 character(s)" }),
      expected_result: z
        .string({
          required_error: "'expected_result': Required",
          invalid_type_error: "expected_result': Expected string, received number",
        })
        .min(3, { message: "'expected_result': String must contain at least 3 character(s)" })
        .max(100, { message: "'expected_result': String must contain at most 100 character(s)" }),
      criteria: z
        .string({
          required_error: "'criteria': Required",
          invalid_type_error: "criteria': Expected string, received number",
        })
        .min(3, { message: "'criteria': String must contain at least 3 character(s)" })
        .max(20, { message: "'criteria': String must contain at most 20 character(s)" }),
      description: z
        .string({
          required_error: "'description': Required",
          invalid_type_error: "description': Expected string, received number",
        })
        .min(3, { message: "'description': String must contain at least 3 character(s)" })
        .max(380, { message: "'description': String must contain at most 380 character(s)" }),
    }),
    report: z.object({
      activity: z
        .string({
          required_error: "'activity': Required",
          invalid_type_error: "activity': Expected string, received number",
        })
        .min(3, { message: "'activity': String must contain at least 3 character(s)" })
        .max(50, { message: "'activity': String must contain at most 50 character(s)" }),
      author: z
        .string({
          required_error: "'author': Required",
          invalid_type_error: "author': Expected string, received number",
        })
        .min(3, { message: "'author': String must contain at least 3 character(s)" })
        .max(50, { message: "'author': String must contain at most 50 character(s)" }),
    }),
  });

  static readonly sectionSchema: ZodType = z.object({
    name: z
      .string({ required_error: "Section required", invalid_type_error: "Section expected string, received number" })
      .min(3, { message: "Section must contain at least 3 character(s)" })
      .max(80, { message: "Section String must contain at most 80 character(s)" }),
  });

  static readonly testStepSchema: ZodType = z.object({
    test_step_id: z.number().positive(),
    title: z.string().min(3).max(80),
    description: z.string().min(3).max(400),
    status: z.number().refine((val) => val >= 1 && val <= 3, {
      message: "Status Must be Between 1 = 'DONE', 2 = 'PASSED', 3 = 'FAILED'",
    }),
  });
}
