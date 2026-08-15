export default function PageIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <section className={`page-intro ${dark ? "page-intro-dark" : ""}`}>
      <div className="shell">
        <p className="section-label">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
