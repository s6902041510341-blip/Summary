'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu, X, LayoutDashboard, BookOpen, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  locale: string
}

export function MobileNav({ locale }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navItems = [
    { href: `/${locale}/dashboard`,   label: t('dashboard'),   icon: LayoutDashboard },
    { href: `/${locale}/summaries`,   label: t('summaries'),   icon: BookOpen },
    { href: `/${locale}/assignments`, label: t('assignments'), icon: ClipboardList },
  ]

  return (
    <div className="lg:hidden">
      {/* Contrast: hamburger button visible on dark bg */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-input text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer — Alignment: left-aligned, full height */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 bg-background-secondary border-r border-border',
          'transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-heading text-heading font-bold text-foreground">
            Student Dashboard
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-badge text-foreground-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${locale}/dashboard` && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-input text-body-sm font-body font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
