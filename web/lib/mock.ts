export type CaseStatus = 'filed' | 'deliberating' | 'sentenced' | 'served' | 'pardoned'

export interface CourtCase {
  _id: string
  title: string
  charge: string
  details: string
  severity: number
  status: CaseStatus
  plaintiffName: string
  defendantName: string
  sentence?: string
  decidedBy?: string
}

// GROQ used live (see lib/sanity.ts):
// *[_type=="grievance"]{..., "plaintiffName": plaintiff->name, "defendantName": defendant->name,
//   "verdict": *[_type=="verdict" && case._ref==^._id][0]{sentence, decidedBy}} | order(severity desc)

export const MOCK_CASES: CourtCase[] = [
  {_id: '1', title: 'The Midnight Maggi Theft', charge: 'food', details: '2 packs missing, wrappers in bin', severity: 4, status: 'filed', plaintiffName: 'Priya', defendantName: 'Rahul'},
  {_id: '2', title: 'Shower Concert at 2AM', charge: 'noise', details: 'Arijit singalong, walls thin', severity: 3, status: 'deliberating', plaintiffName: 'Anaya', defendantName: 'Priya'},
  {_id: '3', title: 'Thermostat War: 16C', charge: 'thermostat', details: 'Blanket budget exceeded', severity: 2, status: 'filed', plaintiffName: 'Rahul', defendantName: 'Anaya'},
  {_id: '4', title: 'Dish Mountain Everest', charge: 'dishes', details: '14 plates, science experiment', severity: 5, status: 'sentenced', plaintiffName: 'Harish (Judge)', defendantName: 'Rahul', sentence: '3x dishes + trash week', decidedBy: 'Harish'},
  {_id: '5', title: 'Borrowed Hoodie, Never Returned', charge: 'laundry', details: 'Seen in 3 IG posts', severity: 2, status: 'filed', plaintiffName: 'Anaya', defendantName: 'Priya'},
  {_id: '6', title: 'Fridge Shelf Land Grab', charge: 'fridge', details: 'Top shelf colonized by meal-prep', severity: 3, status: 'deliberating', plaintiffName: 'Rahul', defendantName: 'Priya'},
  {_id: '7', title: 'WiFi Rename Revenge', charge: 'wifi', details: 'SSID: PayYourShare_Rahul', severity: 1, status: 'pardoned', plaintiffName: 'Rahul', defendantName: 'Anaya', sentence: 'Forgiven after samosa bribe', decidedBy: 'Harish'},
  {_id: '8', title: 'Bathroom Occupation 47min', charge: 'bathroom', details: 'Full podcast episode inside', severity: 3, status: 'served', plaintiffName: 'Priya', defendantName: 'Anaya', sentence: 'Morning slot revoked 1 week', decidedBy: 'Harish'},
]

export const NEXT_TRANSITIONS: Record<CaseStatus, {to: CaseStatus; label: string}[]> = {
  filed: [{to: 'deliberating', label: 'Claim (start trial)'}],
  deliberating: [
    {to: 'sentenced', label: 'Sentence (needs judge sign)'},
    {to: 'filed', label: 'Send back'},
  ],
  sentenced: [
    {to: 'served', label: 'Mark served'},
    {to: 'pardoned', label: 'Pardon'},
    {to: 'deliberating', label: 'Appeal -> reopen'},
  ],
  served: [],
  pardoned: [],
}
