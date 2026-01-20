import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jmarenLogo from "../assets/images/jmaren.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {/* Brand (logo + text) */}
          <Link
            to="/"
            className="flex items-start gap-3 select-none text-white"
            aria-label="JMaren Home"
          >
            <img
              src={jmarenLogo}
              alt="JMaren mark"
              className="h-12 w-auto opacity-95 drop-shadow-sm mt-[2px]"
            />

            <div className="leading-none">
              {/* Big line */}
              <div className="text-xl tracking-[0.28em] font-semibold">
                J. MAREN
              </div>

              {/* Small line */}
              <div className="mt-1 text-[12px] tracking-[0.45em] text-white/70">
                HOMES
              </div>
            </div>
          </Link>

          {/* Desktop menu button */}
          <nav className="hidden md:flex">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/20 transition"
              aria-label="Open menu"
            >
              <div className="space-y-1">
                <div className="h-[2px] w-5 bg-white/90" />
                <div className="h-[2px] w-5 bg-white/90" />
              </div>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/20 transition"
            aria-label="Open menu"
          >
            <div className="space-y-1">
              <div className="h-[2px] w-5 bg-white/90" />
              <div className="h-[2px] w-5 bg-white/90" />
            </div>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      {/* Right drawer */}
      <aside
        className={[
          "fixed right-0 top-0 z-[70] h-dvh w-[320px] max-w-[85vw]",
          "bg-black/60 backdrop-blur-xl border-l border-white/10",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex h-full flex-col p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="text-sm tracking-[0.35em] text-white/80">MENU</div>
            <button
              className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Menu items */}
          <div className="mt-8 space-y-4">
            <button
              className="block text-lg text-white/90 hover:text-white text-left"
              onClick={() => {
                setOpen(false);
                navigate("/about");
              }}
            >
              About
            </button>

            <button
              className="block text-lg text-white/90 hover:text-white text-left"
              onClick={() => {
                setOpen(false);
                navigate("/contact");
              }}
            >
              Contact
            </button>
          </div>

          <div className="mt-auto pt-8 text-xs text-white/60">
            © {new Date().getFullYear()} JMaren Homes
          </div>
        </div>
      </aside>
    </>
  );
}
