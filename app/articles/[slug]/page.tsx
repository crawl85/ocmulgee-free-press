import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { articles, getArticle, type ArticleImage } from "@/lib/content";

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

function renderArticleImage(image: ArticleImage, key: string) {
  return (
    <figure className="article-inline-image" key={key}>
      <Image
        src={image.image}
        alt={image.alt || ""}
        width={1600}
        height={900}
        sizes="(max-width: 900px) 100vw, 755px"
        unoptimized
      />

      {image.caption ? (
        <figcaption>{image.caption}</figcaption>
      ) : null}
    </figure>
  );
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

        {article.featuredImage ? (
          <figure className="article-feature-image">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || ""}
              width={1920}
              height={1080}
              sizes="100vw"
              priority
              unoptimized
            />

            {article.featuredImageCaption ? (
              <figcaption className="shell">
                {article.featuredImageCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className={`article-hero accent-${article.accent}`}>
            <div className="shell">
              <span>{article.section}</span>

              <strong>
                {article.title.split(" ").slice(0, 3).join(" ")}
              </strong>
            </div>
          </div>
        )}

        <div className="shell article-body">
          <aside>
            <span>Share</span>

            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}`}
            >
              Email
            </a>
          </aside>

          <div>
            {(article.images || [])
              .filter(
                (image) =>
                  Number(image.afterParagraph ?? 1) <= 0
              )
              .map((image, index) =>
                renderArticleImage(
                  image,
                  `${article.slug}-image-before-${index}`
                )
              )}

            {article.body.map((block, index) => {
              const blockNumber = index + 1;
              const blockKey = `${article.slug}-body-${index}`;

              const bodyElement = block.startsWith("## ") ? (
                <h2 key={blockKey}>
                  {renderInlineLinks(block.slice(3))}
                </h2>
              ) : block.startsWith("- ") ? (
                <p key={blockKey} className="article-list-item">
                  <span aria-hidden="true">• </span>
                  {renderInlineLinks(block.slice(2))}
                </p>
              ) : (
                <p key={blockKey}>
                  {renderInlineLinks(block)}
                </p>
              );

              const imagesAfterBlock = (
                article.images || []
              ).filter((image) => {
                const requestedPosition = Number(
                  image.afterParagraph ?? 1
                );

                const position = Math.min(
                  Math.max(requestedPosition, 1),
                  article.body.length
                );

                return position === blockNumber;
              });

              return (
                <Fragment
                  key={`${article.slug}-group-${index}`}
                >
                  {bodyElement}

                  {imagesAfterBlock.map(
                    (image, imageIndex) =>
                      renderArticleImage(
                        image,
                        `${article.slug}-image-${index}-${imageIndex}`
                      )
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
}
