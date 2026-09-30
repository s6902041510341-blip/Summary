import Link from 'next/link'
import { ClipboardList, ArrowRight, AlertTriangle, Clock } from 'lucide-react'
import { getDueDateStatus, formatDateShort, getPriorityColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Assignment, Locale } from '@/types'

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
  locale: string
}

export function UpcomingAssignments({ assignments, locale }: UpcomingAssignmentsProps) {
  return (
    <div className="card-base p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title">งานที่กำลังจะถึงกำหนด</h2>
        <Link
          href={`/${locale}/assignments`}
          className="flex items-center gap-1 text-caption font-body text-foreground-muted hover:text-foreground transition-colors"
        >
          ดูทั้งหมด
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="p-3 rounded-full bg-success/10">
            <ClipboardList className="h-6 w-6 text-success" />
          </div>
          <p className="font-body text-body-sm text-foreground-muted text-center">
            ไม่มีงานค้างอยู่ — เยี่ยมมาก!
          </p>
        </div>
      ) : (
        <ul className="space-y-2" role="list">
          {assignments.map((a) => {
            const dueStatus = getDueDateStatus(a.due_date)
            const isOverdue = dueStatus === 'overdue'
            return (
              <li key={a.id}>
                <Link
                  href={`/${locale}/assignments`}
                  className="flex items-center gap-3 p-3 rounded-input hover:bg-background-tertiary transition-colors group"
                >
                  {/* Priority color indicator — Contrast */}
                  <div
                    className={cn(
                      'w-1.5 h-1.5 rounded-full flex-shrink-0',
                      a.priority === 'high' ? 'bg-priority-high' :
                      a.priority === 'medium' ? 'bg-priority-medium' : 'bg-priority-low'
                    )}
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      'font-body text-body-sm font-medium truncate',
                      isOverdue ? 'text-danger' : 'text-foreground'
                    )}>
                      {a.title}
                    </p>
                    {a.due_date && (
                      <p className={cn(
                        'font-body text-caption mt-0.5 flex items-center gap-1',
                        isOverdue ? 'text-danger' : 'text-foreground-subtle'
                      )}>
                        {isOverdue
                          ? <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                          : <Clock className="h-3 w-3" aria-hidden="true" />}
                        {formatDateShort(a.due_date, locale as Locale)}
                      </p>
                    )}
                  </div>

                  {/* Subject badge */}
                  {a.subject && (
                    <span
                      className="text-overline font-body px-2 py-0.5 rounded-badge border flex-shrink-0"
                      style={{
                        color: a.subject.color,
                        borderColor: `${a.subject.color}40`,
                        backgroundColor: `${a.subject.color}15`,
                      }}
                    >
                      {locale === 'th' ? a.subject.name_th : a.subject.name_en}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
