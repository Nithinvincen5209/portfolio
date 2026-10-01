/**
 * Single source of truth for every project on the site.
 *
 * One entry per project. The home page, the /games index and the [slug] pages
 * all read from this array, so a claim can never appear on one page and be
 * missing from another.
 *
 * `playable` is the important field. It is the single switch that decides
 * whether a project gets a click-to-load browser embed or a video + gallery:
 *
 *   playable: true   -> PlayableEmbed (itch.io iframe, loads only on click)
 *   playable: false  -> VideoPlayer + ImageGallery, never an iframe
 *
 * This distinction is factual, not stylistic. The three Remap games and the six
 * clinical tools depend on real hardware: a rehabilitation machine, arcade
 * cabinet buttons, wrist-motion sensors and a serial device bridge at 115200
 * baud. A browser build of those games would either not run or would run without
 * the input hardware, which would misrepresent the work. Showing a play button
 * that does nothing is worse than showing video and saying plainly why.
 */

/** Which family a project belongs to. Drives filtering and layout. */
export type Category = "rehab" | "playable" | "tools" | "source";

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
  /** Seconds into the video that makes the best poster frame. */
  posterAtSeconds?: number;
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
  /** Whether a visitor can actually play this in a browser. */
  playable: boolean;
  /**
   * Set when playable is false. Explains, on the page itself, why there is no
   * play button. Required for any non-playable project.
   */
  boundaryNote?: string;
  /** itch.io URL. Present for playable projects. */
  itchUrl?: string;
  /** Public source repo, when the repo genuinely serves as proof. */
  repoUrl?: string;
  media: GalleryMedia;
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
 * The device bridge, described once and reused across the three Remap games.
 *
 * This is the most differentiated part of the work and no other portfolio site
 * will have it: four Python diagnostic scripts, pyserial at 115200 baud,
 * automatic USB port detection, thread-safe serial and socket access, streaming
 * live patient movement into Unity over localhost. Four of these scripts exist
 * on disk (gameFD1V / gameFD2P2V / gameFD2V / gameFD3V under
 * "Reamp Machine Script"), which is what makes the claim checkable.
 */
