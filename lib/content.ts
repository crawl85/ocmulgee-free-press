import articlesData from "@/content/articles.json";
import falseFlockHitsArticle from "@/content/article-false-flock-hits.json";
import houstonFlockMisuseArticle from "@/content/article-houston-flock-misuse.json";
import recordsData from "@/content/records.json";
import resourcesData from "@/content/resources.json";
import siteData from "@/content/site.json";

export interface ArticleImage {
  image: string;
  alt?: string;
  caption?: string;
  afterParagraph?: number;
}

export interface Article {
  slug: string;
  section: string;
  eyebrow: string;
  title: string;
  dek: string;
  date: string;
  author: string;
  readTime: string;
  featured: boolean;
  accent: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  images?: ArticleImage[];
  body: string[];
}

export type RecordItem = (typeof recordsData.records)[number];

export const site = siteData;
export const articles = [falseFlockHitsArticle, houstonFlockMisuseArticle, ...articlesData.articles] as Article[];
export const records = recordsData.records;
export const resources = resourcesData.resources;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articlesIn(section: string) {
  return articles.filter((article) => article.section === section);
}
