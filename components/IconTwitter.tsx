const IconTwitter: React.FC<{ username?: string }> = ({ username }) => (
  <a href={`https://twitter.com/${username}`} className="flex items-center gap-2">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v.5A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="currentColor"/>
    </svg>
    <span className="hidden sm:inline">@{username}</span>
  </a>
)

export default IconTwitter
