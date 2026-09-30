'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { loginAction } from '@/lib/actions/auth'
import { LogIn, AlertCircle } from 'lucide-react'

interface LoginFormProps {
  locale: string
}

export function LoginForm({ locale }: LoginFormProps) {
  const t = useTranslations('auth.login')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const raw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      const res = await loginAction(locale, raw)
      if (res && !res.success) {
        if (typeof res.error === 'string') {
          setError(res.error)
        } else {
          setError(Object.values(res.error).flat().join(', '))
        }
      }
    } catch (err: unknown) {
      // redirect throws NEXT_REDIRECT which is expected on success
      if ((err as Error)?.message?.includes('NEXT_REDIRECT')) {
        return
      }
      setError(t('error'))
    } finally {
      setLoading(false)
    }
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
        <LogIn className="h-4 w-4" />
        {loading ? t('submitting') : t('submit')}
      </button>

      <div className="text-center pt-2">
        <p className="text-body-sm text-foreground-muted">
          {t('noAccount')}{' '}
          <Link
            href={`/${locale}/register`}
            className="text-foreground font-medium hover:underline ml-1"
          >
            {t('register')}
          </Link>
        </p>
      </div>
    </form>
  )
}
