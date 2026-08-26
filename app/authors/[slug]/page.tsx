import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import NewsroomStandardsNav from "@/components/NewsroomStandardsNav";
import {
  articlesByAuthor,
  authors,
  getAuthorProfile,
  site,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorProfile(slug);

  if (!author) return {};

  return {
    title: author.name,
    description: author.bio,
    alternates: { canonical: absoluteUrl(`/authors/${author.slug}/`) },
    openGraph: {
      type: "profile",
      title: author.name,
      description: author.bio,
      url: absoluteUrl(`/authors/${author.slug}/`),
      siteName: site.name,
      images: author.image ? [absoluteUrl(author.image)] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorProfile(slug);

  if (!author) notFound();

  const authorUrl = absoluteUrl(`/authors/${author.slug}/`);
  const authorArticles = articlesByAuthor(author);
  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: authorUrl,
    name: `${author.name} author profile`,
    mainEntity: {
      "@type": author.schemaType,
      name: author.name,
      description: author.bio,
      url: authorUrl,
      email: author.email,
      image: author.image ? absoluteUrl(author.image) : undefined,
      areaServed: author.location,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Author profile"
        title={author.name}
        description={author.role}
      />

      <section className="shell trust-layout author-profile-layout">
        <div className="trust-content">
          <section className="author-profile-summary">
            {author.image ? (
              <Image
                src={author.image}
                alt={`${author.name} logo`}
                width={1200}
                height={400}
                unoptimized
              />
            ) : null}
            <p>{author.bio}</p>
            <dl>
              <div><dt>Role</dt><dd>{author.role}</dd></div>
              <div><dt>Based in</dt><dd>{author.location}</dd></div>
              <div><dt>Contact</dt><dd><a href={`mailto:${author.email}`}>{author.email}</a></dd></div>
            </dl>
            <p className="author-profile-policy">
              Read the newsroom’s <Link href="/editorial-standards">Editorial Standards</Link> and {" "}
              <Link href="/corrections">Corrections Policy</Link>.
            </p>
          </section>

          <section className="author-articles">
            <div className="section-heading">
              <div><p>Published work</p><h2>Articles by this newsroom</h2></div>
            </div>
            <div className="listing-grid">
              {authorArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} large={index === 0} />
              ))}
            </div>
          </section>
        </div>

        <NewsroomStandardsNav />
      </section>
    </main>
  );
}
