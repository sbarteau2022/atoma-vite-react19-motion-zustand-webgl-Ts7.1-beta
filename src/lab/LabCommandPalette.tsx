import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtomaStore } from '../store/useAtomaStore'
import { clearSeat } from '../seat'
import { labRail } from '../siteNav'

export function LabCommandPalette() {
  const navigate = useNavigate()
  const open = useAtomaStore((s) => s.commandPaletteOpen)
  const setOpen = useAtomaStore((s) => s.setCommandPaletteOpen)
  const setCloudTab = useAtomaStore((s) => s.setCloudTab)
  const signOut = useAtomaStore((s) => s.signOut)
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(!useAtomaStore.getState().commandPaletteOpen)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const extras = [
      { id: 'site', label: 'Public site', hint: 'Leave the lab' },
      { id: 'console', label: 'Governor console', hint: 'Live status / retrieval' },
      { id: 'out', label: 'Sign out', hint: 'Clear local seat' },
    ]
    const all = [
      ...labRail.map((t) => ({ id: t.id, label: t.label, hint: t.rail })),
      ...extras,
    ]
    if (!q) return all
    return all.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(q))
  }, [query])

  if (!open) return null

  function run(id: string) {
    if (id === 'site') navigate('/')
    else if (id === 'console') navigate('/console')
    else if (id === 'out') {
      clearSeat()
      signOut()
      navigate('/waitlist')
    } else {
      const surface = labRail.find((item) => item.id === id)
      if (!surface) return
      setCloudTab(surface.tab)
      navigate(surface.to)
    }
    setQuery('')
    setOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/55 flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#2e2e33] border border-white/12 shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <label className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="font-mono text-[10px] text-[#f59e0b]">⌘K</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a lab surface"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#71717a]"
          />
        </label>
        <ul className="max-h-80 overflow-y-auto py-1">
          {items.length === 0 ? (
            <li className="px-4 py-3 text-xs text-[#71717a]">No matches.</li>
          ) : (
            items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => run(item.id)}
                  className="w-full text-left px-4 py-2.5 hover:bg-white/6 active:bg-white/10 flex items-baseline justify-between gap-3"
                >
                  <span className="text-sm text-white">{item.label}</span>
                  <span className="text-[11px] text-[#71717a] truncate">{item.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
