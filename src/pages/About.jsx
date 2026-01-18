import Navbar from "../components/Navbar";
import aboutHero from "../assets/about/about-hero.jpg";

// Put your about hero image here (recommended: store in /public/images/about-hero.jpg)
const ABOUT_HERO_IMAGE = aboutHero;

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.25em] text-black/55">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function ValueBlock({ title, children }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3 text-black/70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10 text-white">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.35em] text-white/75">
             
            </div>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
              About
            </h1>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="bg-white">
        {/* OUR STORY */}
        <section id="about" className="py-16">
          <SectionTitle eyebrow="Our story" title="OUR STORY" />
          <div className="max-w-6xl mx-auto px-6 mt-8">
            <p className="max-w-4xl text-black/70 leading-relaxed">
                Since its founding in 2019, J. Maren Homes has combined expertise in
                engineering, design, and development to create bespoke, best-in-class homes in
                urban Houston. Each home reflects a commitment to quality, innovation, and
                lasting value.
            </p>
          </div>
        </section>

        {/* OUR VALUES */}
        <section className="pb-20">
          <SectionTitle eyebrow="Our values" title="OUR VALUES" />

          <div className="mt-10 space-y-12">
            <ValueBlock title="Relationships">
              <p>
                Real estate development and construction are not solo endeavors. From
                purchasing a parcel and designing a floor plan to putting the finishing touches on
                a newly built home, we rely on the expertise of a wide range of skilled
                professionals to deliver a beautiful final product crafted with care and precision.
                For this reason, we make it a core principle of our company to collaborate with
                best-in-class professionals at every stage of the process, applying the highest
                standards of craftsmanship and expertise to deliver homes of exceptional quality.
              </p>
              <p className="mt-4">
                This mindset continues well beyond the completion of construction. Homeowners
                are considered partners in the building journey, and that relationship is treated
                with care and respect. We take this responsibility seriously and remain committed
                to standing behind our word throughout the home-building and buying process.
              </p>
            </ValueBlock>

            <ValueBlock title="Excellence">
              <p>
                  We hold ourselves and our partners to high standards every day. From clear
                  communication and thoughtful design to the quality of workmanship in every
                  home we build, our goal is to consistently deliver excellent results. We take a
                  proactive, detail-oriented approach throughout the construction process and
                  address every aspect of the work with care and integrity. Above all, our aim is to
                  craft homes with excellence in both the visible details and the work that happens
                  behind the scenes.
              </p>
            </ValueBlock>

            <ValueBlock title="Creativity">
              <p>
                In an ever-changing landscape of evolving tastes and technologies, we remain
                focused on finding thoughtful, innovative solutions that meet the demands of
                modern living. We approach each new home as a bespoke puzzle, fueled by a
                relentless drive to innovate and find creative solutions at every stage. We work
                closely with our designers to refine floor plans and finishes, collaborate with
                energy consultants to create building envelopes that support efficient heating and
                cooling in Houston’s challenging climate, and partner with material suppliers to
                stay current with advances in building science and materials. We do not allow
                ourselves to settle into the status quo and instead pursue creative innovation
                throughout every stage of the real estate development process.
              </p>
            </ValueBlock>
          </div>
        </section>

        {/* CONTACT ANCHOR for your drawer link */}

      </main>
    </>
  );
}