'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  locale: string
}

export function Sidebar({ locale }: SidebarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navItems = [
    {
      href: `/${locale}/dashboard`,
      label: t('dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/summaries`,
      label: t('summaries'),
      icon: BookOpen,
    },
    {
      href: `/${locale}/assignments`,
      label: t('assignments'),
      icon: ClipboardList,
    },
  ]

  return (
    // Sidebar: fixed 240px, full height, dark surface
    // Alignment: left-aligned nav items
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-background-secondary border-r border-border flex-shrink-0">
      {/* Visual Hierarchy: app brand at top */}
      <div className="px-6 py-7 border-b border-border">
        <span className="font-heading text-heading-lg text-foreground font-bold tracking-tight">
          Student
        </span>
        <span className="font-heading text-heading-lg text-foreground-muted font-medium">
          {' '}Dashboard
        </span>
      </div>

      {/* Navigation — Repetition: same style for each nav item */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${locale}/dashboard` &&
              pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                // Repetition: nav item base
                'flex items-center gap-3 px-3 py-2.5 rounded-input text-body-sm font-body font-medium transition-all duration-200',
                isActive
                  ? // Contrast: active state — white bg on dark
                    'bg-primary text-primary-foreground'
                  : 'text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Proximity: locale switcher grouped at bottom */}
      <div className="px-3 pb-6 border-t border-border pt-4">
        <LocaleSwitcher locale={locale} />
      </div>
    </aside>
  )
}

function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  return (
    // Alignment: two locale options side by side
    <div className="flex gap-1 p-1 bg-background rounded-input border border-border">
      {(['th', 'en'] as const).map((loc) => (
        <Link
          key={loc}
          href={switchLocale(loc)}
          className={cn(
            'flex-1 text-center py-1.5 text-caption font-body rounded-badge transition-all duration-200',
            locale === loc
              ? 'bg-primary text-primary-foreground font-medium'
              : 'text-foreground-muted hover:text-foreground'
          )}
        >
          {loc === 'th' ? '🇹🇭 ไทย' : '🇬🇧 EN'}
        </Link>
      ))}
    </div>
  )
}
