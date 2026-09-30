import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSubjects } from '@/lib/actions/auth'
import { SummaryForm } from '@/components/summaries/SummaryForm'

export const metadata: Metadata = { title: 'สร้างสรุปบทเรียน' }

interface NewSummaryPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewSummaryPage({ params }: NewSummaryPageProps) {
  const { locale } = await params
  const t = await getTranslations('summary')
  const subjects = await getSubjects()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-display text-foreground">{t('create')}</h1>
        <p className="font-body text-body-sm text-foreground-muted mt-1">
          บันทึกหัวข้อสำคัญและสิ่งที่คุณได้เรียนรู้วันนี้
        </p>
      </div>

      <SummaryForm locale={locale} subjects={subjects || []} />
    </div>
  )
}
