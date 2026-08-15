import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function FlockWatchPage() {
  const flock = articles.filter((article) => article.section === "FLOCK Watch");
  return (
    <section
  aria-labelledby="deflock-map-heading"
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem 4rem",
  }}
>
  <div style={{ marginBottom: "1rem" }}>
    <p
      style={{
        margin: "0 0 .35rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".08em",
      }}
    >
      Surveillance Camera Map
    </p>

    <h2 id="deflock-map-heading" style={{ margin: 0 }}>
      Explore the DeFlock Map
    </h2>

    <p style={{ maxWidth: "760px", lineHeight: 1.6 }}>
      Explore reported locations of automated license-plate readers and
      other surveillance cameras across the United States.
    </p>
  </div>

  <div
    style={{
      width: "100%",
      height: "clamp(430px, 70vh, 720px)",
      overflow: "hidden",
      border: "1px solid #b8b8b8",
      borderRadius: "4px",
      background: "#e8e8e8",
    }}
  >
    <iframe
      src="https://maps.deflock.org/?lat=39.8283&lng=-98.5795&zoom=2.50"
      title="DeFlock interactive surveillance-camera map"
      loading="lazy"
      referrerPolicy="no-referrer"
      allowFullScreen
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
      }}
    />
  </div>

  <p
    style={{
      margin: "1rem 0 .5rem",
      maxWidth: "850px",
      fontSize: ".9rem",
      lineHeight: 1.55,
    }}
  >
    <strong>Map notice:</strong> Camera locations are contributed by members
    of the public and may be incomplete, outdated, or unverified. Inclusion
    on this map does not independently confirm that a camera is currently
    active.
  </p>

  <a
    href="https://maps.deflock.org/?lat=39.8283&lng=-98.5795&zoom=2.50"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      fontWeight: 700,
      textDecoration: "underline",
    }}
  >
    Open the full DeFlock map ↗
  </a>
</section>
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
