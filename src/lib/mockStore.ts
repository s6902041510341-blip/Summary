import { cookies } from 'next/headers'
import type { Subject, Summary, Assignment, Profile } from '@/types'

export const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    name_th: 'คณิตศาสตร์',
    name_en: 'Mathematics',
    color: '#818cf8', // Indigo
    icon: 'calculator',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'sub-2',
    name_th: 'ภาษาอังกฤษ',
    name_en: 'English',
    color: '#fbbf24', // Amber
    icon: 'book-open',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'sub-3',
    name_th: 'ภาษาไทย',
    name_en: 'Thai',
    color: '#f87171', // Red
    icon: 'type',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'sub-4',
    name_th: 'สังคมศึกษา',
    name_en: 'Social Studies',
    color: '#34d399', // Emerald
    icon: 'landmark',
    sort_order: 4,
    is_active: true,
  },
]

// Initial seed summaries for testing
const INITIAL_SUMMARIES: Summary[] = [
  {
    id: 'sum-1',
    user_id: 'local-user-1',
    subject_id: 'sub-1',
    subject: DEFAULT_SUBJECTS[0],
    title: 'สรุปแคลคูลัส: อนุพันธ์และอัตราการเปลี่ยนแปลง',
    body: 'วันนี้ได้เรียนเรื่องกฎลูกโซ่ (Chain Rule) และการประยุกต์ใช้อนุพันธ์ในการหาค่าสูงสุด/ต่ำสุดสัมพัทธ์ของฟังก์ชัน ข้อควรระวังคือการหาจุดวิกฤต (Critical Points) โดยให้ f\'(x) = 0 หรือไม่นิยาม',
    summary_date: new Date().toISOString().split('T')[0],
    tags: ['แคลคูลัส', 'อนุพันธ์', 'บทที่ 2'],
    attachment_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sum-2',
    user_id: 'local-user-1',
    subject_id: 'sub-2',
    subject: DEFAULT_SUBJECTS[1],
    title: 'English Academic Vocabulary: Contrast & Concession',
    body: 'Focus on linking words: Although, Even though, Despite, In spite of, Whereas, and Nevertheless. Remember that "Despite" and "In spite of" are followed by a noun phrase or gerund, not a full clause.',
    summary_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    tags: ['Grammar', 'Academic', 'Writing'],
    attachment_url: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sum-3',
    user_id: 'local-user-1',
    subject_id: 'sub-3',
    subject: DEFAULT_SUBJECTS[2],
    title: 'การวิเคราะห์วรรณคดีและโวหารภาพพจน์',
    body: 'ทบทวนโวหารภาพพจน์ 5 แบบหลัก: อุปมา (เปรียบเหมือน), อุปลักษณ์ (เปรียบเป็น), บุคลาธิษฐาน (สมมุติให้สิ่งไม่มีชีวิตมีกริยาเหมือนคน), สัทพจน์ (เลียนเสียงธรรมชาติ) และอธิพจน์ (กล่าวเกินจริง)',
    summary_date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    tags: ['วรรณคดี', 'โวหาร', 'การอ่าน'],
    attachment_url: null,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

// Initial seed assignments for testing
const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    user_id: 'local-user-1',
    subject_id: 'sub-1',
    subject: DEFAULT_SUBJECTS[0],
    title: 'ทำแบบฝึกหัดแคลคูลัส ข้อ 1-15 หน้า 45',
    description: 'เน้นแสดงวิธีทำอย่างละเอียดในสมุดส่งวันจันทร์',
    due_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    type: 'homework',
    priority: 'high',
    completed: false,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asg-2',
    user_id: 'local-user-1',
    subject_id: 'sub-2',
    subject: DEFAULT_SUBJECTS[1],
    title: 'Write a 300-word Essay on Modern Tech',
    description: 'Submit PDF format via email before 23:59',
    due_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    type: 'project',
    priority: 'medium',
    completed: false,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asg-3',
    user_id: 'local-user-1',
    subject_id: 'sub-4',
    subject: DEFAULT_SUBJECTS[3],
    title: 'อ่านทบทวนประวัติศาสตร์เศรษฐกิจไทยยุคใหม่',
    description: 'เตรียมตัวสอบย่อยท้ายคาบ',
    due_date: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    type: 'exam',
    priority: 'low',
    completed: false,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'asg-4',
    user_id: 'local-user-1',
    subject_id: 'sub-3',
    subject: DEFAULT_SUBJECTS[2],
    title: 'ส่งใบงานวิเคราะห์บทกวี',
    description: 'ตรวจทานความเรียบร้อยและส่งในคาบ',
    due_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    type: 'homework',
    priority: 'medium',
    completed: true,
    completed_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// In-memory data store for server runtime
let localSummaries: Summary[] = [...INITIAL_SUMMARIES]
let localAssignments: Assignment[] = [...INITIAL_ASSIGNMENTS]

// Cookie session key
export const SESSION_COOKIE = 'student_session'

export interface SessionUser {
  id: string
  email: string
  full_name: string
  locale: string
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  if (!session) {
    // Default demo user so the app works immediately out of the box
    return {
      id: 'local-user-1',
      email: 'student@demo.local',
      full_name: 'นักศึกษา (Demo Mode)',
      locale: 'th',
    }
  }
  try {
    return JSON.parse(session) as SessionUser
  } catch {
    return {
      id: 'local-user-1',
      email: 'student@demo.local',
      full_name: 'นักศึกษา (Demo Mode)',
      locale: 'th',
    }
  }
}

// Data Store Accessors
export async function getLocalSummaries(userId?: string): Promise<Summary[]> {
  return localSummaries.filter((s) => !userId || s.user_id === userId)
}

export async function getLocalSummaryById(id: string): Promise<Summary | null> {
  return localSummaries.find((s) => s.id === id) || null
}

export async function addLocalSummary(summary: Omit<Summary, 'id' | 'created_at' | 'updated_at'>): Promise<Summary> {
  const sub = DEFAULT_SUBJECTS.find((s) => s.id === summary.subject_id) || null
  const newSummary: Summary = {
    ...summary,
    id: 'sum-' + Date.now(),
    subject: sub,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  localSummaries.unshift(newSummary)
  return newSummary
}

export async function updateLocalSummary(id: string, data: Partial<Summary>): Promise<boolean> {
  const idx = localSummaries.findIndex((s) => s.id === id)
  if (idx === -1) return false
  const sub = data.subject_id ? DEFAULT_SUBJECTS.find((s) => s.id === data.subject_id) || null : localSummaries[idx].subject
  localSummaries[idx] = {
    ...localSummaries[idx],
    ...data,
    subject: sub,
    updated_at: new Date().toISOString(),
  }
  return true
}

export async function deleteLocalSummary(id: string): Promise<boolean> {
  localSummaries = localSummaries.filter((s) => s.id !== id)
  return true
}

export async function getLocalAssignments(userId?: string): Promise<Assignment[]> {
  return localAssignments.filter((a) => !userId || a.user_id === userId)
}

export async function addLocalAssignment(assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>): Promise<Assignment> {
  const sub = DEFAULT_SUBJECTS.find((s) => s.id === assignment.subject_id) || null
  const newAssignment: Assignment = {
    ...assignment,
    id: 'asg-' + Date.now(),
    subject: sub,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  localAssignments.unshift(newAssignment)
  return newAssignment
}

export async function toggleLocalAssignment(id: string, completed: boolean): Promise<boolean> {
  const idx = localAssignments.findIndex((a) => a.id === id)
  if (idx === -1) return false
  localAssignments[idx] = {
    ...localAssignments[idx],
    completed,
    completed_at: completed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }
  return true
}

export async function deleteLocalAssignment(id: string): Promise<boolean> {
  localAssignments = localAssignments.filter((a) => a.id !== id)
  return true
}
