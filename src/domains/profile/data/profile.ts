export const profile = {
  name: "Oluwasegun Ogunjobi",
  summary:
    "A photographer, videographer, and content creator working across professional sport, automotive, commercial, and social media projects.",
  analytics: [
    { value: "1M+", label: "Accounts reached" },
    { value: "500K", label: "Views · past 90 days" },
    { value: "67%", label: "Non-follower viewership" },
  ],
  featuredReels: [
    {
      title: "Game day energy",
      client: "Brand / team",
      views: "48.7K",
      likes: "340",
      shares: null,
      orientation: "landscape",
      width: 1920,
      height: 1080,
      src: "/media/featured-reels/videos/b5468f8d0aa46f3d.mp4",
      poster: "/media/featured-reels/posters/b5468f8d0aa46f3d.webp",
      href: "https://www.instagram.com/reel/Dc7_qBth1o9/",
    },
    {
      title: "Campaign cut",
      client: "Brand / campaign",
      views: "126K",
      likes: "481",
      shares: null,
      orientation: "portrait",
      width: 1080,
      height: 1920,
      src: "/media/featured-reels/videos/1fc481c5230e2626.mp4",
      poster: "/media/featured-reels/posters/1fc481c5230e2626.webp",
      href: "https://www.instagram.com/reel/DcssSHxPiST/",
    },
    {
      title: "Behind the play",
      client: "Athlete / event",
      views: "72.4K",
      likes: "3",
      shares: null,
      orientation: "portrait",
      width: 1080,
      height: 1920,
      src: "/media/featured-reels/videos/4a0dabde07952471.mp4",
      poster: "/media/featured-reels/posters/4a0dabde07952471.webp",
      href: "https://www.instagram.com/reel/DRIm8_fk7qa/",
    },
  ],
  experience: [
    {
      company: "Iso1v1",
      role: "Media Manager / Marketing",
      dates: "Oct 2024 - Present",
      current: true,
      image: null as string | null,
    },
    {
      company: "Kilsyth Cobras Basketball",
      role: "Photographer / Videographer",
      dates: "Mar 2026 - Nov 2026",
      current: false,
      image: null as string | null,
    },
    {
      company: "CD Motors",
      role: "Photographer / Videographer / Content Creator",
      dates: "Mar 2025 - Nov 2025",
      current: false,
      image: null as string | null,
    },
    {
      company: "Knox Raiders",
      role: "Videographer / Photographer",
      dates: "Jan 2025 - Nov 2025",
      current: false,
      image: null as string | null,
    },
    {
      company: "Freelance",
      role: "Videographer / Photographer",
      dates: "Oct 2023 - Present",
      current: true,
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
