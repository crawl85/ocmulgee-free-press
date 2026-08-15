import articlesData from "@/content/articles.json";
import recordsData from "@/content/records.json";
import resourcesData from "@/content/resources.json";
import siteData from "@/content/site.json";

export type Article = (typeof articlesData.articles)[number];
export type RecordItem = (typeof recordsData.records)[number];

export const site = siteData;
export const articles = articlesData.articles;
export const records = recordsData.records;
export const resources = resourcesData.resources;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articlesIn(section: string) {
  return articles.filter((article) => article.section === section);
}
