import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.register')
  return { title: t('title') }
}

interface RegisterPageProps {
  params: Promise<{ locale: string }>
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params
  const t = await getTranslations('auth.register')

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="font-heading text-display text-foreground mb-2">
            Student
            <span className="text-foreground-muted"> Dashboard</span>
          </h1>
          <p className="font-body text-body-sm text-foreground-muted">
            {t('subtitle')}
          </p>
        </div>

        <div className="card-base p-8">
          <RegisterForm locale={locale} />
        </div>
      </div>
    </main>
  )
}
