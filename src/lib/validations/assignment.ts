import { z } from 'zod'

export const assignmentSchema = z.object({
  subject_id: z.string().uuid().nullable().optional(),
  title: z
    .string()
    .min(1, 'กรุณากรอกชื่องาน')
    .max(200, 'ชื่องานยาวเกินไป (สูงสุด 200 ตัวอักษร)'),
  description: z
    .string()
    .max(2000, 'คำอธิบายยาวเกินไป')
    .optional()
    .or(z.literal('')),
  due_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'รูปแบบวันที่ไม่ถูกต้อง')
    .nullable()
    .optional(),
  type: z.enum(['homework', 'project', 'exam']).default('homework'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

export type AssignmentInput = z.infer<typeof assignmentSchema>
