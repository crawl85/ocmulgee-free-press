import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function FlockWatchPage() {
  const flock = articles.filter(
    (article) => article.section === "FLOCK Watch"
  );

  return (
    <main className="flock-page">
      <PageIntro
        dark
        eyebrow="Surveillance, documented"
        title="FLOCK Watch"
        description="Tracking automated license-plate readers, data sharing, camera networks, and the misuse of mass-surveillance technology."
      />

      <section className="shell flock-dashboard">
        <div>
          <span>REPORTING FOCUS</span>
          <strong>Search logs</strong>
          <p>Who ran the search, why, and under which case?</p>
        </div>

        <div>
          <span>REPORTING FOCUS</span>
          <strong>Data sharing</strong>
          <p>Which agencies can reach local vehicle-location data?</p>
        </div>

        <div>
          <span>REPORTING FOCUS</span>
          <strong>Public cost</strong>
          <p>Contracts, renewals, hardware, and hidden add-ons.</p>
        </div>
      </section>

      <section className="shell flock-stories">
        <div className="section-heading">
          <div>
            <p>Investigations</p>
            <h2>Following the digital trail</h2>
          </div>

          <Link href="/records">Open the source records →</Link>
        </div>

        {flock.map((article) => (
          <ArticleCard key={article.slug} article={article} large />
        ))}
      </section>

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
            overflow: "hidden"
