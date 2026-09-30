import { z } from 'zod'

export const summarySchema = z.object({
  subject_id: z.string().uuid().nullable().optional(),
  title: z
    .string()
    .min(1, 'กรุณากรอกหัวข้อสรุป')
    .max(200, 'หัวข้อยาวเกินไป (สูงสุด 200 ตัวอักษร)'),
  body: z
    .string()
    .min(1, 'กรุณากรอกเนื้อหา')
    .max(10000, 'เนื้อหายาวเกินไป (สูงสุด 10,000 ตัวอักษร)'),
  summary_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'รูปแบบวันที่ไม่ถูกต้อง'),
  tags: z.array(z.string().max(30)).max(10).optional().default([]),
})

export type SummaryInput = z.infer<typeof summarySchema>
