export const category = [
  { title: "Alto padrão", value: "alto_padrao" },
  { title: "Decoração", value: "decoracao" },
  { title: "Mercado imobiliário", value: "mercado_imobiliario" },
  { title: "Lançamentos", value: "lancamentos" },
  { title: "Novidades", value: "novidades" },
  { title: "Qualidade de vida", value: "qualidade_vida" },
]

export function getCategory(cat: string) {
  return category.find(({ value }) => cat === value)?.title;
}