'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Calendar, Tag, ArrowRight, Trash2 } from 'lucide-react'
import { formatDateShort, truncate } from '@/lib/utils'
import { deleteSummary } from '@/lib/actions/summaries'
import type { Summary, Locale } from '@/types'

interface SummaryCardProps {
  summary: Summary
  locale: string
}

export function SummaryCard({ summary, locale }: SummaryCardProps) {
  const t = useTranslations('summary')

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(t('deleteConfirm'))) {
      await deleteSummary(summary.id)
    }
  }

  const subjectName = summary.subject
    ? locale === 'th'
      ? summary.subject.name_th
      : summary.subject.name_en
    : null

  return (
    <div className="card-base p-6 flex flex-col justify-between hover:border-border-strong hover:shadow-card-hover transition-all duration-200 group">
      <div>
        {/* Header: Subject & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {subjectName ? (
            <span
              className="text-overline font-body px-2.5 py-1 rounded-badge border font-medium"
              style={{
                color: summary.subject?.color,
                borderColor: `${summary.subject?.color}40`,
                backgroundColor: `${summary.subject?.color}15`,
              }}
            >
              {subjectName}
            </span>
          ) : (
            <span className="text-overline font-body px-2.5 py-1 rounded-badge bg-background-tertiary text-foreground-subtle">
              ทั่วไป
            </span>
          )}

          <div className="flex items-center gap-1 text-caption text-foreground-subtle font-body">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDateShort(summary.summary_date, locale as Locale)}</span>
          </div>
        </div>

        {/* Title & Body */}
        <Link href={`/${locale}/summaries/${summary.id}`}>
          <h3 className="font-heading text-heading-lg text-foreground font-semibold mb-2 group-hover:text-primary-hover transition-colors">
            {summary.title}
          </h3>
        </Link>
        <p className="font-body text-body-sm text-foreground-muted line-clamp-3 mb-4 leading-relaxed">
          {truncate(summary.body, 160)}
        </p>
      </div>

      {/* Footer: Tags & Actions */}
      <div>
        {summary.tags && summary.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {summary.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-overline bg-background-tertiary text-foreground-muted px-2 py-0.5 rounded-badge border border-border"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Link
            href={`/${locale}/summaries/${summary.id}`}
            className="inline-flex items-center gap-1.5 text-body-sm font-body text-foreground-muted group-hover:text-foreground transition-colors"
          >
            <span>อ่านต่อ</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={handleDelete}
            className="text-foreground-subtle hover:text-danger p-1.5 rounded-badge hover:bg-danger/10 transition-colors"
            title={t('delete')}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
