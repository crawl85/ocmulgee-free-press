import ArticleCard from "@/components/ArticleCard";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/lib/content";

export default function LocalPage() {
  const local = articles.filter((article) => ["Local", "Accountability"].includes(article.section));
  return <main><PageIntro eyebrow="Macon-Bibb & surrounding counties" title="Local reporting" description="Public money, public meetings, policing, schools, and the decisions shaping life in Middle Georgia." /><section className="shell listing-section"><div className="listing-grid">{local.map((article, index) => <ArticleCard key={article.slug} article={article} large={index === 0} />)}</div></section></main>;
}
