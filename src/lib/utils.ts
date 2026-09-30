import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import { th, enUS } from 'date-fns/locale'
import type { Locale, Priority, AssignmentType } from '@/types'

// ─── Tailwind class merging ───────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Date formatting ─────────────────────────────────────────
const dateLocales: Record<Locale, Locale extends 'th' ? typeof th : typeof enUS> = {
  th: th,
  en: enUS,
} as Record<string, typeof th | typeof enUS>

export function formatDate(dateStr: string, locale: Locale = 'th'): string {
  const date = parseISO(dateStr)
  return format(date, 'd MMMM yyyy', { locale: dateLocales[locale] })
}

export function formatDateShort(dateStr: string, locale: Locale = 'th'): string {
  const date = parseISO(dateStr)
  return format(date, 'd MMM yyyy', { locale: dateLocales[locale] })
}

export function getDueDateStatus(
  dueDateStr: string | null
): 'overdue' | 'today' | 'tomorrow' | 'upcoming' | null {
  if (!dueDateStr) return null
  const date = parseISO(dueDateStr)
  if (isPast(date) && !isToday(date)) return 'overdue'
  if (isToday(date)) return 'today'
  if (isTomorrow(date)) return 'tomorrow'
  return 'upcoming'
}

// ─── Priority helpers ─────────────────────────────────────────
export function getPriorityColor(priority: Priority): string {
  const map: Record<Priority, string> = {
    high:   'text-priority-high border-priority-high/30 bg-priority-high/10',
    medium: 'text-priority-medium border-priority-medium/30 bg-priority-medium/10',
    low:    'text-priority-low border-priority-low/30 bg-priority-low/10',
  }
  return map[priority]
}

export function getAssignmentTypeIcon(type: AssignmentType): string {
  const map: Record<AssignmentType, string> = {
    homework: 'BookOpen',
    project:  'FolderKanban',
    exam:     'ClipboardList',
  }
  return map[type]
}

// ─── Subject color ────────────────────────────────────────────
export function getSubjectTextColor(color: string): string {
  // Returns a Tailwind-compatible inline style value
  return color
}

// ─── Truncate text ───────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

// ─── Today ISO date string ───────────────────────────────────
export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}
