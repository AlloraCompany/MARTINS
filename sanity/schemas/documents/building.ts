import { defineType } from "sanity"

export default defineType({
  name: 'building',
  title: 'Empreendimentos',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Residencial', value: 'residencial' },
          { title: 'Comercial', value: 'comercial' },
        ],
        layout: 'radio'
      }
    },
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Descrição breve',
      type: 'text',
      rows: 3
    },
    {
      name: 'address',
      title: 'Endereço',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Data',
      type: 'date'
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        },
      ],
    }
  ]
});
