import { defineType } from "sanity"

// schemas/launches.js
export default defineType({
  name: 'launch',
  title: 'Lançamentos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Descrição curta',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required()
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'date',
      title: 'Data',
      type: 'date'
    },
    {
      name: 'externalLink',
      title: 'Link externo',
      type: 'url'
    },
    {
      name: 'contactLink',
      title: 'Link de contato',
      type: 'url'
    }
  ]
})
