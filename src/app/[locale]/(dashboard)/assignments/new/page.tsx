import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSubjects } from '@/lib/actions/auth'
import { AssignmentForm } from '@/components/assignments/AssignmentForm'

export const metadata: Metadata = { title: 'เพิ่มงานใหม่' }

interface NewAssignmentPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewAssignmentPage({ params }: NewAssignmentPageProps) {
  const { locale } = await params
  const t = await getTranslations('assignment')
  const subjects = await getSubjects()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-display text-foreground">{t('create')}</h1>
        <p className="font-body text-body-sm text-foreground-muted mt-1">
          บันทึกรายละเอียดงาน วันครบกำหนด และระดับความสำคัญ
        </p>
      </div>

      <AssignmentForm locale={locale} subjects={subjects || []} />
    </div>
  )
}
