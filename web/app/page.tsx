import {getCases, isLive} from '../lib/sanity'

function Sev({n}: {n: number}) {
  return (
    <div className="sev" title={`severity ${n}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= n ? 'on' : ''} />
      ))}
      <span style={{fontSize: 12, color: '#a7adbd', marginLeft: 6}}>severity {n}/5</span>
    </div>
  )
}

export default async function Home() {
  const cases = await getCases()
  const by = (s: string) => cases.filter((c) => c.status === s).length
  return (
    <div>
      <section className="hero">
        <div>
          <h1>Court is <span>in session.</span></h1>
          <p>
            File roommate grievances as structured Sanity documents. Try them on the Wall,
            sentence them from the Bench. {isLive
              ? 'Live from the Content Lake — GROQ dereferences plaintiff, defendant and verdict.'
              : 'Demo mode — add Sanity env to go live. Same GROQ query in lib/sanity.ts.'}
          </p>
          <a className="btn primary" href="/bench" style={{textDecoration: 'none'}}>Enter Judge Bench</a>
        </div>
        <div className="seal">CHORE<br />COURT<br />EST. 2026</div>
      </section>

      <div className="stats">
        <div className="stat"><small>DOCKET</small><b>{cases.length}</b></div>
        <div className="stat"><small>AWAITING TRIAL</small><b>{by('filed') + by('deliberating')}</b></div>
        <div className="stat"><small>SENTENCED</small><b>{by('sentenced') + by('served')}</b></div>
        <div className="stat"><small>PARDONED</small><b>{by('pardoned')}</b></div>
      </div>

      <div className="grid">
        {cases.map((c) => (
          <article key={c._id} className="card">
            <div className="card-top">
              <span className={`pill ${c.status}`}>{c.status}</span>
              <span className="pill">#{c.charge}</span>
            </div>
            <h3>{c.title}</h3>
            <div className="vs"><b>{c.plaintiffName}</b> vs <b>{c.defendantName}</b></div>
            <div className="details">{c.details}</div>
            <Sev n={c.severity} />
            {c.sentence && (
              <div className="sentence">
                Sentence: {c.sentence} {c.decidedBy ? <span>— signed {c.decidedBy}</span> : <span>— unsigned</span>}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
