import Image from "next/image";
import { MetricValue } from "@/components/ui/metric-value";
import { ContactForm } from "@/domains/contact/components/contact-form";
import { contactDetails } from "@/domains/contact/config/contact-details";
import { socialLinks } from "@/domains/contact/config/social-links";
import { PortfolioGallery } from "@/domains/portfolio/components/portfolio-gallery";
import { FeaturedReelVideo } from "@/domains/profile/components/featured-reel-video";
import { SoftwareIcon } from "@/domains/profile/components/software-icon";
import { profile } from "@/domains/profile/data/profile";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle className="icon-fill" cx="17.4" cy="6.8" r="1" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="icon-fill"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
      />
    </svg>
  );
}

function ReelActions() {
  return (
    <span className="reel-actions-icons" aria-hidden="true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.6a5.6 5.6 0 0 0-7.9 0L12 5.5l-.9-.9a5.6 5.6 0 0 0-7.9 7.9l.9.9L12 21.2l7.9-7.8.9-.9a5.6 5.6 0 0 0 0-7.9Z" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.9-.9L3 21l1.7-4.8a8.4 8.4 0 1 1 16.3-4.7Z" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        <path d="m22 2-11 11" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle className="icon-fill" cx="5" cy="12" r="1" />
        <circle className="icon-fill" cx="12" cy="12" r="1" />
        <circle className="icon-fill" cx="19" cy="12" r="1" />
      </svg>
    </span>
  );
}

type FeaturedReel = (typeof profile.featuredReels)[number];

function FeaturedReelCard({ reel }: { reel: FeaturedReel }) {
  return (
    <article className={`experience-reel experience-reel-${reel.orientation}`}>
      <div className="reel-frame">
        <FeaturedReelVideo
          title={reel.title}
          src={reel.src}
          poster={reel.poster}
          width={reel.width}
          height={reel.height}
        />
        <a
          className="reel-platform"
          href={reel.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${reel.title} on Instagram`}
        >
          <InstagramIcon />
          <span>Reels</span>
        </a>
        <div className="reel-actions" aria-hidden="true">
          <ReelActions />
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const landscapeReels = profile.featuredReels.filter(
    (reel) => reel.orientation !== "portrait",
  );
  const portraitReels = profile.featuredReels.filter(
    (reel) => reel.orientation === "portrait",
  );

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
          <span>SPORTS /</span> <span>PHOTO /</span> <span>MOTION</span>
        </p>

        <div className="hero-copy">
          <h1 id="hero-title">
            Stories told
            <br />
            in motion.
          </h1>
          <p className="hero-specialties">
            <span>SPORTS /</span> <span>PHOTOGRAPHY /</span>{" "}
            <span>VIDEOGRAPHY</span>
          </p>
        </div>

        <div className="hero-footer">
          <p className="hero-tagline">
            <span>Crafting visual stories</span>
            <span>for individuals and brands.</span>
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
          <p className="impact-window">*past 90 days</p>
        </section>

        <div className="experience-reels">
          <div className="experience-reel-column">
            {landscapeReels.map((reel) => (
              <FeaturedReelCard reel={reel} key={reel.title} />
            ))}
          </div>
          <div className="experience-reel-portraits">
            {portraitReels.map((reel) => (
              <FeaturedReelCard reel={reel} key={reel.title} />
            ))}
          </div>
        </div>

        <div className="career-block">
          <div className="career-intro">
            <h3>Career timeline</h3>
            <p>{profile.summary}</p>
          </div>
          <ol className="career-timeline" aria-label="Career timeline">
            {profile.experience.map((role) => (
              <li key={`${role.company}-${role.dates}`}>
                <div className="timeline-visual">
                  {role.images.map((image) => (
                    <div className="timeline-image-frame" key={image.src}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1181px) 36vw, (min-width: 768px) 42vw, 80vw"
                      />
                    </div>
                  ))}
                </div>
                <div className="timeline-axis">
                  <span>
                    <time>{role.dates}</time>
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

          <section className="footprint" aria-labelledby="footprint-title">
            <div className="footprint-heading">
              <h3 id="footprint-title">Work footprint</h3>
            </div>
            <div className="footprint-groups">
              <div className="footprint-group">
                <h4>Locations</h4>
                <ul>
                  {profile.footprint.locations.map((location) => (
                    <li key={location}>{location}</li>
                  ))}
                </ul>
              </div>
              <div className="footprint-group">
                <h4>Worked with</h4>
                <ul>
                  {profile.footprint.notableNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
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

          <div className="toolkit-media">
            <div className="toolkit-media-landscape">
              <Image
                src="/media/capabilities/west-virginia-team.jpg"
                alt="West Virginia football players and coaches posing together beside the field"
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
            <div className="toolkit-media-portrait">
              <Image
                src="/media/capabilities/player-focus.jpg"
                alt="Basketball player wearing red headphones and holding a ball"
                fill
                sizes="(max-width: 1023px) 42vw, 18vw"
              />
            </div>
          </div>

          <div className="toolkit-software">
            <h3>Editing desk</h3>
            <div className="software-keyboard">
              <ul
                className="software-grid"
                aria-label="Post-production software"
              >
                {profile.software.map((app) => (
                  <li key={app.name}>
                    <span
                      className="software-logo"
                      role="img"
                      aria-label={app.name}
                    >
                      <SoftwareIcon tone={app.tone} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="contact-heading">
          <p>Have something worth capturing?</p>
          <h2>Talk to Olu.</h2>
        </div>
        <div className="contact-layout">
          <ContactForm recipient={contactDetails.email} />
          <nav className="contact-links" aria-label="Social profiles">
            {[socialLinks.instagram, socialLinks.youtube].map((social) => (
              <a
                className="contact-link"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                key={social.label}
              >
                <span>{social.label}</span>
                <span className="contact-platform-icon" aria-hidden="true">
                  {social.label === "Instagram" ? (
                    <InstagramIcon />
                  ) : (
                    <YouTubeIcon />
                  )}
                </span>
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-meta">
          <p>© 2026 noriverse.cloud</p>
        </div>
      </footer>
    </main>
  );
}
