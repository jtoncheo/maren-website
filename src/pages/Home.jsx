import HomeHeroBanner from "../components/HomeHeroBanner";
import Navbar from "../components/Navbar";

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="text-xs uppercase tracking-widest text-black/60">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold">{title}</h2>
        <div className="mt-6 text-black/70 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Fixed/transparent navbar overlays hero */}
      <Navbar />

      {/* Hero */}
      <HomeHeroBanner />

      {/* Next section will NOT show until scroll if hero uses h-screen */}
      {/* <Section id="learn-more" eyebrow="Who are we" title="About">
        <p>blah blah blah.</p>
      </Section> */}
    </>
  );
}