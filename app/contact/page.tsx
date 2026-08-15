import PageIntro from "@/components/PageIntro";
import { site } from "@/lib/content";

export default function ContactPage() {
  return (
    <main><PageIntro eyebrow="Talk to the newsroom" title="Contact & tips" description="Send a story lead, share a public record, correct an error, or tell us what government decision deserves a closer look." />
      <section className="shell contact-grid">
        <div className="contact-primary"><p className="section-label">Send a message</p><h2>What should we investigate?</h2><form action={`mailto:${site.tipEmail}`} method="post" encType="text/plain"><label>Name <span>Optional</span><input name="name" autoComplete="name" /></label><label>Email <span>So we can follow up</span><input type="email" name="email" autoComplete="email" /></label><label>Subject<select name="subject"><option>Story tip</option><option>Submit a public record</option><option>Correction</option><option>General question</option></select></label><label>Message<textarea name="message" rows={7} required /></label><button className="button button-dark" type="submit">Open in email →</button></form></div>
        <aside className="contact-aside"><div><p className="kicker">General inquiries</p><a href={`mailto:${site.email}`}>{site.email}</a></div><div><p className="kicker">Confidential tips</p><a href={`mailto:${site.tipEmail}`}>{site.tipEmail}</a><p>For sensitive material, avoid using a work device or employer-managed account.</p></div><div className="corrections-box"><strong>Corrections policy</strong><p>Accuracy comes first. If we get something wrong, tell us. Verified corrections are made promptly and noted transparently.</p></div></aside>
      </section>
    </main>
  );
}
