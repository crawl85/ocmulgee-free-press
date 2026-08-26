import articlesData from "@/content/articles.json";
import fortWayneFlockRejectionArticle from "@/content/article-fort-wayne-flock-rejection.json";
import falseFlockHitsArticle from "@/content/article-false-flock-hits.json";
import houstonFlockMisuseArticle from "@/content/article-houston-flock-misuse.json";
import authorsData from "@/content/authors.json";
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
  dateModified?: string;
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

export interface AuthorProfile {
  slug: string;
  name: string;
  aliases: string[];
  role: string;
  bio: string;
  email: string;
  location: string;
  image?: string;
  schemaType: "Person" | "Organization";
}

export type RecordItem = (typeof recordsData.records)[number];

export const site = siteData;
export const articles = [fortWayneFlockRejectionArticle, falseFlockHitsArticle, houstonFlockMisuseArticle, ...articlesData.articles] as Article[];
export const authors = authorsData.authors as AuthorProfile[];
export const records = recordsData.records;
export const resources = resourcesData.resources;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getAuthorProfile(bylineOrSlug: string) {
  return authors.find(
    (author) =>
      author.slug === bylineOrSlug ||
      author.name === bylineOrSlug ||
      author.aliases.includes(bylineOrSlug)
  );
}

export function articlesByAuthor(author: AuthorProfile) {
  const acceptedBylines = new Set([author.name, ...author.aliases]);
  return articles.filter((article) => acceptedBylines.has(article.author));
}

export function articlesIn(section: string) {
  return articles.filter((article) => article.section === section);
}
