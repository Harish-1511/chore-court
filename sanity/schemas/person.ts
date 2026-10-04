import {defineField, defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Roommate',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'role',
      type: 'string',
      options: {list: ['plaintiff', 'defendant', 'judge', 'roommate']},
    }),
    defineField({name: 'flatNo', title: 'Flat / Room', type: 'string'}),
    defineField({name: 'avatar', type: 'image', options: {hotspot: true}}),
  ],
})
