import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { articles, getArticle, getAuthorProfile, site, type ArticleImage } from "@/lib/content";
import { absoluteUrl, articleDateIso } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

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

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const articleUrl = absoluteUrl(`/articles/${article.slug}/`);
  const featuredImage = article.featuredImage
    ? absoluteUrl(article.featuredImage)
    : undefined;
  const publishedTime = articleDateIso(article.date);
  const modifiedTime = articleDateIso(article.dateModified || article.date);
  const authorProfile = getAuthorProfile(article.author);
  const authorUrl = authorProfile
    ? absoluteUrl(`/authors/${authorProfile.slug}/`)
    : undefined;

  return {
    title: article.title,
    description: article.dek,
    authors: [{ name: article.author, url: authorUrl }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: article.dek,
      siteName: site.name,
      publishedTime,
      modifiedTime,
      authors: [article.author],
      section: article.section,
      images: featuredImage
        ? [
            {
              url: featuredImage,
              alt: article.featuredImageAlt || article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: featuredImage ? "summary_large_image" : "summary",
      title: article.title,
      description: article.dek,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
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

  const articleUrl = absoluteUrl(`/articles/${article.slug}/`);
  const publishedTime = articleDateIso(article.date);
  const modifiedTime = articleDateIso(article.dateModified || article.date);
  const authorProfile = getAuthorProfile(article.author);
  const authorUrl = authorProfile
    ? absoluteUrl(`/authors/${authorProfile.slug}/`)
    : undefined;
  const featuredImage = article.featuredImage
    ? absoluteUrl(article.featuredImage)
    : undefined;
  const newsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.title,
    description: article.dek,
    image: featuredImage ? [featuredImage] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    articleSection: article.section,
    isAccessibleForFree: true,
    author: {
      "@type": authorProfile?.schemaType || "Person",
      name: article.author,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/ocmulgee-free-press-logo.png"),
        width: 1200,
        height: 400,
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsArticle).replace(/</g, "\\u003c"),
        }}
      />
      <article className="article-page">
        <header className="article-header shell">
          <Link href={sectionLink} className="kicker">
            {article.section} / {article.eyebrow}
          </Link>

          <h1>{article.title}</h1>

          <p className="article-dek">{article.dek}</p>

          <div className="byline">
            <span>
              By {authorProfile ? (
                <Link href={`/authors/${authorProfile.slug}`}>{article.author}</Link>
              ) : article.author}
            </span>
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
