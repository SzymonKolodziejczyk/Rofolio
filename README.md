# Roblox Systems Portfolio — Cosmic / Video-Ready Edition

React + TypeScript + Vite. No backend. All showcase media is local.

## Run it

```bash
npm install
npm run dev
```

For production: `npm run build` and deploy the `dist/` folder.

## Drop-in videos and thumbnails (no component changes)

The four featured cards are driven by `src/projects.ts` and expect these filenames:

| Project | MP4 video in `public/videos/` | Thumbnail in `public/projects/` |
| --- | --- | --- |
| THE SWARM | `swarm-showcase.mp4` | `swarm.webp` — your uploaded screenshot is included |
| Camera System | `camera-system-showcase.mp4` | `camera-system.webp` — temporary designed poster |
| Jarvis | `jarvis-showcase.mp4` | `jarvis.webp` — cosmic placeholder |
| Upcoming Game | `new-game-showcase.mp4` | `new-game.webp` — cosmic placeholder |

Just overwrite any placeholder WebP with your own WebP thumbnail **using the same filename**. Copy the MP4 into `public/videos/` with the exact name shown above. Restart or refresh the local dev page.

The app verifies whether each MP4 exists. If present, it uses a native inline video player with **`preload="none"`** and a poster. If absent, it displays the thumbnail. No autoplay and no download of the actual video until the visitor chooses to play it (browser behavior may vary slightly).

The two upcoming cards intentionally have neutral text and no invented technical claims. Once you publish the work, update each card's `title`, `eyebrow`, `summary`, `signal`, `tags`, and optional `link` in `src/projects.ts` so it tells the story you want. Set `status` to something other than `upcoming` (or remove it) to remove the upcoming-card styling.

### Picking a camera thumbnail

Pick a moment where the camera framing reads clearly in a still image: a visible player character, some environmental depth, minimal HUD, and no blurred rapid turn. Ideally the camera angle or collision behavior is visually evident.

For example, use ffmpeg to pull a frame at 7 seconds (choose your own timestamp):

```bash
ffmpeg -ss 00:00:07 -i public/videos/camera-system-showcase.mp4 -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 80 public/projects/camera-system.webp
```

The camera MP4 has not been provided yet, so no real camera-system frame has been selected or inserted.

### MP4 optimization

- Export as **H.264 MP4**, 720p or 1080p.
- For a short gameplay showcase, try **10–20 seconds** and **2–4 Mbps** video bitrate.
- A short 15-second clip at 3 Mbps is about **5.6 MB**, plus audio overhead. Aim to keep each video roughly **4–8 MB** when possible.
- Posters are light WebP images and load before videos.
- Avoid autoplay: the player is paused and uses `preload="none"`.
- Original screenshot for THE SWARM is included as `public/projects/swarm.png`, with a lighter `swarm.webp` actually used on the page.

## Cosmic atmosphere

The starfield is a lightweight local SVG and CSS gradient treatment: soft violet/blue nebula light, warm gold accents, faint star drift. It does not require WebGL, huge photos, or a third-party image library. Motion is disabled with `prefers-reduced-motion`.

If you later add a real NASA image, select a specific NASA-hosted asset and check its individual usage requirements, attribution guidance, and file size first. This revision does not include or imply NASA photography.

## Deployment

For `username.github.io` or a custom domain, leave `VITE_BASE` unset.
For a repository site like `username.github.io/my-portfolio/`, build with:

```bash
VITE_BASE=/my-portfolio/ npm run build
```

JavaScript media paths now respect the configured Vite base path. Experience graphics remain included as local placeholders. Review project copy and check footage permissions before publication.
