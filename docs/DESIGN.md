# Design

## Product and interaction principles

- Let Olu's imagery carry the experience
- Make the first viewport immediately identifiable and memorable
- Use the reference for composition and atmosphere without copying its identity
- Prefer a small number of polished sections over feature breadth

## Hero composition

- Let the supplied hero artwork lead the first viewport: its baked, oversized `OLUPRODZ` lettering is the dominant identity cue, while live interface type stays compact and supportive.
- Anchor the live hero copy to the lower edge in three columns: a truthful two-line semantic heading on the left (`Crafting visual stories / for athletes and brands.`), a subdued centered `Scroll down` cue linked to Work, and a truthful two-line role descriptor on the right (`Sports photographer & / videographer.`).
- Keep the section navigation in the top-right header, where its indexed labels remain available without competing with the artwork or bottom microtype composition.

## Navigation

- Keep the top-level section navigation inline and indexed: pale bracketed numerals frame each concise, uppercase label (for example, `[01. Work]`).
- Preserve the destination order and anchors: Work (`#work`), Experience (`#profile`), Capabilities (`#capabilities`), and Contact (`#contact`). These are the real page destinations, not decorative labels. The legacy `#profile` anchor remains stable while the visitor-facing label is Experience.
- Use the muted-lavender accent for hover and keyboard-focus feedback while keeping the indexed brackets and numerals visually subordinate to the labels.

## Mobile composition

- Treat mobile as a portrait-first edit of the same portfolio, not a scaled desktop canvas.
- Use the locally served Archivo face for mobile display headings so the touch experience does not depend on a third-party font request.
- Use a full-height photographic hero, horizontally scrollable media lanes, and a single-axis career timeline.
- Keep primary destinations in a persistent bottom dock sized for touch; retain the same anchors and information architecture as desktop.
- Respect device safe areas and allow media to be replaced without changing the surrounding mobile composition.

## Accessibility

- Keyboard-visible focus states
- Semantic landmarks and link names
- WCAG AA contrast for interactive controls and text
- Respect prefers-reduced-motion
- Descriptive alt text for meaningful images and empty alt text for decoration

Review feedback that recurs must become a durable rule, check, or design document.
