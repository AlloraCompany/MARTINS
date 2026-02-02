import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "sobre",
  title: "Sobre",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "text_1",
      title: "Texto inicial",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text_2",
      title: "Texto após imagem",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "frase_1",
      title: "Frase 1",
      type: "string"
    }),
    defineField({
      name: "frase_2",
      title: "Frase 2",
      type: "string"
    }),
    defineField({
      name: "frase_3",
      title: "Frase 3",
      type: "string"
    })
  ],
});
