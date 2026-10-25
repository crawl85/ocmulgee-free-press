import Image from "next/image";
import Link from "next/link";
import PetitionCallout from "@/components/PetitionCallout";
import { articles, records, type Article } from "@/lib/content";

function StoryVisual({ article, priority = false }: { article: Article; priority?: boolean }) {
  if (article.featuredImage) {
    return (
      <Image
        src={article.featuredImage}
        alt={article.featuredImageAlt || ""}
        fill
        priority={priority}
        sizes={priority ? "(max-width: 900px) 100vw, 68vw" : "(max-width: 620px) 100vw, 32vw"}
        unoptimized
      />
    );
  }

  return (
    <div className={`mag-editorial-art accent-${article.accent}`} aria-hidden="true">
      <span>{article.section}</span>
      <i />
      <b>OFP</b>
    </div>
  );
}

function StoryMeta({ article }: { article: Article }) {
  return (
    <p className="mag-meta">
      <span>By {article.author}</span>
      <span>{article.date}</span>
      <span>{article.readTime}</span>
    </p>
  );
}

export default function Home() {
  const feature = articles[0];
  const secondary = articles.slice(1, 3);
  const latest = articles.slice(3, 7);

  return (
    <main className="mag-homepage">
      <section className="shell mag-hero" aria-labelledby="lead-story-title">
        <article className="mag-lead">
          <Link className="mag-lead-media" href={`/articles/${feature.slug}`} aria-label={`Read ${feature.title}`}>
            <StoryVisual article={feature} priority />
          </Link>
          <div className="mag-lead-copy">
            <p className="mag-kicker">{feature.eyebrow}</p>
            <h1 id="lead-story-title"><Link href={`/articles/${feature.slug}`}>{feature.title}</Link></h1>
            <p className="mag-dek">{feature.dek}</p>
            <StoryMeta article={feature} />
          </div>
        </article>

        <div className="mag-secondary-rail" aria-label="More top stories">
          {secondary.map((article) => (
            <article className="mag-secondary-card" key={article.slug}>
              <Link className="mag-secondary-media" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
                <StoryVisual article={article} />
              </Link>
              <div>
                <p className="mag-kicker">{article.eyebrow}</p>
                <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
                <StoryMeta article={article} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mag-watchline" aria-label="The Watch Desk">
        <div className="shell mag-watchline-inner">
          <p><span aria-hidden="true" /> The Watch Desk</p>
          <strong>Documents first. Decisions traced. Evidence published.</strong>
          <Link href="/records">Search {records.length} featured records <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="shell mag-latest">
        <div className="mag-section-heading">
          <div><p>Latest reporting</p><h2>News that belongs to you</h2></div>
          <Link href="/local">All local stories <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mag-story-grid">
          {latest.map((article) => (
            <article className="mag-story-card" key={article.slug}>
              <Link className="mag-story-media" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
                <StoryVisual article={article} />
              </Link>
              <p className="mag-kicker">{article.eyebrow}</p>
              <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
              <p className="mag-card-dek">{article.dek}</p>
              <StoryMeta article={article} />
            </article>
          ))}
        </div>
      </section>

      <section className="mag-flock-feature">
        <div className="shell mag-flock-grid">
          <div className="mag-flock-copy">
            <p className="mag-band-label">Ongoing investigation</p>
            <h2>FLOCK<br /><em>WATCH</em></h2>
            <p>Follow our reporting on automated license plate readers, public contracts, search audits, policy failures, and the people pushing for accountability.</p>
            <div className="mag-flock-actions">
              <Link className="mag-button mag-button-light" href="/flock-watch">Explore FLOCK Watch <span aria-hidden="true">→</span></Link>
              <Link href="/records">Read the source records</Link>
            </div>
          </div>
          <div className="mag-flock-visual" aria-hidden="true">
            <Image src="/uploads/pexels-charles-criscuolo-36156612.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" unoptimized />
            <span>Surveillance<br />under scrutiny</span>
          </div>
        </div>
      </section>

      <section className="shell mag-public-tools" aria-label="Public records and citizen resources">
        <article className="mag-tool-card mag-tool-records">
          <p className="mag-kicker">The public record</p>
          <h2>Read the receipts.</h2>
          <p>Search the contracts, audit logs, correspondence, policies, meeting packets, and records behind our reporting.</p>
          <Link href="/records">Explore {records.length} featured records <span aria-hidden="true">→</span></Link>
          <div className="mag-file-mark" aria-hidden="true"><i /><i /><i /></div>
        </article>
        <article className="mag-tool-card mag-tool-citizen">
          <p className="mag-kicker">Citizen resources</p>
          <h2>Put public rights to work.</h2>
          <p>Use practical guides, request templates, meeting tools, and plain-language explanations built for Georgians.</p>
          <Link href="/citizen-resources">Use the civic toolkit <span aria-hidden="true">→</span></Link>
          <div className="mag-rights-mark" aria-hidden="true"><span>YOUR<br />RIGHTS</span></div>
        </article>
      </section>

      <PetitionCallout />
    </main>
  );
}
