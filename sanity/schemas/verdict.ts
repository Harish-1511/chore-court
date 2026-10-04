import {defineField, defineType} from 'sanity'

export const verdict = defineType({
  name: 'verdict',
  title: 'Verdict',
  type: 'document',
  fields: [
    defineField({name: 'case', type: 'reference', to: [{type: 'grievance'}]}),
    defineField({name: 'ruling', type: 'text'}),
    defineField({name: 'sentence', type: 'string', description: 'e.g. 3x dishes + trash week'}),
    defineField({name: 'fineInDishes', type: 'number'}),
    defineField({name: 'decidedBy', type: 'string', description: 'judge name — stays empty until a person signs'}),
    defineField({name: 'decidedAt', type: 'datetime'}),
  ],
})
