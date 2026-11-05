import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ares } from './api'
import type { GovernorLink, GovernorStatus } from './types'

type GovernorValue = {
  link: GovernorLink
  status: GovernorStatus | null
  error: string | null
  refresh: () => void
}

const GovernorContext = createContext<GovernorValue | null>(null)

export function GovernorProvider({ children }: { children: ReactNode }) {
  const [link, setLink] = useState<GovernorLink>('loading')
  const [status, setStatus] = useState<GovernorStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    setLink('loading')
    ares
      .status()
      .then((payload) => {
        setStatus(payload)
        setError(null)
        setLink(payload.backend.up ? 'live' : 'down')
      })
      .catch((err: unknown) => {
        setStatus(null)
        setError(err instanceof Error ? err.message : 'governor unreachable')
        setLink('down')
      })
  }, [])

  useEffect(() => {
    refresh()
    const id = window.setInterval(refresh, 15000)
    return () => window.clearInterval(id)
  }, [refresh])

  const value = useMemo(
    () => ({ link, status, error, refresh }),
    [link, status, error, refresh],
  )

  return <GovernorContext.Provider value={value}>{children}</GovernorContext.Provider>
}

export function useGovernor(): GovernorValue {
  const ctx = useContext(GovernorContext)
  if (!ctx) throw new Error('useGovernor must be used under GovernorProvider')
  return ctx
}
