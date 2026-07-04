// ===================== Case-study data =====================
const PROJECTS = {
  sequensisci: {
    title: "SequensisCI",
    badge: "Professional",
    img: "assets/sequensisci.svg",
    imgAlt: "SequensisCI build dashboard — representative mockup",
    role: "Internal platform · built and evolved as the team's self-hosted CI/CD system",
    sections: [
      { h: "The problem", p: "Hosted CI was slow and queued at the worst times. A team shipping dozens of .NET and JS microservices needed builds measured in minutes, not coffee breaks." },
      { h: "What I built", list: [
        "A Blazor Server app that clones repos, runs containerised builds against the host Docker socket, and streams live logs to the browser (polled every 2s)",
        "One pipeline publishing Docker images to GCR, NuGet packages to private feeds, and Helm charts",
        "Per-project build scripts replacing ad-hoc dotnet commands; .NET and JS builds parallelised to cut wall-clock time",
        "An MCP server on top, so AI assistants can list repos, trigger builds, rerun failures and deploy",
      ]},
      { h: "Architecture", p: "Multi-project .NET solution (Application / Builder / Contracts / Domain / Frontend / Persistence) using CQRS + DDD with MediatR, MongoDB persistence, fire-and-forget build runner, Helm chart output. Grew out of my earlier LocalCI scripts — the build orchestrator was absorbed as the platform's runner." },
    ],
    stack: ["C# / .NET", "Blazor Server", "CQRS + DDD (MediatR)", "MongoDB", "Docker", "Helm", "GCR", "NuGet feeds", "MCP server", "docker-compose"],
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
        "Auto-processing for whole ticket classes, including a six-scenario login diagnosis engine",
        "Azure B2C OAuth2 PKCE login and SOCKS-proxied MongoDB with SRV DNS handling",
      ]},
      { h: "Impact", p: "Whole categories of tickets went from manual multi-system investigation to one click — and its limits are what motivated the fully agentic CTSD-Agent." },
    ],
    stack: ["Python", "Streamlit", "OpenAI GPT-4o-mini", "Jira API", "MongoDB (pymongo)", "pandas", "Azure B2C OAuth2 PKCE", "SOCKS proxying", "pydantic", "Click", "Docker"],
  },
  vrp: {
    title: "Open Banking VRP Platform",
    badge: "Professional",
    img: "assets/vrp.svg",
    imgAlt: "Open Banking VRP consent and event flow — representative mockup",
    role: "Feature engineer across the lending platform's payment microservices",
    sections: [
      { h: "The problem", p: "Bring Variable Recurring Payments — Open Banking's successor to direct debit — into a live consumer-lending platform: consent capture, acquisition journeys, scheduled collection, and disbursal, spread across many microservices." },
      { h: "What I built", list: [
        "Feature work spanning payment plans, account management and application services, plus the collection/acquisition background jobs",
        "A V2 AccountDisbursed integration event carrying the LMS reference downstream",
        "Consent-repository lookups by LMS id for the arrangement-entry flow, mirroring bank-consent lookups",
        "Daily funds checks and retry behaviour in the payment-collection jobs; debugged live communication-sending failures",
        "Traced and documented the full VRP acquisition journey (interactive diagram) used by the team for testing",
      ]},
      { h: "Architecture", p: "Domain-Driven Design with CQRS per service, MongoDB persistence, versioned integration events between services, Open Banking data via a budgeting/data-provider SDK, and scheduled jobs for funds checking and collection." },
    ],
    stack: ["C# / .NET (ASP.NET Core)", "DDD + CQRS", "Versioned integration events", "MongoDB", "Open Banking APIs", "Background jobs", "Microservices", "AppVeyor + Octopus"],
  },
  whatsapp: {
    title: "WhatsApp Customer Platform",
    badge: "Professional",
    img: "assets/whatsapp.svg",
    imgAlt: "WhatsApp servicing hub with AI bot — representative mockup",
    role: "Led end-to-end design and delivery · shipped in under 2 months · Employee of the Month 🏆",
    sections: [
      { h: "The problem", p: "Customers live on WhatsApp; the lender's servicing didn't. The brief: a production-grade two-way WhatsApp channel with an AI assistant, on an aggressive timeline." },
      { h: "What I built", list: [
        "A .NET messenger microservice handling WhatsApp send/receive with webhook integration, MongoDB persistence and cloud object storage for media",
        "A React/TypeScript servicing hub where agents watch and take over conversations in real time over SignalR/WebSockets",
        "A production AI chatbot (OpenAI) actively handling live customer queries, with agent handoff",
        "Authentication, authorisation, logging, analytics and monitoring for production reliability; CI/CD pipelines and environment configs",
        "Prototyped local-model alternatives with Ollama for the servicing bot",
      ]},
      { h: "Impact", p: "Delivered end-to-end in under two months and recognised with Employee of the Month for the speed and business impact." },
    ],
    stack: ["C# / .NET Core", "React.js", "TypeScript", "SignalR", "WebSockets", "WhatsApp Business API", "OpenAI API", "Ollama", "MongoDB", "GCP storage", "Docker", "CI/CD"],
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
        "VRP payment-setup and confirmation screens within the application flow",
        "Worked with the HATEOAS-style navigation engine: the backend returns rel links and the SPA maps them to routes — including correct screen restoration on refresh",
        "Form UX with react-hook-form + yup validation and UK bank-account modulus checking",
        "Prefill and confirmation-modal features; debugging across the journey's redirect map",
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
        "Both later fed directly into SequensisCI — LocalCI's orchestrator became the platform's build runner",
      ]},
    ],
    stack: ["Python", "Docker", "GCR + gcloud", "Helm", ".NET SDK", "Octopus Deploy API", "AppVeyor API", "Azure DevOps NuGet feeds"],
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
