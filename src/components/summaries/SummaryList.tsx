import { SummaryCard } from './SummaryCard'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Summary } from '@/types'

interface SummaryListProps {
  summaries: Summary[]
  locale: string
}

export function SummaryList({ summaries, locale }: SummaryListProps) {
  if (summaries.length === 0) {
    return (
      <div className="card-base p-12 text-center flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-full bg-background-tertiary">
          <BookOpen className="h-8 w-8 text-foreground-subtle" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-heading-lg text-foreground">ยังไม่มีสรุปบทเรียน</h3>
          <p className="font-body text-body-sm text-foreground-muted max-w-sm">
            เริ่มต้นจดบันทึกเนื้อหาการเรียนประจำวันเพื่อติดตามความเข้าใจของคุณ
          </p>
        </div>
        <Link href={`/${locale}/summaries/new`} className="btn-primary mt-2">
          สร้างสรุปแรกของคุณ
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaries.map((summary) => (
        <SummaryCard key={summary.id} summary={summary} locale={locale} />
      ))}
    </div>
  )
}