const DEVICE_BRIDGE =
  "The games are driven by real patient movement, not a keyboard. A Python " +
  "bridge opens the serial port at 115200 baud, detects the USB device " +
  "automatically so no port has to be hard-coded, and streams live movement " +
  "data into Unity over localhost TCP. Serial reads and socket writes are " +
  "guarded by locks, because the read loop and the network thread would " +
  "otherwise race on the same buffer. A dual-axis variant publishes X and Y on " +
  "separate channels so the game can read each axis independently.";

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  // Remap / rehabilitation games. Hardware-dependent: video + gallery only.
  // -------------------------------------------------------------------------
  {
    slug: "block-strike",
    name: "Block Strike",
    category: "rehab",
    playable: false,
    order: 1,
    tagline: "Procedural bubble-grid therapeutic shooter, driven by patient movement.",
    summary:
      "A therapeutic arcade shooter whose aim is driven by real movement " +
      "over a serial-to-TCP bridge. Procedurally generated grids across three " +
      "difficulty tiers, with aim-and-match scoring and combo feedback that " +
      "rewards sustained, controlled motion.",
    boundaryNote:
      "Requires the rehabilitation machine. The aiming input arrives over " +
      "serial and TCP from a movement sensor, so this game is deliberately " +
      "not published as a browser build. A web version would run without the " +
      "input hardware and would misrepresent what the software actually does.",
    media: {
      poster: "/media/block-strike-poster.png",
      images: [
        "/media/block-strike-1.png",
        "/media/block-strike-2.png",
        "/media/block-strike-3.png",
      ],
      youtubeId: "PENDING_BLOCK_STRIKE",
      posterAtSeconds: 6,
    },
    tech: ["Unity 6", "C#", "TCP sockets", "Threading", "Procedural generation", "Input Systems"],
    stats: [
      { label: "C# scripts", value: "61" },
      { label: "Unity scenes", value: "38" },
      { label: "Device input", value: "TCP :5000" },
      { label: "Packaged as", value: "Inno Setup" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "Bubble-grid levels are generated procedurally across three " +
          "difficulty tiers rather than authored by hand, so difficulty scales " +
          "without a separate level set. Scoring rewards accurate aim-and-match " +
          "input with combo multipliers and floating-text feedback, which is " +
          "what gives the player a reason to keep their movement controlled " +
          "over a long session.",
      },
      {
        heading: "Movement input over serial",
        body: DEVICE_BRIDGE,
      },
      {
        heading: "Why the input path is the interesting part",
        body:
          "The game loop runs on Unity's main thread while the sensor keeps " +
          "arriving on its own thread. Reading movement straight from the " +
          "socket callback would stall rendering whenever a packet arrived at " +
          "the wrong moment, so incoming data is buffered under a lock and " +
          "drained on the main thread instead. That is the difference between a " +
          "prototype that stutters and something a therapist can put in front " +
          "of a patient for twenty minutes.",
      },
    ],
  },

  {
    slug: "lumber-dash",
    name: "Lumber Dash",
    category: "rehab",
    playable: false,
    order: 2,
    tagline: "Reflex therapeutic game played with physical arcade cabinet buttons.",
    summary:
      "A fast reflex game controlled by real arcade cabinet buttons on the " +
      "rehabilitation machine. Streak-based difficulty scaling keeps the " +
      "challenge matched to the patient's capability, with parallax scrolling " +
      "and particle effects layered over a threaded TCP input server.",
    boundaryNote:
      "Requires the rehabilitation machine and its arcade cabinet buttons. " +
      "Input arrives over a TCP server from the cabinet, so there is no " +
      "meaningful browser version: without the buttons the reflex loop the game " +
      "exists to train cannot happen.",
    media: {
      poster: "/media/lumber-dash-poster.png",
      images: [
        "/media/lumber-dash-1.png",
        "/media/lumber-dash-2.png",
        "/media/lumber-dash-3.png",
      ],
      youtubeId: "PENDING_LUMBER_DASH",
      posterAtSeconds: 5,
    },
    tech: ["Unity 6", "C#", "TCP server", "Threading", "Particle VFX", "Parallax"],
    stats: [
      { label: "C# scripts", value: "47" },
      { label: "Unity scenes", value: "37" },
      { label: "Input", value: "Arcade buttons" },
      { label: "Scaling", value: "Streak-based" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "A reflex game where the player reacts to incoming targets and is " +
          "scored on reaction speed. Difficulty scales with the current streak " +
          "rather than a fixed level, so the game tightens as the player " +
          "improves and eases off after a miss, which keeps a patient in the " +
          "productive difficulty band instead of at a wall or on easy. A " +
          "tutorial system introduces the cabinet controls on first use.",
      },
      {
        heading: "Reading real buttons",
        body:
          "Button presses come from the cabinet over a thread-safe TCP server, " +
          "several inputs at once from hardware that was never designed as a " +
          "game device. The server therefore accepts concurrent connections and " +
          "guards its state, because two inputs arriving in the same frame " +
          "would otherwise race. Debouncing matters as much as the networking " +
          "here: physical buttons bounce, and an unbounced arcade button fires " +
          "the same action twice on one press.",
      },
    ],
  },

  {
    slug: "galaxy-flex",
    name: "Galaxy Flex",
    category: "rehab",
    playable: false,
    order: 3,
    tagline: "Wave-based therapeutic shooter with wrist-sensor steering.",
    summary:
      "A wave-based arcade shooter steered by wrist-motion sensing, built " +
      "around a generic object pool for projectiles and meteors. Also shipped " +
      "in a D-Handle controller coupler build for patients using a constrained " +
      "grip.",
    boundaryNote:
      "Requires the rehabilitation machine's wrist-motion sensor (and, in the " +
      "D-Handle variant, the controller coupler). Steering is the game, so there " +
      "is no browser version: without the sensor the core mechanic does not exist.",
    media: {
      poster: "/media/galaxy-flex-poster.png",
      images: [
        "/media/galaxy-flex-1.png",
        "/media/galaxy-flex-2.png",
        "/media/galaxy-flex-3.png",
      ],
      youtubeId: "PENDING_GALAXY_FLEX",
      posterAtSeconds: 7,
    },
    tech: ["Unity 6", "C#", "Object pooling", "Motion sensors", "Parallax", "Inno Setup"],
    stats: [
      { label: "C# scripts", value: "71" },
      { label: "Unity scenes", value: "42" },
      { label: "Steering", value: "Wrist motion" },
      { label: "Hardware variants", value: "Standard + D-Handle" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "Wave-based shooter: waves escalate, and the player steers with wrist " +
          "motion rather than a stick. Layered parallax backgrounds give depth " +
          "without the cost of 3D geometry, which matters when the target " +
          "hardware is not a gaming machine.",
      },
      {
        heading: "Why a generic object pool",
        body:
          "Meteors and projectiles spawn continuously, and a naive instantiate " +
          "per spawn produces a GC spike at exactly the wrong moment, during " +
          "wave escalation, which is the moment the player most needs a stable " +
          "frame rate. A single generic pool is used for every spawned object " +
          "rather than a pool per prefab: the wave can escalate smoothly " +
          "because nothing is being allocated mid-wave.",
      },
      {
        heading: "Two hardware variants",
        body:
          "The standard build reads wrist motion directly. The D-Handle build " +
          "adds a controller coupler for patients with a constrained or " +
          "immobile grip, so the same game can be played with a hand resting on " +
          "a supported handle rather than held in a fist. Both ship as Inno Setup " +
          "installers, so a clinic installs them without touching a build pipeline.",
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
      "derived and far over GitHub's per-file size limit. The gameplay video " +
      "below is the honest proof of the systems, and the repo is the proof of " +
      "the code.",
    repoUrl: "https://github.com/Nithinvincen5209/Zombie-Escape",
    media: {
      images: [],
      youtubeId: "8QlwPnu0JwM",
      posterAtSeconds: 12,
    },
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
    tagline: "Rigidbody flight model with Wwise thruster audio, playable in browser.",
    summary:
      "An arcade flight game built on a Rigidbody flight model simulating " +
      "gravity, thrust and rotation, tuned for arcade handling rather than " +
      "simulation accuracy. Crash validation checks landing speed and angle, " +
      "and thruster audio is modulated in real time by player input through RTPC.",
    itchUrl: "https://nitinvincent.itch.io/ufo-lander",
    repoUrl: "https://github.com/Nithinvincen5209/UFO",
    media: { images: [] },
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
          "player is doing rather than switching between fixed clips. Explosion "          + "effects run through the same game-state machine.",
      },
    ],
  },

  {
    slug: "tower-tactics",
    name: "Tower Tactics",
    category: "playable",
    playable: true,
    order: 6,
    tagline: "Playable in browser on itch.io.",
    summary:
      "A playable browser game published on itch.io. Includes source access " +
      "and is built in Unity.",
    itchUrl: "https://nitinvincent.itch.io/tower-tactics",
    media: { images: [] },
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
    tagline: "Playable in browser on itch.io.",
    summary:
      "A playable browser game published on itch.io. Memory-matching gameplay " +
      "built in Unity.",
    itchUrl: "https://nitinvincent.itch.io/memory-match",
    media: { images: [] },
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
    tagline: "Playable in browser on itch.io.",
    summary:
      "A playable browser shooter published on itch.io, built in Unity.",
    itchUrl: "https://nitinvincent.itch.io/aero-timeline-shooter",
    media: { images: [] },
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

/** Grouping for the six clinical assessment tools, shown on /clinical-tools. */
export interface ClinicalTool {
  name: string;
  /** What the tool measures. */
  measures: string;
  /** true when the tool also has a no-measurement calibration variant. */
  hasNonMeasurementVariant: boolean;
  /** Size of the shipped installer, as built. */
  installerSizeMb: number;
}

/**
 * The six clinical tools. Each ships as its own Inno Setup installer, with a
 * measured and a non-measurement variant where applicable.
 *
 * Verified against the installers in "C:\Users\nithi\Desktop\Inno Installation
 * files": six clinical installers alongside Block Strike, Ferris Wheel and
 * Galaxy Flex, which is where the "nine Windows applications" figure on the
 * resume comes from.
 */
export const clinicalTools: ClinicalTool[] = [
  {
    name: "Grip Strength Measurement",
    measures: "Grip strength",
    hasNonMeasurementVariant: true,
    installerSizeMb: 25.3,
  },
  {
    name: "Pinch Strength Measurement",
    measures: "Pinch strength",
    hasNonMeasurementVariant: true,
    installerSizeMb: 24.6,
  },
  {
    name: "ROM Measurement",
    measures: "Range of motion",
    hasNonMeasurementVariant: true,
    installerSizeMb: 29.7,
  },
];

/** Links shown in the header / contact area. */
export const profile = {
  name: "Nithin Vincent",
  role: "Unity Developer",
  tagline: "Therapeutic games and clinical tools for rehabilitation hardware.",
  location: "Thrissur, Kerala, India",
  email: "nithinvincent371@gmail.com",
  github: "https://github.com/Nithinvincen5209",
  linkedin: "https://www.linkedin.com/in/nithin-vincent/",
  itch: "https://nitinvincent.itch.io",
  resumePdf: "/Nithin-Vincent-Unity-Developer-Resume.pdf",
} as const;

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
    heading: "Hardware & Integration",
    items: [
      "Serial-to-TCP bridging (pyserial, 115200 baud)",
      "Threaded socket servers & listeners",
      "IMU & wrist motion sensors",
      "D-Handle controller coupler",
      "Arcade button input",
    ],
  },
  {
    heading: "Audio & Middleware",
    items: ["Wwise 2024.1.6", "Events, RTPCs, Switches", "Real-time parameter modulation"],
  },
  {
    heading: "Tooling",
    items: ["Git", "Inno Setup packaging", "Visual Studio 2022", "JavaScript", "Python"],
  },
];

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */

/** Projects that a visitor can actually play in a browser. */
export const playableProjects = projects.filter((p) => p.playable);

/** Projects shown with video + gallery, i.e. everything not playable. */
export const nonPlayableProjects = projects.filter((p) => !p.playable);

export const rehabProjects = projects.filter((p) => p.category === "rehab");

/** Every YouTube id still waiting on an upload. Drives the asset checklist. */
export const pendingVideoIds = projects
  .filter((p) => p.media.youtubeId?.startsWith("PENDING_"))
  .map((p) => ({ slug: p.slug, name: p.name, placeholder: p.media.youtubeId }));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return projects.map((p) => p.slug);
}