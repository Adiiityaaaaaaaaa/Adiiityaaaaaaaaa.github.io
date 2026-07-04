// ===================== Case-study data =====================
const PROJECTS = {
  sequensisci: {
    title: "SequensisCI",
    badge: "Professional",
    img: "assets/sequensisci.svg",
    imgAlt: "SequensisCI build dashboard — representative mockup",
    role: "Built from scratch, 200+ commits · the team's self-hosted CI/CD platform (an in-house AppVeyor replacement)",
    sections: [
      { h: "The problem", p: "Hosted CI was slow, licence-capped and queued at the worst times. A team shipping dozens of .NET, JavaScript and R microservices needed builds measured in minutes — and a platform they controlled." },
      { h: "The build engine", list: [
        "Ported my 814-line Python build orchestrator into a self-contained .NET console app: project-type detection from manifest, version-tag generation, on-demand SDK/docker/helm bootstrap, then build → test → publish → pack → push",
        "One pipeline publishing Docker images (BuildKit-isolated), NuGet packages and Helm charts to ChartMuseum",
        "Multi-language: .NET, JavaScript (npm dist packed as real .nupkg), and R with CMD-check parity",
        "AppVeyor-style versioning — a monotonic per-repo build counter allocated atomically in Mongo, with master auto-bump committed back as [skip ci]",
      ]},
      { h: "The platform", list: [
        "React + Vite + TypeScript SPA: command palette (Cmd+K), virtual-scrolled log viewer, and live build logs over Server-Sent Events with auto-reconnect",
        "Bitbucket integration: HMAC-verified push webhooks, PR merge-preview builds (build the merged result, not the branch), supersede logic for newer triggers, dynamic repo discovery via the Bitbucket API",
        "Horizontal scale-out: heartbeat-based build ownership across replicas, cross-pod cancel, orphaned-build sweeper, fleet-shared GCS build caches, and a working-hours replica schedule",
        "Entra (Azure AD) SSO via server-side OIDC — chosen so SSE works without auth headers — plus an API-key door for machine callers",
        "An MCP server exposing trigger/rerun/cancel/deploy and cache management to AI assistants, and Slack build notifications",
      ]},
      { h: "Why it matters", p: "This is a real platform, not a script: versioning, auth, scale-out, caching, multi-language builds and an AI control plane — built end-to-end by one engineer and used by the whole team daily." },
    ],
    stack: ["C# / .NET", "React + Vite + TypeScript", "TanStack Query", "Server-Sent Events", "MongoDB", "Docker + BuildKit", "Helm + ChartMuseum", "GCR", "Bitbucket API + webhooks", "Entra ID (OIDC)", "GCS caching", "MCP server", "Slack API"],
  },
  ctsd: {
    title: "CTSD-Agent",
    badge: "Professional",
    img: "assets/ctsd-agent.svg",
    imgAlt: "CTSD-Agent reasoning and approval UI — representative mockup",
    role: "Solo-built · the agentic successor to BatBot and BatBotUI",
    sections: [
      { h: "The problem", p: "BatBotUI automated the predictable tickets, but every new ticket type meant hand-writing a new flow. The next step was an agent that could investigate any ticket the way an engineer would — without ever acting unsupervised." },
      { h: "What I built", list: [
        "A Claude-powered tool-using agent that reads a Jira support ticket, queries customer systems, and proposes a resolution",
        "RAG over two corpora: the company codebase and historically resolved tickets (embedded Qdrant + OpenAI embeddings), so the agent cites precedent",
        "Human-in-the-loop by design — every mutating action pauses for per-step approval (or an explicit approve-all)",
        "Ingestion jobs for Bitbucket repos and Jira history; FastAPI backend, NiceGUI frontend, SQLite storage (Postgres-portable), all Dockerised",
      ]},
      { h: "Why it matters", p: "It turns 'automation' from a list of scripted flows into a general investigator with judgment — while keeping a human hand on every irreversible step. Phases 1–3 shipped; phase 4 (expanded action coverage) planned." },
    ],
    stack: ["Python", "Claude API (tool use)", "RAG", "Qdrant (embedded)", "OpenAI embeddings", "FastAPI", "NiceGUI", "SQLite → Postgres", "httpx", "Jira API", "MongoDB", "Docker"],
  },
  batbot: {
    title: "BatBot & BatBotUI",
    badge: "Professional",
    img: "assets/batbot.svg",
    imgAlt: "BatBot AI ticket triage dashboard — representative mockup",
    role: "Solo-built · daily-driver tooling for the customer tech support desk",
    sections: [
      { h: "The problem", p: "A support desk drowning in repetitive tickets — login issues, Open Banking reconnects, welcome-letter requests — each needing lookups across three or four internal systems before anyone could act." },
      { h: "What I built", list: [
        "BatBot: a packaged Python CLI that processed service-desk tickets and ran bulk back-office actions (approve-and-close flows, direct-debit suppression handling, disbursal-delay processing — 10-at-a-time in parallel)",
        "BatBotUI: a multi-page Streamlit app — dashboard, info tickets, action tickets, quick lookup — that AI-categorises unassigned Jira tickets with GPT-4o-mini and enriches them from MongoDB and internal APIs",
        "An integration layer of 20+ loan-system API operations: write-offs, tertiary status, interest freeze/unfreeze, notes, settlements, arrears reduction, recovery-agency lookups — with shared token-refresh retry handling",
        "A smart categoriser distinguishing debt-sale from settlement tickets using purchaser signals, plus redisbursal auto-scenario detection and document downloads zipped per account",
        "Auto-processing for whole ticket classes, including a six-scenario login diagnosis engine, an 'AI Infer' button for note inference, and cross-tab caching for snappy agent UX",
        "Azure B2C OAuth2 PKCE login and SOCKS-proxied MongoDB with SRV DNS handling",
      ]},
      { h: "Productionised: the login-ticket resolver", p: "The login diagnosis proved so reliable it graduated into the platform proper — I built an automated login-ticket resolver in the users microservice that reconciles identity state across the account system, the loan system and Azure B2C, validates the customer's email against known contacts, and self-heals broken logins via a coded delete-and-re-enrol flow, secured with a header key plus Istio mesh policy." },
      { h: "Impact", p: "Whole categories of tickets went from manual multi-system investigation to one click — and its limits are what motivated the fully agentic CTSD-Agent." },
    ],
    stack: ["Python", "Streamlit", "OpenAI GPT-4o-mini", "Jira API", "MongoDB (pymongo)", "pandas", "Azure B2C OAuth2 PKCE", "SOCKS proxying", "pydantic", "Click", "Docker", "C# / .NET (login resolver)", "Istio policy"],
  },
  vrp: {
    title: "Open Banking VRP Platform",
    badge: "Professional",
    img: "assets/vrp.svg",
    imgAlt: "Open Banking VRP consent and event flow — representative mockup",
    role: "~300 commits across three microservices · one of the two engineers driving the acquisition-VRP epic end-to-end",
    sections: [
      { h: "The problem", p: "Bring Variable Recurring Payments — Open Banking's successor to direct debit — into a live consumer-lending platform: consent capture in the application journey, scheduled collection, payment reconciliation, and every edge case in between." },
      { h: "The customer journey (application service)", list: [
        "Built the six-screen VRP setup flow inside the application orchestrator — payment setup, confirm details, bank selection, consent failed/skip, acknowledgement — each as a full DDD chain from domain event to endpoint",
        "A config-gated 50/50 A/B rollout with one eligibility decision per application, including a persistence bug fix where the decision was lost on debt-consolidation applications",
        "Fraud-safe by design: a declined application automatically revokes its VRP consent so no live mandate survives a decline",
        "Slack alerting on any unhandled VRP endpoint exception",
      ]},
      { h: "The payments engine (payment plans service — 185 commits)", list: [
        "Authored the service's SDK (journeys + VRP clients) consumed by the other services",
        "A scheduled acquisition-collection engine (4× daily cron) with one-payment-per-consent semantics, dynamic collection windows, and Slack alerts when a payment would exceed the consent cap",
        "A Modulr payment webhook receiver with HMAC-SHA1 signature verification — reverse-engineered from a captured real delivery — with an idempotent event store that reconciles bank credits back to the originating payment",
        "Temporary-arrangement flow: suspend acquisition, revoke live payment, create the TA plan, auto-resume on completion — plus a janitor job and idempotent suspend/resume audit events",
      ]},
      { h: "The account layer (account management service)", list: [
        "VRP consent state on the account aggregate, kept in sync via cross-service integration events",
        "Brand-specific contractual documents: VRP backup-payment sections across welcome letters, pre-contract info and credit agreements for all three brands",
        "A V2 AccountDisbursed event carrying the LMS reference, and a funder-lookup API resolving collection accounts",
      ]},
    ],
    stack: ["C# / .NET (ASP.NET Core)", "DDD + CQRS (MediatR)", "MongoDB", "Modulr Open Banking API", "HMAC webhook verification", "Hangfire / cron jobs", "Versioned integration events", "Handlebars templating", "Slack API", "NBomber perf tests"],
  },
  whatsapp: {
    title: "WhatsApp Customer Platform",
    badge: "Professional",
    img: "assets/whatsapp.svg",
    imgAlt: "WhatsApp servicing hub with AI bot — representative mockup",
    role: "Led end-to-end · primary author with 500+ commits across backend and frontend · Employee of the Month 🏆",
    sections: [
      { h: "The problem", p: "Customers live on WhatsApp; the lender's servicing didn't. The brief: a production-grade two-way WhatsApp channel with an AI assistant, on an aggressive timeline — first version shipped in under two months, then evolved for nine more." },
      { h: "The backend (354 commits)", list: [
        "Core send/receive engine: webhook intake, phone-number normalisation, two-way messaging built from the ground up",
        "Multi-account (multi-WABA) architecture with per-account credentials and JWT-role-scoped conversation filtering — including finding and closing a cross-account data-leak",
        "WhatsApp template system: upload, cross-account transfer, brand/audience tagging and a polling sync runner",
        "Media pipeline on Google Cloud Storage (images, PDFs, any file type) with metadata in MongoDB",
        "Real-time layer: SignalR with a Pub/Sub backplane for scale-out status updates; chunked bulk-upload worker with tunable batching",
        "An AI reporting engine giving natural-language querying over agent and message data, plus a Mongo-aggregation ops dashboard (backlog, workload, response stats)",
      ]},
      { h: "The agent console (162 commits)", list: [
        "React/TypeScript chat window with media previews and live status over SignalR",
        "Ops analytics dashboard with KPI cards and brand/label/agent/status filters",
        "AI reports screen, template management, Excel bulk upload/export, and a bulk contractual-documents exporter producing per-account zips",
      ]},
      { h: "Impact", p: "Recognised with Employee of the Month for the initial delivery; the platform now carries live customer servicing traffic with an AI bot handling the front line (see the Production AI Chatbot case study)." },
    ],
    stack: ["C# / .NET 8", "CQRS (MediatR)", "React.js + TypeScript", "SignalR + Pub/Sub backplane", "WhatsApp Business API (multi-WABA)", "OpenAI + AutoGen", "MongoDB", "Google Cloud Storage", "Hangfire", "Docker", "JWT + role-based access"],
  },
  chatbot: {
    title: "Production AI Chatbot",
    badge: "Professional",
    img: "assets/chatbot.svg",
    imgAlt: "AI chatbot console with intent pipeline and handoff — representative mockup",
    role: "The AI layer of the WhatsApp platform · live in production with real customers",
    sections: [
      { h: "The problem", p: "A two-way WhatsApp channel is only useful if someone answers instantly — but staffing it around the clock doesn't scale. The chatbot had to handle real customer queries safely, in a regulated lending context, from day one." },
      { h: "What I built", list: [
        "An AutoGen-based agent service integrated into the WhatsApp messenger backend, reworked to batch multiple customer messages per bot turn, with thread-safety and deduplication fixes for concurrent replies",
        "A DPA (Data Protection Act) verification flow — the bot verifies identity before any account lookup, then fetches agreement details from the loan system only after DPA passes",
        "Intent detection with confidence thresholds — low-confidence or sensitive intents route straight to a human",
        "Guardrails for vulnerable customers: financial-difficulty signals always trigger agent handoff, never automated advice",
        "Seamless mid-conversation handoff to live agents in the servicing hub (SignalR), with the full transcript in view",
        "Logging, analytics and monitoring so every AI response is auditable — surfaced through a natural-language AI reporting engine I built alongside it",
      ]},
      { h: "Why it matters", p: "This is AI in production with real customers — not a demo. The design assumes the model will sometimes be unsure, and makes that a safe, boring event: a human simply takes over. See the WhatsApp Customer Platform case study for the platform it lives in." },
    ],
    stack: ["OpenAI API", "AutoGen agents", "C# / .NET Core", "Prompt engineering", "Intent classification", "DPA verification flow", "SignalR", "WhatsApp Business API", "MongoDB", "Monitoring & audit logging"],
  },
  gocardless: {
    title: "Direct Debit at Scale (GoCardless)",
    badge: "Professional",
    img: "assets/gocardless.svg",
    imgAlt: "Direct-debit webhook processing and bulk mandate import — representative mockup",
    role: "91 commits on the payments service · the direct-debit epic alongside the VRP work",
    sections: [
      { h: "The problem", p: "Move the lender's direct-debit rails onto GoCardless: react correctly to every mandate and payment lifecycle event, and migrate thousands of existing mandates in — safely, idempotently, across multiple funders." },
      { h: "Webhook processing", list: [
        "A webhook receiver with HMAC-SHA256 signature validation (constant-time compare) behind a signature-checking authorization filter",
        "Refactored the whole path to CQRS with domain events: submit/activate/fail/cancel/expire on the mandate aggregate, submit/confirm/payout/fail/cancel/chargeback on payments, dispatched via MediatR behind feature flags",
        "Treats the API as the source of truth — payment webhooks re-fetch full details rather than trusting the event payload — with idempotent event dedup and retry safety",
        "Mandate status changes propagate to the customer system via Pub/Sub integration events",
      ]},
      { h: "Bulk mandate import", list: [
        "A Hangfire-backed import pipeline: resolve each LMS reference to a customer via the customer service, group by funder, and run one import job per funder with that funder's own GoCardless token",
        "Rebuilt as a proper DDD batch aggregate with status flow history, paged processing, LMS-reference dedup, and per-stage failure tracking — so a 12,000-mandate migration is observable and resumable",
      ]},
    ],
    stack: ["C# / .NET", "GoCardless API + SDK", "HMAC-SHA256 verification", "CQRS + domain events (MediatR)", "Hangfire", "Google Pub/Sub", "MongoDB", "Feature flags"],
  },
  bulkactions: {
    title: "Icenet Bulk Actions Platform",
    badge: "Professional",
    img: "assets/bulkactions.svg",
    imgAlt: "Bulk actions job screen with live per-agreement results — representative mockup",
    role: "A cross-service feature I built end-to-end: backend job engine, React UI, mesh policy and email notifier",
    sections: [
      { h: "The problem", p: "Servicing teams needed to run back-office operations — notes, write-offs, settlements, suppressions — over spreadsheets of thousands of agreements. Manually, that's days of clicking; BatBot had proven the demand, but it needed to be a real platform capability." },
      { h: "What I built", list: [
        "An async job engine: upload a CSV/Excel of agreements, get a 202 + jobId back, poll for per-agreement progress — jobs queue in MongoDB and a scheduled drain worker claims them atomically and processes with bounded parallelism",
        "Eight action executors ported faithfully from the BatBot flows: post notes, write-off/debt sale, tertiary status (with frozen-interest handling), DD suppression/unsuppression, full settlement, reduce arrears, and disbursal-delay approval via the referrals service",
        "A disbursal-delay report endpoint that fetches across services with recursive chunk-splitting to isolate failing ids, returning a merged CSV plus the unreportable ids in a response header",
        "A completion-email notifier: when a job finishes, the submitter gets a success/total tally with per-agreement results — best-effort, feature-flagged, never fails the job",
        "The React operations screen: an eight-tab UI with multipart upload, 2-second progress polling and a live per-agreement results table",
        "The unblocking fix: diagnosed a cross-service Istio RBAC denial down to a suffix-vs-prefix path glob in the authorization policy, and fixed correlation/caller-identity propagation from the background worker",
      ]},
      { h: "Why it matters", p: "It's the full arc of platform work: a proven internal-tool workflow re-engineered as a governed, observable, async service capability — and the debugging went as deep as service-mesh policy globs." },
    ],
    stack: ["C# / .NET", "CQRS (MediatR)", "MongoDB job queue", "Scheduled drain workers", "CsvHelper + ClosedXML", "React + TypeScript", "Istio AuthorizationPolicy", "Email via comms service", "SDK design"],
  },
  utility: {
    title: "UtilityService + Link Shortener",
    badge: "Professional",
    img: "assets/utility.svg",
    imgAlt: "UtilityService link shortener and re-architecture phases — representative mockup",
    role: "Founded solo — service, SDK, events, charts and mesh policy all mine",
    sections: [
      { h: "What it is", p: "A production .NET 8 microservice I created from scratch as a home for cross-cutting capabilities: the async Icenet bulk-job processor and a URL shortener. The shortener started as its own standalone service — API, base62 code generation with collision retry, Mongo persistence, a minimal web UI, and full Helm/Istio deployment — shipped end-to-end in a single day." },
      { h: "The four-phase re-architecture", list: [
        "Phase 1 — split the flat host into a layered solution (Domain / Application / Persistence / Infrastructure) with zero behaviour change",
        "Phase 2 — introduced the organisation's CQRS + MediatR platform layer with Result-typed handlers",
        "Phase 3 — cut over to the platform service host: versioned controllers, OpenTelemetry, HPA/PDB chart parity",
        "Phase 4 — published a typed SDK and Pub/Sub integration events (job-completed) for other services to consume",
        "Mesh auth: adopted Istio authorization policies as the sole authority and removed in-app JWT handling — with host-partitioned routing so the short-link domain serves only redirects",
      ]},
      { h: "Why it matters", p: "Most engineers extend services; this shows the full lifecycle — founding one, shipping fast, then deliberately paying down the architecture to org standards without breaking behaviour." },
    ],
    stack: [".NET 8", "Minimal APIs → versioned controllers", "CQRS + MediatR", "MongoDB", "Google Pub/Sub events", "Typed SDK", "OpenTelemetry", "Istio VirtualServices + AuthorizationPolicy", "Helm", "base62 + collision retry"],
  },
  platform: {
    title: "Mesh, Observability & Pipelines",
    badge: "Professional",
    img: "assets/platform.svg",
    imgAlt: "Istio policy, OpenTelemetry trace and artifact migration — representative mockup",
    role: "The platform work between the features — small commits, outsized leverage",
    sections: [
      { h: "What this covers", p: "Not every impactful change is a feature. This is the infrastructure work that kept the features shippable — debugged and delivered across the mesh, observability and artifact layers." },
      { h: "Highlights", list: [
        "Istio service-mesh policy: onboarded a new namespace with sidecar injection and baseline deny-all/allow-health/allow-internal policies; fixed a production 403 'RBAC: access denied' caused by a suffix-vs-prefix path glob that had never matched its route",
        "OpenTelemetry migration on the credit-decision service: worked through CLR-profiler agent segfaults and operator injection before landing a clean SDK-based traces + metrics pipeline configured in code (OTLP export)",
        "Migrated CI artifact publishing off deprecated MyGet onto Azure Artifacts — feed wiring, push-on-success, and dead-config cleanup",
        "Secured system-to-system calls with header-key validation plus matching mesh policies, and fixed correlation/caller identity propagation from background workers",
      ]},
    ],
    stack: ["Istio (AuthorizationPolicy, VirtualService)", "OpenTelemetry (.NET SDK, OTLP)", "Kubernetes + Helm", "Azure Artifacts", "AppVeyor CI", "gRPC/native-lib debugging"],
  },
  journey: {
    title: "Loan Application Journey",
    badge: "Professional",
    img: "assets/journey.svg",
    imgAlt: "Loan application repayment setup screen — representative mockup",
    role: "Feature engineer on the customer-facing application flow",
    sections: [
      { h: "The problem", p: "The public web app where borrowers apply for loans — a long, form-heavy, compliance-sensitive journey where every screen transition is dictated by the backend." },
      { h: "What I built", list: [
        "A fraud-reduction 'name on account' flow on the bank-details step: pre-fills the account-holder name from eligibility data, shows an accessible inline alert if the user edits it, and sends an edited-flag downstream so Fraud and MI can see the warning was overridden",
        "A bank-details confirmation modal — after validation and UK modulus checking, submission is gated behind an accessible checkbox-confirmed summary of account number, sort code and name",
        "Solved the async-timing bug where eligibility data arrives after the form mounts, without clobbering returning users' saved names",
        "The VRP payment-setup screens, with in-session skip to bank selection and page-refresh re-sync against the backend's HATEOAS rel links",
        "Extensive Jest/RTL coverage: prefill, revert, screen-reader linkage, returning-user and submit-payload scenarios",
      ]},
      { h: "Context", p: "A mature production React 17 + TypeScript codebase (migrated CRA → Vite) with react-query, styled-components, mock-API dev mode, service workers, GTM analytics, and full lint/test/CI tooling." },
    ],
    stack: ["React 17", "TypeScript", "Vite", "react-query", "react-hook-form + yup", "styled-components", "react-router", "Jest + Testing Library", "Nginx + Docker", "SonarCloud"],
  },
  mcp: {
    title: "Loan Journey MCP Server",
    badge: "Professional",
    img: "assets/mcp.svg",
    imgAlt: "Loan Advisor AI calling journey APIs — representative mockup",
    role: "Solo prototype · making a loan journey AI-navigable",
    sections: [
      { h: "The idea", p: "If AI assistants are how people will shop for credit, the loan journey should be callable by one. This prototype wraps the lending platform's application journey so an assistant can drive it conversationally." },
      { h: "What I built", list: [
        "An MCP server plus FastAPI wrapper describing 14 journey endpoints with an OpenAPI schema",
        "A 'Loan Advisor' Custom GPT wired to it — walking a user from first question to a live, personalised offer",
        "End-to-end journey test harnesses covering both the direct and VRP application flows",
        "Auth and proxy modules for safe access to the journey APIs",
      ]},
      { h: "Why it matters", p: "It's the same platform thinking as the CI MCP server: expose real internal capability through a standard AI interface, and the tooling on top comes for free." },
    ],
    stack: ["Python", "MCP SDK", "FastAPI", "OpenAPI 3", "uvicorn", "Custom GPT actions", "ngrok", "MongoDB"],
  },
  localci: {
    title: "LocalCI + Octopus Deployer",
    badge: "Professional",
    img: "assets/localci.svg",
    imgAlt: "LocalCI terminal build and deploy output — representative mockup",
    role: "Solo-built developer toolchain · later absorbed into SequensisCI",
    sections: [
      { h: "The problem", p: "Waiting on hosted CI for every iteration was the slowest part of shipping. Two focused tools turned build-and-deploy into a couple of local commands." },
      { h: "What I built", list: [
        "LocalCI: builds a service locally and pushes the Docker image to GCR — auto-deriving image name and tag from the .csproj/package.json, branch and commit count; optionally mimics the full hosted pipeline (NuGet + Helm)",
        "Octopus Deployer: finds a release by partial service-name match, deploys it to the chosen environment, and tails deployment status live; can wait on an upstream build first",
        "Both seeded SequensisCI — the Python orchestrator was later ported into the platform's self-contained .NET build engine",
      ]},
    ],
    stack: ["Python", "Docker", "GCR + gcloud", "Helm", ".NET SDK", "Octopus Deploy API", "AppVeyor API", "Azure DevOps NuGet feeds"],
  },
  sports: {
    title: "High-Traffic Sports Platforms",
    badge: "Professional",
    img: "assets/sports.svg",
    imgAlt: "Live sports timing dashboard at 2.4M concurrent users — representative mockup",
    role: "Backend Developer at Sportz Interactive (Jul 2023 – Sep 2025) · clients including F1, UEFA and FEI",
    sections: [
      { h: "The problem", p: "Live sports traffic is brutal: millions of fans hit the same endpoints at the same second — lights out, kick-off, a goal. The platforms had to stay fast and correct through 2–3 million concurrent users." },
      { h: "What I did", list: [
        "Built and maintained backend systems in .NET Core with PostgreSQL, Redis and AWS for global sports clients including F1, UEFA and FEI",
        "Designed REST APIs that held 2–3 million concurrent users with low latency",
        "Optimised query plans, indexing strategies and caching layers — the difference between a smooth match day and an outage",
        "Ran the platforms on AWS (EC2, S3, RDS, CloudWatch) with monitoring and scaling",
        "Handled production incidents and root-cause analysis under live-event pressure; contributed to system-design decisions",
      ]},
      { h: "Why it matters", p: "Two years of this is where my performance instincts come from — cache-first thinking, index discipline, and calm incident response — habits I carried into fintech." },
    ],
    stack: ["C# / .NET Core", "PostgreSQL", "Redis", "AWS EC2 · S3 · RDS", "CloudWatch", "REST API design", "Caching & indexing", "Incident response"],
  },
  shooter: {
    title: "Space Shooter",
    badge: "Personal",
    img: "assets/shooter.svg",
    imgAlt: "Space shooter game screen — representative mockup",
    role: "Personal project · one file, one evening, fully playable",
    sections: [
      { h: "What it is", p: "A classic arcade shooter in a single ~260-line Pygame file — proof that small can still be finished and fun." },
      { h: "Details", list: [
        "Physics-based player movement: acceleration, friction and max-speed clamping instead of teleport-y arrow keys",
        "Hold-to-fire bullets with fire-rate limiting",
        "Enemies spawn off-screen with drift, rotation and gravity-style falling; spawn caps keep it fair",
        "Alpha-blended game-over overlay with restart/quit flow",
      ]},
    ],
    stack: ["Python", "Pygame"],
  },
};

