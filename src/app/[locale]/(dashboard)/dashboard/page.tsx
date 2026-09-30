import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getCurrentUser } from '@/lib/mockStore'
import { getSummaries } from '@/lib/actions/summaries'
import { getAssignments } from '@/lib/actions/assignments'
import { ProgressOverview } from '@/components/dashboard/ProgressOverview'
import { RecentSummaries } from '@/components/dashboard/RecentSummaries'
import { UpcomingAssignments } from '@/components/dashboard/UpcomingAssignments'

export const metadata: Metadata = { title: 'Dashboard' }

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params
  const t = await getTranslations('dashboard')
  const user = await getCurrentUser()

  const [summaries, assignments] = await Promise.all([
    getSummaries(),
    getAssignments(),
  ])

  const displayName = user?.full_name || t('welcomeDefault')

  // Stats calculation
  const completed = assignments.filter((a) => a.completed).length
  const pending = assignments.filter((a) => !a.completed).length
  const now = new Date().toISOString().split('T')[0]
  const overdue = assignments.filter(
    (a) => !a.completed && a.due_date && a.due_date < now
  ).length

  const stats = {
    totalSummaries: summaries.length,
    totalAssignments: assignments.length,
    completedAssignments: completed,
    pendingAssignments: pending,
    overdueAssignments: overdue,
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-display text-foreground mb-1">
          {t('welcome', { name: displayName })}
        </h1>
        <p className="font-body text-body-sm text-foreground-muted">
          {new Date().toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <ProgressOverview stats={stats} locale={locale} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSummaries summaries={summaries.slice(0, 4)} locale={locale} />
        <UpcomingAssignments
          assignments={assignments.filter((a) => !a.completed).slice(0, 5)}
          locale={locale}
        />
      </div>
    </div>
  )
}
