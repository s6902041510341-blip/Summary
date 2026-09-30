import { getCurrentUser } from '@/lib/mockStore'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params
  const user = await getCurrentUser()

  const displayName = user?.full_name || 'นักศึกษา (Demo Mode)'
  const displayEmail = user?.email || 'student@demo.local'

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar locale={locale} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          locale={locale}
          userName={displayName}
          userEmail={displayEmail}
        />
        <main className="flex-1 page-container py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
