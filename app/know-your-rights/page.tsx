import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Know Your Rights During Police Encounters",
  description:
    "A practical, Georgia-focused guide to constitutional rights during traffic stops, DUI checkpoints, police visits to your home, questioning, arrest, recording, and phone searches.",
  alternates: { canonical: absoluteUrl("/know-your-rights/") },
};

const quickPhrases = [
  "Am I free to go, or am I being detained?",
  "I do not consent to any searches.",
  "I am invoking my right to remain silent.",
  "I want a lawyer. I will not answer questions without one.",
  "I will not interfere, but I do not consent.",
];

const scenarios = [
  { number: "01", label: "Traffic stop", href: "#traffic-stop" },
  { number: "02", label: "DUI checkpoint", href: "#dui-checkpoint" },
  { number: "03", label: "At your home", href: "#at-home" },
  { number: "04", label: "On foot or in public", href: "#public-encounter" },
  { number: "05", label: "Arrest or questioning", href: "#arrest-questioning" },
  { number: "06", label: "Recording police", href: "#recording-police" },
  { number: "07", label: "Your phone", href: "#phone-searches" },
  { number: "08", label: "After the encounter", href: "#afterward" },
];

export default function KnowYourRightsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Georgia field guide"
        title="Know Your Rights"
        description="What to say, what police may lawfully require, and how to protect yourself without turning the roadside or your front porch into a courtroom."
      />

      <section className="rights-priority" aria-labelledby="rights-priority-title">
        <div className="shell rights-priority-grid">
          <div>
            <p className="section-label">The rule that matters first</p>
            <h2 id="rights-priority-title">Stay safe now. Challenge misconduct later.</h2>
            <p>
              Keep your hands visible, do not run, do not touch an officer, and do not physically resist—even if you believe the stop, search, or arrest is unlawful. Clearly state your rights, comply with physical commands, and preserve the legal fight for afterward.
            </p>
          </div>
          <ol className="rights-script-list" aria-label="Useful phrases during a police encounter">
            {quickPhrases.map((phrase, index) => (
              <li key={phrase}><span>0{index + 1}</span><strong>“{phrase}”</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <nav className="shell rights-scenario-nav" aria-label="Police encounter situations">
        <p className="section-label">Choose the situation</p>
        <div>
          {scenarios.map((scenario) => (
            <a key={scenario.href} href={scenario.href}>
              <span>{scenario.number}</span>{scenario.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="shell rights-guide">
        <aside className="rights-caution" aria-label="Important legal notice">
          <p className="section-label">Read this first</p>
          <h2>Rights are real. So are exceptions.</h2>
          <p>
            This guide provides general legal information, not advice for a particular case. The facts, the officer&apos;s legal basis, local rules, probation or bond conditions, immigration status, and changes in the law can alter the answer.
          </p>
          <p>
            If anyone is in immediate danger, prioritize safety. If you are arrested, charged, injured, or searched, contact a Georgia lawyer promptly.
          </p>
          <p className="rights-reviewed"><strong>Legal review date:</strong> September 5, 2026</p>
        </aside>

        <div className="rights-sections">
          <section id="traffic-stop" className="rights-section">
            <div className="rights-section-number">01</div>
            <div>
              <p className="kicker">In a vehicle</p>
              <h2>Traffic stops</h2>
              <h3>Do this</h3>
              <ul>
                <li>Pull over safely, turn off the engine, lower the window enough to communicate and pass documents, and keep your hands visible.</li>
                <li>If you are the driver, provide your driver&apos;s license and the vehicle documents the law requires. Georgia drivers must display their license on an officer&apos;s demand.</li>
                <li>You may decline investigative questions such as where you are going, where you came from, or whether you have anything illegal. Say: <strong>“I am invoking my right to remain silent.”</strong> Do not lie or hand over false documents.</li>
                <li>If asked to search, say: <strong>“I do not consent to any searches.”</strong> Do not obstruct a search the officer conducts anyway.</li>
                <li>Ask whether you are free to go. Leave calmly only after the officer says yes.</li>
              </ul>
              <h3>Know the limits</h3>
              <p>
                During a lawful stop, police may order the driver and passengers out of the vehicle. They may frisk a person only when they reasonably suspect the person is armed and dangerous. Police may search without your consent when another legal basis exists, including probable cause, a warrant, or certain safety-related grounds. Refusing consent does not give permission, but it also does not physically stop a claimed lawful search.
              </p>
              <p>
                The stop may last long enough to handle its traffic-related mission and ordinary safety checks. Without separate reasonable suspicion, police may not extend it just to investigate unrelated crime—for example, to wait for a drug dog. See <a href="https://supreme.justia.com/cases/federal/us/575/348/" target="_blank" rel="noopener noreferrer">Rodriguez v. United States</a>.
              </p>
            </div>
          </section>

          <section id="dui-checkpoint" className="rights-section">
            <div className="rights-section-number">02</div>
            <div>
              <p className="kicker">Georgia-specific</p>
              <h2>DUI checkpoints and testing</h2>
              <h3>At the checkpoint</h3>
              <ul>
                <li>Stop as directed. Do not make an illegal or unsafe maneuver to avoid a checkpoint.</li>
                <li>Provide the same required driver and vehicle documents you would provide during a traffic stop.</li>
                <li>You may decline general investigative questions and may refuse consent to a vehicle search. Keep the refusal brief and explicit.</li>
              </ul>
              <p>
                Sobriety checkpoints can be constitutional even without individualized suspicion, but they must serve a lawful roadway-safety purpose and operate under neutral, appropriately authorized procedures. Georgia&apos;s leading roadblock framework is discussed in <a href="https://law.justia.com/cases/georgia/supreme-court/1998/s97a1814-1.html" target="_blank" rel="noopener noreferrer">LaFontaine v. State</a>.
              </p>
              <h3>Three different kinds of DUI tests</h3>
              <div className="rights-test-grid">
                <article>
                  <span>Roadside</span>
                  <h4>Field sobriety exercises</h4>
                  <p>Georgia recognizes a right to refuse requested roadside field sobriety exercises. In <a href="https://law.justia.com/cases/georgia/supreme-court/2022/s22a0542.html" target="_blank" rel="noopener noreferrer">Ammons v. State</a>, the Georgia Supreme Court held that evidence of the refusal could not be used at trial.</p>
                </article>
                <article>
                  <span>Roadside</span>
                  <h4>Portable breath test</h4>
                  <p>The preliminary handheld breath test is different from the official state-administered test after arrest. <a href="https://law.justia.com/cases/georgia/supreme-court/2022/s22a0542.html" target="_blank" rel="noopener noreferrer">Ammons</a> also protects the right to refuse this preliminary breath test and bars use of the refusal at trial.</p>
                </article>
                <article>
                  <span>After arrest</span>
                  <h4>State chemical test</h4>
                  <p>Georgia&apos;s implied-consent process is different and carries license consequences. Refusal can trigger an administrative license suspension of at least one year. Breath, blood, and urine are not treated identically in criminal court.</p>
                </article>
              </div>
              <div className="rights-warning">
                <strong>Do not blur those tests together.</strong>
                <p>
                  Under Georgia law, refusal of an official breath test cannot be used against a defendant at the criminal trial, but administrative license consequences can still apply. Refusal of blood or urine testing may be offered at trial, and police may seek a search warrant for blood. If you submit to the required state test, Georgia law provides a right to an additional independent test by qualified personnel at your expense. Read the current <a href="https://dds.georgia.gov/section-10-continued" target="_blank" rel="noopener noreferrer">Georgia DDS implied-consent notice</a> and the GBI&apos;s <a href="https://dofs-gbi.georgia.gov/implied-consent-faqs" target="_blank" rel="noopener noreferrer">Implied Consent FAQs</a>.
                </p>
              </div>
            </div>
          </section>

          <section id="at-home" className="rights-section">
            <div className="rights-section-number">03</div>
            <div>
              <p className="kicker">At your door</p>
              <h2>Police at your home</h2>
              <ul>
                <li>You generally do not have to open the door merely because police knock. You can speak through the closed door and ask why they are there.</li>
                <li>Ask: <strong>“Do you have a warrant?”</strong> If the answer is no, say: <strong>“I do not consent to entry or any search.”</strong></li>
                <li>If officers say they have a warrant, ask to see it. Check the address and what it authorizes, but do not block or physically interfere with entry.</li>
                <li>If they enter or search despite your refusal, repeat that you do not consent and then step aside. Do not argue about validity while the search is happening.</li>
              </ul>
              <p>
                The home receives the Fourth Amendment&apos;s strongest protection, but a warrant is not the only possible basis for entry. Consent and genuine emergencies—such as an immediate threat to life, hot pursuit, or imminent destruction of evidence—can permit warrantless entry. Arrest-warrant and co-occupant-consent rules are fact-specific. See the Library of Congress&apos;s summaries of <a href="https://constitution.congress.gov/browse/essay/amdt4-3-7/ALDE_00000781/" target="_blank" rel="noopener noreferrer">home arrests</a> and <a href="https://constitution.congress.gov/browse/essay/amdt4-6-3/ALDE_00013720/" target="_blank" rel="noopener noreferrer">exigent circumstances</a>.
              </p>
            </div>
          </section>

          <section id="public-encounter" className="rights-section">
            <div className="rights-section-number">04</div>
            <div>
              <p className="kicker">Sidewalks and public places</p>
              <h2>Stopped on foot</h2>
              <ul>
                <li>Ask: <strong>“Am I free to go, or am I being detained?”</strong> If you are free to go, leave calmly. If you are detained, do not walk away.</li>
                <li>You may invoke silence and decline consent to a search. Do not empty your pockets or open a bag merely because an officer asks—unless you choose to consent.</li>
                <li>An officer may briefly detain you based on reasonable suspicion that crime is occurring. A pat-down is limited to a weapons frisk and requires reasonable suspicion that you are armed and dangerous.</li>
                <li>Georgia has no single blanket rule requiring every person in every police encounter to carry and show identification. Specific duties can still apply—including to drivers and in circumstances covered by Georgia&apos;s loitering-or-prowling law. Never give a false name.</li>
              </ul>
              <p>
                A consensual conversation, an investigative detention, and an arrest are legally different. Asking whether you are free to go forces the practical issue into the open; it does not require the officer to use perfect legal terminology.
              </p>
            </div>
          </section>

          <section id="arrest-questioning" className="rights-section">
            <div className="rights-section-number">05</div>
            <div>
              <p className="kicker">Custody and interrogation</p>
              <h2>Arrested or questioned</h2>
              <ul>
                <li>Do not resist, threaten, pull away, or try to explain your way out of the arrest.</li>
                <li>Say both sentences clearly: <strong>“I am invoking my right to remain silent. I want a lawyer and will not answer questions without one.”</strong></li>
                <li>Then stop talking about the facts. Do not discuss the case in a patrol car, booking area, holding cell, or non-lawyer jail call.</li>
                <li>You may give routine booking information. If you need medication or medical care, state that clearly.</li>
              </ul>
              <p>
                Police do not have to read Miranda warnings before every question or arrest. Miranda generally governs custodial interrogation. The practical protection is to invoke your rights clearly rather than waiting for an officer to supply the magic words. See the Library of Congress&apos;s <a href="https://constitution.congress.gov/browse/essay/amdt5-4-7-5/ALDE_00013690/" target="_blank" rel="noopener noreferrer">Miranda requirements</a> and <a href="https://constitution.congress.gov/browse/essay/amdt5-4-7-4/ALDE_00013689/" target="_blank" rel="noopener noreferrer">custody standard</a>.
              </p>
            </div>
          </section>

          <section id="recording-police" className="rights-section">
            <div className="rights-section-number">06</div>
            <div>
              <p className="kicker">Documenting public officials</p>
              <h2>Recording police</h2>
              <ul>
                <li>In Georgia and the rest of the Eleventh Circuit, the First Amendment protects recording police performing their duties in public, subject to reasonable time, place, and manner restrictions.</li>
                <li>Keep a safe distance, do not cross police lines, do not physically interfere, and follow lawful orders about where you may stand.</li>
                <li>Say: <strong>“I am recording from here and I am not interfering.”</strong> Keep the camera steady and capture the wider scene when possible.</li>
                <li>If an officer demands your phone, ask whether you are being ordered to surrender it. Do not fight over the device. State that you do not consent to its search or deletion.</li>
              </ul>
              <p>
                The controlling Eleventh Circuit case is <a href="https://media.ca11.uscourts.gov/opinions/pub/files/19998199.OPN.pdf" target="_blank" rel="noopener noreferrer">Smith v. City of Cumming</a>. The right to record is not a license to interfere, trespass, or ignore otherwise lawful scene-safety restrictions.
              </p>
            </div>
          </section>

          <section id="phone-searches" className="rights-section">
            <div className="rights-section-number">07</div>
            <div>
              <p className="kicker">Digital privacy</p>
              <h2>Your phone and its contents</h2>
              <ul>
                <li>Say: <strong>“I do not consent to a search of my phone.”</strong> Do not volunteer a passcode.</li>
                <li>Police may seize a phone when they claim a lawful basis to preserve evidence, but seizure of the device does not automatically authorize a search of its digital contents.</li>
                <li>As a general rule, police need a warrant to search data on a phone seized during an arrest. Consent and genuine emergencies are important exceptions.</li>
                <li>Whether police can compel a fingerprint, face scan, or passcode can depend on the facts and developing law. Do not rely on a blanket internet claim that one method is always protected.</li>
              </ul>
              <p>
                The Supreme Court&apos;s core rule comes from <a href="https://supreme.justia.com/cases/federal/us/573/373/" target="_blank" rel="noopener noreferrer">Riley v. California</a>: officers generally must obtain a warrant before searching digital information on a phone seized incident to arrest.
              </p>
            </div>
          </section>

          <section id="afterward" className="rights-section">
            <div className="rights-section-number">08</div>
            <div>
              <p className="kicker">Preserve the record</p>
              <h2>After the encounter</h2>
              <ol>
                <li>Write down the date, time, exact location, agencies, names, badge or vehicle numbers, witnesses, commands, statements, searches, and any property taken.</li>
                <li>Preserve original photos, video, messages, receipts, medical records, and documents. Back them up without editing the originals.</li>
                <li>Photograph injuries or damage promptly and seek medical care when needed.</li>
                <li>If charges are possible, speak with a lawyer before posting a detailed account or submitting a long complaint. Public statements can become evidence.</li>
                <li>Act quickly. Deadlines for criminal defense, license-suspension challenges, evidence requests, government notices, and civil claims may be short.</li>
              </ol>
            </div>
          </section>
        </div>
      </div>

      <section className="rights-authorities">
        <div className="shell">
          <div className="section-heading">
            <div><p>Primary law and official guidance</p><h2>Check the source</h2></div>
          </div>
          <div className="rights-source-grid">
            <div>
              <h3>Federal rights</h3>
              <a href="https://constitution.congress.gov/constitution/amendment-4/" target="_blank" rel="noopener noreferrer">Fourth Amendment — searches and seizures</a>
              <a href="https://constitution.congress.gov/constitution/amendment-5/" target="_blank" rel="noopener noreferrer">Fifth Amendment — self-incrimination</a>
              <a href="https://supreme.justia.com/cases/federal/us/575/348/" target="_blank" rel="noopener noreferrer">Rodriguez v. United States — duration of traffic stops</a>
              <a href="https://media.ca11.uscourts.gov/opinions/pub/files/19998199.OPN.pdf" target="_blank" rel="noopener noreferrer">Smith v. City of Cumming — recording police</a>
            </div>
            <div>
              <h3>Georgia law</h3>
              <a href="https://law.justia.com/codes/georgia/title-40/chapter-5/article-2/section-40-5-29/" target="_blank" rel="noopener noreferrer">O.C.G.A. § 40-5-29 — license on demand</a>
              <a href="https://law.justia.com/codes/georgia/title-16/chapter-10/article-2/section-16-10-24/" target="_blank" rel="noopener noreferrer">O.C.G.A. § 16-10-24 — obstruction</a>
              <a href="https://law.justia.com/cases/georgia/supreme-court/2022/s22a0542.html" target="_blank" rel="noopener noreferrer">Ammons v. State — roadside tests</a>
              <a href="https://law.justia.com/cases/georgia/supreme-court/2019/s18a1204.html" target="_blank" rel="noopener noreferrer">Elliott v. State — breath-test refusal</a>
              <a href="https://law.justia.com/cases/georgia/supreme-court/2025/s24a1373.html" target="_blank" rel="noopener noreferrer">State v. Dias — blood-test refusal</a>
              <a href="https://dds.georgia.gov/section-10-continued" target="_blank" rel="noopener noreferrer">Georgia DDS — current implied-consent notice</a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell rights-callout">
        <div><p className="section-label">More tools</p><h2>Use the right. Keep the receipt.</h2></div>
        <Link className="button button-dark" href="/citizen-resources">Citizen Resources →</Link>
      </section>
    </main>
  );
}
