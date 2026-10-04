// Chore Court workflow — modeled as data next to content.
// filed -> deliberating -> sentenced -> served | pardoned
// appeal reopens sentenced -> deliberating. decidedBy stays empty until a person signs.
// Deploy with: npx sanity workflow deploy (Workflows early access, see sanity.io/docs/workflows/cookbook)
// This file mirrors the cookbook editorial-review shape so judges can follow it without the CLI.

export const choreCourtWorkflow = {
  name: 'choreCourt',
  subject: 'grievance',
  stages: ['filed', 'deliberating', 'sentenced', 'served', 'pardoned'],
  transitions: [
    {from: 'filed', to: 'deliberating', action: 'claim', actor: 'judge'},
    {from: 'deliberating', to: 'sentenced', action: 'sentence', actor: 'judge', requires: ['decidedBy']},
    {from: 'deliberating', to: 'filed', action: 'sendBack', actor: 'judge'},
    {from: 'sentenced', to: 'served', action: 'markServed', actor: 'any'},
    {from: 'sentenced', to: 'pardoned', action: 'pardon', actor: 'judge'},
    {from: 'sentenced', to: 'deliberating', action: 'appeal', actor: 'defendant'},
  ],
  guards: [
    'decidedBy must be non-empty to enter sentenced',
    'served and pardoned are terminal',
  ],
}
