import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import NewsroomStandardsNav from "@/components/NewsroomStandardsNav";
import { site } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name}, its public-interest mission, coverage, and reporting approach.`,
  alternates: { canonical: absoluteUrl("/about/") },
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About the publication"
        title={`About ${site.name}`}
        description="Independent public-interest journalism built to help readers understand government decisions, exercise their rights, and examine the records behind the news."
      />

      <section className="shell trust-layout">
        <div className="trust-content">
          <section>
            <p className="section-label">Our mission</p>
            <h2>The truth belongs to the public.</h2>
            <p>
              {site.name} reports on government accountability, civil rights,
              public records, surveillance, and civic life. The publication is
              rooted in {site.location} and also covers consequential public-policy
              issues beyond Middle Georgia when the reporting serves a broader
              public interest.
            </p>
          </section>

          <section>
            <p className="section-label">How we report</p>
            <h2>Documents first. Claims checked.</h2>
            <p>
              Our reporting draws on public records, official documents, public
              meetings, interviews, direct observations, and clearly attributed
              secondary reporting. Whenever practical, readers receive a direct
              link to the source material so they can examine the evidence for
              themselves.
            </p>
            <p>
              Relevant primary-source material is preserved in the {" "}
              <Link href="/records">Open Records Library</Link> as it becomes
              available.
            </p>
          </section>

          <section>
            <p className="section-label">Independence</p>
            <h2>A newsroom, not an official government source.</h2>
            <p>
              {site.name} is an independent publication. It does not speak for the
              agencies, officials, companies, or advocacy organizations it covers.
              News judgments are guided by public importance, verifiable evidence,
              and the standards published on this site.
            </p>
          </section>

          <section>
            <p className="section-label">Bylines</p>
            <h2>Who is responsible for the work?</h2>
            <p>
              Organizational bylines such as “The Ocmulgee Free Press” and
              “Ocmulgee Free Press Staff” are used for collaboratively reported
              work and newsroom editorials. The publication remains responsible
              for the accuracy of every article carrying those bylines. Named
              contributor profiles will be added as the newsroom grows.
            </p>
          </section>

          <section className="trust-contact-box">
            <p className="section-label">Reach the newsroom</p>
            <h2>Tips, records, questions, and corrections</h2>
            <p>
              Email <a href={`mailto:${site.email}`}>{site.email}</a> or use the {" "}
              <Link href="/contact">contact page</Link>. For an accuracy concern,
              please follow the <Link href="/corrections">corrections process</Link>.
            </p>
          </section>
        </div>

        <NewsroomStandardsNav />
      </section>
    </main>
  );
}
