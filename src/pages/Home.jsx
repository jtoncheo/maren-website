import HomeHeroBanner from "../components/HomeHeroBanner";


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
      {/* If Navbar should overlay hero, you can move Navbar into here and wrap with relative */}
      <div className="relative">
        <HomeHeroBanner />
      </div>

      <Section id="learn-more" eyebrow="Why this platform" title="Why Us?">
        <p>Put your “Why” content here.</p>
      </Section>

      <Section id="strategy" eyebrow="Investors" title="Unique Opportunity">
        <ul className="list-disc pl-5 space-y-2">
          <li>Stable, in-demand asset class</li>
          <li>Structural protections + diversification</li>
          <li>Tax-efficient, income-generating vehicle</li>
        </ul>
      </Section>
    </>
  );
}