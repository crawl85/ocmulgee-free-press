import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

const mapUrl =
  "https://maps.deflock.org/?lat=39.8283&lng=-98.5795&zoom=2.50";

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
        className="shell"
        aria-labelledby="deflock-map-heading"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        <p>INTERACTIVE CAMERA MAP</p>
        <h2 id="deflock-map-heading">Explore the DeFlock Map</h2>

        <p>
          Explore reported locations of automated license-plate readers and
          other surveillance cameras across the United States.
        </p>

        <iframe
          src={mapUrl}
          title="DeFlock interactive surveillance-camera map"
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
          style={{
            display: "block",
            width: "100%",
            height: "650px",
            border: "1px solid #b8b8b8",
          }}
        />

        <p style={{ fontSize: "0.9rem", maxWidth: "850px" }}>
          <strong>Map notice:</strong> Locations are contributed by members of
          the public and may be incomplete, outdated, or unverified. Inclusion
          does not independently confirm that a camera is currently active.
        </p>

        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          <strong>Open the full DeFlock map ↗</strong>
        </a>
      </section>

      <section className="tip-banner">
        <div className="shell">
          <div>
            <p>KNOW SOMETHING?</p>
            <h2>Help us see what the cameras see.</h2>
          </div>

          <p>
            We welcome policies, screenshots, training materials, contracts,
            and firsthand accounts from public employees and community members.
          </p>

          <Link className="button button-light" href="/contact">
            Share a tip securely →
          </Link>
        </div>
      </section>
    </main>
  );
}
