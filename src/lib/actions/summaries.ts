'use server'

import {
  getLocalSummaries,
  getLocalSummaryById,
  addLocalSummary,
  updateLocalSummary,
  deleteLocalSummary,
  getCurrentUser,
} from '@/lib/mockStore'
import { summarySchema } from '@/lib/validations/summary'
import { revalidatePath } from 'next/cache'
import type { ActionResult, Summary } from '@/types'

export async function getSummaries(): Promise<Summary[]> {
  const user = await getCurrentUser()
  const userId = user?.id || 'local-user-1'
  return getLocalSummaries(userId)
}

export async function getSummary(id: string): Promise<Summary | null> {
  return getLocalSummaryById(id)
}

export async function createSummary(
  raw: unknown
): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  const userId = user?.id || 'local-user-1'

  const parsed = summarySchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const created = await addLocalSummary({
    user_id: userId,
    subject_id: parsed.data.subject_id || null,
    title: parsed.data.title,
    body: parsed.data.body,
    summary_date: parsed.data.summary_date,
    tags: parsed.data.tags || [],
    attachment_url: null,
  })

  revalidatePath('/[locale]/(dashboard)/summaries', 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true, data: { id: created.id } }
}

export async function updateSummary(
  id: string,
  raw: unknown
): Promise<ActionResult> {
  const parsed = summarySchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const ok = await updateLocalSummary(id, {
    title: parsed.data.title,
    subject_id: parsed.data.subject_id || null,
    body: parsed.data.body,
    summary_date: parsed.data.summary_date,
    tags: parsed.data.tags || [],
  })

  if (!ok) return { success: false, error: 'Summary not found' }

  revalidatePath('/[locale]/(dashboard)/summaries', 'page')
  revalidatePath(`/[locale]/(dashboard)/summaries/${id}`, 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true }
}

export async function deleteSummary(id: string): Promise<ActionResult> {
  await deleteLocalSummary(id)
  revalidatePath('/[locale]/(dashboard)/summaries', 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true }
}
