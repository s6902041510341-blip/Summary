import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSummary } from '@/lib/actions/summaries'
import { formatDate } from '@/lib/utils'
import { Calendar, Tag, ArrowLeft, Edit3 } from 'lucide-react'
import type { Locale } from '@/types'

interface SummaryDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: SummaryDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const summary = await getSummary(id)
  return { title: summary ? summary.title : 'สรุปบทเรียน' }
}

export default async function SummaryDetailPage({ params }: SummaryDetailPageProps) {
  const { locale, id } = await params
  const summary = await getSummary(id)

  if (!summary) {
    notFound()
  }

  const subjectName = summary.subject
    ? locale === 'th'
      ? summary.subject.name_th
      : summary.subject.name_en
    : 'ทั่วไป'

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in font-body">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href={`/${locale}/summaries`}
          className="inline-flex items-center gap-1.5 text-body-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับไปหน้ารายการ
        </Link>
      </div>

      {/* Article card */}
      <article className="card-base p-6 sm:p-10 space-y-6">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-border">
          {summary.subject && (
            <span
              className="text-body-sm font-medium px-3 py-1 rounded-badge border"
              style={{
                color: summary.subject.color,
                borderColor: `${summary.subject.color}40`,
                backgroundColor: `${summary.subject.color}15`,
              }}
            >
              {subjectName}
            </span>
          )}

          <div className="flex items-center gap-1.5 text-body-sm text-foreground-muted">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(summary.summary_date, locale as Locale)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading text-display-lg text-foreground font-bold leading-tight">
          {summary.title}
        </h1>

        {/* Content Body */}
        <div className="text-body text-foreground-muted leading-relaxed whitespace-pre-wrap pt-2">
          {summary.body}
        </div>

        {/* Tags */}
        {summary.tags && summary.tags.length > 0 && (
          <div className="pt-6 border-t border-border flex flex-wrap gap-2">
            {summary.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-background-tertiary text-foreground-muted px-3 py-1 rounded-badge text-body-sm border border-border"
              >
                <Tag className="h-3.5 w-3.5" />
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}
