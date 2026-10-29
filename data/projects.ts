/**
 * Single source of truth for every project on the site.
 *
 * One entry per project. The home page, the /work index and the [slug] pages
 * all read from this array, so a claim can never appear on one page and be
 * missing from another.
 *
 * `playable` is the only switch that decides how a project is presented:
 *
 *   playable: true   -> PlayableEmbed (itch.io iframe, loads only on click)
 *   playable: false  -> VideoPlayer + ImageGallery, never an iframe
 *
 * This is a factual distinction, not a stylistic one: the shipped games were
 * delivered as Windows installers, so a browser build does not exist to embed.
 * Showing a play button that does nothing would be worse than showing video.
 *
 * `category` is a technical grouping, not a ranking:
 *   shipped  -> delivered as Windows builds (video + screenshots)
 *   playable -> published on itch.io, runs in a browser
 *   source   -> public repository, no runnable public build
 *
 * Wording note: the copy here is written capability-first. Input hardware is a
 * real part of the shipped games, but it is one line inside a project's
 * technical notes, not the thing the project is named after. Anything stronger
 * than that makes one client's constraint look like a specialism.
 */

/** Which family a project belongs to. Drives filtering and layout. */
export type Category = "shipped" | "playable" | "source";

/** Media shown when no playable embed is possible. */
export interface GalleryMedia {
  /** Poster frame for the video player, and the hero image. */
  poster?: string;
  /** Screenshots. Ordered; the first is used as the gallery hero. */
  images: string[];
  /**
   * YouTube video id (11 chars, from the URL after /watch?v=).
   * Unlisted uploads are fine and are the intended source: the video stays
   * off YouTube search but plays in an embed.
   */
  youtubeId?: string;
  /** One line describing what the footage shows, shown under the video. */
  videoCaption?: string;
}

export interface Project {
  slug: string;
  /** Name as it shipped. Not the repo or Unity folder name. */
  name: string;
  category: Category;
  /** One line, used on cards and in meta descriptions. */
  tagline: string;
  /** 1-2 sentence summary. Paragraph prose, no line breaks. */
  summary: string;
  /**
   * What the developer owned. Shown as a single line under the summary, so a
   * reader can tell a solo build from a contribution without inferring it.
   */
  role: string;
  /** Whether a visitor can actually play this in a browser. */
  playable: boolean;
  /**
   * Set when playable is false. Explains, on the page itself, how the build was
   * delivered. Required for any non-playable project.
   */
  boundaryNote?: string;
  /** itch.io project page. Present for playable projects. Used for the
   *  "open on itch.io" link, never for the iframe. */
  itchUrl?: string;
  /**
   * Numeric id from itch.io's own embed code, e.g. 4070479 for
   * https://nitinvincent.itch.io/ufo-lander.
   *
   * Required whenever itchUrl is set. This is the only URL that can be framed:
   * appending "/embed" to the project URL returns an itch.io help page that
   * serves `X-Frame-Options: SAMEORIGIN`, so a cross-origin iframe is refused.
   * The real player lives at https://itch.io/embed/{itchEmbedId}.
   */
  itchEmbedId?: string;
  /** Public source repo, when the repo genuinely serves as proof. */
  repoUrl?: string;
  media: GalleryMedia;
  /**
   * What was built, as short scannable claims. Rendered as a bullet list on the
   * card and the case study. One feature per line, no trailing punctuation.
   */
  features: string[];
  /** Technology chips, ordered by relevance to the role being applied for. */
  tech: string[];
  /**
   * Verified numbers. Sourced from the projects themselves, not estimates.
   * If a number cannot be verified locally, it does not go in this file.
   */
  stats?: { label: string; value: string }[];
  /** Case study body, as titled sections. Rendered in order. */
  sections: { heading: string; body: string }[];
  /** Ordered for display. Lower sorts first. */
  order: number;
}

/**
 * The one shared paragraph about device input.
 *
 * Kept, because it is real and it is checkable: four Python diagnostic scripts
 * live on disk (gameFD1V / gameFD2P2V / gameFD2V / gameFD3V under "Reamp
 * Machine Script"), pyserial at 115200 baud, automatic USB port detection,
 * locks on serial and socket access, streamed into Unity over localhost TCP.
 *
 * Deliberately two sentences. It is a technical note inside a case study, not
 * the framing of the project: the games are judged on their gameplay systems,
 * and this is the constraint they were built under.
 */
