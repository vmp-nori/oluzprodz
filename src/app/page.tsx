import Image from "next/image";
import { MetricValue } from "@/components/ui/metric-value";
import { socialLinks } from "@/domains/contact/config/social-links";
import { PortfolioGallery } from "@/domains/portfolio/components/portfolio-gallery";
import { SoftwareIcon } from "@/domains/profile/components/software-icon";
import { profile } from "@/domains/profile/data/profile";

export default function Home() {
  return (
    <main className="desktop-site">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/assets/oluprodz-landing2v2.png"
          alt="Oluwasegun Ogunjobi reviewing footage on his camera"
          fill
          preload
          quality={86}
          sizes="100vw"
        />
        <div className="hero-scrim" />

        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="OluProdz home">
            <Image
              className="wordmark-image"
              src="/images/oluzprodz-logo-transparent.png"
              alt=""
              width={1428}
              height={1102}
              sizes="(max-width: 1023px) 52px, 64px"
            />
          </a>
          <nav className="section-nav" aria-label="Page sections">
            <a href="#work">
              <span aria-hidden="true">[01.</span> Work
              <span aria-hidden="true">]</span>
            </a>
            <a href="#profile">
              <span aria-hidden="true">[02.</span> Experience
              <span aria-hidden="true">]</span>
            </a>
            <a href="#capabilities">
              <span aria-hidden="true">[03.</span> Capabilities
              <span aria-hidden="true">]</span>
            </a>
            <a href="#contact">
              <span aria-hidden="true">[04.</span> Contact
              <span aria-hidden="true">]</span>
            </a>
          </nav>
        </header>

        <p className="mobile-hero-index" aria-hidden="true">
          SPORTS / PHOTO / MOTION
        </p>

        <div className="hero-copy">
          <h1 id="hero-title">
            Stories told
            <br />
            in motion.
          </h1>
          <p className="hero-specialties">SPORTS / PHOTOGRAPHY / VIDEOGRAPHY</p>
        </div>

        <div className="hero-footer">
          <p className="hero-tagline">
            Crafting visual stories
            <br />
            for individuals and brands.
          </p>
        </div>
      </section>

      <nav className="mobile-dock" aria-label="Mobile page sections">
        <a href="#top">Home</a>
        <a href="#work">Work</a>
        <a href="#profile">Experience</a>
        <a href="#capabilities">Toolkit</a>
        <a href="#contact">Contact</a>
      </nav>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">PORTFOLIO</h2>
          <p>
            Fast-turnaround photography and video for athletes, teams, events,
            automotive campaigns, and social channels.
          </p>
        </div>

        <PortfolioGallery />

        <div className="archive-note">
          <p>
            Selected frames from courtside, field, event, and campaign work.
          </p>
          <a href={socialLinks.instagram.href} target="_blank" rel="noreferrer">
            See current work on Instagram
          </a>
        </div>
      </section>

      <section
        className="profile-section"
        id="profile"
        aria-labelledby="profile-title"
      >
        <div className="experience-heading">
          <h2 id="profile-title">Experience</h2>
          <p>
            Olu turns live moments into visual stories built for attention, from
            the sideline to the feed.
          </p>
        </div>

        <section className="impact-ledger" aria-label="Performance metrics">
          <dl>
            {profile.analytics.map((metric, index) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>
                  <MetricValue value={metric.value} delay={index * 0.08} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="experience-reels">
          {profile.featuredReels.map((reel, index) => (
            <article className="experience-reel" key={reel.title}>
              <div
                className="reel-placeholder"
                role="img"
                aria-label="Instagram reel placeholder"
              >
                <span>REEL / 0{index + 1}</span>
                <p>Instagram embed</p>
              </div>
              <div className="reel-caption">
                <div>
                  <h3>{reel.title}</h3>
                  <p>{reel.client}</p>
                </div>
                <p>
                  <strong>{reel.views}</strong> views
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="career-block">
          <div className="career-intro">
            <h3>Career timeline</h3>
            <p>{profile.summary}</p>
          </div>
          <ol className="career-timeline" aria-label="Career timeline">
            {profile.experience.map((role, index) => (
              <li key={`${role.company}-${role.dates}`}>
                <div className="timeline-visual">
                  {role.image ? (
                    <Image
                      src={role.image}
                      alt={`${role.company} career moment`}
                      fill
                      sizes="(min-width: 1181px) 36vw, 42vw"
                    />
                  ) : (
                    <div className="timeline-image-slot" aria-hidden="true">
                      <span>IMAGE / {String(index + 1).padStart(2, "0")}</span>
                      <p>Add an era photo</p>
                    </div>
                  )}
                </div>
                <div className="timeline-axis">
                  <span>
                    {role.dates}
                    {role.current ? <b>Current</b> : null}
                  </span>
                  <i aria-hidden="true" />
                </div>
                <div className="timeline-copy">
                  <p className="timeline-company">{role.company}</p>
                  <h4>{role.role}</h4>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="capabilities-section"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="capabilities-heading">
          <h2 id="capabilities-title">Creative toolkit</h2>
          <p>
            From live capture to final export, Olu brings the production skills
            and editing workflow to carry every story through.
          </p>
        </div>

        <div className="toolkit-layout">
          <div className="toolkit-disciplines">
            {profile.capabilities.map((group) => (
              <section key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </section>
            ))}
          </div>

          <div className="toolkit-software">
            <div className="toolkit-software-heading">
              <h3>Editing desk</h3>
              <span>{profile.software.length} editing apps</span>
            </div>
            <div className="software-keyboard">
              <ul
                className="software-grid"
                aria-label="Post-production software"
              >
                {profile.software.map((app) => (
                  <li
                    className={`software-key software-key-${app.tone}`}
                    key={app.name}
                    title={app.name}
                  >
                    <div className="software-key-switch" aria-hidden="true" />
                    <div className="software-keycap">
                      <span
                        className="software-app-mark"
                        role="img"
                        aria-label={app.name}
                      >
                        <SoftwareIcon tone={app.tone} />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div>
          <p>Have something worth capturing?</p>
          <h2>Talk to Olu.</h2>
        </div>
        <a
          className="contact-link"
          href={socialLinks.instagram.href}
          target="_blank"
          rel="noreferrer"
        >
          Instagram <span aria-hidden="true">↗</span>
        </a>
        <p className="footer-meta">© {new Date().getFullYear()} OluProdz</p>
      </footer>
    </main>
  );
}
