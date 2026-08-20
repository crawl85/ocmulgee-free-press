import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function LocalPage() {
  const local = articles.filter((article) => article.section === "Local");
  const flockWatch = articles.filter((article) => article.section === "FLOCK Watch");

  return (
    <main>
      <PageIntro
        eyebrow="Macon-Bibb & surrounding counties"
        title="Local reporting"
        description="Public money, public meetings, policing, schools, and the decisions shaping life in Middle Georgia."
      />

      <section className="shell listing-section">
        <div className="listing-grid">
          {local.map((article, index) => (
            <ArticleCard key={article.slug} article={article} large={index === 0} />
          ))}
        </div>
      </section>

      <section className="shell listing-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Surveillance & accountability</p>
            <h2>FLOCK Watch</h2>
            <p>Local reporting on Flock Safety cameras, automated license plate readers, surveillance policy, misuse, and oversight.</p>
          </div>
          <Link href="/flock-watch">View all FLOCK Watch reporting →</Link>
        </div>
        <div className="listing-grid">
          {flockWatch.slice(0, 4).map((article, index) => (
            <ArticleCard key={article.slug} article={article} large={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
