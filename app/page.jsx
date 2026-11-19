"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
const instagram = "https://www.instagram.com/sthri.in/";
const edits = [
  {
    title: "Maternity",
    category: "maternity",
    subtitle: "Room for your changing days.",
    image: "teal",
    alt: "A teal printed maternity maxi, styled in an editorial setting",
    body: "From a slow morning to an afternoon out, find a little more room in a silhouette that feels like you.",
    styles: ["Ankle-length maxis", "Full-length maxis", "Maxis with dupattas"],
  },
  {
    title: "Nursing",
    category: "nursing",
    subtitle: "For your closest moments.",
    image: "rose",
    alt: "A rose-toned nursing silhouette in soft studio light",
    body: "Feeding-friendly pieces for the moments with your little one and the hours in between. Ask us to show you the access and fit of each style.",
    styles: [
      "Feeding co-ord sets",
      "Concealed-zip maxis",
      "Cotton-blend, rayon & Hakoba styles",
    ],
  },
  {
    title: "Occasion",
    category: "occasion",
    subtitle: "For a little celebration.",
    image: "ochre",
    alt: "An ochre occasionwear silhouette with an airy dupatta",
    body: "Our women’s ready-to-wear collection brings the occasion side of STHRI to life, from family gatherings to festive evenings.",
    styles: [
      "Anarkali & Banaras styles",
      "Gowns with dupattas",
      "Dressy three-piece sets",
    ],
  },
];

function Arrow({ diagonal = false, className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M3 12h17m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Logo({ className = "" }) {
  return (
    <a className={`logo ${className}`} href="#home" aria-label="STHRI homepage">
      <Image
        src="/assets/sthri-official.png"
        width={1254}
        height={1254}
        priority
        alt="Sthri official gold S emblem and wordmark"
      />
    </a>
  );
}
function Magnetic({ children, className = "", href, onClick, ...props }) {
  const ref = useRef(null);
  function move(event) {
    if (
      !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.15,
      y: (event.clientY - rect.top - rect.height / 2) * 0.2,
      duration: 0.4,
      overwrite: true,
    });
  }
  function leave() {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, .5)",
      overwrite: true,
    });
  }
  const Component = href ? "a" : "button";
  return (
    <Component
      ref={ref}
      className={`magnetic ${className}`}
      href={href}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={leave}
      {...props}
    >
      {children}
    </Component>
  );
}
function RevealTitle({ children, as: Component = "h2", className = "" }) {
  return (
    <Component className={`reveal-title ${className}`} data-reveal>
      {children}
    </Component>
  );
}

