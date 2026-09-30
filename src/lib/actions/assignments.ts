'use server'

import {
  getLocalAssignments,
  addLocalAssignment,
  toggleLocalAssignment,
  deleteLocalAssignment,
  getCurrentUser,
} from '@/lib/mockStore'
import { assignmentSchema } from '@/lib/validations/assignment'
import { revalidatePath } from 'next/cache'
import type { ActionResult, Assignment } from '@/types'

export async function getAssignments(): Promise<Assignment[]> {
  const user = await getCurrentUser()
  const userId = user?.id || 'local-user-1'
  return getLocalAssignments(userId)
}

export async function createAssignment(
  raw: unknown
): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  const userId = user?.id || 'local-user-1'

  const parsed = assignmentSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  const created = await addLocalAssignment({
    user_id: userId,
    subject_id: parsed.data.subject_id || null,
    title: parsed.data.title,
    description: parsed.data.description || null,
    due_date: parsed.data.due_date || null,
    type: parsed.data.type,
    priority: parsed.data.priority,
    completed: false,
    completed_at: null,
  })

  revalidatePath('/[locale]/(dashboard)/assignments', 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true, data: { id: created.id } }
}

export async function toggleAssignment(
  id: string,
  completed: boolean
): Promise<ActionResult> {
  await toggleLocalAssignment(id, completed)
  revalidatePath('/[locale]/(dashboard)/assignments', 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true }
}

export async function deleteAssignment(id: string): Promise<ActionResult> {
  await deleteLocalAssignment(id)
  revalidatePath('/[locale]/(dashboard)/assignments', 'page')
  revalidatePath('/[locale]/(dashboard)/dashboard', 'page')
  return { success: true }
}
