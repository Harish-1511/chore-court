import {defineField, defineType} from 'sanity'

export const grievance = defineType({
  name: 'grievance',
  title: 'Case',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'charge', type: 'string', description: 'e.g. dishes, noise, thermostat'}),
    defineField({name: 'plaintiff', type: 'reference', to: [{type: 'person'}]}),
    defineField({name: 'defendant', type: 'reference', to: [{type: 'person'}]}),
    defineField({name: 'details', type: 'text'}),
    defineField({
      name: 'severity',
      type: 'number',
      validation: (r) => r.min(1).max(5),
      description: '1 petty, 5 eviction-worthy',
    }),
    defineField({
      name: 'evidence',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['filed', 'deliberating', 'sentenced', 'served', 'pardoned']},
      initialValue: 'filed',
    }),
    defineField({name: 'filedAt', type: 'datetime', initialValue: () => new Date().toISOString()}),
  ],
})
