import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getSummaries } from '@/lib/actions/summaries'
import { SummaryList } from '@/components/summaries/SummaryList'
import { Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'สรุปบทเรียน' }

interface SummariesPageProps {
  params: Promise<{ locale: string }>
}

export default async function SummariesPage({ params }: SummariesPageProps) {
  const { locale } = await params
  const t = await getTranslations('summary')
  const summaries = await getSummaries()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-display text-foreground">{t('title')}</h1>
          <p className="font-body text-body-sm text-foreground-muted mt-1">
            บันทึกและทบทวนความเข้าใจในแต่ละบทเรียน
          </p>
        </div>
        <Link href={`/${locale}/summaries/new`} className="btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          {t('create')}
        </Link>
      </div>

      <SummaryList summaries={summaries} locale={locale} />
    </div>
  )
}
