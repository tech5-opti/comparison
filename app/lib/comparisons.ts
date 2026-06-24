// Data layer for Versus — the side-by-side comparison journal.
// Single source of truth for comparisons + categories. Presentation
// components depend on these types, never the other way around.

export type Category =
  | "Automotive"
  | "AI Tools"
  | "Careers"
  | "Software & Web"
  | "Gadgets";

export interface Side {
  name: string;
  /** A one-line positioning statement. */
  tagline: string;
  pros: string[];
  /** "Choose this if…" guidance. */
  bestFor: string;
}

export interface Dimension {
  /** What's being compared, e.g. "Price", "Learning curve". */
  aspect: string;
  a: string;
  b: string;
  /** Which side has the edge on this row: "a", "b", or "tie". */
  edge: "a" | "b" | "tie";
}

export interface Comparison {
  slug: string;
  /** e.g. "BMW vs Audi". */
  title: string;
  category: Category;
  excerpt: string;
  /** ISO date string (server-stable, no client clock). */
  date: string;
  readingTime: number;
  author: string;
  authorRole: string;
  intro: string[];
  a: Side;
  b: Side;
  dimensions: Dimension[];
  verdict: string;
  featured?: boolean;
}

export interface CategoryMeta {
  name: Category;
  icon: string;
  blurb: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { name: "Automotive", icon: "🚗", blurb: "Cars, head to head." },
  { name: "AI Tools", icon: "🤖", blurb: "The models and agents." },
  { name: "Careers", icon: "💼", blurb: "Roles and paths, compared." },
  { name: "Software & Web", icon: "💻", blurb: "Stacks and platforms." },
  { name: "Gadgets", icon: "📱", blurb: "Devices worth the debate." },
];

export const CATEGORIES: Category[] = CATEGORY_META.map((c) => c.name);

export function categoryIcon(category: Category): string {
  return CATEGORY_META.find((c) => c.name === category)?.icon ?? "📌";
}

export function categorySlug(category: Category): string {
  return category
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug.toLowerCase());
}

