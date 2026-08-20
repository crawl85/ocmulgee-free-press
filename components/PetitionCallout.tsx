const petitionUrl = "https://www.change.org/SuspendMaconFlock";

export default function PetitionCallout() {
  return (
    <section className="petition-callout" aria-label="Flock Safety petition">
      <div className="shell petition-callout-grid">
        <div className="petition-callout-mark" aria-hidden="true">
          <span>Community action</span>
          <strong>SUSPEND</strong>
          <b>FLOCK</b>
        </div>

        <div className="petition-callout-copy">
          <p className="section-label">Make your voice heard</p>
          <h2>Demand an immediate suspension of Flock cameras in Macon-Bibb.</h2>
          <p>
            The petition calls on the Bibb County Sheriff&apos;s Office and
            Macon-Bibb County Government to disable the cameras and suspend use
            of the Flock Safety system while alleged misuse is investigated and
            meaningful safeguards are considered.
          </p>

          <div className="petition-callout-actions">
            <a
              className="button petition-button"
              href={petitionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign the petition <span aria-hidden="true">↗</span>
            </a>
            <span className="petition-vanity-url">
              change.org/SuspendMaconFlock
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
