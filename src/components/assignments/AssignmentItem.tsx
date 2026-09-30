'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toggleAssignment, deleteAssignment } from '@/lib/actions/assignments'
import { formatDateShort, getDueDateStatus } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Check, Trash2, Clock, AlertTriangle } from 'lucide-react'
import type { Assignment, Locale } from '@/types'

interface AssignmentItemProps {
  assignment: Assignment
  locale: string
}

export function AssignmentItem({ assignment, locale }: AssignmentItemProps) {
  const t = useTranslations('assignment')
  const [completed, setCompleted] = useState(assignment.completed)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    const next = !completed
    setCompleted(next)
    setLoading(true)
    await toggleAssignment(assignment.id, next)
    setLoading(false)
  }

  async function handleDelete() {
    if (confirm(t('deleteConfirm'))) {
      await deleteAssignment(assignment.id)
    }
  }

  const dueStatus = getDueDateStatus(assignment.due_date)
  const isOverdue = dueStatus === 'overdue' && !completed

  const typeLabels: Record<string, string> = {
    homework: 'การบ้าน',
    project: 'โปรเจกต์',
    exam: 'สอบ',
  }

  const priorityLabels: Record<string, string> = {
    high: 'สูง',
    medium: 'กลาง',
    low: 'ต่ำ',
  }

  return (
    <div
      className={cn(
        'card-base p-4 sm:p-5 flex items-start gap-3.5 transition-all duration-200 group',
        completed ? 'opacity-60 bg-background/50' : 'hover:border-border-strong'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          'mt-0.5 w-5 h-5 rounded-badge border flex items-center justify-center transition-all duration-200 flex-shrink-0',
          completed
            ? 'bg-success border-success text-background'
            : 'border-border-strong hover:border-foreground bg-background-tertiary'
        )}
        aria-label={completed ? t('actions.markIncomplete') : t('actions.markComplete')}
      >
        {completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </button>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4
            className={cn(
              'font-heading text-heading font-semibold transition-colors',
              completed ? 'line-through text-foreground-muted' : 'text-foreground'
            )}
          >
            {assignment.title}
          </h4>

          {/* Type badge */}
          <span className="text-overline font-body bg-background-tertiary text-foreground-muted px-2 py-0.5 rounded-badge border border-border">
            {typeLabels[assignment.type] || assignment.type}
          </span>

          {/* Priority indicator */}
          <span
            className={cn(
              'text-overline font-body px-2 py-0.5 rounded-badge font-medium border',
              assignment.priority === 'high'
                ? 'bg-priority-high/10 text-priority-high border-priority-high/30'
                : assignment.priority === 'medium'
                ? 'bg-priority-medium/10 text-priority-medium border-priority-medium/30'
                : 'bg-background-tertiary text-foreground-subtle border-border'
            )}
          >
            ความสำคัญ: {priorityLabels[assignment.priority]}
          </span>
        </div>

        {assignment.description && (
          <p className="font-body text-body-sm text-foreground-muted mt-1 leading-relaxed">
            {assignment.description}
          </p>
        )}

        {/* Due date & subject */}
        <div className="flex items-center gap-3 mt-3 text-caption font-body flex-wrap">
          {assignment.subject && (
            <span
              className="text-overline font-body px-2 py-0.5 rounded-badge border"
              style={{
                color: assignment.subject.color,
                borderColor: `${assignment.subject.color}40`,
                backgroundColor: `${assignment.subject.color}15`,
              }}
            >
              {locale === 'th' ? assignment.subject.name_th : assignment.subject.name_en}
            </span>
          )}

          {assignment.due_date && (
            <span
              className={cn(
                'inline-flex items-center gap-1',
                isOverdue ? 'text-danger font-medium' : 'text-foreground-subtle'
              )}
            >
              {isOverdue ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
              {isOverdue ? 'เกินกำหนด: ' : 'ครบกำหนด: '}
              {formatDateShort(assignment.due_date, locale as Locale)}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="text-foreground-subtle hover:text-danger p-1.5 rounded-badge hover:bg-danger/10 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
        title={t('delete')}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