export default function Home() {
  const root = useRef(null);
  const lenis = useRef(null);
  const dialog = useRef(null);
  const lastFocus = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".hero-image", { scale: 1.18, duration: 1.8 }, 0)
          .from(
            ".hero-image-wrap",
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            0,
          )
          .from(
            ".hero-title .line > span",
            { yPercent: 110, rotate: 3, stagger: 0.12, duration: 1.1 },
            0.2,
          )
          .from(
            ".hero-eyebrow, .hero-description, .hero-links, .hero-bottom",
            { opacity: 0, y: 18, stagger: 0.1, duration: 0.8 },
            0.65,
          )
          .from(
            ".site-header",
            {
              y: -12,
              opacity: 0,
              duration: 0.2,
              ease: "power2.out",
            },
            0,
          );

        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        gsap.utils.toArray("[data-image-reveal]").forEach((element) => {
          gsap.from(element, {
            clipPath: "inset(12% 0 12% 0)",
            scale: 0.96,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
        gsap.utils.toArray("[data-parallax]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: element.parentNode,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
        gsap.to(".belief-word", {
          color: "#eee9dc",
          stagger: 0.09,
          ease: "none",
          scrollTrigger: {
            trigger: ".belief-copy",
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.7,
          },
        });
        gsap.fromTo(
          ".story-inset",
          { y: 65, rotate: 5 },
          {
            y: -40,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: ".story",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".contact-word",
          { xPercent: 8 },
          {
            xPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: ".contact",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
        const smooth = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          anchors: false,
        });
        lenis.current = smooth;
        smooth.on("scroll", ScrollTrigger.update);
        const tick = (time) => smooth.raf(time * 1000);
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          smooth.destroy();
          lenis.current = null;
        };
      });
      media.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const heroScroll = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top+=105",
              end: "+=520",
              scrub: 1,
              pin: ".hero-stage",
              pinSpacing: true,
              anticipatePin: 1,
            },
          });
          heroScroll
            .to(
              ".hero-image-wrap",
              {
                width: "100%",
                height: "100%",
                top: 0,
                right: 0,
                borderRadius: 0,
                ease: "none",
              },
              0,
            )
            .to(".hero-copy", { x: -80, opacity: 0, ease: "none" }, 0)
            .to(".hero-image", { scale: 1.05, ease: "none" }, 0)
            .to(".hero-final", { opacity: 1, y: 0, ease: "none" }, 0.3)
            .to(".hero-bottom", { opacity: 0 }, 0);
          return () => heroScroll.kill();
        },
      );
    }, root);
    const loaded = () => ScrollTrigger.refresh();
    const images = [...document.images];
    images.forEach((img) => img.addEventListener("load", loaded));
    document.fonts.ready.then(loaded);
    return () => {
      images.forEach((img) => img.removeEventListener("load", loaded));
      media.revert();
      context.revert();
    };
  }, []);

  useEffect(() => {
    const blocked = menuOpen || modalOpen;
    document.body.style.overflow = blocked ? "hidden" : "";
    if (blocked) lenis.current?.stop();
    else lenis.current?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, modalOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const header = root.current.querySelector(".site-header");
    const controls = [...header.querySelectorAll("a,button")].filter(
      (el) => el.getClientRects().length,
    );
    controls.find((el) => el.classList.contains("mobile-nav-link"))?.focus();
    function keydown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        header.querySelector(".menu-toggle").focus();
      }
      if (event.key !== "Tab") return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [menuOpen]);

  function followAnchor(event) {
    const link = event.target.closest('a[href^="#"]');
    if (
      !link ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    const headerHeight =
      root.current.querySelector(".site-header").offsetHeight;
    const position = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - headerHeight,
    );
    if (lenis.current)
      lenis.current.scrollTo(position, { force: true, duration: 1.2 });
    else
      window.scrollTo({
        top: position,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }

  function changeFilter(value) {
    setFilter(value);
    requestAnimationFrame(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.fromTo(
          ".collection-card:not([hidden])",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
          },
        );
      ScrollTrigger.refresh();
    });
  }
  function openEdit(index, event) {
    lastFocus.current = event.currentTarget;
    setSelected(index);
    setModalOpen(true);
    dialog.current.showModal();
  }
  function closeEdit() {
    dialog.current.close();
  }
  function handleClose() {
    setModalOpen(false);
    lastFocus.current?.focus({ preventScroll: true });
  }
  const edit = edits[selected];

  return (
    <div ref={root} onClick={followAnchor}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collections">The collections</a>
          <a href="#story">Our story</a>
          <a href="#approach">The Sthri way</a>
        </nav>
        <Magnetic className="header-contact" href="#contact">
          Find your fit <Arrow diagonal />
        </Magnetic>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {[
            ["The collections", "#collections"],
            ["Our story", "#story"],
            ["The Sthri way", "#approach"],
            ["Get in touch", "#contact"],
          ].map(([label, href]) => (
            <a
              className="mobile-nav-link"
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <Arrow diagonal />
            </a>
          ))}
          <p>Hosur, Tamil Nadu</p>
        </nav>
        <div className="scroll-progress" aria-hidden="true" />
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="hero-stage">
            <div className="hero-image-wrap">
              <Image
                className="hero-image"
                src="/assets/hero.webp"
                alt="Mother-to-be in a flowing plum maternity silhouette, in warm afternoon light"
                fill
                priority
                sizes="100vw"
              />
            </div>
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="tiny-line" />
                The motherhood edit
              </div>
              <h1 className="hero-title" id="hero-heading">
                <span className="line">
                  <span>For the woman</span>
                </span>
                <span className="line">
                  <span>
                    you’re <em>becoming.</em>
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                A changing body. A style that’s still yours. <br />
                Discover maternity &amp; nursing wear, the Sthri way.
              </p>
              <div className="hero-links">
                <Magnetic className="round-link" href="#collections">
                  <span className="round-icon">
                    <Arrow diagonal />
                  </span>
                  <span>Explore the edit</span>
                </Magnetic>
                <span className="hero-location">
                  From Hosur,
                  <br />
                  with love.
                </span>
              </div>
            </div>
            <div className="hero-final" aria-hidden="true">
              <span>The motherhood edit</span>
              <p>
                A little more room.
                <br />
                <em>A little more you.</em>
              </p>
            </div>
            <div className="hero-bottom">
              <a href="#collections">
                <span className="scroll-line" />
                Scroll to discover
              </a>
              <span>Maternity · Nursing · Occasion</span>
            </div>
          </div>
        </section>

        <div
          className="marquee"
          aria-label="Maternity, nursing and everyday style"
        >
          <div className="marquee-track" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                Made for your changing days <i>✳</i> Styled for you <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        <section
          id="collections"
          className="collections section-pad"
          aria-labelledby="collection-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow" data-reveal>
                Meet your next favourite
              </p>
              <RevealTitle>
                <span id="collection-heading">
                  The wardrobe, <em>reimagined.</em>
                </span>
              </RevealTitle>
            </div>
            <p className="section-intro" data-reveal>
              Three edits. So many ways to feel like yourself. <br />
              Find the one that fits your day.
            </p>
          </div>
          <div
            className="collection-filters"
            role="group"
            aria-label="Filter collections"
            data-reveal
          >
            {[
              ["all", "All collections"],
              ["maternity", "Maternity"],
              ["nursing", "Nursing"],
              ["occasion", "Occasion"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={filter === value}
                onClick={() => changeFilter(value)}
              >
                {label}
                <span />
              </button>
            ))}
          </div>
          <div
            className={`collection-grid ${filter !== "all" ? "filtered" : ""}`}
          >
            {edits.map((item, index) => (
              <button
                className="collection-card"
                key={item.category}
                hidden={filter !== "all" && filter !== item.category}
                onClick={(event) => openEdit(index, event)}
                aria-label={`Explore ${item.title} collection`}
              >
                <span className="collection-photo" data-image-reveal>
                  <Image
                    src={`/assets/${item.image}.webp`}
                    alt={item.alt}
                    width={510}
                    height={1024}
                    sizes="(max-width: 700px) 85vw, 32vw"
                  />
                  <span className="image-wash" />
                  <span className="view-edit">
                    View edit <Arrow diagonal />
                  </span>
                </span>
                <span className="collection-info">
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <span className="card-arrow">
                    <Arrow diagonal />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className="editorial-note">
            Styling inspiration. Message us to see the current collection,
            colours and sizes.
          </p>
        </section>

        <section
          className="belief"
          aria-label="Our approach to maternity style"
        >
          <div className="belief-inner">
            <p className="eyebrow" data-reveal>
              A little reminder
            </p>
            <p className="belief-copy">
              {"Your body is changing. Your style is still yours."
                .split(" ")
                .map((word, index) => (
                  <span
                    className={`belief-word ${index > 5 ? "italic" : ""}`}
                    key={index}
                  >
                    {word}{" "}
                  </span>
                ))}
            </p>
            <p className="belief-note" data-reveal>
              For the woman you are.
              <br />
              And the mother you’re becoming.
            </p>
          </div>
          <span className="belief-orbit" aria-hidden="true" />
        </section>

        <section
          id="story"
          className="story section-pad"
          aria-labelledby="story-heading"
        >
          <div className="story-visual">
            <div className="story-portrait" data-image-reveal>
              <Image
                src="/assets/teal.webp"
                alt="A relaxed maternity silhouette in a sunlit courtyard"
                width={510}
                height={1024}
                data-parallax
                sizes="(max-width: 700px) 90vw, 45vw"
              />
            </div>
            <div className="story-inset">
              <Image
                src="/assets/story.webp"
                alt="Plum and cream textiles with tailoring shears on an atelier table"
                width={1100}
                height={825}
                sizes="(max-width: 700px) 40vw, 23vw"
              />
            </div>
            <span className="story-location">
              Hosur, Tamil Nadu · Est. 2025
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow" data-reveal>
              A boutique. A new chapter.
            </p>
            <RevealTitle>
              <span id="story-heading">
                Rooted in Hosur.
                <br />
                <em>Here for her.</em>
              </span>
            </RevealTitle>
            <div className="story-body" data-reveal>
              <p>
                Sthri began as a women’s apparel shop in Hosur, bringing
                together everyday kurthis, flowing maxis and pieces for the
                occasions that bring us together.
              </p>
              <p>
                Today, we’re shaping a new chapter around maternity and nursing
                wear. A wardrobe that makes space for motherhood, with style and
                a sense of you at its heart.
              </p>
              <p>
                Our vision is to grow into a fashion brand with our own
                thoughtfully developed designs. It begins by listening to the
                women who wear Sthri.
              </p>
            </div>
            <a className="underlined-link" href="#approach" data-reveal>
              Discover the Sthri way <Arrow />
            </a>
          </div>
        </section>

        <section
          id="approach"
          className="approach section-pad"
          aria-labelledby="approach-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow" data-reveal>
                The Sthri way
              </p>
              <RevealTitle>
                <span id="approach-heading">
                  Every stage.
                  <br />
                  <em>Every part of you.</em>
                </span>
              </RevealTitle>
            </div>
            <p className="section-intro" data-reveal>
              A wardrobe is personal.
              <br />
              We help you find your way through ours.
            </p>
          </div>
          <div className="approach-grid">
            <article className="approach-item" data-reveal>
              <span className="approach-symbol" aria-hidden="true">
                <svg viewBox="0 0 60 60">
                  <path d="M30 9C17 9 10 22 13 34c3 13 17 19 28 11 11-9 11-25-1-32M16 44 44 16M11 25c8 0 16 8 16 22" />
                </svg>
              </span>
              <h3>Room for change.</h3>
              <p>
                Explore maternity silhouettes for your changing shape. Ask us
                about measurements and the fit of each piece.
              </p>
            </article>
            <article className="approach-item" data-reveal>
              <span className="approach-symbol" aria-hidden="true">
                <svg viewBox="0 0 60 60">
                  <path d="M13 31c0-19 24-21 24-7 0 10-15 12-15 21M23 39c16 13 30-9 17-18M10 40l5 6 5-6M42 10l5 6-5 6" />
                </svg>
              </span>
              <h3>Close, made easier.</h3>
              <p>
                Find feeding-friendly maxis and co-ords. We’ll walk you through
                the nursing access before you choose.
              </p>
            </article>
            <article className="approach-item" data-reveal>
              <span className="approach-symbol" aria-hidden="true">
                <svg viewBox="0 0 60 60">
                  <path d="M30 9c0 14 8 21 21 21-14 0-21 8-21 21 0-14-8-21-21-21 14 0 21-8 21-21ZM46 7v12M40 13h12" />
                </svg>
              </span>
              <h3>Still your style.</h3>
              <p>
                From daily dressing to family celebrations, discover maternity
                favourites alongside our women’s occasion edit.
              </p>
            </article>
          </div>
        </section>

        <section className="image-interlude" aria-label="Sthri occasion edit">
          <Image
            src="/assets/hero.webp"
            alt="Warm light, floral fabric and a flowing maternity silhouette"
            fill
            sizes="100vw"
            data-parallax
          />
          <div className="interlude-shade" />
          <div data-reveal>
            <p className="eyebrow">All the moments in between</p>
            <p>
              The everyday.
              <br />
              The extraordinary.
              <br />
              <em>Beautifully yours.</em>
            </p>
            <a className="underlined-link" href="#collections">
              Find your edit <Arrow />
            </a>
          </div>
        </section>

        <section
          className="contact section-pad"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="contact-top">
            <p className="eyebrow" data-reveal>
              Let’s find your Sthri
            </p>
            <span data-reveal>Hosur, Tamil Nadu</span>
          </div>
          <RevealTitle className="contact-title">
            <span id="contact-heading">
              Your next chapter
              <br />
              <em>looks good on you.</em>
            </span>
          </RevealTitle>
          <div className="contact-bottom" data-reveal>
            <p>
              Tell us what caught your eye. We’ll help with styles,
              <br className="desktop-break" /> sizing and delivery to Tamil Nadu
              or Bengaluru.
            </p>
            <Magnetic
              className="contact-cta"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Let’s talk on Instagram</span>
              <span className="round-icon">
                <Arrow diagonal />
              </span>
            </Magnetic>
          </div>
          <span className="contact-word" aria-hidden="true">
            STHRI
          </span>
        </section>
      </main>
      <footer className="footer">
        <Logo />
        <p>Women’s apparel, with motherhood at heart.</p>
        <a href="#home" className="back-top">
          Back to top <Arrow diagonal />
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sthri</span>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            Instagram <Arrow diagonal />
          </a>
          <span>Campaign imagery is illustrative.</span>
        </div>
      </footer>

      <dialog
        ref={dialog}
        className="collection-dialog"
        aria-labelledby="dialog-title"
        onClose={handleClose}
        onCancel={() => setModalOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) {
            const r = dialog.current.getBoundingClientRect();
            if (
              event.clientX < r.left ||
              event.clientX > r.right ||
              event.clientY < r.top ||
              event.clientY > r.bottom
            )
              closeEdit();
          }
        }}
        data-lenis-prevent
      >
        <button
          className="dialog-close"
          aria-label="Close collection"
          onClick={closeEdit}
        >
          <span />
          <span />
        </button>
        <div className="dialog-grid">
          <Image
            src={`/assets/${edit.image}.webp`}
            width={510}
            height={1024}
            alt={edit.alt}
          />
          <div className="dialog-copy">
            <p className="eyebrow">The Sthri edit</p>
            <h2 id="dialog-title">
              {edit.title} <em>collection.</em>
            </h2>
            <p>{edit.body}</p>
            <ul>
              {edit.styles.map((style) => (
                <li key={style}>{style}</li>
              ))}
            </ul>
            <p className="dialog-note">
              Ask us for current pieces, prices and available sizes.
            </p>
            <a
              className="solid-button"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on Instagram <Arrow diagonal />
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
