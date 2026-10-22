import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { featured, more, type Project } from './projects';
import './style.css';

type IconName = 'arrow' | 'up' | 'plus' | 'minus' | 'external' | 'code' | 'mail' | 'menu' | 'play';

const Icon = ({ name, size = 18 }: { name: IconName; size?: number }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  const paths = {
    arrow: (
      <>
        <path d="M4 12h16m-7-7 7 7-7 7" />
      </>
    ),
    up: (
      <>
        <path d="M7 17 17 7M8 7h9v9" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M20 14v6H4V4h6" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    play: <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" stroke="none" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
};

function A({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

// Resolve files in public/ correctly on both custom domains and GitHub Pages subpaths.
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function useAssetExists(path?: string) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let active = true;

    if (!path) {
      setExists(false);
      return;
    }

    fetch(publicAsset(path), { method: 'HEAD' })
      .then((response) => {
        if (active) {
          const mime = response.headers.get('content-type') || '';
          setExists(response.ok && (mime.startsWith('video/') || mime.includes('octet-stream') || mime.includes('application/mp4')));
        }
      })
      .catch(() => {
        if (active) setExists(false);
      });

    return () => {
      active = false;
    };
  }, [path]);

  return exists;
}

function ProjectMedia({ project }: { project: Project }) {
  const videoPath = project.media?.videoSrc;
  const hasVideo = useAssetExists(videoPath);
  const isUpcoming = project.status === 'upcoming';
  const poster = publicAsset(project.media?.poster ?? `/projects/${project.id}.svg`);
  const alt =
    project.media?.alt ?? `Project image or placeholder artwork for ${project.title}.`;

  return (
    <div className={`project-media ${hasVideo ? 'has-video' : 'is-poster'}`}>
      {hasVideo && videoPath ? (
        <video controls preload="none" poster={poster} playsInline aria-label={`${project.title} showcase video`}>
          <source src={publicAsset(videoPath)} type={project.media?.videoType ?? 'video/mp4'} />
          Your browser does not support this video format.
        </video>
      ) : (
        <>
          <img src={poster} alt={alt} loading="lazy" />
          <span className="media-stage">{isUpcoming ? 'COMING SOON' : 'SHOWCASE VIDEO COMING SOON'}</span>
        </>
      )}
      {!hasVideo && <span className="media-label">{isUpcoming ? 'NEXT UP / PROJECT SHOWCASE' : 'PROJECT PREVIEW'}</span>}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`project-card${project.status === 'upcoming' ? ' project-card--upcoming' : ''}`} id={`project-${project.id}`}>
      <div className="project-top">
        <span className="eyebrow">{project.eyebrow}</span>
        <span className="serial">S.{String(index + 1).padStart(2, '0')}</span>
      </div>

      <ProjectMedia project={project} />

      <div className="project-content">
        <h3>{project.title}</h3>
        <div className="project-signal">{project.signal}</div>
        <p>{project.summary}</p>
      </div>

      {project.tags.length > 0 && <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}

      {open && project.detail ? (
        <div className="project-detail" id={`project-detail-${project.id}`}>
          <div>
            <strong>Challenge</strong>
            <p>{project.detail.challenge}</p>
          </div>
          <div>
            <strong>Approach</strong>
            <p>{project.detail.approach}</p>
          </div>
          <div>
            <strong>Context</strong>
            <p>{project.detail.note}</p>
          </div>
        </div>
      ) : null}

      <div className="project-actions">
        {project.detail ? (
          <button
            aria-expanded={open}
            aria-controls={`project-detail-${project.id}`}
            onClick={() => setOpen(!open)}
            className="text-btn"
          >
            {open ? 'Less detail' : 'Technical detail'} <Icon name={open ? 'minus' : 'plus'} size={14} />
          </button>
        ) : null}
        {project.link ? (
          <A href={project.link} className="text-link">
            {project.linkLabel || 'View work'} <Icon name="up" size={15} />
          </A>
        ) : null}
      </div>
    </article>
  );
}

