export const profile = {
  name: "Oluwasegun Ogunjobi",
  summary:
    "A photographer, videographer, and content creator working across professional sport, automotive, commercial, and social media projects.",
  analytics: [
    { value: "2.8M+", label: "Accounts reached" },
    { value: "526K", label: "Views · past 90 days" },
    { value: "11K", label: "Interactions" },
    { value: "68%", label: "Non-follower viewership" },
  ],
  featuredReels: [
    {
      title: "Hype Reel",
      client: "NBL 2026",
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
      title: "Summer Jam Recap",
      client: "Event coverage",
      views: null,
      likes: "577",
      orientation: "standard",
      width: 960,
      height: 720,
      src: "/media/featured-reels/videos/summer-jam.mp4",
      poster: "/media/featured-reels/posters/summer-jam.webp",
      href: "https://www.instagram.com/p/DVF4uHLjysd/",
    },
    {
      title: "Vera Studios",
      client: "Promotional Reel",
      views: "126K",
      likes: "481",
      orientation: "portrait",
      width: 1080,
      height: 1920,
      src: "/media/featured-reels/videos/1fc481c5230e2626.mp4",
      poster: "/media/featured-reels/posters/1fc481c5230e2626.webp",
      href: "https://www.instagram.com/reel/DcssSHxPiST/",
    },
    {
      title: "Smile Place",
      client: "Promotional Reel",
      views: "72.4K",
      likes: "3",
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
      images: [
        {
          src: "/media/experience/iso1v1-1.avif",
          alt: "Olu interviewing a guest at an outdoor event",
        },
        {
          src: "/media/experience/iso1v1-2.avif",
          alt: "Portrait of Olu smiling at an event",
        },
        {
          src: "/media/experience/iso1v1-3.avif",
          alt: "Olu walking through an event venue",
        },
      ],
    },
    {
      company: "Kilsyth Cobras Basketball",
      role: "Photographer / Videographer",
      dates: "Mar 2026 - Nov 2026",
      current: false,
      images: [
        {
          src: "/media/experience/kilsyth-1.avif",
          alt: "Olu filming courtside at a Kilsyth Cobras game",
        },
        {
          src: "/media/experience/kilsyth-2.avif",
          alt: "Olu checking his camera beside the basketball court",
        },
        {
          src: "/media/experience/kilsyth-3.avif",
          alt: "Olu filming from the sideline during a basketball game",
        },
      ],
    },
    {
      company: "CD Motors / Knox Raiders",
      role: "Photographer / Videographer / Content Creator",
      dates: "Jan 2025 - Nov 2025",
      current: false,
      images: [
        {
          src: "/media/experience/knox-cd-1.avif",
          alt: "Olu preparing his camera at a Knox Raiders event",
        },
        {
          src: "/media/experience/knox-cd-2.avif",
          alt: "Olu holding his camera courtside",
        },
        {
          src: "/media/experience/knox-cd-3.avif",
          alt: "Olu with his camera in the arena stands",
        },
      ],
    },
    {
      company: "Freelance",
      role: "Videographer / Photographer",
      dates: "Oct 2023 - Present",
      current: true,
      images: [
        {
          src: "/media/experience/freelance-1.avif",
          alt: "Olu reviewing his sports camera rig",
        },
        {
          src: "/media/experience/freelance-2.avif",
          alt: "Olu filming while riding through an off-road trail",
        },
        {
          src: "/media/experience/freelance-3.avif",
          alt: "Olu seated courtside with his camera",
        },
      ],
    },
  ],
  footprint: {
    locations: ["New Zealand", "America", "Indonesia", "China"],
    notableNames: [
      "David Goggins",
      "Nick Kyrgios",
      "JD Sports",
      "Foot Locker",
      "Mathew Richardson",
      "And many more",
    ],
  },
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
