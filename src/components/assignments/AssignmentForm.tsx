'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createAssignment } from '@/lib/actions/assignments'
import { todayISO } from '@/lib/utils'
import { Save, AlertCircle } from 'lucide-react'
import type { Subject, AssignmentType, Priority } from '@/types'

interface AssignmentFormProps {
  locale: string
  subjects: Subject[]
}

export function AssignmentForm({ locale, subjects }: AssignmentFormProps) {
  const t = useTranslations('assignment')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const raw = {
      title: formData.get('title') as string,
      subject_id: (formData.get('subject_id') as string) || null,
      description: (formData.get('description') as string) || undefined,
      due_date: (formData.get('due_date') as string) || null,
      type: formData.get('type') as AssignmentType,
      priority: formData.get('priority') as Priority,
    }

    try {
      const res = await createAssignment(raw)
      if (!res.success) {
        setError(typeof res.error === 'string' ? res.error : Object.values(res.error).flat().join(', '))
        setLoading(false)
        return
      }
      router.push(`/${locale}/assignments`)
      router.refresh()
    } catch {
      setError('เกิดข้อผิดพลาดในการบันทึก')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-6 max-w-2xl mx-auto font-body">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-danger/10 border border-danger/30 rounded-input text-danger text-body-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fields.title')}
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder={t('fields.titlePlaceholder')}
          className="input-base"
        />
      </div>

      {/* Grid: Subject & Due Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm font-medium text-foreground mb-1.5">
            {t('fields.subject')}
          </label>
          <select name="subject_id" className="input-base">
            <option value="">-- {t('fields.subjectPlaceholder')} --</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {locale === 'th' ? sub.name_th : sub.name_en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body-sm font-medium text-foreground mb-1.5">
            {t('fields.dueDate')}
          </label>
          <input
            name="due_date"
            type="date"
            defaultValue={todayISO()}
            className="input-base"
          />
        </div>
      </div>

      {/* Grid: Type & Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm font-medium text-foreground mb-1.5">
            {t('fields.type')}
          </label>
          <select name="type" defaultValue="homework" className="input-base">
            <option value="homework">{t('types.homework')}</option>
            <option value="project">{t('types.project')}</option>
            <option value="exam">{t('types.exam')}</option>
          </select>
        </div>

        <div>
          <label className="block text-body-sm font-medium text-foreground mb-1.5">
            {t('fields.priority')}
          </label>
          <select name="priority" defaultValue="medium" className="input-base">
            <option value="low">{t('priorities.low')}</option>
            <option value="medium">{t('priorities.medium')}</option>
            <option value="high">{t('priorities.high')}</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fields.description')}
        </label>
        <textarea
          name="description"
          rows={4}
          placeholder={t('fields.descriptionPlaceholder')}
          className="input-base resize-y"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          {t('actions.cancel')}
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          <Save className="h-4 w-4" />
          {loading ? t('actions.saving') : t('actions.save')}
        </button>
      </div>
    </form>
  )
}