const COMPARISONS: Comparison[] = [
  {
    slug: "bmw-vs-audi",
    title: "BMW vs Audi",
    category: "Automotive",
    excerpt:
      "Two German icons, two philosophies. One chases the driver; the other chases the road. Here's which badge actually fits your life.",
    date: "2026-06-21",
    readingTime: 8,
    author: "Daniel Roth",
    authorRole: "Automotive Editor",
    featured: true,
    intro: [
      "Ask ten enthusiasts whether to buy a BMW or an Audi and you'll get ten confident, contradictory answers. The truth is that both build excellent cars — they just disagree about what a car should feel like.",
      "BMW still organizes everything around the person holding the wheel. Audi organizes everything around composure, technology, and all-weather confidence. Neither is wrong; they're aimed at different drivers.",
    ],
    a: {
      name: "BMW",
      tagline: "The driver's car.",
      pros: [
        "Sharper steering and a more engaging rear-biased chassis",
        "Punchy, characterful inline-six engines",
        "Better resale on M and performance trims",
      ],
      bestFor:
        "Drivers who want feedback and will happily take the long way home.",
    },
    b: {
      name: "Audi",
      tagline: "The all-weather all-rounder.",
      pros: [
        "Quattro all-wheel drive grips in rain and snow",
        "Calmer, more refined cabin and ride",
        "Cleaner, more cohesive interior tech",
      ],
      bestFor:
        "Buyers who prize comfort, traction, and a serene daily commute.",
    },
    dimensions: [
      { aspect: "Driving feel", a: "Engaging, rear-drive bias", b: "Planted, grippy, neutral", edge: "a" },
      { aspect: "Interior & tech", a: "Driver-focused, iDrive", b: "Polished, Virtual Cockpit", edge: "b" },
      { aspect: "Bad-weather traction", a: "RWD (xDrive optional)", b: "Standard Quattro AWD", edge: "b" },
      { aspect: "Ride comfort", a: "Firmer, sportier", b: "Softer, quieter", edge: "b" },
      { aspect: "Performance halo", a: "M division legacy", b: "RS, strong but younger", edge: "a" },
    ],
    verdict:
      "Buy the BMW if driving is the point and you live somewhere mild. Buy the Audi if you want a quiet, grippy, beautifully built car that shrugs off weather. Most people will be happier in the Audi; enthusiasts will keep choosing the BMW.",
  },
  {
    slug: "electric-vs-petrol-cars",
    title: "Electric vs Petrol Cars",
    category: "Automotive",
    excerpt:
      "Lower running costs and instant torque, or range freedom and a five-minute fill-up? The honest trade-offs in 2026.",
    date: "2026-05-30",
    readingTime: 9,
    author: "Daniel Roth",
    authorRole: "Automotive Editor",
    intro: [
      "The electric-versus-petrol question has finally moved from ideology to logistics. Both can be the right answer — it depends almost entirely on how and where you drive.",
      "The deciding factor is rarely the car itself. It's whether you can charge where you park.",
    ],
    a: {
      name: "Electric",
      tagline: "Cheaper to run, quieter to drive.",
      pros: [
        "Far lower energy and maintenance costs",
        "Instant torque and near-silent cabin",
        "Charges at home overnight — no fuel stops",
      ],
      bestFor:
        "Drivers with home or workplace charging and mostly local mileage.",
    },
    b: {
      name: "Petrol",
      tagline: "Refuel anywhere in five minutes.",
      pros: [
        "Long range with a nationwide fuel network",
        "Lower upfront price on most models",
        "No range anxiety on long road trips",
      ],
      bestFor:
        "High-mileage drivers, frequent road-trippers, and those without home charging.",
    },
    dimensions: [
      { aspect: "Running cost", a: "Very low per mile", b: "Higher fuel + servicing", edge: "a" },
      { aspect: "Upfront price", a: "Higher (falling fast)", b: "Lower on average", edge: "b" },
      { aspect: "Refuel/recharge", a: "Slow away from home", b: "Five-minute fill-up", edge: "b" },
      { aspect: "Driving experience", a: "Instant, silent torque", b: "Engine character & sound", edge: "tie" },
      { aspect: "Long trips", a: "Needs charge planning", b: "Go anywhere", edge: "b" },
    ],
    verdict:
      "If you can charge at home and drive mostly locally, electric wins on cost and daily ease. If you rack up long highway miles or can't charge where you park, petrol is still the pragmatic choice — for now.",
  },
  {
    slug: "claude-code-vs-codex",
    title: "Claude Code vs Codex",
    category: "AI Tools",
    excerpt:
      "Two terminal-native coding agents, two styles of autonomy. Which one actually ships working code on your repo?",
    date: "2026-06-19",
    readingTime: 10,
    author: "Priya Nair",
    authorRole: "Developer Tools",
    featured: true,
    intro: [
      "AI coding agents have graduated from autocomplete to teammates that read a repo, edit files, run commands, and explain themselves. Claude Code and Codex are the two most capable terminal-native options — and they make different bets about how much rope to give the model.",
      "The right pick depends on how much you want to supervise versus delegate.",
    ],
    a: {
      name: "Claude Code",
      tagline: "A careful, explainable pair-programmer.",
      pros: [
        "Strong long-context reasoning across large codebases",
        "Transparent plans and step-by-step approvals",
        "Excellent at refactors and writing tests",
      ],
      bestFor:
        "Developers who want a teammate they can review like a pull request.",
    },
    b: {
      name: "Codex",
      tagline: "Fast, autonomous task completion.",
      pros: [
        "Aggressive end-to-end task automation",
        "Tight integration with the wider tooling ecosystem",
        "Quick scaffolding of new features",
      ],
      bestFor:
        "Engineers who want to hand off a whole task and check the result.",
    },
    dimensions: [
      { aspect: "Reasoning depth", a: "Deep, deliberate", b: "Fast, action-first", edge: "a" },
      { aspect: "Autonomy", a: "Approval-gated by default", b: "More hands-off", edge: "tie" },
      { aspect: "Code review fit", a: "Reviewable diffs, clear plans", b: "Larger batched changes", edge: "a" },
      { aspect: "Ecosystem", a: "Growing fast", b: "Broad integrations", edge: "b" },
      { aspect: "Best at", a: "Refactors, tests, explanation", b: "Greenfield scaffolding", edge: "tie" },
    ],
    verdict:
      "Reach for Claude Code when you want to understand and review every change, especially on a codebase you care about. Reach for Codex when you want to delegate a contained task and move on. Many teams keep both in the toolbox.",
  },
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    category: "AI Tools",
    excerpt:
      "The two assistants most people actually use. One is the versatile generalist; the other is the careful long-form thinker.",
    date: "2026-06-08",
    readingTime: 8,
    author: "Priya Nair",
    authorRole: "Developer Tools",
    intro: [
      "For everyday work, the assistant race has narrowed to two names. ChatGPT and Claude are both excellent — and they have genuinely different temperaments.",
      "Pick based on the kind of work you do most.",
    ],
    a: {
      name: "ChatGPT",
      tagline: "The versatile generalist.",
      pros: [
        "Huge plugin and tooling ecosystem",
        "Strong at quick, varied everyday tasks",
        "Wide availability across apps and devices",
      ],
      bestFor: "Users who want one flexible tool for a bit of everything.",
    },
    b: {
      name: "Claude",
      tagline: "The careful long-form thinker.",
      pros: [
        "Excellent long-context reading and writing",
        "Measured, on-the-nose tone for serious drafts",
        "Strong, careful reasoning on complex problems",
      ],
      bestFor:
        "Writers and analysts working with long documents and nuanced tasks.",
    },
    dimensions: [
      { aspect: "Everyday versatility", a: "Very broad", b: "Broad", edge: "a" },
      { aspect: "Long-document work", a: "Good", b: "Excellent", edge: "b" },
      { aspect: "Writing tone", a: "Flexible", b: "Polished, careful", edge: "b" },
      { aspect: "Ecosystem & plugins", a: "Extensive", b: "Growing", edge: "a" },
      { aspect: "Complex reasoning", a: "Strong", b: "Strong", edge: "tie" },
    ],
    verdict:
      "Choose ChatGPT as a flexible all-rounder with the deepest ecosystem. Choose Claude when the work is long-form, nuanced, or writing-heavy. Plenty of professionals pay for both and switch by task.",
  },
  {
    slug: "midjourney-vs-dalle",
    title: "Midjourney vs DALL·E",
    category: "AI Tools",
    excerpt:
      "Painterly, opinionated artistry versus precise, promptable control. Which image generator suits your workflow?",
    date: "2026-05-18",
    readingTime: 7,
    author: "Lena Voss",
    authorRole: "Design & Creative",
    intro: [
      "Both tools turn text into images, but they pull in different aesthetic directions. Midjourney has a strong house style; DALL·E does what you literally ask.",
    ],
    a: {
      name: "Midjourney",
      tagline: "Opinionated, painterly beauty.",
      pros: [
        "Gorgeous default aesthetic out of the box",
        "Exceptional with lighting, texture, and mood",
        "Active community and style references",
      ],
      bestFor: "Concept art, moodboards, and striking hero imagery.",
    },
    b: {
      name: "DALL·E",
      tagline: "Literal, controllable generation.",
      pros: [
        "Follows precise prompts and instructions closely",
        "Strong text rendering and editing/inpainting",
        "Convenient inside an existing assistant workflow",
      ],
      bestFor: "Exact compositions, edits, and images with on-image text.",
    },
    dimensions: [
      { aspect: "Default aesthetic", a: "Striking, stylized", b: "Neutral, literal", edge: "a" },
      { aspect: "Prompt accuracy", a: "Interpretive", b: "Very literal", edge: "b" },
      { aspect: "Editing/inpainting", a: "Improving", b: "Strong", edge: "b" },
      { aspect: "Text in images", a: "Weaker", b: "Stronger", edge: "b" },
      { aspect: "Wow factor", a: "Very high", b: "High", edge: "a" },
    ],
    verdict:
      "Use Midjourney when you want beauty and mood and will curate from many options. Use DALL·E when you need control, edits, or images that say exactly what you specified.",
  },
  {
    slug: "software-engineer-vs-software-developer",
    title: "Software Engineer vs Software Developer",
    category: "Careers",
    excerpt:
      "The titles are used interchangeably — until they aren't. What actually separates the two, and which path pays.",
    date: "2026-06-15",
    readingTime: 7,
    author: "Sofia Lang",
    authorRole: "Careers Editor",
    featured: true,
    intro: [
      "Recruiters swap these titles freely, which is exactly why the distinction confuses people. In practice there is a difference in emphasis, even when the day-to-day overlaps heavily.",
      "Think of it as scope of concern: one leans toward building, the other toward engineering systems.",
    ],
    a: {
      name: "Software Developer",
      tagline: "Builds the product, feature by feature.",
      pros: [
        "Hands-on, fast iteration on real features",
        "Often closer to product and users",
        "Lower barrier to entry early in a career",
      ],
      bestFor:
        "People who love shipping tangible features and seeing quick results.",
    },
    b: {
      name: "Software Engineer",
      tagline: "Designs the system around the product.",
      pros: [
        "Owns architecture, scale, and reliability",
        "Applies engineering rigor and trade-off analysis",
        "Typically higher ceiling on pay and seniority",
      ],
      bestFor:
        "People who enjoy systems design, scale, and long-term trade-offs.",
    },
    dimensions: [
      { aspect: "Primary focus", a: "Building features", b: "Designing systems", edge: "tie" },
      { aspect: "Scope", a: "Component / product", b: "System / architecture", edge: "b" },
      { aspect: "Rigor", a: "Pragmatic", b: "Formal engineering", edge: "b" },
      { aspect: "Entry barrier", a: "Lower", b: "Higher", edge: "a" },
      { aspect: "Typical pay ceiling", a: "High", b: "Higher", edge: "b" },
    ],
    verdict:
      "The titles overlap, but 'engineer' usually signals broader ownership of systems, scale, and trade-offs, while 'developer' signals hands-on feature building. Judge the job by its actual responsibilities, not the word in the title.",
  },
  {
    slug: "data-scientist-vs-data-analyst",
    title: "Data Scientist vs Data Analyst",
    category: "Careers",
    excerpt:
      "Both live in spreadsheets and SQL — but one explains the past and the other predicts the future.",
    date: "2026-05-26",
    readingTime: 7,
    author: "Sofia Lang",
    authorRole: "Careers Editor",
    intro: [
      "These roles share tools and often share a desk, which makes the boundary fuzzy. The clearest split is the question each one is hired to answer.",
    ],
    a: {
      name: "Data Analyst",
      tagline: "Explains what happened, and why.",
      pros: [
        "Strong SQL, dashboards, and reporting",
        "Fast, business-facing insights",
        "Accessible entry point into data careers",
      ],
      bestFor: "People who like answering business questions with clear reports.",
    },
    b: {
      name: "Data Scientist",
      tagline: "Predicts what will happen next.",
      pros: [
        "Statistical modeling and machine learning",
        "Programming depth in Python/R",
        "Higher pay and research-leaning problems",
      ],
      bestFor: "People who enjoy modeling, experimentation, and prediction.",
    },
    dimensions: [
      { aspect: "Core question", a: "What happened?", b: "What will happen?", edge: "tie" },
      { aspect: "Main tools", a: "SQL, BI dashboards", b: "Python/R, ML libs", edge: "tie" },
      { aspect: "Math depth", a: "Descriptive stats", b: "Modeling & ML", edge: "b" },
      { aspect: "Entry barrier", a: "Lower", b: "Higher", edge: "a" },
      { aspect: "Pay ceiling", a: "Solid", b: "Higher", edge: "b" },
    ],
    verdict:
      "Start as an analyst if you love clear, business-facing answers and want a faster on-ramp. Aim for data scientist if you're drawn to modeling and prediction and don't mind the steeper math. Many scientists begin as analysts.",
  },
  {
    slug: "ux-vs-ui-designer",
    title: "UX vs UI Designer",
    category: "Careers",
    excerpt:
      "One shapes how it works, the other how it looks. Why the best products need both — and how the roles differ.",
    date: "2026-05-12",
    readingTime: 6,
    author: "Lena Voss",
    authorRole: "Design & Creative",
    intro: [
      "UX and UI get lumped together so often that job posts ask for both. They're complementary, but they solve different problems.",
    ],
    a: {
      name: "UX Designer",
      tagline: "Designs how it works.",
      pros: [
        "Research, flows, and information architecture",
        "Solves real user problems before pixels",
        "Influences product strategy",
      ],
      bestFor: "People who love research, logic, and problem framing.",
    },
    b: {
      name: "UI Designer",
      tagline: "Designs how it looks and feels.",
      pros: [
        "Visual systems, typography, and components",
        "Craft, polish, and brand expression",
        "Tangible, beautiful deliverables",
      ],
      bestFor: "People who love visual craft and interface detail.",
    },
    dimensions: [
      { aspect: "Focus", a: "Experience & flows", b: "Visual interface", edge: "tie" },
      { aspect: "Deliverables", a: "Wireframes, journeys", b: "Mockups, design systems", edge: "tie" },
      { aspect: "Key skill", a: "Research & logic", b: "Visual craft", edge: "tie" },
      { aspect: "Tools", a: "Figma, research kits", b: "Figma, motion tools", edge: "tie" },
      { aspect: "Mindset", a: "Problem-first", b: "Craft-first", edge: "tie" },
    ],
    verdict:
      "UX makes a product usable; UI makes it desirable. If you love structure and research, lean UX. If you love pixels and polish, lean UI. The strongest designers can do both but specialize in one.",
  },
  {
    slug: "react-vs-vue",
    title: "React vs Vue",
    category: "Software & Web",
    excerpt:
      "The most popular UI library against the most approachable framework. Which should your next project bet on?",
    date: "2026-06-11",
    readingTime: 8,
    author: "Sam Okafor",
    authorRole: "Web Engineering",
    intro: [
      "React and Vue solve the same problem — building interactive UIs — with different philosophies about how much the framework should hold your hand.",
    ],
    a: {
      name: "React",
      tagline: "The flexible industry standard.",
      pros: [
        "Largest ecosystem and job market",
        "Backed by a vast component and tooling community",
        "Maximum flexibility in how you structure apps",
      ],
      bestFor: "Teams that value ecosystem, hiring, and flexibility.",
    },
    b: {
      name: "Vue",
      tagline: "The approachable, batteries-included framework.",
      pros: [
        "Gentle learning curve and clear conventions",
        "Excellent official router and state libraries",
        "Clean single-file component model",
      ],
      bestFor: "Teams that want productivity and convention over assembly.",
    },
    dimensions: [
      { aspect: "Learning curve", a: "Steeper", b: "Gentler", edge: "b" },
      { aspect: "Ecosystem size", a: "Largest", b: "Large", edge: "a" },
      { aspect: "Job market", a: "Biggest", b: "Solid", edge: "a" },
      { aspect: "Conventions", a: "Assemble your own", b: "Batteries included", edge: "b" },
      { aspect: "Performance", a: "Excellent", b: "Excellent", edge: "tie" },
    ],
    verdict:
      "Pick React for the biggest ecosystem and the easiest hiring. Pick Vue for a smoother learning curve and a more cohesive out-of-the-box experience. Both are safe, fast, and production-proven.",
  },
  {
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL",
    category: "Software & Web",
    excerpt:
      "Structured tables and guarantees, or flexible documents and scale? The choice that shapes your whole backend.",
    date: "2026-05-21",
    readingTime: 8,
    author: "Sam Okafor",
    authorRole: "Web Engineering",
    intro: [
      "The SQL-versus-NoSQL debate is really about trade-offs between consistency and flexibility. Most teams end up using both — but the default matters.",
    ],
    a: {
      name: "SQL",
      tagline: "Structure, relationships, guarantees.",
      pros: [
        "Strong consistency and ACID transactions",
        "Powerful joins and ad-hoc queries",
        "Decades of tooling and expertise",
      ],
      bestFor:
        "Apps with clear relationships and a need for data integrity.",
    },
    b: {
      name: "NoSQL",
      tagline: "Flexible schemas, horizontal scale.",
      pros: [
        "Flexible, evolving document schemas",
        "Scales out easily for huge workloads",
        "Great fit for unstructured or varied data",
      ],
      bestFor:
        "High-scale, fast-evolving data that doesn't fit neat tables.",
    },
    dimensions: [
      { aspect: "Schema", a: "Fixed, relational", b: "Flexible, dynamic", edge: "tie" },
      { aspect: "Consistency", a: "Strong (ACID)", b: "Often eventual", edge: "a" },
      { aspect: "Scaling", a: "Vertical-leaning", b: "Horizontal-native", edge: "b" },
      { aspect: "Complex queries", a: "Excellent (joins)", b: "Limited", edge: "a" },
      { aspect: "Flexibility", a: "Lower", b: "Higher", edge: "b" },
    ],
    verdict:
      "Default to SQL when your data has clear relationships and integrity matters — which is most apps. Reach for NoSQL when you need flexible schemas or massive horizontal scale. Mixing both is common and fine.",
  },
  {
    slug: "aws-vs-azure",
    title: "AWS vs Azure",
    category: "Software & Web",
    excerpt:
      "The cloud market's two giants. One has the deepest catalog; the other has the enterprise relationship.",
    date: "2026-04-29",
    readingTime: 9,
    author: "Sam Okafor",
    authorRole: "Web Engineering",
    intro: [
      "Choosing a cloud provider is a long-term commitment, and AWS and Azure are both more than capable. The decision usually comes down to your existing stack and team.",
    ],
    a: {
      name: "AWS",
      tagline: "The broadest, most mature cloud.",
      pros: [
        "Largest catalog of services and regions",
        "Deep documentation and community",
        "Mature, battle-tested primitives",
      ],
      bestFor: "Startups and teams that want maximum breadth and maturity.",
    },
    b: {
      name: "Azure",
      tagline: "The enterprise-integrated cloud.",
      pros: [
        "Seamless Microsoft and Windows integration",
        "Strong enterprise agreements and identity",
        "Hybrid-cloud and on-prem strengths",
      ],
      bestFor:
        "Enterprises already invested in Microsoft tooling and identity.",
    },
    dimensions: [
      { aspect: "Service breadth", a: "Widest", b: "Very broad", edge: "a" },
      { aspect: "Enterprise fit", a: "Strong", b: "Strongest (MS stack)", edge: "b" },
      { aspect: "Maturity", a: "Most mature", b: "Mature", edge: "a" },
      { aspect: "Hybrid cloud", a: "Good", b: "Excellent", edge: "b" },
      { aspect: "Learning resources", a: "Vast", b: "Plentiful", edge: "a" },
    ],
    verdict:
      "Choose AWS for the broadest, most mature platform and the deepest community. Choose Azure if your organization already runs on Microsoft identity and tooling. Both will scale with you for years.",
  },
  {
    slug: "iphone-vs-android",
    title: "iPhone vs Android",
    category: "Gadgets",
    excerpt:
      "Seamless and curated, or open and customizable? The oldest debate in tech, settled by how you actually use a phone.",
    date: "2026-06-04",
    readingTime: 7,
    author: "Maya Brooks",
    authorRole: "Consumer Tech",
    intro: [
      "After more than a decade, the iPhone-versus-Android question is less about raw capability and more about values: control versus choice.",
    ],
    a: {
      name: "iPhone",
      tagline: "Seamless, curated, long-supported.",
      pros: [
        "Tight hardware-software integration",
        "Years of software updates and resale value",
        "Best-in-class app quality and privacy defaults",
      ],
      bestFor: "People who want it to just work and stay supported for years.",
    },
    b: {
      name: "Android",
      tagline: "Open, flexible, endlessly varied.",
      pros: [
        "Huge range of hardware at every price",
        "Deep customization and sideloading",
        "More flexible defaults and file access",
      ],
      bestFor: "People who want choice, customization, and price options.",
    },
    dimensions: [
      { aspect: "Ecosystem", a: "Tightly integrated", b: "Open & varied", edge: "tie" },
      { aspect: "Customization", a: "Limited", b: "Extensive", edge: "b" },
      { aspect: "Hardware choice", a: "Few models", b: "Every price point", edge: "b" },
      { aspect: "Software updates", a: "Long & consistent", b: "Varies by maker", edge: "a" },
      { aspect: "Resale value", a: "Strong", b: "Weaker", edge: "a" },
    ],
    verdict:
      "Pick iPhone for seamless integration, long support, and resale value. Pick Android for choice, customization, and price flexibility. Your existing devices usually tip the balance.",
  },
  {
    slug: "macbook-vs-windows-laptop",
    title: "MacBook vs Windows Laptop",
    category: "Gadgets",
    excerpt:
      "Premium consistency versus boundless choice. Which laptop platform deserves your next few years of work?",
    date: "2026-04-22",
    readingTime: 8,
    author: "Maya Brooks",
    authorRole: "Consumer Tech",
    intro: [
      "A laptop is a multi-year commitment, and the MacBook-versus-Windows choice shapes your software, your budget, and your daily friction.",
    ],
    a: {
      name: "MacBook",
      tagline: "Consistent, efficient, premium.",
      pros: [
        "Outstanding battery life and silent efficiency",
        "Excellent build, display, and trackpad",
        "Polished, stable macOS experience",
      ],
      bestFor:
        "Creatives and developers who want a refined, reliable machine.",
    },
    b: {
      name: "Windows Laptop",
      tagline: "Choice at every price and spec.",
      pros: [
        "Models from budget to workstation",
        "Best for gaming and broad software support",
        "Upgradable and touch/2-in-1 options",
      ],
      bestFor: "Gamers, value seekers, and Windows-only software users.",
    },
    dimensions: [
      { aspect: "Build & display", a: "Premium, consistent", b: "Varies widely", edge: "a" },
      { aspect: "Battery & efficiency", a: "Excellent", b: "Varies", edge: "a" },
      { aspect: "Price range", a: "Premium only", b: "Budget to high-end", edge: "b" },
      { aspect: "Gaming", a: "Limited", b: "Excellent", edge: "b" },
      { aspect: "Software support", a: "Broad (some gaps)", b: "Widest", edge: "b" },
    ],
    verdict:
      "Choose a MacBook for consistency, battery life, and build quality. Choose Windows for price flexibility, gaming, and the widest software support. Your required apps should make the final call.",
  },
];

/** Comparisons sorted newest-first. */
export function getAllComparisons(): Comparison[] {
  return [...COMPARISONS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}

export function getComparisonsByCategory(category: Category): Comparison[] {
  return getAllComparisons().filter((c) => c.category === category);
}

/** Featured items for the homepage hero pair (falls back to newest). */
export function getFeatured(count = 2): Comparison[] {
  const all = getAllComparisons();
  const featured = all.filter((c) => c.featured);
  const rest = all.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, count);
}

/** Stable formatter — avoids locale/clock differences between server/client. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
