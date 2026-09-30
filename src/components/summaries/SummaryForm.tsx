'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createSummary, updateSummary } from '@/lib/actions/summaries'
import { todayISO } from '@/lib/utils'
import { Save, X, AlertCircle } from 'lucide-react'
import type { Subject, Summary } from '@/types'

interface SummaryFormProps {
  locale: string
  subjects: Subject[]
  initialData?: Summary
}

export function SummaryForm({ locale, subjects, initialData }: SummaryFormProps) {
  const t = useTranslations('summary')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = tagInput.trim().replace(/^#/, '')
      if (val && !tags.includes(val) && tags.length < 10) {
        setTags([...tags, val])
        setTagInput('')
      }
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const raw = {
      title: formData.get('title') as string,
      subject_id: (formData.get('subject_id') as string) || null,
      summary_date: formData.get('summary_date') as string,
      body: formData.get('body') as string,
      tags: tags,
    }

    try {
      if (initialData) {
        const res = await updateSummary(initialData.id, raw)
        if (!res.success) {
          setError(typeof res.error === 'string' ? res.error : Object.values(res.error).flat().join(', '))
          setLoading(false)
          return
        }
        router.push(`/${locale}/summaries/${initialData.id}`)
      } else {
        const res = await createSummary(raw)
        if (!res.success) {
          setError(typeof res.error === 'string' ? res.error : Object.values(res.error).flat().join(', '))
          setLoading(false)
          return
        }
        router.push(`/${locale}/summaries`)
      }
      router.refresh()
    } catch {
      setError('เกิดข้อผิดพลาดในการบันทึก')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-6 max-w-3xl mx-auto font-body">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-danger/10 border border-danger/30 rounded-input text-danger text-body-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Subject & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm font-medium text-foreground mb-1.5">
            {t('fields.subject')}
          </label>
          <select
            name="subject_id"
            defaultValue={initialData?.subject_id || ''}
            className="input-base"
          >
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
            {t('fields.date')}
          </label>
          <input
            name="summary_date"
            type="date"
            required
            defaultValue={initialData?.summary_date || todayISO()}
            className="input-base"
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fields.title')}
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initialData?.title || ''}
          placeholder={t('fields.titlePlaceholder')}
          className="input-base"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fields.body')}
        </label>
        <textarea
          name="body"
          rows={10}
          required
          defaultValue={initialData?.body || ''}
          placeholder={t('fields.bodyPlaceholder')}
          className="input-base resize-y"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fields.tags')}
        </label>
        <div className="space-y-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder={t('fields.tagsPlaceholder')}
            className="input-base"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-background-tertiary text-foreground px-3 py-1 rounded-badge text-body-sm border border-border"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-foreground-subtle hover:text-danger"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
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