function App() {
  const [filter, setFilter] = useState('All');
  const [menu, setMenu] = useState(false);
  const filters = ['All', 'Physics', 'Networking', 'Combat', 'Tools'];
  const visible = more.filter((project) => filter === 'All' || project.category === filter);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#home" aria-label="Go to top">
            <span className="brand-square">S</span>
            <span>
              S. KOŁODZIEJCZYK<span className="brand-dot">_</span>
            </span>
          </a>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((value) => !value)}>
            <Icon name="menu" />
          </button>
          <nav className={menu ? 'nav open' : 'nav'} aria-label="Main navigation">
            {[
              ['#work', 'Work'],
              ['#experience', 'Experience'],
              ['#expertise', 'Expertise'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="kicker">
              <span className="kicker-line" /> ROBLOX / LUAU / SYSTEMS ENGINEERING
            </span>
            <h1>
              I build gameplay systems <em>that make games work.</em>
            </h1>
            <p className="hero-text">
              I’m a Roblox developer working on multiplayer, combat, physics, AI, and interaction systems. I like tricky problems, sharp game feel, and code that holds up in production.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#work">
                See my work <Icon name="arrow" size={17} />
              </a>
              <a className="btn-outline" href="#contact">
                Get in touch <Icon name="up" size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <b>4+ years</b> professional experience
              </span>
              <span>
                <b>Commercial</b> and independent projects
              </span>
            </div>
          </div>

          <div className="editor" aria-label="Decorative code-inspired illustration">
            <div className="editor-bar">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>
              <span>overview.luau</span>
              <span>◇</span>
            </div>
            <div className="editor-body">
              <span className="line-number">01</span>
              <span className="comment">-- ENGINEERING FOCUS</span>
              <span className="line-number">02</span>
              <span>
                <i className="syntax-a">local</i> Developer = {'{'}
              </span>
              <span className="line-number">03</span>
              <span>
                {'  '}<i className="syntax-b">platform</i> = <i className="syntax-c">"Roblox"</i>,
              </span>
              <span className="line-number">04</span>
              <span>
                {'  '}<i className="syntax-b">language</i> = <i className="syntax-c">"Luau"</i>,
              </span>
              <span className="line-number">05</span>
              <span>
                {'  '}<i className="syntax-b">focus</i> = {'{'}
              </span>
              <span className="line-number">06</span>
              <span>
                {'    '}<i className="syntax-c">"Game systems"</i>,
              </span>
              <span className="line-number">07</span>
              <span>
                {'    '}<i className="syntax-c">"Networking"</i>,
              </span>
              <span className="line-number">08</span>
              <span>
                {'    '}<i className="syntax-c">"Optimization"</i>
              </span>
              <span className="line-number">09</span>
              <span>{'  }'}</span>
              <span className="line-number">10</span>
              <span>{'}'}</span>
              <span className="line-number">11</span>
              <span className="typing-line">
                <i className="syntax-a">return</i> Developer
                <span className="cursor" />
              </span>
            </div>
            <div className="editor-foot">
              <span className="status-dot" /> SYSTEMS ONLINE
              <span className="editor-foot-right">LUAU / ROBLOX STUDIO</span>
            </div>
          </div>
        </section>

        <section className="section wrap" id="work">
          <div className="section-intro">
            <div className="section-label">01 / FEATURED SYSTEMS</div>
            <h2>Featured work</h2>
            <p>My current engineering highlights, with two more showcases on the way.</p>
          </div>
          <div className="project-grid" data-reveal>
            {featured.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.id} />
            ))}
          </div>

          <div className="more-head">
            <div>
              <span className="section-label">02 / MORE EXPERIMENTS</span>
              <h2>More experiments</h2>
            </div>
            <div className="filters" aria-label="Filter additional systems">
              {filters.map((item) => (
                <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)} aria-pressed={filter === item}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mini-grid" data-reveal>
            {visible.map((project) => (
              <article className="mini-card" key={project.id}>
                <div className="mini-top">
                  <span className="eyebrow">{project.eyebrow}</span>
                  <Icon name="code" size={18} />
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="mini-bottom">
                  <span>{project.signal}</span>
                  {project.link ? (
                    <A href={project.link} className="icon-link">
                      <Icon name="up" size={18} />
                      <span className="sr-only">{project.linkLabel || `View ${project.title}`}</span>
                    </A>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-dark" id="expertise">
          <div className="wrap">
            <div className="section-intro">
              <div className="section-label">03 / WHAT I DO</div>
              <h2>What I build</h2>
              <p>Gameplay, networking, and the behind-the-scenes code that keeps everything running.</p>
            </div>
            <div className="expertise-grid">
              {[
                ['01', 'Gameplay & Combat', 'Abilities, progression, physics interactions, and core gameplay loops.'],
                ['02', 'Multiplayer & Backend', 'Client-server architecture, persistent data, synchronization, and validation.'],
                ['03', 'AI & Simulation', 'Movement behavior, spatial systems, large populations, and performance budgets.'],
                ['04', 'Systems & Tools', 'Modular architecture, codebase improvements, and Roblox Studio tooling.'],
              ].map(([number, title, description]) => (
                <div className="expertise-item" key={number}>
                  <span>{number} /</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="experience">
          <div className="wrap experience-layout">
            <div>
              <div className="section-label">04 / PRODUCTION EXPERIENCE</div>
              <h2>Games I’ve worked on</h2>
              <p>
                Alongside independent R&amp;D, I&apos;ve contributed to commercial games, post-release updates, backend systems, combat, AI, and codebase maintenance. Some client projects are covered by NDAs.
              </p>
              <A href="https://www.linkedin.com/in/szymon-ko%C5%82odziejczyk-89bb95190/" className="text-link larger">
                Professional background <Icon name="up" />
              </A>
            </div>
            <div className="experience-list">
              <div>
                <img className="experience-thumb" src={publicAsset("/projects/experience-stairs.svg")} alt="Placeholder illustration for Brainrot Stairs" loading="lazy" />
                <strong>Brainrot Stairs</strong>
                <p>Built nearly the entire game independently, including its physics-driven gameplay and UI integration.</p>
                <A href="https://www.roblox.com/games/91382388097609/Brainrot-Stairs">Roblox experience ↗</A>
              </div>
              <div>
                <img className="experience-thumb" src={publicAsset("/projects/experience-mech.svg")} alt="Placeholder illustration for Mega Mech Tycoon" loading="lazy" />
                <strong>Mega Mech Tycoon</strong>
                <p>Mech weaponry, combat integration, additional mechanics, and post-release features.</p>
                <span>Previously released; availability may vary</span>
              </div>
              <div>
                <img className="experience-thumb" src={publicAsset("/projects/experience-monster.svg")} alt="Placeholder illustration for Monster Fight Simulator" loading="lazy" />
                <strong>Monster Fight Simulator</strong>
                <p>Inventory, pets, eggs, progression, upgrades, combat, and UI integration.</p>
                <span>Previously released; currently unavailable</span>
              </div>
              <div>
                <img className="experience-thumb" src={publicAsset("/projects/experience-prison.svg")} alt="Placeholder illustration for Wojanek Prison Run" loading="lazy" />
                <strong>Wojanek Prison Run</strong>
                <p>Rebuilt guard AI, performance work, character system replacement, and codebase cleanup.</p>
                <span>Previously released; currently unavailable</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section wrap" id="contact">
          <div className="section-label">05 / CONTACT</div>
          <h2>Let’s build something</h2>
          <p>Need help with Roblox gameplay, networking, or a system that’s giving you trouble? Let’s talk.</p>
          <div className="contact-actions">
            <A className="btn-primary" href="https://www.linkedin.com/in/szymon-ko%C5%82odziejczyk-89bb95190/">
              Connect on LinkedIn <Icon name="up" size={17} />
            </A>
            <span className="contact-note">LinkedIn is the best way to reach me.</span>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Szymon Kołodziejczyk</span>
          <span>Built with React · TypeScript · Luau mindset</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