const INPUT_NOTE =
  "Input also arrives from a sensor on a serial port, which a Python bridge " +
  "reads at 115200 baud, detects the USB device automatically and streams into " +
  "Unity over localhost TCP with serial and socket access guarded by locks. " +
  "Keyboard and mouse are wired up alongside it, so the game is playable " +
  "without the hardware present.";

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  // Shipped games. Delivered as Windows installers, so video + gallery.
  // -------------------------------------------------------------------------
  {
    slug: "block-strike",
    name: "Block Strike",
    category: "shipped",
    playable: false,
    order: 1,
    role: "Owned gameplay, UI and the Windows installer end to end.",
    tagline: "Procedural bubble-grid shooter with tiered difficulty and combo scoring.",
    summary:
      "An arcade bubble-grid shooter built around procedurally generated " +
      "levels, three difficulty tiers and an aim-and-match scoring loop. Combo " +
      "multipliers and floating-text feedback reward sustained, controlled play " +
      "across a long session.",
    boundaryNote:
      "Delivered as a Windows installer and never built for the web. The " +
      "footage below is that build running.",
    media: {
      poster: "/media/block-strike-poster.png",
      images: [
        "/media/block-strike-1.png",
        "/media/block-strike-2.png",
        "/media/block-strike-3.png",
      ],
      youtubeId: "oFWU-_QxhOs",
      videoCaption:
        "Recorded gameplay: aim-driven bubble grid, combo scoring and the " +
        "three difficulty tiers.",
    },
    features: [
      "Procedurally generated bubble-grid levels across three difficulty tiers",
      "Aim-and-match scoring with combo multipliers and floating-text feedback",
      "Tutorial flow that introduces controls and scoring on first run",
      "Game-state and session handling kept separate from level generation",
      "61 C# scripts across 38 Unity scenes",
    ],
    tech: [
      "Unity 6",
      "C#",
      "Procedural generation",
      "Scoring & combos",
      "UI feedback",
      "Threaded TCP input",
    ],
    stats: [
      { label: "C# scripts", value: "61" },
      { label: "Unity scenes", value: "38" },
      { label: "Difficulty tiers", value: "3" },
      { label: "Packaged as", value: "Inno Setup" },
    ],
    sections: [
      {
        heading: "Overview",
        body:
          "Bubble-grid levels are generated procedurally across three " +
          "difficulty tiers rather than authored by hand, so difficulty scales " +
          "without shipping a separate level set for each tier. Scoring rewards " +
          "accurate aim-and-match input with combo multipliers and floating-text " +
          "feedback, which gives the player a reason to keep their movement " +
          "controlled over a long session. A tutorial flow introduces the " +
          "controls and the scoring rules on first run.",
      },
      {
        heading: "Technical notes",
        body:
          "The game loop runs on Unity's main thread while a second input " +
          "source arrives on its own thread. Reading it straight from the " +
          "callback stalls rendering whenever a packet lands at the wrong " +
          "moment, so incoming data is buffered under a lock and drained on the " +
          "main thread. " +
          INPUT_NOTE,
      },
    ],
  },

  {
    slug: "lumber-dash",
    name: "Lumber Dash",
    category: "shipped",
    playable: false,
    order: 2,
    role: "Owned gameplay, UI and the Windows installer end to end.",
    tagline: "Reflex game with streak-based difficulty scaling.",
    summary:
      "A reaction-time game where difficulty follows the player's current " +
      "streak rather than a fixed level, layered with parallax scrolling and " +
      "particle feedback. A first-run tutorial introduces the controls.",
    boundaryNote:
      "Delivered as a Windows installer and never built for the web. The " +
      "footage below is that build running.",
    media: {
      poster: "/media/lumber-dash-poster.png",
      images: [
        "/media/lumber-dash-1.png",
        "/media/lumber-dash-2.png",
        "/media/lumber-dash-3.png",
      ],
      youtubeId: "EWu-h9htNEk",
      videoCaption:
        "Recorded gameplay: reaction timing, streak scaling and the parallax " +
        "background layers.",
    },
    features: [
      "Reaction-time core loop scored on how quickly the player responds",
      "Streak-based difficulty that tightens on success and eases after a miss",
      "Parallax background layers plus particle feedback on every hit",
      "Tutorial system that introduces the controls on first use",
      "47 C# scripts across 37 Unity scenes",
    ],
    tech: [
      "Unity 6",
      "C#",
      "Difficulty scaling",
      "Parallax",
      "Particle VFX",
      "Threaded TCP input",
    ],
    stats: [
      { label: "C# scripts", value: "47" },
      { label: "Unity scenes", value: "37" },
      { label: "Difficulty model", value: "Streak-based" },
      { label: "Packaged as", value: "Inno Setup" },
    ],
    sections: [
      {
        heading: "Overview",
        body:
          "The player reacts to incoming targets and is scored on reaction " +
          "speed. Difficulty scales with the current streak rather than a fixed " +
          "level, so the game tightens as the player improves and eases off " +
          "after a miss. That keeps the player in the productive difficulty band " +
          "instead of parked at a wall or sitting on easy, and it means one " +
          "build covers the whole range of ability.",
      },
      {
        heading: "Technical notes",
        body:
          "Inputs are read on a thread-safe TCP server that accepts concurrent " +
          "connections, because two presses arriving in the same frame would " +
          "otherwise race on shared state. Debouncing matters as much as the " +
          "networking: an unbounced physical button fires the same action twice " +
          "on one press. " +
          INPUT_NOTE,
      },
    ],
  },

  {
    slug: "galaxy-flex",
    name: "Galaxy Flex",
    category: "shipped",
    playable: false,
    order: 3,
    role: "Owned gameplay, UI and the Windows installer end to end.",
    tagline: "Wave-based arcade shooter built on a shared object pool.",
    summary:
      "A wave-based shooter with escalating waves, layered parallax " +
      "backgrounds and a single generic object pool shared by every spawned " +
      "projectile and meteor. Also shipped in a second build with a D-Handle " +
      "grip coupler for players with a constrained grip.",
    boundaryNote:
      "Delivered as a Windows installer and never built for the web. The " +
      "footage below is that build running.",
    media: {
      poster: "/media/galaxy-flex-poster.png",
      images: [
        "/media/galaxy-flex-1.png",
        "/media/galaxy-flex-2.png",
        "/media/galaxy-flex-3.png",
      ],
      youtubeId: "P38GlO9vGd4",
      videoCaption:
        "Recorded gameplay: wave escalation, pooled projectiles and meteors, " +
        "and the layered parallax backgrounds.",
    },
    features: [
      "Wave-based shooter loop with escalating wave difficulty",
      "One generic object pool shared by projectiles and meteors",
      "Layered parallax backgrounds that read as depth without 3D geometry",
      "Standard and D-Handle grip configurations shipped as separate builds",
      "71 C# scripts across 42 Unity scenes",
    ],
    tech: [
      "Unity 6",
      "C#",
      "Object pooling",
      "Wave systems",
      "Parallax",
      "Input systems",
    ],
    stats: [
      { label: "C# scripts", value: "71" },
      { label: "Unity scenes", value: "42" },
      { label: "Spawned objects", value: "Shared pool" },
      { label: "Build variants", value: "Standard + D-Handle" },
    ],
    sections: [
      {
        heading: "Overview",
        body:
          "Waves escalate as the player survives, and the ship is steered by " +
          "movement rather than a stick alone. Layered parallax backgrounds give " +
          "depth without the cost of 3D geometry, which matters when the target " +
          "hardware is not a gaming machine. A second build adds a D-Handle " +
          "grip coupler, so the same game can be played with a hand resting on a " +
          "supported handle rather than held in a fist.",
      },
      {
        heading: "Technical notes",
        body:
          "Meteors and projectiles spawn continuously, and instantiating per " +
          "spawn produces a GC spike at exactly the wrong moment: during wave " +
          "escalation, when the player most needs a stable frame rate. A single " +
          "generic pool serves every spawned object rather than a pool per " +
          "prefab, so nothing is allocated mid-wave. " +
          INPUT_NOTE,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Source-only. Repo is real but not a runnable public build.
  // -------------------------------------------------------------------------
  {
    slug: "zombie-shooter",
    name: "Zombie Shooter",
    category: "source",
    playable: false,
    order: 4,
    role: "Personal project: gameplay systems, audio and build.",
    tagline: "3D top-down survival shooter: NavMesh zombies, twin-stick movement, Wwise audio.",
    summary:
      "A 3D top-down survival shooter with NavMesh zombie pathfinding, " +
      "twin-stick eight-directional movement, 360-degree aiming, raycast hit " +
      "detection and a central game-state manager. Audio runs end to end in " +
      "Wwise, driven from C# with the Unity audio engine disabled.",
    boundaryNote:
      "The public repository contains the game's own source, its Wwise " +
      "definitions and its scene files, but it does not build a playable copy: " +
      "the art is licensed Asset Store content and the baked NavMesh data is " +
      "derived and far over GitHub's per-file size limit. The video is the proof " +
      "of the systems, and the repo is the proof of the code.",
    repoUrl: "https://github.com/Nithinvincen5209/Zombie-Escape",
    media: {
      images: [],
      youtubeId: "8QlwPnu0JwM",
      videoCaption:
        "Gameplay from the public repository's build: twin-stick movement and " +
        "aiming, NavMesh zombie pathfinding, and Wwise Events driven from C#.",
    },
    features: [
      "Twin-stick movement with independent 360-degree aiming",
      "Raycast hit detection, so fast projectiles cannot tunnel through colliders",
      "NavMesh zombie pathfinding over a baked navigation mesh",
      "Central game-state manager owning objectives and win/loss conditions",
      "Wwise Events, RTPCs and Switches driven from C# with Unity audio disabled",
    ],
    tech: ["Unity 6000.0.31f1", "URP", "Wwise 2024.1.6", "NavMesh", "Raycasting", "C#"],
    stats: [
      { label: "C# scripts", value: "478" },
      { label: "Unity scenes", value: "48" },
      { label: "Tracked files", value: "1,440" },
      { label: "Wwise", value: "Events, RTPCs, Switches" },
    ],
    sections: [
      {
        heading: "Movement and aiming",
        body:
          "Twin-stick control: eight-directional movement on one stick with " +
          "independent 360-degree aiming on the other. Movement and aim are " +
          "decoupled on purpose, so backing away while keeping an enemy in " +
          "reticle is possible. Hits are resolved with raycasts rather than " +
          "trigger volumes, which avoids the case where a fast projectile " +
          "tunnels through a collider between two frames.",
      },
      {
        heading: "Zombie pathfinding",
        body:
          "Zombies navigate on a baked NavMesh with a central game-state " +
          "manager tracking objectives and win/loss conditions, so game state is " +
          "owned in one place rather than inferred from whichever enemy happens " +
          "to be alive. The baked NavMesh assets are intentionally not in the " +
          "public repo: they are derived data and the largest is a single 314 MB " +
          "file.",
      },
      {
        heading: "Audio end to end in Wwise",
        body:
          "Gameplay Events, RTPCs and Switches are authored in Wwise and driven " +
          "from C#, with the Unity audio engine disabled entirely rather than " +
          "left to compete for the audio thread. The project keeps its own 40 " +
          "Events, 4 Switches and 2 Soundbank definitions in the repo, which " +
          "is what makes the audio work checkable rather than a claim. The " +
          "1.36 GB native Wwise SDK for platforms that were never targeted is " +
          "excluded.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // itch.io titles. Genuinely playable in a browser.
  // -------------------------------------------------------------------------
  {
    slug: "ufo-lander",
    name: "UFO Lander",
    category: "playable",
    playable: true,
    order: 5,
    role: "Personal project: gameplay, audio and build.",
    tagline: "Rigidbody flight model with Wwise thruster audio, playable in browser.",
    summary:
      "An arcade flight game built on a Rigidbody flight model simulating " +
      "gravity, thrust and rotation, tuned for arcade handling rather than " +
      "simulation accuracy. Crash validation checks landing speed and angle, " +
      "and thruster audio is modulated in real time by player input through RTPC.",
    itchUrl: "https://nitinvincent.itch.io/ufo-lander",
    itchEmbedId: "4070479",
    repoUrl: "https://github.com/Nithinvincen5209/UFO",
    media: { images: [] },
    features: [
      "Rigidbody flight model for gravity, thrust and rotation, tuned for arcade feel",
      "Landing validation on descent speed and tilt angle, so failures read differently",
      "Playing / Level Complete / Crashed state machine governing effects and audio",
      "Wwise thruster audio driven by a real-time parameter from player input",
    ],
    tech: ["Unity 6000.0.31f1", "Rigidbody", "Wwise 2024.1.6", "RTPC", "C#"],
    stats: [
      { label: "Playable", value: "In browser" },
      { label: "Flight model", value: "Rigidbody" },
      { label: "Audio", value: "Wwise + RTPC" },
    ],
    sections: [
      {
        heading: "Flight model",
        body:
          "Gravity, thrust and rotation are all simulated through Rigidbody, " +
          "but the tuning is deliberately arcade: response curves are sharpened " +
          "and forces are exaggerated so the ship answers the stick immediately. " +
          "A physically accurate model feels unresponsive in a game that is " +
          "about landing, so the values were tuned for feel rather than realism.",
      },
      {
        heading: "Landing validation",
        body:
          "A crash is decided on the state of the landing: descent speed and " +
          "tilt angle are both checked on contact, so arriving fast but level " +
          "and arriving slow but steep fail differently. Crashing feeds a " +
          "Playing / Level Complete / Crashed state machine that also governs " +
          "the particle effects and audio.",
      },
      {
        heading: "Thruster audio through RTPC",
        body:
          "Main and side thruster sounds are driven by a real-time parameter " +
          "from player input, so the audio responds continuously to what the " +
          "player is doing rather than switching between fixed clips. Explosion " +
          "effects run through the same game-state machine.",
      },
    ],
  },

  {
    slug: "tower-tactics",
    name: "Tower Tactics",
    category: "playable",
    playable: true,
    order: 6,
    role: "Personal project: gameplay and build.",
    tagline: "Tower-defence strategy game, playable in browser.",
    summary:
      "A tower-defence strategy game published as a browser build on itch.io, " +
      "embedded on this page so it can be played without leaving the site.",
    itchUrl: "https://nitinvincent.itch.io/tower-tactics",
    itchEmbedId: "4072206",
    media: { images: [] },
    features: [
      "Tower-defence strategy loop",
      "Full browser build published on itch.io",
      "Click-to-load embed, so nothing is fetched until you play",
    ],
    tech: ["Unity", "C#"],
    sections: [
      {
        heading: "Playable build",
        body:
          "This is a full browser build, so it is embedded on this page and " +
          "runs on itch.io's platform. Play it directly rather than taking the " +
          "description on trust.",
      },
    ],
  },

  {
    slug: "memory-match",
    name: "Memory Match",
    category: "playable",
    playable: true,
    order: 7,
    role: "Personal project: gameplay and build.",
    tagline: "Memory-matching puzzle game, playable in browser.",
    summary:
      "A memory-matching puzzle game published as a browser build on itch.io. " +
      "Card flip state, match resolution and board reset are handled in Unity.",
    itchUrl: "https://nitinvincent.itch.io/memory-match",
    itchEmbedId: "4069605",
    media: { images: [] },
    features: [
      "Memory-matching core loop with pair resolution",
      "Card flip state and board reset handled in Unity",
      "Full browser build published on itch.io",
    ],
    tech: ["Unity", "C#"],
    sections: [
      {
        heading: "Playable build",
        body:
          "Published as a browser build on itch.io and embedded here. Card flip " +
          "state, match resolution and board reset are handled in Unity.",
      },
    ],
  },

  {
    slug: "aero-timeline-shooter",
    name: "Aero Timeline Shooter",
    category: "playable",
    playable: true,
    order: 8,
    role: "Personal project: gameplay and build.",
    tagline: "Arcade shooter, playable in browser.",
    summary:
      "An arcade shooter published as a browser build on itch.io and embedded " +
      "here, so it can be played without leaving the site.",
    itchUrl: "https://nitinvincent.itch.io/aero-timeline-shooter",
    itchEmbedId: "4081223",
    media: { images: [] },
    features: [
      "Arcade shooting loop",
      "Full browser build published on itch.io",
      "Click-to-load embed, so nothing is fetched until you play",
    ],
    tech: ["Unity", "C#"],
    sections: [
      {
        heading: "Playable build",
        body:
          "A full browser build, embedded so it can be played from this page " +
          "without leaving for itch.io.",
      },
    ],
  },
];

/** Links shown in the header / contact area. */
export const profile = {
  name: "Nithin Vincent",
  role: "Unity Developer",
  tagline:
    "Unity developer building gameplay systems, UI and interactive audio, " +
    "from prototype through to a shipped Windows build.",
  /**
   * The hero paragraph. Derived from the downloadable resume so the two cannot
   * drift: if this changes, `public/Nithin-Vincent-Unity-Developer-Resume.pdf`
   * needs rebuilding to match.
   */
  summary:
    "Unity developer with eight months of professional experience building " +
    "gameplay systems end to end in Unity 6 and C#: procedural generation, " +
    "physics, object pooling, UI and game-state management. Shipped four " +
    "Windows games as installers for a rehabilitation-engineering client, with " +
    "four more published and playable in a browser.",
  location: "Thrissur, Kerala, India",
  email: "nithinvincent371@gmail.com",
  github: "https://github.com/Nithinvincen5209",
  linkedin: "https://www.linkedin.com/in/nithin-vincent/",
  itch: "https://nitinvincent.itch.io",
  resumePdf: "/Nithin-Vincent-Unity-Developer-Resume.pdf",
} as const;

/**
 * Headline numbers. Every value here is checkable against the project pages or
 * the internship certificate (06 Jan 2026 - 22 Sep 2026).
 */
export const highlights: { label: string; value: string }[] = [
  { label: "games shipped as Windows builds", value: "4" },
  { label: "playable in the browser", value: "4" },
  { label: "public case studies", value: "3" },
  { label: "months, Remap internship", value: "8" },
];

/**
 * What I build, as capability cards on the home page.
 *
 * Written from the same source as the resume skills block, grouped by the job a
 * reader is hiring for rather than by tool. Order puts the things a gameplay
 * role screens for first.
 */
export const capabilities: { heading: string; body: string; items: string[] }[] = [
  {
    heading: "Gameplay systems",
    body:
      "Systems that hold up over a long session, not a demo that works once.",
    items: [
      "Procedural level generation",
      "Scoring, combos and difficulty scaling",
      "Object pooling",
      "Game-state and session management",
    ],
  },
  {
    heading: "Physics, AI and 3D",
    body:
      "Movement and enemies that behave consistently frame to frame.",
    items: [
      "Rigidbody physics and landing validation",
      "NavMesh pathfinding",
      "Raycast hit detection",
      "Colliders and trigger logic",
    ],
  },
  {
    heading: "UI and player feedback",
    body:
      "The layer between the system and the person using it.",
    items: [
      "Unity UI (Canvas) layouts",
      "Animated gauges and live readouts",
      "Combo and floating-text feedback",
      "Tutorial and onboarding flows",
    ],
  },
  {
    heading: "Interactive audio",
    body:
      "Audio treated as a system, with an audio engineering diploma behind it.",
    items: [
      "Wwise Events, RTPCs and Switches",
      "Real-time parameter modulation",
      "Audio driven from C#",
      "Unity audio engine disabled in favour of Wwise",
    ],
  },
  {
    heading: "Build and release",
    body:
      "A feature is not finished until someone else can install it.",
    items: [
      "Inno Setup installers",
      "Windows packaging",
      "Git and repository hygiene",
      "Game design documents",
    ],
  },
];

/** Skill chips, grouped. Order is deliberate: most relevant first. */
export const skillGroups: { heading: string; items: string[] }[] = [
  {
    heading: "Engine & Language",
    items: ["Unity 6 (6000.5, 6000.2, 6000.0)", "C#", "URP", "ScriptableObject", "Coroutines"],
  },
  {
    heading: "Systems",
    items: [
      "Object pooling",
      "NavMesh & AI",
      "Rigidbody physics",
      "Raycast hit detection",
      "Procedural generation",
      "Input System",
    ],
  },
  {
    heading: "Audio & Middleware",
    items: [
      "Wwise 2024.1.6",
      "Events, RTPCs, Switches",
      "Real-time parameter modulation",
      "Interactive audio design",
    ],
  },
  {
    heading: "Input, UI & Build",
    items: [
      "Unity UI (Canvas)",
      "Serial-to-TCP bridging",
      "Threaded socket servers",
      "Inno Setup packaging",
    ],
  },
  {
    heading: "Tooling",
    items: ["Git", "Visual Studio 2022", "Python", "JavaScript"],
  },
];

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */

/** Projects that a visitor can actually play in a browser. */
export const playableProjects = projects.filter((p) => p.playable);

/** Projects shown with video + gallery, i.e. everything not playable. */
export const shippedProjects = projects.filter((p) => !p.playable);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return projects.map((p) => p.slug);
}