// ===================== Footer year =====================
document.getElementById("year").textContent = new Date().getFullYear();

// ===================== Scroll-reveal =====================
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===================== Scroll progress bar =====================
const progress = document.getElementById("scrollProgress");
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
}, { passive: true });

// ===================== Animated hero counters =====================
const counters = document.querySelectorAll(".stat-num[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    counterObserver.unobserve(entry.target);
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = el.dataset.count.includes(".") ? 1 : 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}, { threshold: 0.5 });
counters.forEach((el) => counterObserver.observe(el));

// ===================== Project filtering =====================
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card[data-tags]");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.tags.split(" ").includes(filter);
      card.classList.toggle("hidden", !match);
    });
  });
});

// ===================== Case-study modal =====================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalBadge = document.getElementById("modalBadge");
const modalRole = document.getElementById("modalRole");
const modalBody = document.getElementById("modalBody");
const modalStack = document.getElementById("modalStack");
let lastFocus = null;

function openModal(id) {
  const p = PROJECTS[id];
  if (!p) return;
  lastFocus = document.activeElement;
  modalImg.src = p.img;
  modalImg.alt = p.imgAlt;
  modalTitle.textContent = p.title;
  modalBadge.textContent = p.badge;
  modalBadge.className = "badge " + (p.badge === "Personal" ? "badge-personal" : "badge-work");
  modalRole.textContent = p.role;

  modalBody.replaceChildren();
  for (const section of p.sections) {
    const h = document.createElement("h4");
    h.textContent = section.h;
    modalBody.appendChild(h);
    if (section.p) {
      const para = document.createElement("p");
      para.textContent = section.p;
      modalBody.appendChild(para);
    }
    if (section.list) {
      const ul = document.createElement("ul");
      ul.className = "card-points";
      for (const item of section.list) {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      }
      modalBody.appendChild(ul);
    }
  }

  modalStack.replaceChildren(...p.stack.map((s) => {
    const span = document.createElement("span");
    span.textContent = s;
    return span;
  }));

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

document.querySelectorAll("[data-open]").forEach((el) =>
  el.addEventListener("click", () => openModal(el.dataset.open))
);
modal.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", closeModal)
);
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});
