import {defineField, defineType} from 'sanity'

export const appeal = defineType({
  name: 'appeal',
  title: 'Appeal',
  type: 'document',
  fields: [
    defineField({name: 'case', type: 'reference', to: [{type: 'grievance'}]}),
    defineField({name: 'reason', type: 'text'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['open', 'upheld', 'overturned']},
      initialValue: 'open',
    }),
  ],
})
