'use client'
import {useState} from 'react'
import {MOCK_CASES, NEXT_TRANSITIONS, CaseStatus} from '../../lib/mock'

export default function Bench() {
  const [cases, setCases] = useState(MOCK_CASES)
  const [judge, setJudge] = useState('Harish')
  const [filter, setFilter] = useState<'all' | CaseStatus>('all')
  const [log, setLog] = useState<string[]>(['Court opened. Docket loaded.'])

  function move(id: string, to: CaseStatus, title: string) {
    setCases((cs) =>
      cs.map((c) => {
        if (c._id !== id) return c
        if (to === 'sentenced' && !judge) return c
        return {...c, status: to, decidedBy: to === 'sentenced' ? judge : c.decidedBy,
          sentence: to === 'sentenced' ? c.sentence || '2x dishes + trash duty' : c.sentence}
      })
    )
    setLog((l) => [`${judge || 'Judge'} moved "${title}" → ${to}`, ...l].slice(0, 8))
  }

  const shown = cases.filter((c) => filter === 'all' || c.status === filter)
  const counts: Record<string, number> = {}
  for (const c of cases) counts[c.status] = (counts[c.status] || 0) + 1

  return (
    <div>
      <section className="hero">
        <div>
          <h1>The Judge <span>Bench.</span></h1>
          <p>Custom App SDK desk — not Studio. Claim cases, sentence with a signature, pardon or mark served. Workflow guards enforced: no sentence without a judge signature.</p>
        </div>
        <div className="seal">GAVEL<br />IN<br />HAND</div>
      </section>

      <div className="bench-bar">
        <label style={{fontSize: 13}}>Presiding judge: <input value={judge} onChange={(e) => setJudge(e.target.value)} placeholder="Judge name" /></label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">all ({cases.length})</option>
          {['filed', 'deliberating', 'sentenced', 'served', 'pardoned'].map((s) => (
            <option key={s} value={s}>{s} ({counts[s] || 0})</option>
          ))}
        </select>
        <span style={{fontSize: 12, color: '#a7adbd'}}>decidedBy stays empty until a person signs</span>
      </div>

      <div className="grid">
        {shown.map((c) => (
          <article key={c._id} className="card">
            <div className="card-top">
              <span className={`pill ${c.status}`}>{c.status}</span>
              <span className="pill">#{c.charge}</span>
              <span className="pill">sev {c.severity}/5</span>
            </div>
            <h3>{c.title}</h3>
            <div className="vs"><b>{c.plaintiffName}</b> vs <b>{c.defendantName}</b></div>
            <div className="details">{c.details}</div>
            {c.decidedBy && <div className="sentence">Signed by {c.decidedBy}: {c.sentence}</div>}
            <div style={{marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {NEXT_TRANSITIONS[c.status].map((t, i) => (
                <button
                  key={t.to}
                  className={i === 0 && c.status !== 'sentenced' ? 'btn primary' : 'btn'}
                  onClick={() => move(c._id, t.to, c.title)}
                >{t.label}</button>
              ))}
              {NEXT_TRANSITIONS[c.status].length === 0 && <span className="pill">case closed</span>}
            </div>
          </article>
        ))}
      </div>

      <div className="log">
        <b>Court stenographer — </b>
        {log.map((l, i) => <div key={i}>· {l}</div>)}
      </div>
    </div>
  )
}
