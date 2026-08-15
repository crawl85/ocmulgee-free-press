import PageIntro from "@/components/PageIntro";
import RecordsExplorer from "@/components/RecordsExplorer";
import { records } from "@/lib/content";

export default function RecordsPage() {
  return <main><PageIntro eyebrow="Source documents" title="Open Records Library" description="Public records should be public. Search, view, and download the primary-source material behind our reporting." /><section className="shell records-section"><div className="records-note"><strong>About this library</strong><p>Records are published in the format received whenever possible. Personal information may be redacted to protect private individuals. Publication does not imply wrongdoing.</p></div><RecordsExplorer records={records} /></section></main>;
}
