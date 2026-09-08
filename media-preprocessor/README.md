# OluProdz media preprocessor

Keep the full-resolution originals in Google Drive. Process a downloaded copy
before uploading website media to Cloudinary or another delivery service.

## Run it

Copy this entire folder to your local machine. Then open a terminal in the
copied `media-preprocessor` folder and run:

```bash
npm install
npm start -- "/absolute/path/to/downloaded-media"
```

The command recursively finds JPEG, PNG, TIFF, WebP, AVIF, MP4, MOV, and M4V
files. It creates a `website-media` folder beside the source folder and never
modifies the originals.

To choose the destination explicitly:

```bash
npm start -- "/path/to/source" "/path/to/website-ready"
```

## Output

```text
website-media/
├── images/          # 2400px AVIF and WebP derivatives
├── thumbnails/      # 720px WebP derivatives
├── videos/          # H.264/AAC MP4, capped at 1920px
├── posters/         # 1200px WebP video posters
└── media-manifest.json
```

Output names use a content hash, so badly named sources and duplicate files do
not create unstable public URLs. Rerunning the command skips content already in
the manifest. If a source file changes, it receives a new hash and is processed
again.

Removing a source does not automatically delete its old derivative files. This
is intentional: cleanup should happen only after the CMS or live website no
longer references the asset.

Animated GIF, HEIC, BMP, and RAW camera formats are not processed. Export those
as JPEG, PNG, or TIFF first.

## Requirements

- Node.js 20.9 or newer
- Enough free disk space for the source files and generated derivatives

Sharp and FFmpeg are installed locally by `npm install`; no separate media
software installation is required.

The manifest leaves `alt` empty intentionally. Add accurate alternative text
while curating the asset in the future CMS; filenames are not reliable image
descriptions.
