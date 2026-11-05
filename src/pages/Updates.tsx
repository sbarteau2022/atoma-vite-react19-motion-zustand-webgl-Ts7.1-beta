import { changelog } from '../content'

export function Updates() {
  return (
    <main className="page">
      <header className="page-hero">
        <p className="kicker">Updates</p>
        <h1>What is new in Ares.</h1>
        <p className="lede">
          Every update, improvement, and fail-closed fix, tracked so you know
          what actually landed in the running governor.
        </p>
      </header>
      <ol className="changelog">
        {changelog.map((entry) => (
          <li key={entry.version}>
            <p className="kicker">
              {entry.date} · {entry.version}
            </p>
            <h2>{entry.title}</h2>
            <ul>
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </main>
  )
}
