import Image from "next/image";
import {
  type PortfolioPhoto,
  type PortfolioVideo,
  portfolioPhotos,
  portfolioVideos,
} from "../data/portfolio-media";
import { CarouselReelRow } from "./carousel-reel-row";
import { CarouselVideo } from "./carousel-video";

type GalleryItem =
  | { kind: "photo"; media: PortfolioPhoto }
  | { kind: "video"; media: PortfolioVideo };

function seededShuffle<T>(items: readonly T[], seed: number) {
  const shuffled = [...items];
  let state = seed;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

const mixedMedia = seededShuffle<GalleryItem>(
  [
    ...portfolioPhotos.map((media) => ({ kind: "photo" as const, media })),
    ...portfolioVideos.map((media) => ({ kind: "video" as const, media })),
  ],
  24071998,
);

const mediaRows = [
  mixedMedia.filter((_, index) => index % 2 === 0),
  mixedMedia.filter((_, index) => index % 2 === 1),
];

export function PortfolioGallery() {
  return (
    <div className="portfolio-reel">
      {mediaRows.map((items, rowIndex) => (
        <CarouselReelRow
          direction={rowIndex === 0 ? "left" : "right"}
          key={`portfolio-row-${rowIndex + 1}`}
        >
          {[false, true].map((isDuplicate) => (
            <ol
              className="reel-set"
              aria-hidden={isDuplicate || undefined}
              aria-label={
                isDuplicate
                  ? undefined
                  : `Portfolio photographs and films, row ${rowIndex + 1}`
              }
              key={isDuplicate ? "duplicate" : "original"}
            >
              {items.map((item) => {
                const orientation =
                  item.media.width > item.media.height
                    ? "landscape"
                    : "portrait";

                return (
                  <li
                    className={`reel-panel reel-panel-${orientation}`}
                    key={`${item.kind}-${item.media.id}`}
                  >
                    {item.kind === "photo" ? (
                      <Image
                        src={`/media/gallery/images/${item.media.id}.avif`}
                        alt={isDuplicate ? "" : item.media.alt}
                        fill
                        sizes="(max-width: 1023px) 64vw, 18vw"
                      />
                    ) : (
                      <CarouselVideo video={item.media} />
                    )}
                  </li>
                );
              })}
            </ol>
          ))}
        </CarouselReelRow>
      ))}
    </div>
  );
}
