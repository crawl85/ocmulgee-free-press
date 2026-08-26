import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import NewsroomStandardsNav from "@/components/NewsroomStandardsNav";
import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: `The reporting, sourcing, attribution, fairness, and corrections standards followed by ${site.name}.`,
  alternates: { canonical: absoluteUrl("/editorial-standards/") },
};

const standards = [
  {
    title: "Accuracy and verification",
    text: "Material facts should be supported by records, direct observation, on-the-record interviews, or clearly identified reliable sources. Names, dates, quotations, figures, and links are checked before publication.",
  },
  {
    title: "Primary sources",
    text: "Original documents, official data, court records, meeting materials, and public-records responses are preferred whenever they are available. Relevant source material is linked in the article or published in the Open Records Library when practical and lawful.",
  },
  {
    title: "Attribution and links",
    text: "Facts first reported by another outlet are credited. Direct links should point to the original document, study, official report, or reporting that supports the claim. Sources sections distinguish primary records from secondary news reports.",
  },
  {
    title: "Fairness and response",
    text: "People and institutions facing significant criticism should receive a meaningful opportunity to respond when circumstances allow. Their relevant response is presented accurately, without surrendering the newsroom's independent judgment.",
  },
  {
    title: "News, analysis, and opinion",
    text: "Straight reporting, analysis, and editorial commentary should be labeled so readers can understand the nature of the work. Analysis and opinion must still rest on accurate facts and honestly represented sources.",
  },
  {
    title: "Source protection and privacy",
    text: "The newsroom weighs public importance against foreseeable harm. Confidentiality is not promised casually. Identifying details may be withheld when disclosure would expose a source or vulnerable person to unnecessary risk.",
  },
  {
    title: "Conflicts and independence",
    text: "Coverage decisions should not be controlled by the agencies, officials, companies, or advocacy organizations being covered. Material conflicts that could reasonably affect a reader's understanding should be disclosed.",
  },
  {
    title: "Corrections and updates",
    text: "Substantive errors are corrected promptly and transparently. Material updates are dated or explained when they change a reader's understanding of the original report.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Trust and accountability"
        title="Editorial Standards"
        description="These principles guide how The Ocmulgee Free Press gathers evidence, evaluates claims, treats sources, labels commentary, and corrects the record."
      />

      <section className="shell trust-layout">
        <div className="trust-content">
          <section>
            <p className="section-label">Our commitment</p>
            <h2>Original reporting supported by evidence</h2>
            <p>
              Public-interest journalism earns trust through work that readers can
              inspect. We will continue publishing original reporting supported by
              public records and other verifiable evidence, while clearly explaining
              what is known, what is disputed, and what remains uncertain.
            </p>
          </section>

          <div className="standards-list">
            {standards.map((standard, index) => (
              <section key={standard.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{standard.title}</h2>
                  <p>{standard.text}</p>
                </div>
              </section>
            ))}
          </div>

          <section className="trust-contact-box">
            <p className="section-label">Accountability</p>
            <h2>See something that does not meet these standards?</h2>
            <p>
              Contact the newsroom at {" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Accuracy concerns
              are handled under the <Link href="/corrections">Corrections Policy</Link>.
            </p>
          </section>
        </div>

        <NewsroomStandardsNav />
      </section>
    </main>
  );
}
