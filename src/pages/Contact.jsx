import { useState } from "react";
import Navbar from "../components/Navbar";

// Optional hero image. If you don't have one, you can remove the HERO section.
import contactHero from "../assets/about/about-hero.jpg"; // reuse your about hero for now

export default function Contact() {
  const email = "info@jmaren.com";
  const number = "713-304-3139";
  const phoneDisplay = "713-304-3139";
const phoneDial = "+17133043139"; // E.164 format is safest
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback: open mail client if clipboard blocked
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactHero})` }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10 text-white">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.35em] text-white/75">
              Contact
            </div>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
              Let’s build something exceptional.
            </h1>
            <p className="mt-5 max-w-2xl text-white/85 leading-relaxed">
              For inquiries, availability, or collaborations, email us and we’ll
              get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="bg-white">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            {/* Left: copy + tone */}
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-black/55">
                Reach us
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                Send us an email.
              </h2>

              <p className="mt-6 text-black/70 leading-relaxed max-w-xl">
                Send us a note with a short description of what you’re looking
                to build (location, timeline, budget range if applicable). We’ll
                respond as quickly as possible.
              </p>

              <div className="mt-8 border-t border-black/10 pt-6 text-sm text-black/60">
              </div>
            </div>

            {/* Right: the “contact card” */}
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-black/55">
                Contact
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <div className="text-sm text-black/60">Email</div>
                <div className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">
                  {email}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium hover:bg-black/[0.03] transition"
                >
                  {copied ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            {/* Left: copy + tone */}
            <div>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                Give us a call.
              </h2>

              <p className="mt-6 text-black/70 leading-relaxed max-w-xl">
                  You can also reach us by phone.
                  If calling is more convenient, feel free to reach out and leave a message. We’ll return your call as quickly as possible.
              </p>

              <div className="mt-8 border-t border-black/10 pt-6 text-sm text-black/60">
              </div>
            </div>

            {/* Right: the “contact card” */}
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-black/55">
                Contact
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <div className="text-sm text-black/60">Number</div>
                <div className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">
                  {number}
                </div>

                  {/* Mobile-only: big call button */}
                <a
                  href={`tel:${phoneDial}`}
                  className="mt-5 sm:hidden inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90 transition"
                >
                  Call {phoneDisplay}
                </a>

              </div>

              {/* <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium hover:bg-black/[0.03] transition"
                >
                  {copied ? "Copied!" : "Copy Number"}
                </button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Optional: minimal footer */}
        <footer className="border-t border-black/10">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-black/60">
            © {new Date().getFullYear()} J.Maren Properties
          </div>
        </footer>
      </main>
    </>
  );
}
