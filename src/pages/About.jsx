import React from "react";
import "../components/About.css"

import pastProjectImage from "../assets/images/fox2709b.jpg"
import currentProjectImage from "../assets/images/03jan526.jpg"
import owner from "../assets/images/jmarenowner.jpg"

// Tweak this to match your fixed header height (pixels)
const HEADER_OFFSET = 96;

export default function About() {
  return (
    <main className="about-root" style={{ "--header-offset": `${HEADER_OFFSET}px` }}>
      {/* SECTION 1 — owners + about copy */}
      <section className="about-section split">
        <div className="split-col image">
          <img
            src={owner}
            alt="Company owners"
          />
        </div>
        <div className="split-col text">
          <span className="pill">About Us</span>
          <h1>WE BE BUILDIN.</h1>
          <p>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
             dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
             nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid 
             ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea 
             voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem
              eum fugiat quo voluptas nulla pariatur?"
          </p>
          <p>
          Quis autem vel eum iure reprehenderit qui in ea 
             voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem
              eum fugiat quo voluptas nulla pariatur?"
          </p>
          <div className="actions">
            <a href="/available-homes" className="btn btn--primary">View Available Homes</a>
            <a href="/contact" className="btn">Talk with Us</a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — two project tiles with CTAs */}
      <section className="about-section tiles">
        <article
          className="tile"
          style={{
            backgroundImage:
              `url(${pastProjectImage})`,
          }}
        >
          <div className="tile__overlay" />
          <div className="tile__content">
            <h3>Past Projects</h3>
            <p>Browse finished homes across Houston</p>
            <a href="/past-projects" className="btn btn--light">View Past Projects</a>
          </div>
        </article>

        <article
          className="tile"
          style={{
            backgroundImage:
              `url(${currentProjectImage})`,
          }}
        >
          <div className="tile__overlay" />
          <div className="tile__content">
            <h3>Current Projects</h3>
            <p>See what’s under construction now</p>
            <a href="/available-homes" className="btn btn--light">View Current Projects</a>
          </div>
        </article>
      </section>

      {/* SECTION 3 — centered Contact banner */}
      <section className="about-section contact">
        <div className="contact-card">
          <h2>Let’s talk about your next home.</h2>
          <p>
            Share your neighborhood, timeline, and goals. We’ll reply within one business day
            with clear next steps.
          </p>
          <a href="/contact" className="btn btn--primary btn--lg">Contact Us</a>
        </div>
      </section>
    </main>
  );
}
