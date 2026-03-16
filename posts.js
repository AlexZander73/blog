window.BLOG_POSTS = [
  {
    slug: "barbell-easy-calculator-persistence-saved-loads-reliability",
    title: "Barbell Easy Calculator: Persistence, Saved Loads, and the Boring Work That Makes Apps Stick",
    date: "2026-03-28",
    excerpt: "The flashy part of this app is the barbell visualizer, but the sticky part is persistence. Users come back when their defaults, profiles, and saved loads are still there.",
    tags: ["Systems", "Notes", "Apps"],
    readingTime: "4 min read",
    path: "posts/barbell-easy-calculator-persistence-saved-loads-reliability.html"
  },
  {
    slug: "barbell-easy-calculator-visual-builder-at-a-glance",
    title: "Barbell Easy Calculator: Designing the Visual Builder for At-a-Glance Use",
    date: "2026-03-26",
    excerpt: "I built the visual builder because some users think in stacks, not equations. The best interaction pattern turned out to be direct manipulation: add from palette, remove from the barbell.",
    tags: ["Design", "Apps", "Build Logs"],
    readingTime: "5 min read",
    path: "posts/barbell-easy-calculator-visual-builder-at-a-glance.html",
    isFeatured: true
  },
  {
    slug: "fitnesscoach-personalization-without-guesswork",
    title: "FitnessCoach: Personalization Without Guesswork",
    date: "2026-03-25",
    excerpt: "I pushed personalization through deterministic shortcuts instead of opaque recommendations. Launcher, pinned actions, favorites, and prefetching made the app feel faster and more personal at the same time.",
    tags: ["Apps", "Build Logs", "Systems"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-personalization-without-guesswork.html"
  },
  {
    slug: "fitnesscoach-safety-ux-is-product-ux",
    title: "FitnessCoach: Safety UX Is Product UX",
    date: "2026-03-24",
    excerpt: "Safety messaging is not a legal footer in this project; it is part of the core interaction model. I added red-flag handling and conservative pathways so the app can adapt without pretending to diagnose.",
    tags: ["Systems", "Design", "Notes"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-safety-ux-is-product-ux.html"
  },
  {
    slug: "barbell-easy-calculator-impossible-targets-user-trust",
    title: "Barbell Easy Calculator: Handling Impossible Targets Without Breaking User Trust",
    date: "2026-03-24",
    excerpt: "One of the hardest product moments is telling a user their exact target cannot be built right now. I learned that trust comes from clear fallbacks, not forced precision.",
    tags: ["Notes", "Systems", "Build Logs"],
    readingTime: "4 min read",
    path: "posts/barbell-easy-calculator-impossible-targets-user-trust.html"
  },
  {
    slug: "fitnesscoach-making-sessions-fast-enough-to-use-mid-workout",
    title: "FitnessCoach: Making Sessions Fast Enough to Use Mid-Workout",
    date: "2026-03-23",
    excerpt: "I focused on in-session speed because the best workout plan still fails if logging is annoying. The active session and recap flow became the practical center of daily use.",
    tags: ["Apps", "Design", "Build Logs"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-making-sessions-fast-enough-to-use-mid-workout.html"
  },
  {
    slug: "fitnesscoach-turning-a-flat-app-into-a-navigation-system",
    title: "FitnessCoach: Turning a Flat App into a Navigation System",
    date: "2026-03-22",
    excerpt: "I moved from screens that merely existed to flows that actually connected. That shift changed the product from a static dashboard feel into something I could navigate with intent.",
    tags: ["Design", "Apps", "Build Logs"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-turning-a-flat-app-into-a-navigation-system.html"
  },
  {
    slug: "barbell-easy-calculator-deterministic-plate-solver-trust",
    title: "Barbell Easy Calculator: Building a Deterministic Plate Solver I Can Trust",
    date: "2026-03-22",
    excerpt: "The heart of this project is not the UI, it is deterministic math under real gym constraints. I built the solver so the same input always produces the same output, even when exact targets fail.",
    tags: ["Systems", "Build Logs", "Tools"],
    readingTime: "5 min read",
    path: "posts/barbell-easy-calculator-deterministic-plate-solver-trust.html"
  },
  {
    slug: "fitnesscoach-cleaning-up-build-artifacts-before-debt",
    title: "FitnessCoach: Cleaning Up Build Artifacts Before They Became Debt",
    date: "2026-03-21",
    excerpt: "One of the most useful commits was not a feature commit. I removed generated artifacts and tightened build expectations before they quietly became team-wide friction.",
    tags: ["Build Logs", "Notes", "Systems"],
    readingTime: "3 min read",
    path: "posts/fitnesscoach-cleaning-up-build-artifacts-before-debt.html"
  },
  {
    slug: "fitnesscoach-designing-the-api-and-schema-before-ui-polish",
    title: "FitnessCoach: Designing the API and Schema Before Chasing UI Polish",
    date: "2026-03-20",
    excerpt: "I chose to stabilize contracts and schema early, before polishing every client interaction. It slowed visible UI progress for a bit, but it prevented cross-layer drift.",
    tags: ["Systems", "Build Logs", "Notes"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-designing-the-api-and-schema-before-ui-polish.html"
  },
  {
    slug: "barbell-easy-calculator-why-react-capacitor-gym-utility",
    title: "Barbell Easy Calculator: Why I Chose React + Capacitor for a Gym Utility",
    date: "2026-03-20",
    excerpt: "I chose React + Capacitor because I needed fast iteration and mobile delivery from one codebase. The decision was practical, not ideological, and it came with tradeoffs I accepted up front.",
    tags: ["Systems", "Apps", "Tools"],
    readingTime: "4 min read",
    path: "posts/barbell-easy-calculator-why-react-capacitor-gym-utility.html"
  },
  {
    slug: "fitnesscoach-building-a-deterministic-engine-i-can-defend",
    title: "FitnessCoach: Building a Deterministic Engine I Can Defend",
    date: "2026-03-19",
    excerpt: "I committed to deterministic recommendations because I wanted every adjustment to be explainable and reviewable. That forced more structure, but it also made the safety story honest.",
    tags: ["Systems", "Notes", "Apps"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-building-a-deterministic-engine-i-can-defend.html"
  },
  {
    slug: "fitnesscoach-why-i-pivoted-to-a-capacitor-client",
    title: "FitnessCoach: Why I Pivoted to a Capacitor Client",
    date: "2026-03-18",
    excerpt: "I changed the client stack early, even though it meant touching almost everything at once. That decision hurt in the short term, but it gave the project a cleaner path to Android without a full rebuild.",
    tags: ["Apps", "Build Logs", "Systems"],
    readingTime: "4 min read",
    path: "posts/fitnesscoach-why-i-pivoted-to-a-capacitor-client.html"
  },
  {
    slug: "barbell-easy-calculator-one-commit-full-mvp-cost-of-speed",
    title: "Barbell Easy Calculator: One Commit, Full MVP, and the Cost of Speed",
    date: "2026-03-18",
    excerpt: "I shipped the first complete version of Barbell Easy Calculator in a single baseline commit on 2026-03-12. It was fast, effective, and emotionally messy in ways I did not expect.",
    tags: ["Build Logs", "Apps", "Notes"],
    readingTime: "4 min read",
    path: "posts/barbell-easy-calculator-one-commit-full-mvp-cost-of-speed.html"
  },
  {
    slug: "social-post-helper-i-treated-safari-memory-like-product-work",
    title: "Social Post Helper: I Treated Safari Memory Like Product Work",
    date: "2026-03-17",
    excerpt: "Media apps earn suspicion fast when a browser tab starts feeling heavy. I decided that if Safari memory pressure was even a plausible concern, the product needed a direct answer instead of a shrug.",
    tags: ["Apps", "Systems", "Build Logs"],
    readingTime: "3 min read",
    path: "posts/social-post-helper-i-treated-safari-memory-like-product-work.html"
  },
  {
    slug: "social-post-helper-why-i-chose-a-broad-safari-file-filter",
    title: "Social Post Helper: Why I Chose a Broad Safari File Filter",
    date: "2026-03-14",
    excerpt: "I ended up with a broader upload filter than I originally wanted. It was the right compromise because browser compatibility mattered more than a perfectly tidy picker.",
    tags: ["Apps", "Systems", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-why-i-chose-a-broad-safari-file-filter.html"
  },
  {
    slug: "social-post-helper-heic-support-is-not-one-format",
    title: "Social Post Helper: HEIC Support Is Not One Format",
    date: "2026-03-13",
    excerpt: "I learned the usual lesson about file formats the annoying way. Saying I support HEIC means very little if the browser and picker disagree about what that format looks like.",
    tags: ["Apps", "Notes", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-heic-support-is-not-one-format.html"
  },
  {
    slug: "social-post-helper-the-macos-photos-picker-beat-my-first-upload-design",
    title: "Social Post Helper: The macOS Photos Picker Beat My First Upload Design",
    date: "2026-03-13",
    excerpt: "The upload flow broke before my app really got a chance to do anything. That is the kind of problem that makes a product feel worse than the bug count suggests.",
    tags: ["Apps", "Build Logs", "Notes"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-the-macos-photos-picker-beat-my-first-upload-design.html"
  },
  {
    slug: "social-post-helper-shipping-a-useful-non-ai-mvp",
    title: "Social Post Helper: Shipping a Useful Non-AI MVP",
    date: "2026-03-12",
    excerpt: "I wanted a social drafting tool that was useful before any AI showed up. Social Post Helper started as a hard constraint: make the workflow lighter without pretending the app understands images.",
    tags: ["Apps", "Tools", "Launches"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-shipping-a-useful-non-ai-mvp.html"
  },
  {
    slug: "social-post-helper-why-i-kept-it-local-first",
    title: "Social Post Helper: Why I Kept It Local-First",
    date: "2026-03-12",
    excerpt: "I did not want this project to start with accounts, sync, and another database to babysit. Keeping it local-first made the MVP faster to use and clearer about its limits.",
    tags: ["Apps", "Systems", "Notes"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-why-i-kept-it-local-first.html"
  },
  {
    slug: "social-post-helper-static-export-was-a-product-decision",
    title: "Social Post Helper: Static Export Was a Product Decision",
    date: "2026-03-12",
    excerpt: "I treated deployment as part of product scope, not something to bolt on later. Shipping this as a static export pushed the app toward a cleaner and more disciplined MVP.",
    tags: ["Apps", "Systems", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-static-export-was-a-product-decision.html"
  },
  {
    slug: "social-post-helper-honest-alt-text-beats-imagined-detail",
    title: "Social Post Helper: Honest Alt Text Beats Imagined Detail",
    date: "2026-03-12",
    excerpt: "A non-AI media tool can be helpful without pretending it understands the image. I wanted the writing to stay honest enough that users could trust what the app was doing and what it was not doing.",
    tags: ["AI", "Design", "Notes"],
    readingTime: "2 min read",
    path: "posts/social-post-helper-honest-alt-text-beats-imagined-detail.html"
  },
  {
    slug: "carpentry-companion-release-readiness-checkpoint",
    title: "Release Readiness Checkpoint: Where Carpentry Companion Stands Today",
    date: "2026-03-10",
    excerpt: "As of 2026-03-10, the app is still pre-launch, but the release spine is finally real: privacy policy in place, tests green, native build prep passing, and clear blockers tracked.",
    tags: ["Launches", "Build Logs", "Apps"],
    readingTime: "5 min read",
    path: "posts/carpentry-companion-release-readiness-checkpoint.html"
  },
  {
    slug: "carpentry-companion-native-first-pivot-note",
    title: "Carpentry Companion: Why I Removed Pages and Went Native-First",
    date: "2026-03-10",
    excerpt: "I removed the repo-level GitHub Pages deploy workflow and committed to native-first release flow. One channel, less split focus, faster execution.",
    tags: ["Systems", "Apps", "Notes"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-native-first-pivot-note.html"
  },
  {
    slug: "carpentry-companion-design-clarity-pass",
    title: "Carpentry Companion: Making the UI Feel Alive, Not Loud",
    date: "2026-03-09",
    excerpt: "Feedback said the app was useful but flat. I rolled out a restrained accent system and renamed Work Packs to Plans for cleaner language.",
    tags: ["Design", "Apps", "Notes"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-design-clarity-pass.html"
  },
  {
    slug: "carpentry-companion-menu-break-fix",
    title: "Carpentry Companion: The Day the Menu Broke on iPhone",
    date: "2026-03-09",
    excerpt: "The mobile menu became transparent, overlapped content, and would not scroll. I fixed it across four commits and relearned that nav bugs kill trust fast.",
    tags: ["Build Logs", "Design", "Apps"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-menu-break-fix.html"
  },
  {
    slug: "carpentry-companion-safe-area-week",
    title: "Carpentry Companion: Safe-Area Week and the Black-Screen Scare",
    date: "2026-03-04",
    excerpt: "Notch clipping and startup instability hit hard on iPhone. Fixing safe areas and storyboard wiring became release-critical work, not polish.",
    tags: ["Apps", "Build Logs", "Notes"],
    readingTime: "5 min read",
    path: "posts/carpentry-companion-safe-area-week.html"
  },
  {
    slug: "aistoryteller-structured-generators-were-my-answer-to-fragile-extraction",
    title: "AIStoryTeller: Structured Generators Were My Answer to Fragile Extraction",
    date: "2026-02-28",
    excerpt: "The large 2026-02-28 snapshot commit reads like a change in philosophy, not just a feature drop. I moved toward structured generation for characters and locations because freeform extraction had become too easy to distrust.",
    tags: ["AI", "Tools", "Design", "Build Logs"],
    readingTime: "3 min read",
    path: "posts/aistoryteller-structured-generators-were-my-answer-to-fragile-extraction.html"
  },
  {
    slug: "aistoryteller-optimizing-for-a-small-local-machine-changed-the-product",
    title: "AIStoryTeller: Optimizing for a Small Local Machine Changed the Product",
    date: "2026-02-28",
    excerpt: "The optimization pass on 2026-02-28 was not cleanup around the edges. It changed defaults across image generation, LLM loading, helper behavior, and TTS because the machine mattered as much as the model.",
    tags: ["Systems", "Experiments", "Build Logs", "Notes"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-optimizing-for-a-small-local-machine-changed-the-product.html"
  },
  {
    slug: "aistoryteller-user-history-had-to-become-a-server-problem",
    title: "AIStoryTeller: User History Had to Become a Server Problem",
    date: "2026-02-20",
    excerpt: "Personal story tools break the moment they blur one user into another. On 2026-02-20 AIStoryTeller drew that boundary at the server layer.",
    tags: ["Systems", "Apps", "Notes"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-user-history-had-to-become-a-server-problem.html"
  },
  {
    slug: "aistoryteller-repairing-npc-state-instead-of-faking-it",
    title: "AIStoryTeller: Repairing NPC State Instead of Faking It",
    date: "2026-02-19",
    excerpt: "The 2026-02-19 fix commit is one of the most honest moments in this repo. It says the NPC pipeline needed a repair, not a cosmetic patch.",
    tags: ["AI", "Systems", "Notes", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-repairing-npc-state-instead-of-faking-it.html"
  },
  {
    slug: "aistoryteller-what-a-wip-commit-cost-me",
    title: "AIStoryTeller: What a WIP Commit Cost Me",
    date: "2026-02-18",
    excerpt: "I pushed a WIP commit for sentence finishing, retry logic, and a world export snapshot on 2026-02-18. The next two days of repo history explain why I no longer treat that label lightly.",
    tags: ["Notes", "Build Logs", "Systems"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-what-a-wip-commit-cost-me.html"
  },
  {
    slug: "aistoryteller-adding-world-state-without-losing-the-plot",
    title: "AIStoryTeller: Adding World State Without Losing the Plot",
    date: "2026-02-17",
    excerpt: "On 2026-02-17 AIStoryTeller grew from a story interface into a fuller story system. Maps, world state, presets, starter content, and TTS safeguards all arrived in the same wave.",
    tags: ["Games", "Systems", "Design", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-adding-world-state-without-losing-the-plot.html"
  },
  {
    slug: "aistoryteller-when-one-writer-became-a-stack",
    title: "AIStoryTeller: When One Writer Became a Stack",
    date: "2026-02-14",
    excerpt: "The 2026-02-14 commit is where AIStoryTeller stopped feeling small. I added image orchestration, prompt tooling, IME pieces, TTS runtime, scripts, configs, and tests in one push.",
    tags: ["AI", "Systems", "Build Logs", "Tools"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-when-one-writer-became-a-stack.html"
  },
  {
    slug: "aistoryteller-starting-with-a-local-story-shell",
    title: "AIStoryTeller: Starting With a Local Story Shell",
    date: "2026-02-06",
    excerpt: "AIStoryTeller started as a direct, almost stubborn vertical slice. I put the server, UI, image layer, and story engine in place first and let the architecture wait.",
    tags: ["AI", "Apps", "Games", "Build Logs"],
    readingTime: "2 min read",
    path: "posts/aistoryteller-starting-with-a-local-story-shell.html"
  },
  {
    slug: "carpentry-companion-capacitor-native-step",
    title: "Carpentry Companion: Choosing Native Without Rewriting",
    date: "2026-02-28",
    excerpt: "I added Capacitor iOS/Android projects and kept one React codebase. It was the cleanest path to real device usage without a full restart.",
    tags: ["Apps", "Systems", "Experiments"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-capacitor-native-step.html"
  },
  {
    slug: "carpentry-companion-plans-packaging",
    title: "Carpentry Companion: Packaging the App Into Plans",
    date: "2026-02-27",
    excerpt: "I introduced packaged workflows and free-tier limits so the app had structure, not just features. This was a product-shape day.",
    tags: ["Build Logs", "Tools", "Systems"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-plans-packaging.html"
  },
  {
    slug: "carpentry-companion-subscription-scaffold",
    title: "Carpentry Companion: Subscription Gating Entered the App",
    date: "2026-02-25",
    excerpt: "2026-02-25 was the day this stopped being just a build experiment. App Store scaffolding, subscription gates, and wizard routes moved it into product territory.",
    tags: ["Apps", "Launches", "Systems"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-subscription-scaffold.html"
  },
  {
    slug: "carpentry-companion-legal-safe-rule",
    title: "Carpentry Companion: The Legal-Safe Rule That Shaped Everything",
    date: "2026-02-21",
    excerpt: "I made a hard rule early: no republishing standards text. Only identifiers, links, and my own summaries. That constraint protected the product and clarified the voice.",
    tags: ["Notes", "Systems", "Apps"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-legal-safe-rule.html"
  },
  {
    slug: "carpentry-companion-day-zero-job-mode",
    title: "Carpentry Companion: Day Zero and the First Job Mode Build",
    date: "2026-02-20",
    excerpt: "On day one I stopped treating this like a calculator toy and built Job Mode, audit trail, and exports so the app could survive real site work.",
    tags: ["Apps", "Build Logs", "Tools"],
    readingTime: "4 min read",
    path: "posts/carpentry-companion-day-zero-job-mode.html"
  }
];
