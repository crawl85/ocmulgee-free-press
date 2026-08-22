import type { Metadata } from "next";
import CivicCalendar from "@/components/CivicCalendar";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Macon-Bibb Civic Calendar",
  description: "Search Bibb County commission meetings and other civic events, browse by date or meeting type, and sign up for meeting alerts.",
  alternates: { canonical: "/civic-calendar/" },
};

export default function CivicCalendarPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Public meetings & civic events"
        title="Macon-Bibb Civic Calendar"
        description="Search commission meetings, board sessions, hearings, and other public events published by Macon-Bibb County."
      />
      <CivicCalendar />
    </main>
  );
}
