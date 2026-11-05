export type LabSeat = {
  first: string
  last: string
  email: string
  company: string
  size: string
  hardware: string
  at: string
}

const KEY = 'atoma.seat'

export function readSeat(): LabSeat | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LabSeat
    if (!parsed.email) return null
    return parsed
  } catch {
    return null
  }
}

export function saveSeat(seat: LabSeat): void {
  localStorage.setItem(KEY, JSON.stringify(seat))
}

export function clearSeat(): void {
  localStorage.removeItem(KEY)
}
