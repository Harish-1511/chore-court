import {createClient} from '@sanity/client'
import {MOCK_CASES, CourtCase} from './mock'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const isLive = Boolean(projectId && projectId !== 'your-project-id')

const client = isLive
  ? createClient({projectId: projectId!, dataset, apiVersion: '2026-09-01', useCdn: true})
  : null

export const CASES_QUERY = `*[_type=="grievance"]{ _id, title, charge, details, severity, status, "plaintiffName": plaintiff->name, "defendantName": defendant->name, "verdict": *[_type=="verdict" && case._ref==^._id][0]{sentence, decidedBy}} | order(severity desc)`

export async function getCases(): Promise<CourtCase[]> {
  if (!client) return MOCK_CASES
  try {
    const rows: any[] = await client.fetch(CASES_QUERY)
    return rows.map((r) => ({
      _id: r._id, title: r.title, charge: r.charge, details: r.details,
      severity: r.severity ?? 1, status: r.status ?? 'filed',
      plaintiffName: r.plaintiffName ?? '?', defendantName: r.defendantName ?? '?',
      sentence: r.verdict?.sentence, decidedBy: r.verdict?.decidedBy,
    }))
  } catch {
    return MOCK_CASES
  }
}
