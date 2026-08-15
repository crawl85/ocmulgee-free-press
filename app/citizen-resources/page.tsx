import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { resources } from "@/lib/content";

const steps = [
  ["01", "Ask precisely", "Name the records, a useful date range, and the agency likely to possess them."],
  ["02", "Keep the paper trail", "Save your request, acknowledgement, estimate, invoice, follow-ups, and every file produced."],
  ["03", "Challenge specifics", "If records are withheld or fees look inflated, ask for the exact legal and factual basis."],
];

export default function ResourcesPage() {
  return (
    <main><PageIntro eyebrow="Rights you can use" title="Citizen Empowerment" description="Plain-language tools for requesting records, attending meetings, understanding public spending, and holding officials to their obligations." />
      <section className="shell resource-grid">{resources.map((resource, index) => <article key={resource.title}><span className="resource-index">0{index + 1}</span><p className="kicker">{resource.type}</p><h2>{resource.title}</h2><p>{resource.description}</p><button>{resource.action} <span>→</span></button></article>)}</section>
      <section className="process-section"><div className="shell"><div className="section-heading"><div><p>Open records 101</p><h2>Build a request that holds up</h2></div></div><div className="process-grid">{steps.map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      <section className="shell rights-callout"><div><p className="section-label">Need a starting point?</p><h2>Your right to know begins with one clear request.</h2></div><Link className="button button-dark" href="/contact">Ask the newsroom →</Link></section>
    </main>
  );
}
