type AtomMarkProps = {
  size?: number
  title?: string
}

/** Orbital atom — nucleus, three rings, electrons. Ink follows currentColor. */
export function AtomMark({ size = 40, title }: AtomMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="9"
        transform="rotate(-18 32 32)"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="9"
        transform="rotate(52 32 32)"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="9"
        transform="rotate(-68 32 32)"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <circle cx="32" cy="32" r="5.2" fill="currentColor" />
      <circle cx="54.8" cy="24.6" r="2.35" fill="currentColor" />
      <circle cx="46.8" cy="50.9" r="2.35" fill="currentColor" />
      <circle cx="41" cy="9.7" r="2.35" fill="currentColor" />
      <circle cx="9.2" cy="39.4" r="2.35" fill="currentColor" />
    </svg>
  )
}
