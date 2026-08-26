import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import NewsroomStandardsNav from "@/components/NewsroomStandardsNav";
import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description: `How to report an error to ${site.name} and how the newsroom corrects, clarifies, and updates published work.`,
  alternates: { canonical: absoluteUrl("/corrections/") },
};

export default function CorrectionsPage() {
  const correctionEmail = `mailto:${site.email}?subject=${encodeURIComponent("Correction request")}`;

  return (
    <main>
      <PageIntro
        eyebrow="Accuracy and accountability"
        title="Corrections Policy"
        description="When we get something wrong, we correct it. Readers should be able to see what changed and why it changed."
      />

      <section className="shell trust-layout">
        <div className="trust-content">
          <section>
            <p className="section-label">Report an error</p>
            <h2>Send us the article and the evidence.</h2>
            <p>
              Email <a href={correctionEmail}>{site.email}</a> with “Correction
              request” in the subject line. Please include the article URL, the
              specific statement you believe is inaccurate, an explanation of the
              issue, and any record or source that supports the requested change.
            </p>
            <a className="button button-dark" href={correctionEmail}>
              Request a correction <span aria-hidden="true">→</span>
            </a>
          </section>

          <section>
            <p className="section-label">What happens next</p>
            <h2>We review the original reporting.</h2>
            <p>
              The newsroom checks the concern against available records, notes,
              recordings, source material, and relevant responses. A request does
              not guarantee a change, but every specific, good-faith accuracy
              concern will be evaluated on its evidence.
            </p>
          </section>

          <section>
            <p className="section-label">How changes are handled</p>
            <h2>Material corrections are disclosed.</h2>
            <ul className="policy-list">
              <li>Substantive factual errors are corrected promptly.</li>
              <li>A correction note explains the material change and its date.</li>
              <li>Clarifications are labeled when the original language was accurate but incomplete or unclear.</li>
              <li>Material updates are identified when new reporting changes the context or understanding of a story.</li>
              <li>Minor spelling, grammar, formatting, or broken-link repairs may be made without a correction note when they do not change meaning.</li>
            </ul>
          </section>

          <section>
            <p className="section-label">Removal requests</p>
            <h2>Accurate reporting is not removed simply because it is unwelcome.</h2>
            <p>
              The newsroom may consider exceptional safety, privacy, legal, or
              ethical circumstances, but the ordinary remedy for a factual error is
              a transparent correction rather than silent deletion.
            </p>
          </section>

          <section className="corrections-log" aria-labelledby="corrections-log-title">
            <p className="section-label">Public correction log</p>
            <h2 id="corrections-log-title">Published corrections</h2>
            <p>
              Material correction notices will remain attached to the affected
              article and will also be listed here as they are issued.
            </p>
          </section>

          <p className="trust-updated">Policy published August 26, 2026.</p>
        </div>

        <NewsroomStandardsNav />
      </section>
    </main>
  );
}
