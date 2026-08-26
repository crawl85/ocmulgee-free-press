import Link from "next/link";

const newsroomPages = [
  ["About", "/about"],
  ["Editorial Standards", "/editorial-standards"],
  ["Corrections", "/corrections"],
  ["Authors", "/authors/ocmulgee-free-press"],
];

export default function NewsroomStandardsNav() {
  return (
    <aside className="trust-nav" aria-label="Newsroom information">
      <p className="section-label">Newsroom information</p>
      {newsroomPages.map(([label, href]) => (
        <Link key={href} href={href}>
          {label} <span aria-hidden="true">→</span>
        </Link>
      ))}
    </aside>
  );
}
