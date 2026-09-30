import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.login')
  return { title: t('title') }
}

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  const t = await getTranslations('auth.login')

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Grid System: centered single-column auth layout */}
      <div className="w-full max-w-md animate-fade-in">
        {/* Visual Hierarchy: prominent app name */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-display text-foreground mb-2">
            Student
            <span className="text-foreground-muted"> Dashboard</span>
          </h1>
          <p className="font-body text-body-sm text-foreground-muted">
            {t('subtitle')}
          </p>
        </div>

        {/* Proximity: form card groups all auth inputs */}
        <div className="card-base p-8">
          <LoginForm locale={locale} />
        </div>
      </div>
    </main>
  )
}
