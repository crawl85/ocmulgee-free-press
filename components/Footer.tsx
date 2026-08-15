import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">The Ocmulgee <span>Free Press</span></div>
          <p>{site.description}</p>
        </div>
        <div>
          <h2>Sections</h2>
          <Link href="/local">Local</Link>
          <Link href="/records">Open Records</Link>
          <Link href="/flock-watch">FLOCK Watch</Link>
          <Link href="/citizen-resources">Citizen Resources</Link>
        </div>
        <div>
          <h2>Newsroom</h2>
          <Link href="/contact">Contact &amp; tips</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/admin">Content Studio</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 The Ocmulgee Free Press</span>
        <span>No paywall. No party line. Just the receipts.</span>
      </div>
    </footer>
  );
}
