import './globals.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className="topbar">
          <div className="topbar-inner">
            <a className="brand" href="/">
              <span className="brand-mark">CC</span>
              <span><small>ROOMMATE JUSTICE</small><b>Chore Court</b></span>
            </a>
            <nav className="nav-links">
              <a href="/">Wall</a>
              <a href="/bench">Judge Bench</a>
            </nav>
          </div>
        </div>
        <div className="wrap">{children}</div>
        <div className="footer">Order in the court — filed, tried & sentenced on structured content.</div>
      </body>
    </html>
  )
}
