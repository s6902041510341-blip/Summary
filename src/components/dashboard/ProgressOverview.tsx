import { useTranslations } from 'next-intl'
import { BookOpen, ClipboardList, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import type { DashboardStats } from '@/types'

interface ProgressOverviewProps {
  stats: DashboardStats
  locale: string
}

// Note: This is a Server Component — no 'use client' needed
export function ProgressOverview({ stats }: ProgressOverviewProps) {
  const cards = [
    {
      label: 'สรุปบทเรียน',
      labelEn: 'Summaries',
      value: stats.totalSummaries,
      icon: BookOpen,
      color: 'text-subject-math',
      bg: 'bg-subject-math/10',
    },
    {
      label: 'งานทั้งหมด',
      labelEn: 'Assignments',
      value: stats.totalAssignments,
      icon: ClipboardList,
      color: 'text-foreground-muted',
      bg: 'bg-background-tertiary',
    },
    {
      label: 'เสร็จแล้ว',
      labelEn: 'Completed',
      value: stats.completedAssignments,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'เกินกำหนด',
      labelEn: 'Overdue',
      value: stats.overdueAssignments,
      icon: AlertTriangle,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
  ]

  return (
    // Grid System: 2-col mobile → 4-col desktop
    // Repetition: identical card structure for all stats
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="card-base p-5 flex flex-col gap-3">
          {/* Proximity: icon + label grouped at top */}
          <div className="flex items-center justify-between">
            <span className="font-body text-caption text-foreground-muted">
              {card.label}
            </span>
            <div className={`p-1.5 rounded-badge ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} aria-hidden="true" />
            </div>
          </div>
          {/* Visual Hierarchy: large number dominates card */}
          <p className={`font-heading text-display-lg font-bold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}
