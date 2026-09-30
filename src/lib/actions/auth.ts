'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { DEFAULT_SUBJECTS, SESSION_COOKIE, type SessionUser } from '@/lib/mockStore'
import type { ActionResult } from '@/types'

const loginSchema = z.object({
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
})

const registerSchema = z.object({
  full_name: z.string().min(1, 'กรุณากรอกชื่อ').max(100),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
})

export async function loginAction(
  locale: string,
  raw: unknown
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const user: SessionUser = {
    id: 'local-user-1',
    email: parsed.data.email,
    full_name: parsed.data.email.split('@')[0],
    locale,
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  redirect(`/${locale}/dashboard`)
}

export async function registerAction(
  locale: string,
  raw: unknown
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const user: SessionUser = {
    id: 'local-user-' + Date.now(),
    email: parsed.data.email,
    full_name: parsed.data.full_name,
    locale,
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true }
}

export async function logoutAction(locale: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect(`/${locale}/login`)
}

export async function getSubjects() {
  return DEFAULT_SUBJECTS
}
