import { Link, useParams } from 'react-router-dom'
import { postBySlug } from '../content'

export function BlogPost() {
  const { slug } = useParams()
  const post = slug ? postBySlug(slug) : undefined

  if (!post) {
    return (
      <main className="page">
        <header className="page-hero">
          <p className="kicker">Missing</p>
          <h1>This note is not on the map.</h1>
          <Link className="btn btn-ghost" to="/blog">
            Back to blog
          </Link>
        </header>
      </main>
    )
  }

  return (
    <main className="page article">
      <p className="kicker">
        {post.category} · {post.date}
      </p>
      <h1>{post.title}</h1>
      <p className="lede">{post.dek}</p>
      {post.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        <Link to="/blog">← All insights</Link>
      </p>
    </main>
  )
}
