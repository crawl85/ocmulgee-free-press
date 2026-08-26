export default function PreferredSourceButton() {
  return (
    <section className="preferred-source" aria-labelledby="preferred-source-title">
      <div className="shell preferred-source-inner">
        <div>
          <p className="section-label">Follow independent reporting</p>
          <h2 id="preferred-source-title">Make us a preferred source on Google</h2>
          <p>
            Tell Google you want to see more reporting from The Ocmulgee Free Press
            in Top Stories and other eligible news results.
          </p>
        </div>
        <div className="preferred-source-action">
          <div
            {...{ "google-add-preferred-source-btn": "" }}
            data-theme="dark"
          />
          <noscript>
            <a href="https://www.google.com/preferences/source?q=ocmulgeefreepress.com">
              Add The Ocmulgee Free Press as a preferred source
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
}
