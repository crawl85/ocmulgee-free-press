import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function FlockWatchPage() {
  const flock = articles.filter((article) => article.section === "FLOCK Watch");
  return (
    <main className="flock-page">
      <PageIntro dark eyebrow="Surveillance, documented" title="FLOCK Watch" description="Tracking automated license-plate readers, data sharing, camera networks, and the misuse of mass-surveillance technology." />
      <section className="shell flock-dashboard">
        <div><span>REPORTING FOCUS</span><strong>Search logs</strong><p>Who ran the search, why, and under which case?</p></div>
        <div><span>REPORTING FOCUS</span><strong>Data sharing</strong><p>Which agencies can reach local vehicle-location data?</p></div>
        <div><span>REPORTING FOCUS</span><strong>Public cost</strong><p>Contracts, renewals, hardware, and hidden add-ons.</p></div>
      </section>
      <section className="shell flock-stories">
        <div className="section-heading"><div><p>Investigations</p><h2>Following the digital trail</h2></div><Link href="/records">Open the source records →</Link></div>
        {flock.map((article) => <ArticleCard key={article.slug} article={article} large />)}
      </section>
      <section className="tip-banner"><div className="shell"><div><p>KNOW SOMETHING?</p><h2>Help us see what the cameras see.</h2></div><p>We welcome policies, screenshots, training materials, contracts, and firsthand accounts from public employees and community members.</p><Link className="button button-light" href="/contact">Share a tip securely →</Link></div></section>
    </main>
  );
}
