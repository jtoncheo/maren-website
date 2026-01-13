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
              J Maren Homes was founded in 2019 by Ruben Martinez, Gerrit Van
              Someren, and Gavin Van Someren. The three principals pull on their
              unique backgrounds in engineering, commercial development and
              design, and corporate accounting to craft best in class, bespoke
              homes in urban Houston.
            </p>
          </div>
        </section>

        {/* OUR VALUES */}
        <section className="pb-20">
          <SectionTitle eyebrow="Our values" title="OUR VALUES" />

          <div className="mt-10 space-y-12">
            <ValueBlock title="Relationships">
              <p>
                Real estate development and construction is not a solo
                enterprise. From purchasing a lot, to designing a floorplan, to
                putting the finishing touches on the newly built home, we rely
                on the contributions of a wide variety of skilled professionals
                to achieve a beautiful, well constructed finished product.
                Because of this, it is a core tenet of ours to ensure that we
                are working with best in class professionals along every step of
                the journey. We value all of these relationships as true
                partnerships and fully believe that fostering these partnerships
                leads to a higher quality of home built.
              </p>
              <p className="mt-4">
                This mindset does not end once construction is finished either.
                We look at new homeowners as our partners in the building
                journey as well because without the relationship with you, there
                is no reason to build a home. We take that relationship very
                seriously and will stand behind our word throughout the home
                building and buying process.
              </p>
            </ValueBlock>

            <ValueBlock title="Excellence">
              <p>
                We hold ourselves and our partners to high standards every day.
                From communication standards to design to workmanship in each
                home we build – our goal is always to strive for excellent work
                product. There will always be mistakes made along the way, that
                is the nature of construction, but we strive to proactively
                address as many as we can and those that do occur, we address
                quickly and with integrity. It is our goal that the home is
                crafted with excellence both where you can and cannot see.
              </p>
            </ValueBlock>

            <ValueBlock title="Creativity">
              <p>
                In an everchanging landscape of tastes and technologies, we are
                constantly focused on finding unique solutions to meet the
                demands of modern living. It is our passion to pursue each new
                home we build as a bespoke puzzle with the belief that we can
                put together the pieces of each home in a way that is an
                improvement on the last. We work diligently with our designers
                on tweaking our floor plans and finishes, our energy consultants
                on creating building envelopes that allow for efficient heating
                and cooling in the harsh Houston weather, and our material
                suppliers to make sure we stay on top of current trends in
                building science and material. We do not allow ourselves to
                settle into the status quo and pursue creative innovation across
                the entire process of real estate development.
              </p>
            </ValueBlock>
          </div>
        </section>

        {/* CONTACT ANCHOR for your drawer link */}
        {/* <section id="contact" className="border-t border-black/10 py-16">
          <SectionTitle eyebrow="Get in touch" title="Contact" />
          <div className="max-w-6xl mx-auto px-6 mt-8">
            <p className="text-black/70 leading-relaxed">
              Add your contact form or email/phone here.
            </p>
          </div> */}
        </section>
      </main>
    </>
  );
}