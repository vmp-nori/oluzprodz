export const profile = {
  name: "Oluwasegun Ogunjobi",
  summary:
    "A photographer, videographer, and content creator working across professional sport, automotive, commercial, and social media projects.",
  analytics: [
    { value: "3.2M+", label: "Total plays" },
    { value: "1.8M", label: "Accounts reached" },
    { value: "8.4%", label: "Engagement rate" },
    { value: "71%", label: "Avg. watch-through" },
  ],
  featuredReels: [
    { title: "Game day energy", client: "Brand / team", views: "000K" },
    { title: "Campaign cut", client: "Brand / campaign", views: "000K" },
    { title: "Behind the play", client: "Athlete / event", views: "000K" },
  ],
  experience: [
    {
      company: "Iso1v1",
      role: "Media Manager / Marketing",
      dates: "Oct 2025 - Present",
      image: null as string | null,
    },
    {
      company: "CD Motors",
      role: "Photographer / Videographer / Content Creator",
      dates: "Mar 2025 - Nov 2025",
      image: null as string | null,
    },
    {
      company: "Knox Raiders NBL1",
      role: "Videographer / Photographer",
      dates: "Jan 2025 - Nov 2025",
      image: null as string | null,
    },
    {
      company: "Freelance",
      role: "Videographer / Photographer",
      dates: "Oct 2023 - Present",
      image: null as string | null,
    },
  ],
  capabilities: [
    {
      name: "Production",
      description:
        "Videography, photography, and live coverage for sport, events, and automotive work.",
    },
    {
      name: "Post-production",
      description:
        "Editing, motion, colour, and final polish across short-form and campaign content.",
    },
    {
      name: "Creative delivery",
      description:
        "Highlight reels, branded social content, and platform-ready cuts built for attention.",
    },
  ],
  software: [
    { name: "Adobe Premiere Pro", shortName: "Pr", tone: "premiere" },
    { name: "Adobe After Effects", shortName: "Ae", tone: "after-effects" },
    { name: "Adobe Lightroom", shortName: "Lr", tone: "lightroom" },
    { name: "CapCut", shortName: "Cc", tone: "capcut" },
    { name: "Final Cut Pro", shortName: "Fc", tone: "final-cut" },
  ],
} as const;
