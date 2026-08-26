import Link from "next/link";
import Image from "next/image";
import { getAuthorProfile, type Article } from "@/lib/content";

export default function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  const authorProfile = getAuthorProfile(article.author);

  return (
    <article className={`story-card accent-${article.accent} ${large ? "story-card-large" : ""}`}>
      <div
        className={`story-art ${article.featuredImage ? "story-art-image" : ""}`}
        aria-hidden={article.featuredImage ? undefined : true}
      >
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || ""}
            fill
            sizes={large ? "(max-width: 620px) 100vw, 50vw" : "(max-width: 620px) 100vw, 33vw"}
            unoptimized
          />
        ) : null}
        <span>{article.section}</span>
        {!article.featuredImage ? <i /> : null}
      </div>
      <div className="story-copy">
        <p className="kicker">{article.eyebrow}</p>
        <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
        <p className="dek">{article.dek}</p>
        <div className="byline"><span>By {authorProfile ? <Link href={`/authors/${authorProfile.slug}`}>{article.author}</Link> : article.author}</span><span>{article.date}</span></div>
      </div>
    </article>
  );
}
