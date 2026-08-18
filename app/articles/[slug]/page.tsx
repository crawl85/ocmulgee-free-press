import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/content";

function renderInlineLinks(text: string) {
  return text
    .split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g)
    .map((part, index) => {
      const match = part.match(
        /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/
      );

      if (!match) return part;

      return (
        <a
          key={`${match[2]}-${index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>
      );
    });
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const sectionLink =
    article.section === "FLOCK Watch"
      ? "/flock-watch"
      : article.section === "Local"
        ? "/local"
        : "/citizen-resources";

  return (
    <main>
      <article className="article-page">
        <header className="article-header shell">
          <Link href={sectionLink} className="kicker">
            {article.section} / {article.eyebrow}
          </Link>

          <h1>{article.title}</h1>

          <p className="article-dek">{article.dek}</p>

          <div className="byline">
            <span>By {article.author}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        <div className={`article-hero accent-${article.accent}`}>
          <div className="shell">
            <span>{article.section}</span>
            <strong>
              {article.title.split(" ").slice(0, 3).join(" ")}
            </strong>
          </div>
        </div>

        <div className="shell article-body">
          <aside>
            <span>Share</span>

            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}`}
            >
              Email
            </a>

            <a href="#records">Sources</a>
          </aside>

          <div>
            {article.body.map((paragraph, index) => (
              <p key={`${article.slug}-${index}`}>
                {renderInlineLinks(paragraph)}
              </p>
            ))}

            <div id="records" className="article-sources">
              <strong>Source transparency</strong>

              <p>
                Relevant primary-source documents are published in our Open
                Records Library as they become available.
              </p>

              <Link href="/records">
                Browse source documents →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
