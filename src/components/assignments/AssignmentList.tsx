import { AssignmentItem } from './AssignmentItem'
import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import type { Assignment } from '@/types'

interface AssignmentListProps {
  assignments: Assignment[]
  locale: string
}

export function AssignmentList({ assignments, locale }: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <div className="card-base p-12 text-center flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-full bg-background-tertiary">
          <ClipboardList className="h-8 w-8 text-foreground-subtle" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-heading-lg text-foreground">ไม่มีรายการงานในขณะนี้</h3>
          <p className="font-body text-body-sm text-foreground-muted max-w-sm">
            เพิ่มงานหรือการบ้านใหม่เพื่อติดตามกำหนดส่งและความคืบหน้า
          </p>
        </div>
        <Link href={`/${locale}/assignments/new`} className="btn-primary mt-2">
          เพิ่มงานใหม่
        </Link>
      </div>
    )
  }

  const pending = assignments.filter((a) => !a.completed)
  const completed = assignments.filter((a) => a.completed)

  return (
    <div className="space-y-8">
      {/* Pending section */}
      <div className="space-y-3">
        <h2 className="section-title">
          งานที่ต้องทำ ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="font-body text-body-sm text-foreground-muted p-4 card-base text-center">
            ไม่มีงานที่ค้างอยู่ 🎉
          </p>
        ) : (
          <div className="space-y-2.5">
            {pending.map((a) => (
              <AssignmentItem key={a.id} assignment={a} locale={locale} />
            ))}
          </div>
        )}
      </div>

      {/* Completed section */}
      {completed.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          <h2 className="font-heading text-heading text-foreground-muted">
            ทำเสร็จแล้ว ({completed.length})
          </h2>
          <div className="space-y-2.5">
            {completed.map((a) => (
              <AssignmentItem key={a.id} assignment={a} locale={locale} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
