import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);
export const sobreQuery = defineQuery(`*[_type == "sobre"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  "date": coalesce(date, _updatedAt),
`;

const buildingFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Sem título"),
  shortDescription,
  address,
  type,
  image,
  "date": coalesce(date, _updatedAt)
`;

const launchFields = /* groq */ `
  _id,
  "sanity_status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Sem título"),
  status,
  shortDescription,
  image,
  externalLink,
  contactLink,
  "date": coalesce(date, _updatedAt)
`;

export const launchesQuery = defineQuery(`
  *[_type == "launch"] | order(date desc) {
    ${launchFields}
  }
`);

export const buildingsQuery = defineQuery(`
  *[_type == "building"] | order(date asc) {
    ${buildingFields}
  }
`);


export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const recentPostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...3] {
    ${postFields}
  }
`);

export const categoryPostsQuery = defineQuery(`
  *[_type == "post" && (!defined($category) || $category in category) && defined(slug.current)] | order(date desc, _updatedAt desc) {
  ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);
