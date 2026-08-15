import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article className={`story-card accent-${article.accent} ${large ? "story-card-large" : ""}`}>
      <div className="story-art" aria-hidden="true">
        <span>{article.section}</span>
        <i />
      </div>
      <div className="story-copy">
        <p className="kicker">{article.eyebrow}</p>
        <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
        <p className="dek">{article.dek}</p>
        <div className="byline"><span>By {article.author}</span><span>{article.date}</span></div>
      </div>
    </article>
  );
}
