import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'
import type { Summary, Locale } from '@/types'

interface RecentSummariesProps {
  summaries: Summary[]
  locale: string
}

export function RecentSummaries({ summaries, locale }: RecentSummariesProps) {
  return (
    <div className="card-base p-6 flex flex-col gap-4">
      {/* Visual Hierarchy: section header with action link */}
      {/* Alignment: title left, view-all link right */}
      <div className="flex items-center justify-between">
        <h2 className="section-title">สรุปบทเรียนล่าสุด</h2>
        <Link
          href={`/${locale}/summaries`}
          className="flex items-center gap-1 text-caption font-body text-foreground-muted hover:text-foreground transition-colors"
        >
          ดูทั้งหมด
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {summaries.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="p-3 rounded-full bg-background-tertiary">
            <BookOpen className="h-6 w-6 text-foreground-subtle" />
          </div>
          <p className="font-body text-body-sm text-foreground-muted text-center">
            ยังไม่มีสรุปบทเรียน
          </p>
          <Link
            href={`/${locale}/summaries/new`}
            className="btn-primary text-body-sm px-4 py-2"
          >
            เพิ่มสรุปแรก
          </Link>
        </div>
      ) : (
        // Repetition: each summary row has same structure
        <ul className="space-y-2" role="list">
          {summaries.map((s) => (
            <li key={s.id}>
              <Link
                href={`/${locale}/summaries/${s.id}`}
                className="flex items-start gap-3 p-3 rounded-input hover:bg-background-tertiary transition-colors group"
              >
                {/* Subject color indicator — Contrast */}
                <div
                  className="w-1 self-stretch rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: s.subject?.color ?? '#525252' }}
                  aria-hidden="true"
                />
                {/* Proximity: title + meta grouped */}
                <div className="min-w-0 flex-1">
                  <p className="font-body text-body-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {s.title}
                  </p>
                  <p className="font-body text-caption text-foreground-subtle mt-0.5">
                    {s.subject
                      ? locale === 'th'
                        ? s.subject.name_th
                        : s.subject.name_en
                      : 'ไม่ระบุวิชา'}{' '}
                    · {formatDateShort(s.summary_date, locale as Locale)}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-foreground-subtle flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
