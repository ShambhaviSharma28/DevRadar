import { useState } from 'react'
import './App.css'

interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  followers: number
  following: number
  public_repos: number
  html_url: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [repoSearch, setRepoSearch] = useState('')
  const [sortBy, setSortBy] = useState('stars')
  const [languageFilter, setLanguageFilter] = useState('all')
  const filteredRepos = repos
  .filter((repo) =>
    repo.name.toLowerCase().includes(repoSearch.toLowerCase())
  )
  .filter((repo) =>
    languageFilter === 'all' ||
    repo.language === languageFilter
  )
  .sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count
    }

    if (sortBy === 'updated') {
      return new Date(b.updated_at).getTime() -
             new Date(a.updated_at).getTime()
    }

    return a.name.localeCompare(b.name)
  })

  async function searchUser() {
    if (!username.trim()) {
      setError('Please enter a GitHub username.')
      return
    }

    setLoading(true)
    setError('')
    setUser(null)
    setRepos([])

    try {
      const cleanUsername = encodeURIComponent(username.trim())

      const [userResponse, repoResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${cleanUsername}`),
        fetch(
          `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=6`
        )
      ])

      if (userResponse.status === 404) {
        throw new Error('GitHub user not found.')
      }

      if (userResponse.status === 403 || repoResponse.status === 403) {
        throw new Error('GitHub API rate limit reached. Try again later.')
      }

      if (!userResponse.ok || !repoResponse.ok) {
        throw new Error('Could not retrieve GitHub data.')
      }

      const userData: GitHubUser = await userResponse.json()
      const repoData: GitHubRepo[] = await repoResponse.json()

      setUser(userData)
      setRepos(repoData)

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">

      <header className="navbar">
        <div className="brand">dev<span>radar</span>.</div>
        <span className="nav-label">Developer explorer</span>
      </header>

      <section className="hero">
        <span className="eyebrow">YOUR WINDOW INTO GITHUB</span>

        <h1>Discover developers.<br />
          <span>Explore their work.</span>
        </h1>

        <p>
          Find GitHub profiles, explore repositories
          and discover what developers are building.
        </p>

        <form
          className="search-box"
          onSubmit={(e) => {
            e.preventDefault()
            searchUser()
          }}
        >
          <input
            type="text"
            placeholder="Enter a GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Explore →'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      {user && (
        <section className="results">

          <div className="profile-card">
            <div className="profile-main">
              <img src={user.avatar_url} alt={user.login} />

              <div>
                <h2>{user.name || user.login}</h2>
                <p className="username">@{user.login}</p>
                <p>{user.bio || 'No bio available.'}</p>
                {user.location && (
                  <p className="location">⌖ {user.location}</p>
                )}
              </div>
            </div>

            <div className="stats">
              <div>
                <strong>{user.followers.toLocaleString()}</strong>
                <span>Followers</span>
              </div>

              <div>
                <strong>{user.following.toLocaleString()}</strong>
                <span>Following</span>
              </div>

              <div>
                <strong>{user.public_repos.toLocaleString()}</strong>
                <span>Repositories</span>
              </div>
            </div>

            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub profile ↗
            </a>
          </div>

          <div className="repo-heading">
            <div>
              <span className="eyebrow">THEIR WORK</span>
              <h2>Repositories</h2>
            </div>
            <span>{filteredRepos.length} shown</span>
          </div>
<div className="repo-controls">
  <select
  value={languageFilter}
  onChange={(e) => setLanguageFilter(e.target.value)}
>
  <option value="all">All languages</option>
  {[...new Set(
  repos
    .map(repo => repo.language)
    .filter((language): language is string => Boolean(language))
)].map(language => (
    <option key={language} value={language}>
      {language}
    </option>
  ))}
</select>
  <input
    type="text"
    placeholder="Search repositories..."
    value={repoSearch}
    onChange={(e) => setRepoSearch(e.target.value)}
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="stars">Most stars</option>
    <option value="updated">Recently updated</option>
    <option value="name">Name</option>
  </select>
<button
  className="reset-button"
  type="button"
  onClick={() => {
    setRepoSearch('')
    setLanguageFilter('all')
    setSortBy('stars')
  }}
>
  ↻ Reset filters
</button>
</div>
          <div className="repo-grid">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
              <article className="repo-card" key={repo.id}>
                <div className="repo-top">
                  <span className="repo-icon">⌘</span>
                  <span className="repo-stars">
                    ★ {repo.stargazers_count.toLocaleString()}
                  </span>
                </div>

                <h3>{repo.name}</h3>

                <p className="repo-description">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="repo-bottom">
                  <span className="language">
                    {repo.language || 'Other'}
                  </span>

                  <span>⑂ {repo.forks_count}</span>
                </div>

                <p className="updated">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </p>

                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  Explore repository ↗
                </a>
              </article>
              ))
) : (
  <div className="empty-state">
    <h3>No repositories found</h3>
    <p>Try another search term or reset your filters.</p>
    <button
      className="reset-button"
      onClick={() => {
        setRepoSearch('')
        setLanguageFilter('all')
        setSortBy('stars')
      }}
    >
      ↻ Reset filters
    </button>
  </div>
)}
          </div>

        </section>
      )}

      <footer>
        <p>devradar. · Made for curious developers.</p>
      </footer>

    </main>
  )
}

export default App
