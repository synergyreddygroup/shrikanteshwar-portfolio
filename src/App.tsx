import { useEffect, useState } from 'react';
import { content } from './content';

// Simple SVG Icons
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const YoutubeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.84 23 12 23 12s0-3.84-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>;
const InstagramIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const ArrowUpIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;

const SectionLabel = ({ text, id }: { text: string, id?: string }) => (
  <div id={id} className="font-mono text-[11px] md:text-xs tracking-[0.12em] uppercase text-crimson mb-4 clip-reveal">{text}</div>
);

const SectionTitle = ({ text, className = "" }: { text: string, className?: string }) => (
  <h2 className={`font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 clip-reveal ${className}`}>{text}</h2>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".clip-reveal").forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${(index % 5) * 60}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });
    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-crimson selection:text-white">
      {/* Navbar */}
      <header>
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-paper/90 backdrop-blur-md border-b border-line shadow-sm py-3" : "bg-transparent py-5"}`}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
            <a href="#" className="flex items-center justify-center w-9 h-9 bg-ink text-paper rounded-[4px] font-display font-bold text-sm tracking-tighter" aria-label="Home">
              {content.nav.logo}
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {content.nav.links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors hover:text-crimson ${activeSection === link.href.substring(1) ? "text-crimson border-b-2 border-crimson" : "text-ink"}`}
                >
                  {link.name}
                </a>
              ))}
              <a href={content.nav.cta.href} className="bg-crimson text-paper px-5 py-2 rounded-[4px] text-sm font-medium hover:bg-crimson-deep transition-colors">
                {content.nav.cta.name}
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-ink" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-paper flex flex-col px-6 py-5">
          <div className="flex justify-between items-center mb-12">
            <div className="w-9 h-9 bg-ink text-paper rounded-[4px] flex items-center justify-center font-display font-bold text-sm tracking-tighter">
              {content.nav.logo}
            </div>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-3xl font-display font-bold tracking-tight">
            {content.nav.links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-crimson transition-colors">
                {link.name}
              </a>
            ))}
            <a href={content.nav.cta.href} onClick={() => setMobileMenuOpen(false)} className="text-crimson hover:text-crimson-deep transition-colors mt-4">
              {content.nav.cta.name}
            </a>
          </div>
        </div>
      )}

      <main>
        {/* Section 1 - Hero */}
        <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-[90vh] flex flex-col justify-center">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 clip-reveal">
              <div className="inline-flex items-center space-x-2 bg-crimson-tint border border-crimson/20 rounded-full px-3 py-1 mb-8">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse"></span>
                <span className="text-crimson font-mono text-xs uppercase tracking-wider">{content.hero.status}</span>
              </div>
              <h1 className="hero-headline text-[clamp(2.5rem,7vw,5.5rem)] font-display font-bold tracking-[-0.04em] leading-[1.05] mb-6 text-ink">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-crimson font-medium mb-6">
                {content.hero.subtitle}
              </p>
              <p className="text-lg text-ink-soft max-w-[60ch] mb-8 leading-relaxed">
                {content.hero.description}
              </p>
              <blockquote className="border-l-3 border-crimson pl-4 italic text-ink font-serif text-lg md:text-xl mb-10">
                "{content.hero.quote}"
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={content.hero.ctaPrimary.href} className="bg-crimson text-paper px-6 py-3 rounded-[4px] font-medium text-center hover:bg-crimson-deep transition-colors">
                  {content.hero.ctaPrimary.text}
                </a>
                {/* 
                <a href={content.hero.ctaSecondary.href} download="Shrikanteshwar_Reddy_Profile.pdf" target="_blank" rel="noopener noreferrer" className="bg-paper text-ink border border-ink px-6 py-3 rounded-[4px] font-medium text-center hover:text-crimson hover:border-crimson transition-colors">
                  {content.hero.ctaSecondary.text}
                </a> 
                */}
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end clip-reveal">
              <div className="relative w-64 h-64 md:w-full md:max-w-sm aspect-square">
                <div className="absolute inset-0 bg-crimson translate-x-4 translate-y-4 rounded-[4px]"></div>
                {/* Lazy-loaded hero image */}
                <img 
                  src="/headshot.png" 
                  alt="Shrikanteshwar Reddy Pasham — Founder of Canies Academy and Synergy Reddy Group" 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover border border-ink rounded-[4px] bg-line z-10 grayscale hover:grayscale-0 transition-all duration-500" 
                  onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="%23f5f5f5"><rect width="100" height="100" /><text x="50" y="50" font-family="sans-serif" font-size="12" fill="%23999" text-anchor="middle" dy=".3em">Image Placeholder</text></svg>' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - About Me */}
        <section id="about" aria-labelledby="about-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line">
          <SectionLabel id="about-heading" text={content.about.eyebrow} />
          <SectionTitle text={content.about.title} />
          
          <div className="grid md:grid-cols-12 gap-12 mt-8">
            <div className="md:col-span-5 space-y-6 text-ink-soft text-lg leading-relaxed clip-reveal">
              {content.about.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            
            <div className="md:col-span-7 grid sm:grid-cols-3 gap-4 clip-reveal">
              {content.about.cards.map((card) => (
                <div key={card.id} className="bg-paper border border-line rounded-[4px] p-6 transition-all duration-180 hover:border-crimson hover:-translate-y-1 group">
                  <div className="text-crimson font-mono text-xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">0{card.id}</div>
                  <h3 className="font-display font-semibold text-ink mb-2">{card.title}</h3>
                  <p className="text-sm text-ink-soft">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section aria-label="Statistics" className="border-y border-line bg-paper py-12 px-6 md:px-12 clip-reveal">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="h-[2px] w-12 bg-crimson mb-4"></div>
                <div className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">{stat.value}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - What I Do */}
        <section aria-labelledby="expertise-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
          <SectionLabel id="expertise-heading" text={content.whatIDo.eyebrow} />
          <SectionTitle text={content.whatIDo.title} />
          <p className="text-ink-soft text-lg max-w-[60ch] mb-12 clip-reveal">{content.whatIDo.intro}</p>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {content.whatIDo.columns.map((col, i) => (
              <div key={i} className="clip-reveal">
                <h3 className="font-mono text-sm uppercase tracking-wider text-ink mb-6 pb-4 border-b border-line">{col.label}</h3>
                <ul className="space-y-4">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-crimson mr-3 mt-1">—</span>
                      <span className="text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 - Selected Work / Projects */}
        <section id="projects" aria-labelledby="projects-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
          <SectionLabel id="projects-heading" text={content.projects.eyebrow} />
          <SectionTitle text={content.projects.title} />
          <p className="text-ink-soft text-lg max-w-[60ch] mb-12 clip-reveal">{content.projects.intro}</p>
          
          <div className="border-t border-line">
            {content.projects.list.map((project, i) => (
              <div key={i} className="group border-b border-line py-8 transition-colors duration-180 hover:bg-surface px-4 -mx-4 clip-reveal flex flex-col md:flex-row md:items-center gap-6">
                <div className="font-mono text-3xl md:text-5xl text-crimson opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300">
                  {project.id}
                </div>
                <h3 className="font-display font-medium text-xl md:text-2xl text-ink">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
          
          {/* TODO: HTML Pattern for adding a real project card later */}
          {/*
          <article className="group border-b border-line py-8 hover:bg-surface px-4 -mx-4 flex flex-col md:flex-row gap-6">
            <div className="font-mono text-3xl md:text-5xl text-crimson">08</div>
            <div className="flex-1">
              <h3 className="font-display font-medium text-xl md:text-2xl text-ink mb-2">Project Title Here</h3>
              <p className="text-ink-soft mb-4">Description of the project goes here. Explaining the problem and solution.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-mono border border-line px-2 py-1">React</span>
                <span className="text-xs font-mono border border-line px-2 py-1">Tailwind</span>
              </div>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-crimson text-sm font-medium hover:underline">Live Link</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-ink text-sm font-medium hover:underline">GitHub</a>
              </div>
            </div>
          </article>
          */}
        </section>

        {/* Section 5 - Experience Timeline */}
        <section id="experience" aria-labelledby="experience-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
          <SectionLabel id="experience-heading" text={content.experience.eyebrow} />
          <SectionTitle text={content.experience.title} />
          
          <div className="mt-12 relative pl-6 md:pl-8 border-l border-line clip-reveal">
            {content.experience.timeline.map((exp, i) => (
              <div key={i} className="mb-12 relative">
                <div className="absolute -left-[30px] md:-left-[38px] top-1.5 w-[10px] h-[10px] rounded-full bg-crimson"></div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
                  <h3 className="font-display font-bold text-xl text-ink">{exp.role}</h3>
                  <span className="text-crimson font-medium">/ {exp.company}</span>
                  <span className="font-mono text-xs text-muted md:ml-auto">{exp.date}</span>
                </div>
                <ul className="space-y-2 text-ink-soft">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-muted mr-3 mt-1.5 text-xs">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 - Education */}
        <section aria-labelledby="education-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line">
          <SectionLabel id="education-heading" text={content.education.eyebrow} />
          <SectionTitle text={content.education.title} />
          
          <div className="grid md:grid-cols-2 gap-6 mt-8 clip-reveal">
            {content.education.cards.map((edu, i) => (
              <article key={i} className="bg-surface border border-line rounded-[4px] p-8">
                <h3 className="font-display font-bold text-xl text-ink mb-2">{edu.institution}</h3>
                <div className="font-mono text-sm text-crimson mb-4">{edu.degree}</div>
                <p className="text-ink-soft">{edu.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 7 - Reddy Decoded (Inverted) */}
        <section aria-labelledby="decoded-heading" className="py-24 px-6 md:px-12 bg-ink text-paper w-full">
          <div className="max-w-[1200px] mx-auto">
            <div id="decoded-heading" className="font-mono text-[11px] md:text-xs tracking-[0.12em] uppercase text-crimson mb-4 clip-reveal">
              {content.decoded.eyebrow}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-paper clip-reveal">
              {content.decoded.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-[60ch] mb-12 clip-reveal">
              {content.decoded.body}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 clip-reveal">
              {content.decoded.cards.map((card, i) => (
                <a key={i} href={card.url} target="_blank" rel="noopener noreferrer" className="block bg-[#0B0B0B] border border-[#222222] rounded-[4px] p-8 transition-all duration-180 hover:border-crimson hover:-translate-y-1 group">
                  <div className="text-crimson mb-4">
                    {card.title === "YouTube" ? <YoutubeIcon /> : <InstagramIcon />}
                  </div>
                  <h3 className="font-display font-bold text-xl text-paper mb-1">{card.title}</h3>
                  <div className="font-mono text-xs text-crimson mb-3">{card.subtitle}</div>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </a>
              ))}
            </div>
            <div className="mt-8 clip-reveal">
              <a href={content.decoded.personalUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-gray-500 hover:text-crimson transition-colors">
                {content.decoded.personalText}
              </a>
            </div>
          </div>
        </section>

        {/* Section 8 - Certifications */}
        <section aria-labelledby="cert-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
          <SectionLabel id="cert-heading" text={content.certifications.eyebrow} />
          <SectionTitle text={content.certifications.title} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 clip-reveal">
            {content.certifications.list.map((cert, i) => (
              <div key={i} className="bg-paper border border-line rounded-[4px] p-5 transition-all duration-180 hover:border-l-4 hover:border-l-crimson hover:pl-4">
                <h3 className="font-display font-medium text-ink mb-1">{cert.name}</h3>
                <div className="font-mono text-[11px] text-muted">
                  {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9 - Tech Stack */}
        <section aria-labelledby="tech-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line">
          <SectionLabel id="tech-heading" text={content.techStack.eyebrow} />
          <SectionTitle text={content.techStack.title} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12 clip-reveal">
            {content.techStack.categories.map((cat, i) => (
              <div key={i}>
                <h3 className="font-mono text-xs text-crimson uppercase tracking-wider mb-4">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <span key={j} className="bg-paper border border-line rounded-[4px] px-3 py-1.5 font-mono text-[11px] text-ink transition-colors duration-180 hover:border-crimson hover:text-crimson cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10 - FAQ */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line">
          <SectionLabel id="faq-heading" text={content.faq.eyebrow} />
          <SectionTitle text={content.faq.title} />
          
          <div className="mt-8 space-y-4 clip-reveal">
            {content.faq.list.map((item, i) => (
              <details key={i} className="group bg-surface border border-line rounded-[4px] [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-display font-medium text-lg text-ink group-hover:text-crimson transition-colors">
                  <h3>{item.q}</h3>
                  <span className="text-crimson transition duration-300 group-open:-rotate-45 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-ink-soft">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Section 11 - Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="py-16 md:py-24 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line">
          <SectionLabel id="contact-heading" text={content.contact.eyebrow} />
          <SectionTitle text={content.contact.title} className="max-w-[24ch]" />
          
          <div className="grid md:grid-cols-2 gap-16 mt-12 clip-reveal">
            <div>
              <div className="space-y-6">
                {content.contact.details.map((detail, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-mono text-[11px] text-muted uppercase tracking-wider mb-1">{detail.label}</span>
                    {detail.href ? (
                      <a href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium text-ink hover:text-crimson transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{detail.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Form submission placeholder. Wire up EmailJS or Formspree here."); }}>
                {/* TODO: Wire this form to an endpoint like Formspree, Resend, or EmailJS */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="font-mono text-[11px] text-muted uppercase tracking-wider">Name</label>
                    <input type="text" id="name" required className="w-full bg-surface border border-line rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-crimson transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-mono text-[11px] text-muted uppercase tracking-wider">Email</label>
                    <input type="email" id="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="w-full bg-surface border border-line rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-crimson transition-colors invalid:focus:border-crimson-deep" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="subject" className="font-mono text-[11px] text-muted uppercase tracking-wider">Subject</label>
                  <input type="text" id="subject" required className="w-full bg-surface border border-line rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-crimson transition-colors" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="font-mono text-[11px] text-muted uppercase tracking-wider">Message</label>
                  <textarea id="message" required rows={5} className="w-full bg-surface border border-line rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-crimson transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full md:w-auto bg-crimson text-paper px-8 py-3 rounded-[4px] font-medium hover:bg-crimson-deep transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Entity Facts Block for LLMs and Crawlers */}
        <section aria-label="Entity Facts" className="py-8 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-line text-muted">
          <div className="font-mono text-[10px] uppercase tracking-wider mb-2">About this page</div>
          <div className="font-mono text-[11px] leading-relaxed">
            Name: Shrikanteshwar Reddy Pasham. Aliases: Pasham Shrikanteshwar Reddy, Reddy Decoded. Location: Hyderabad, Telangana, India. Roles: Student-Entrepreneur, EdTech Founder, CEO of Canies Academy™, Chief Architect of Synergy Reddy Group™. Contact: shrikanteshwar.reddy@gmail.com.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-paper py-8 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-paper text-ink rounded-[4px] flex items-center justify-center font-display font-bold text-xs tracking-tighter">
              {content.nav.logo}
            </div>
            <span className="text-sm text-gray-400">{content.footer.copyright}</span>
          </div>
          
          <div className="flex items-center gap-6">
            {content.footer.links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm text-gray-400 hover:text-paper transition-colors">
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="w-10 h-10 bg-[#222] hover:bg-crimson text-paper rounded-[4px] flex items-center justify-center transition-colors ml-4"
              aria-label="Back to top"
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
