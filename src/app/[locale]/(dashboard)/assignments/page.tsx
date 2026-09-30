import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getAssignments } from '@/lib/actions/assignments'
import { AssignmentList } from '@/components/assignments/AssignmentList'
import { Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'งานที่มอบหมาย' }

interface AssignmentsPageProps {
  params: Promise<{ locale: string }>
}

export default async function AssignmentsPage({ params }: AssignmentsPageProps) {
  const { locale } = await params
  const t = await getTranslations('assignment')
  const assignments = await getAssignments()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-display text-foreground">{t('title')}</h1>
          <p className="font-body text-body-sm text-foreground-muted mt-1">
            ติดตามการบ้าน โปรเจกต์ และกำหนดส่งต่างๆ
          </p>
        </div>
        <Link href={`/${locale}/assignments/new`} className="btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          {t('create')}
        </Link>
      </div>

      <AssignmentList assignments={assignments} locale={locale} />
    </div>
  )
}
