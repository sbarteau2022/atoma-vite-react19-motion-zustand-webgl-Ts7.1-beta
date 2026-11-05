import type { CloudWorkspaceTab } from './store/useAtomaStore'

export type LabSurface = {
  id: string
  to: string
  label: string
  rail: string
  tab: CloudWorkspaceTab
  as?: 'n3' | 'obsidian'
}

/** Dropdown order. The page title is `label`. */
export const primaryNav: Array<LabSurface & { end?: boolean }> = [
  { id: 'home', to: '/', label: 'Atoma Labs', rail: 'Atoma', tab: 'code', end: true },
  { id: 'spec-ops', to: '/app', label: 'Ares Spec Ops', rail: 'Ares', tab: 'code' },
  { id: 'research', to: '/app?tab=research', label: 'Research', rail: 'Research', tab: 'research' },
  { id: 'n3', to: '/app?tab=mind&as=n3', label: 'N³', rail: 'N³', tab: 'mind', as: 'n3' },
  { id: 'dag', to: '/app?tab=swarm', label: 'Capability DAG', rail: 'DAG', tab: 'swarm' },
  {
    id: 'obsidian',
    to: '/app?tab=mind&as=obsidian',
    label: 'Obsidian 4D Knowledge Graph',
    rail: 'Obsidian',
    tab: 'mind',
    as: 'obsidian',
  },
  {
    id: 'all',
    to: '/all',
    label: 'All Together — 4D Graph',
    rail: '4D',
    tab: 'mind',
  },
]

export const labRail: LabSurface[] = [
  ...primaryNav.filter((item) => item.id !== 'home' && item.id !== 'all'),
  { id: 'tools', to: '/app?tab=tools', label: 'Tools', rail: 'Tools', tab: 'tools' },
  { id: 'settings', to: '/app?tab=settings', label: 'Settings', rail: 'Settings', tab: 'settings' },
]

export function hrefFor(tab: CloudWorkspaceTab, as?: 'n3' | 'obsidian' | null): string {
  if (tab === 'code') return '/app'
  if (tab === 'mind') {
    return as === 'obsidian' ? '/app?tab=mind&as=obsidian' : '/app?tab=mind&as=n3'
  }
  return `/app?tab=${tab}`
}

export function labTitle(tab: string | null, as: string | null): string {
  if (tab === 'research') return 'Research'
  if (tab === 'swarm') return 'Capability DAG'
  if (tab === 'mind' && as === 'obsidian') return 'Obsidian 4D Knowledge Graph'
  if (tab === 'mind') return 'N³'
  if (tab === 'tools') return 'Tools'
  if (tab === 'settings') return 'Settings'
  return 'Ares Spec Ops'
}

export function pageTitle(pathname: string, search: string): string {
  if (pathname === '/') return 'Atoma Labs'
  if (pathname === '/waitlist' || pathname === '/contact') return 'Enter the lab'
  if (pathname === '/app') {
    const params = new URLSearchParams(search)
    return labTitle(params.get('tab'), params.get('as'))
  }
  if (pathname === '/all') return 'All Together — 4D Graph'
  if (pathname === '/about') return 'About'
  if (pathname === '/updates' || pathname === '/changelog') return 'Updates'
  if (pathname === '/blog') return 'Blog'
  if (pathname.startsWith('/blog/')) return 'Blog'
  if (pathname === '/console') return 'Console'
  if (pathname === '/privacy') return 'Privacy'
  if (pathname === '/terms') return 'Terms'
  return 'Atoma Labs'
}

export function navItemActive(to: string, pathname: string, search: string): boolean {
  if (to === '/') return pathname === '/'
  if (to === '/waitlist') return pathname === '/waitlist'
  if (!to.startsWith('/app')) return pathname === to
  if (pathname !== '/app') return false
  const want = new URLSearchParams(to.split('?')[1] ?? '')
  const have = new URLSearchParams(search)
  const wantTab = want.get('tab')
  const haveTab = have.get('tab')
  if (!wantTab) return !haveTab || haveTab === 'code'
  if (wantTab !== haveTab) return false
  if (wantTab === 'mind') {
    const wantAs = want.get('as') ?? 'n3'
    const haveAs = have.get('as') === 'obsidian' ? 'obsidian' : 'n3'
    return wantAs === haveAs
  }
  return true
}
