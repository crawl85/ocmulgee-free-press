import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PetitionCallout from "@/components/PetitionCallout";
import { articles, records } from "@/lib/content";

export default function Home() {
  const feature = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article.slug !== feature.slug).slice(0, 3);
  return (
    <main>
      <section className="home-lead shell">
        <div className="lead-grid">
          <article className="lead-story">
            <p className="kicker">{feature.eyebrow}</p>
            <h1><Link href={`/articles/${feature.slug}`}>{feature.title}</Link></h1>
            <p className="lead-dek">{feature.dek}</p>
            <div className="byline"><span>By {feature.author}</span><span>{feature.date}</span><span>{feature.readTime}</span></div>
          </article>
          <Link href={`/articles/${feature.slug}`} className="lead-visual" aria-label={`Read ${feature.title}`}>
            <div className="camera-signal"><i /><i /><i /></div>
            <div className="route-line one" /><div className="route-line two" />
            <div className="lead-stamp"><span>Special Report</span><strong>FLOCK<br />WATCH</strong></div>
            <div className="visual-caption"><b>01</b><span>Tracking surveillance, search by search.</span></div>
          </Link>
        </div>
      </section>

      <section className="accountability-bar">
        <div className="shell accountability-grid">
          <div><span className="pulse" /><strong>THE WATCH DESK</strong></div>
          <p>We obtain the documents. We trace the decisions. We publish the evidence.</p>
          <Link href="/records">Search {records.length} featured records <span>→</span></Link>
        </div>
      </section>

      <PetitionCallout />

      <section className="shell latest-section">
        <div className="section-heading"><div><p>Latest reporting</p><h2>News that belongs to you</h2></div><Link href="/local">View all local stories →</Link></div>
        <div className="latest-grid">
          {latest.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </section>

      <section className="records-promo">
        <div className="shell records-promo-grid">
          <div className="records-promo-copy">
            <p className="section-label">The public record</p>
            <h2>Don&apos;t take our word for it.<br /><em>Read the receipts.</em></h2>
            <p>Our reporting is built on source material. Search contracts, audit logs, correspondence, policies, meeting packets, and other records obtained from public agencies.</p>
            <Link className="button button-light" href="/records">Explore the records library <span>→</span></Link>
          </div>
          <div className="records-stack" aria-hidden="true">
            <div className="paper paper-back"><span>PUBLIC RECORD</span></div>
            <div className="paper paper-mid"><span>MACON-BIBB COUNTY</span><i /><i /><i /><i /></div>
            <div className="paper paper-front"><span>OPEN RECORDS RESPONSE</span><b>CASE FILE</b><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="shell empowerment-section">
        <div className="empowerment-number">50</div>
        <div><p className="section-label">Citizen empowerment</p><h2>Government works for the public.<br />Here&apos;s how to remind it.</h2></div>
        <div><p>Practical guides, request templates, meeting tools, and plain-language explanations of the rights Georgians can use right now.</p><Link className="text-link" href="/citizen-resources">Use the toolkit →</Link></div>
      </section>
    </main>
  );
}
