import { useEffect, useRef, type ReactNode } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AtomaCloudApp } from '../components/cloud/AtomaCloudApp'
import { readSeat } from '../seat'
import { useAtomaStore } from '../store/useAtomaStore'
import { hrefFor } from '../siteNav'
import { LabCommandPalette } from './LabCommandPalette'

export function RequireAuth({ children }: { children: ReactNode }) {
  const authenticated = useAtomaStore((s) => s.isAuthenticated)
  if (!authenticated && !readSeat()) {
    return <Navigate to="/waitlist" replace />
  }
  return children
}

const cloudTabs = ['code', 'swarm', 'mind', 'research', 'tools', 'settings'] as const

export function LabShell() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const activePage = useAtomaStore((s) => s.activePage)
  const setActivePage = useAtomaStore((s) => s.setActivePage)
  const setCloudTab = useAtomaStore((s) => s.setCloudTab)
  const hydrateFromSeat = useAtomaStore((s) => s.hydrateFromSeat)
  const pageBefore = useRef(activePage)

  useEffect(() => {
    hydrateFromSeat()
    setActivePage('cloud-app')
    const tab = params.get('tab')
    const next = tab && (cloudTabs as readonly string[]).includes(tab) ? tab : 'code'
    if (next !== useAtomaStore.getState().cloudTab) {
      setCloudTab(next as (typeof cloudTabs)[number])
    }
  }, [hydrateFromSeat, params, setActivePage, setCloudTab])

  useEffect(() => {
    if (pageBefore.current === activePage) return
    pageBefore.current = activePage
    if (activePage === 'platform' || activePage === 'dispatch') {
      navigate('/')
    } else if (activePage === 'sign-up' || activePage === 'contact') {
      navigate('/waitlist')
    } else if (activePage === 'tools-mcp') {
      setCloudTab('tools')
      setActivePage('cloud-app')
      navigate(hrefFor('tools'))
    } else if (activePage === 'research-hub' || activePage === 'research-lab') {
      setCloudTab('research')
      setActivePage('cloud-app')
      navigate(hrefFor('research'))
    } else if (activePage === 'meta-hackathon' || activePage === 'ide-workbench') {
      setCloudTab('code')
      setActivePage('cloud-app')
      navigate(hrefFor('code'))
    } else if (activePage === 'swarm-legacy') {
      setCloudTab('swarm')
      setActivePage('cloud-app')
      navigate(hrefFor('swarm'))
    }
  }, [activePage, navigate, setActivePage, setCloudTab])

  return (
    <div className="lab-root">
      <LabCommandPalette />
      <AtomaCloudApp />
    </div>
  )
}
