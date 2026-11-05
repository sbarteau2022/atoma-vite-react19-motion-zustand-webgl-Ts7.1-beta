import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { posts, type Post } from '../content'

const filters = ['All', 'Updates', 'Engineering', 'Operations'] as const

export function Blog() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = useMemo(
    () =>
      posts.filter((post) => (filter === 'All' ? true : post.category === filter)),
    [filter],
  )

  return (
    <main className="page">
      <header className="page-hero">
        <p className="kicker">Blog</p>
        <h1>Latest insights.</h1>
        <p className="lede">
          Notes on the shared mind, throwaway runs, and building on
          intelligence instead of rebuilding it.
        </p>
      </header>
      <div className="tab-row" role="tablist" aria-label="Post categories">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? 'is-active' : undefined}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="insight-list">
        {visible.map((post: Post) => (
          <li key={post.slug}>
            <p className="insight-cat">
              {post.category} · {post.date}
            </p>
            <Link to={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
