import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function AccountabilityPage() {
  const accountability = articles.filter((article) => article.section === "Accountability");

  return (
    <main>
      <PageIntro
        eyebrow="Government accountability & public oversight"
        title="Accountability"
        description="Investigations and reporting focused on government conduct, public institutions, civil rights, transparency, and the use of public power."
      />
      <section className="shell listing-section">
        <div className="listing-grid">
          {accountability.map((article, index) => (
            <ArticleCard key={article.slug} article={article} large={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
