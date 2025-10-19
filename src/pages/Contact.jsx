import React, { useState } from "react";
import "../components/Contact.css"

const HEADER_OFFSET = 96; // px — tweak to your header height

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("Contact form payload:", payload);
    setSubmitted(true);
    // TODO: POST to your backend or email service here
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })
  }

  return (
    <main className="contact-root" style={{ "--header-offset": `${HEADER_OFFSET}px` }}>
      {/* FORM CARD */}
      <section className="contact-section">
        <div className="form-card">
          <header className="form-header">
            <h1>Let’s Get in Touch</h1>
            <p>Tell us a bit about what you’re planning.</p>
          </header>

          {submitted && (
            <div className="form-success" role="status">
              Thanks! Your message has been received. We’ll be in touch shortly.
            </div>
          )}

          <form className="form-grid" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" type="text" required placeholder="Jane Doe" />
            </div>

            {/* Organization */}
            <div className="field">
              <label htmlFor="organization">Organization</label>
              <input id="organization" name="organization" type="text" placeholder="(Optional)" />
            </div>

            {/* Phone */}
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="(713) 555-0123" />
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>

            {/* Project Type */}
            <div className="field">
              <label htmlFor="projectType">Project Type</label>
              <select id="projectType" name="projectType" required defaultValue="">
                <option value="" disabled>
                  Select a type…
                </option>
                <option value="Residential">Residential</option>
                <option value="TownHomes">TownHomes</option>
                <option value="Custom Homes">Custom Homes</option>
              </select>
            </div>

            {/* Construction Budget */}
            <div className="field">
              <label htmlFor="budget">Construction Budget</label>
              <input id="budget" name="budget" type="text" placeholder="$750,000 – $1.2M" />
            </div>

            {/* Message (full row) */}
            <div className="field field--full">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Neighborhood, square footage, desired timeline, special requirements…"
              />
            </div>

            {/* Submit */}
            <div className="actions">
              <button type="submit" className="btn btn--primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT TILES */}
      <section className="contact-section tiles">
        <article className="mini-tile">
          <div className="mini-icon">
            <PhoneIcon />
          </div>
          <a className="mini-link" href="tel:17138611601">xxx.xxx.xxxx</a>
        </article>

        <article className="mini-tile">
          <div className="mini-icon">
            <MailIcon />
          </div>
          <a className="mini-link" href="mailto:info@jmaren.com">info@jmaren.com</a>
        </article>
      </section>
    </main>
  );
}

/* ---------- tiny inline icons ---------- */
function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M21 15.5v3a2 2 0 0 1-2.18 2 19 19 0 0 1-8.26-2.93A19 19 0 0 1 3.5 9.44 19 19 0 0 1 .57 1.18 2 2 0 0 1 2.56 0h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L6.1 8.94a16 16 0 0 0 8.96 8.96l2.6-1.61a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 21 15.5z" />
    </svg>
  );
}
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
