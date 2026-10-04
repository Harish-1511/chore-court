// Seed 8 funny cases via Sanity API. Run: npm run seed (needs SANITY_API_TOKEN + project id)
// If no credentials, the web app uses local mock data in web/lib/mock.ts instead.
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token || projectId === 'your-project-id') {
  console.log('No credentials — skipping live seed. Web app will use mock data.')
  process.exit(0)
}

const client = createClient({projectId, dataset, token, apiVersion: '2026-09-01', useCdn: false})

const people = ['Harish (Judge)', 'Priya', 'Rahul', 'Anaya']
const cases = [
  {title: 'The Midnight Maggi Theft', charge: 'food', details: '2 packs missing, wrappers in Rahul bin', severity: 4, status: 'filed'},
  {title: 'Shower Concert at 2AM', charge: 'noise', details: 'Arijit singalong, walls thin', severity: 3, status: 'deliberating'},
  {title: 'Thermostat War: 16°C', charge: 'thermostat', details: 'Blanket budget exceeded', severity: 2, status: 'filed'},
  {title: 'Dish Mountain Everest', charge: 'dishes', details: '14 plates, science experiment growing', severity: 5, status: 'sentenced'},
  {title: 'Borrowed Hoodie, Never Returned', charge: 'laundry', details: 'Seen in 3 Instagram posts', severity: 2, status: 'filed'},
  {title: 'Fridge Shelf Land Grab', charge: 'fridge', details: 'Top shelf fully colonized by meal-prep boxes', severity: 3, status: 'deliberating'},
  {title: 'WiFi Rename Revenge', charge: 'wifi', details: 'SSID changed to "PayYourShare_Rahul"', severity: 1, status: 'pardoned'},
  {title: 'Bathroom Occupation 47min', charge: 'bathroom', details: 'Podcast episode finished inside', severity: 3, status: 'served'},
]

async function main() {
  const ids = {}
  for (const p of people) {
    const doc = await client.create({ _type: 'person', name: p, role: p.includes('Judge') ? 'judge' : 'roommate' })
    ids[p] = doc._id
  }
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i]
    await client.create({
      _type: 'grievance', ...c,
      plaintiff: {_type: 'reference', _ref: ids[people[i % people.length]]},
      defendant: {_type: 'reference', _ref: ids[people[(i + 1) % people.length]]},
      filedAt: new Date().toISOString(),
    })
  }
  console.log('Seeded', cases.length, 'cases.')
}
main()
