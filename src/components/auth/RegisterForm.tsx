'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { registerAction } from '@/lib/actions/auth'
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react'

interface RegisterFormProps {
  locale: string
}

export function RegisterForm({ locale }: RegisterFormProps) {
  const t = useTranslations('auth.register')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const raw = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      const res = await registerAction(locale, raw)
      if (!res.success) {
        if (typeof res.error === 'string') {
          setError(res.error)
        } else {
          setError(Object.values(res.error).flat().join(', '))
        }
      } else {
        setSuccess(true)
      }
    } catch {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-6 space-y-4 font-body">
        <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-success" />
        </div>
        <p className="text-body text-foreground">{t('success')}</p>
        <Link
          href={`/${locale}/login`}
          className="btn-primary inline-flex mt-4"
        >
          {t('login')}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-body">
      {error && (
        <div className="flex items-center gap-2 p-3.5 bg-danger/10 border border-danger/30 rounded-input text-danger text-body-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('fullName')}
        </label>
        <input
          name="full_name"
          type="text"
          required
          placeholder={t('fullNamePlaceholder')}
          className="input-base"
        />
      </div>

      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('email')}
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          className="input-base"
        />
      </div>

      <div>
        <label className="block text-body-sm font-medium text-foreground mb-1.5">
          {t('password')}
        </label>
        <input
          name="password"
          type="password"
          required
          placeholder={t('passwordPlaceholder')}
          className="input-base"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 mt-2"
      >
        <UserPlus className="h-4 w-4" />
        {loading ? t('submitting') : t('submit')}
      </button>

      <div className="text-center pt-2">
        <p className="text-body-sm text-foreground-muted">
          {t('hasAccount')}{' '}
          <Link
            href={`/${locale}/login`}
            className="text-foreground font-medium hover:underline ml-1"
          >
            {t('login')}
          </Link>
        </p>
      </div>
    </form>
  )
}
