export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  signal: string;
  category?: "Physics" | "Networking" | "Combat" | "Tools";
  link?: string;
  linkLabel?: string;
  status?: "upcoming";
  media?: {
    poster: string;
    alt: string;
    videoSrc?: string;
    videoType?: string;
  };
  detail?: { challenge: string; approach: string; note: string };
};

const profile = 'https://www.linkedin.com/in/szymon-ko%C5%82odziejczyk-89bb95190/';

export const featured: Project[] = [
  {
    id: 'swarm',
    title: 'THE SWARM',
    eyebrow: '01 / FEATURED SYSTEM',
    summary:
      'A large-population simulation prototype built to move thousands of objects efficiently without the overhead of full Humanoids or pathfinding agents.',
    signal: '10,000+ objects tested',
    tags: ['Luau', 'Simulation', 'Spatial bins', 'Optimization'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_roblox-gamedev-robloxstudio-activity-7501372200730660864-UaZG',
    linkLabel: 'View LinkedIn post',
    media: {
      poster: '/projects/swarm.webp',
      alt: 'Prototype screenshot of THE SWARM showing a large field of dark objects and a pink cluster moving through obstacles.',
      videoSrc: '/videos/swarm-showcase.mp4',
      videoType: 'video/mp4',
    },
    detail: {
      challenge:
        'How do you represent large moving populations without paying the per-agent cost of full character controllers?',
      approach:
        'A simplified movement layer with spatial bins, object pooling, staggered updates, and a carefully controlled simulation budget.',
      note:
        'The 10,000+ number refers to active objects in stress tests, not 10,000 fully independent Humanoid agents or guaranteed performance on all devices.',
    },
  },
  {
    id: 'camera-system',
    title: 'Camera System',
    eyebrow: '02 / FEATURED SYSTEM',
    summary:
      'A third-person camera and movement system focused on readability, responsiveness, collision handling, and game feel.',
    signal: 'Movement feel · camera logic',
    tags: ['Camera', 'Movement', 'Controls', 'Luau'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_robloxdev-gamedev-robloxstudio-activity-7456213432388796416-lb0J',
    linkLabel: 'View LinkedIn post',
    media: {
      poster: '/projects/camera-system.webp',
      alt: 'Placeholder poster for the camera system showcase video.',
      videoSrc: '/videos/camera-system-showcase.mp4',
      videoType: 'video/mp4',
    },
    detail: {
      challenge:
        'Good camera work has to feel invisible: readable in motion, stable in tight spaces, and responsive during fast gameplay.',
      approach:
        'I built a custom third-person setup around camera-relative controls, movement states, collision-aware behavior, and a player-friendly feel.',
      note:
        'The video showcase will give a better sense of how the camera behaves in motion.',
    },
  },
  {
    id: 'jarvis',
    title: 'Jarvis',
    eyebrow: '03 / UPCOMING SHOWCASE',
    status: 'upcoming',
    summary: 'An AI robot project. Video and technical notes will be added when the showcase is ready.',
    signal: 'Showcase coming soon',
    tags: [],
    media: {
      poster: '/projects/jarvis.webp',
      alt: 'Cosmic-inspired placeholder artwork for the upcoming Jarvis AI robot project.',
      videoSrc: '/videos/jarvis-showcase.mp4',
      videoType: 'video/mp4',
    },
  },
  {
    id: 'new-game',
    title: 'Upcoming Game',
    eyebrow: '04 / UPCOMING SHOWCASE',
    status: 'upcoming',
    summary: 'A recent game project. Its showcase and development story will go here when ready.',
    signal: 'Showcase coming soon',
    tags: [],
    media: {
      poster: '/projects/new-game.webp',
      alt: 'Cosmic-inspired placeholder artwork for an upcoming game project.',
      videoSrc: '/videos/new-game-showcase.mp4',
      videoType: 'video/mp4',
    },
  },
];

export const more: Project[] = [
  {
    id: 'button',
    category: 'Networking',
    title: 'THE BUTTON',
    eyebrow: 'MULTIPLAYER SYSTEM',
    summary:
      'A small multiplayer game built around one button, escalating stakes, shared state, and private player information.',
    signal: 'Shared state · private views',
    tags: ['Multiplayer', 'Validation', 'Game state'],
    link: profile,
    linkLabel: 'Explore on LinkedIn',
  },
  {
    id: 'timer',
    category: 'Networking',
    title: 'THE TIMER',
    eyebrow: 'NETWORK SYNCHRONIZATION',
    summary:
      'Competitive timing gameplay built around synchronized round time, latency-aware input capture, and server-side validation.',
    signal: 'Latency-aware timing',
    tags: ['Networking', 'Timestamps', 'Server validation'],
    link: profile,
    linkLabel: 'Explore on LinkedIn',
  },
  {
    id: 'starbinder',
    category: 'Combat',
    title: 'Starbinder',
    eyebrow: 'COMBAT ARCHITECTURE',
    summary:
      'A spellcaster class prototype developed for an action MMORPG, combining abilities, movement, cooldowns, and combat state.',
    signal: 'Abilities · movement · authority',
    tags: ['Combat', 'State management', 'Luau'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_robloxdev-gamedev-robloxstudio-activity-7461857366922129408-sJPC',
    linkLabel: 'View combat showcase',
  },
  {
    id: 'weather',
    category: 'Networking',
    title: 'Dynamic Weather',
    eyebrow: 'WORLD SYSTEMS',
    summary:
      'Configurable environmental transitions driven by a synchronized world clock.',
    signal: 'World time & weather',
    tags: ['Synchronization', 'Environment'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_gamedev-robloxdev-mmorpg-activity-7404595770752102400-yXLW',
    linkLabel: 'View showcase',
  },
  {
    id: 'lockon',
    category: 'Combat',
    title: 'Lock-On Combat',
    eyebrow: 'TARGETING',
    summary:
      'Combat targeting and camera behavior integrated with movement and target switching.',
    signal: 'Combat camera',
    tags: ['Camera', 'Targeting'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_gamedev-robloxdev-mmorpg-activity-7401334281207214080-VkUN',
    linkLabel: 'View showcase',
  },
  {
    id: 'track',
    category: 'Tools',
    title: 'Anti-Gravity Track Builder',
    eyebrow: 'STUDIO TOOLS',
    summary:
      'A custom level-building tool designed around track geometry and gameplay constraints.',
    signal: 'Editor tooling',
    tags: ['Tools', 'Procedural'],
    link: 'https://www.linkedin.com/posts/szymon-ko%C5%82odziejczyk-89bb95190_robloxdev-gamedev-robloxstudio-activity-7489032135660486656-qmv1',
    linkLabel: 'View showcase',
  },
  {
    id: 'stairs',
    category: 'Physics',
    title: 'Brainrot Stairs Physics',
    eyebrow: 'PHYSICS GAMEPLAY',
    summary:
      'Configurable obstacle trajectories, flight time, impacts, and bouncing without changing global gravity.',
    signal: 'Independent release',
    tags: ['Physics', 'Gameplay'],
    link: 'https://www.roblox.com/games/91382388097609/Brainrot-Stairs',
    linkLabel: 'View Roblox experience',
  },
  {
    id: 'balls',
    category: 'Physics',
    title: 'Bouncing Balls',
    eyebrow: 'PHYSICS PROTOTYPE',
    summary:
      'A physics-driven gameplay experiment exploring rounds, interactions, and presentation.',
    signal: 'Experimental gameplay',
    tags: ['Physics', 'Prototyping'],
    link: profile,
    linkLabel: 'Explore on LinkedIn',
  },
];
