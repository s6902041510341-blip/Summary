import { MobileNav } from './MobileNav'
import { logoutAction } from '@/lib/actions/auth'
import { getTranslations } from 'next-intl/server'
import { LogOut, User } from 'lucide-react'

interface HeaderProps {
  locale: string
  userName: string
  userEmail: string
}

export async function Header({ locale, userName, userEmail }: HeaderProps) {
  const t = await getTranslations('nav')

  return (
    // Alignment: space-between layout, vertically centered
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="page-container h-16 flex items-center justify-between gap-4">
        {/* Mobile: hamburger nav (hidden on lg+) */}
        <MobileNav locale={locale} />

        {/* Visual Hierarchy: user info group (Proximity) */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-caption font-body font-medium text-foreground leading-tight">
              {userName}
            </span>
            <span className="text-overline font-body text-foreground-subtle leading-tight">
              {userEmail}
            </span>
          </div>

          {/* Avatar — Repetition: circular avatar pattern */}
          <div
            className="h-8 w-8 rounded-full bg-background-tertiary border border-border flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <User className="h-4 w-4 text-foreground-muted" />
          </div>

          {/* Contrast: logout action clearly distinct */}
          <form
            action={async () => {
              'use server'
              await logoutAction(locale)
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-1.5 text-caption font-body text-foreground-muted hover:text-danger transition-colors duration-200 px-2 py-1.5 rounded-badge hover:bg-danger/10"
              title={t('logout')}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
