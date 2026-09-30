// ============================================================
// Shared TypeScript types for the Student Progress Dashboard
// ============================================================

export type Locale = 'th' | 'en'

export type AssignmentType = 'homework' | 'project' | 'exam'
export type Priority = 'low' | 'medium' | 'high'

export interface Profile {
  id: string
  full_name: string | null
  locale: Locale
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  name_th: string
  name_en: string
  color: string
  icon: string | null
  sort_order: number
  is_active: boolean
}

export interface Summary {
  id: string
  user_id: string
  subject_id: string | null
  subject?: Subject | null
  title: string
  body: string
  summary_date: string // ISO date YYYY-MM-DD
  tags: string[]
  attachment_url: string | null // reserved for future file upload
  created_at: string
  updated_at: string
}

export interface Assignment {
  id: string
  user_id: string
  subject_id: string | null
  subject?: Subject | null
  title: string
  description: string | null
  due_date: string | null
  type: AssignmentType
  priority: Priority
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalSummaries: number
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  overdueAssignments: number
}

// Server Action return types
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string | Record<string, string[]> }
