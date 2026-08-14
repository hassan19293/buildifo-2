import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

type Capability = {
  number: string;
  name: string;
  description: string;
  detail: string;
  variant: "digital" | "intelligent" | "infrastructure";
};

type Project = {
  number: string;
  title: string;
  medium: string;
  description: string;
  tags: string[];
  variant: "grill" | "ai" | "restaurant";
  sourceNote: string;
};

const capabilities: Capability[] = [
  {
    number: "01",
    name: "Digital Experiences",
    description:
      "Interactive environments where narrative, interface rhythm, and production code are composed as one artifact.",
    detail: "Spatial web direction / Interface choreography",
    variant: "digital",
  },
  {
    number: "02",
    name: "Intelligent Systems",
    description:
      "Applied intelligence designed for operators: legible automation, measurable behavior, and explicit human override.",
    detail: "Agent workflows / Decision systems / Controlled autonomy",
    variant: "intelligent",
  },
  {
    number: "03",
    name: "Software Infrastructure",
    description:
      "Foundational systems that keep products dependable under load, with clean deployment paths and maintainable architecture.",
    detail: "Platform architecture / Observability / Release discipline",
    variant: "infrastructure",
  },
];

const projects: Project[] = [
  {
    number: "01",
    title: "The Grill House",
    medium: "Cinematic hospitality web",
    description: "A cinematic hospitality experience, from reservation flow to the atmosphere on screen.",
    tags: ["Web", "Brand", "Motion"],
    variant: "grill",
    sourceNote: "Exhibit study / warm light",
  },
  {
    number: "02",
    title: "AI System",
    medium: "Applied intelligence system",
    description: "A legible automation system for operators: inspectable, measurable, and never a black box.",
    tags: ["AI", "Systems", "Product"],
    variant: "ai",
    sourceNote: "Exhibit study / cool light",
  },
  {
    number: "03",
    title: "Restaurant OS",
    medium: "Operational product system",
    description: "A real operating environment for multi-location service teams, built for the decisions between the rushes.",
    tags: ["Product", "Operations", "Interface"],
    variant: "restaurant",
    sourceNote: "Exhibit study / daylight",
  },
];

type SystemLayer = {
  number: string;
  name: "Interface" | "Application" | "Data" | "Automation" | "Intelligence";
  shortDescription: string;
  description: string;
  material: string;
};

const systemLayers: SystemLayer[] = [
  {
    number: "01",
    name: "Interface",
    shortDescription: "The surface people actually touch.",
    description: "A clear operational surface that gives the system a human scale and makes the next action legible.",
    material: "Surface / operator view",
  },
  {
    number: "02",
    name: "Application",
    shortDescription: "The logic that turns intent into action.",
    description: "Product logic organized around real work, with explicit states, rules, and room for a human decision.",
    material: "Logic / product behavior",
  },
  {
    number: "03",
    name: "Data",
    shortDescription: "The records that keep the system grounded.",
    description: "Structured information with ownership and shape, so every decision has a reliable source beneath it.",
    material: "Records / source of truth",
  },
  {
    number: "04",
    name: "Automation",
    shortDescription: "The repeatable work that earns its place.",
    description: "Quiet, observable workflows that remove repetition without hiding what happened or why.",
    material: "Workflow / controlled motion",
  },
  {
    number: "05",
    name: "Intelligence",
    shortDescription: "The judgement layer, applied with restraint.",
    description: "Useful intelligence with boundaries, confidence you can inspect, and a clear path back to a person.",
    material: "Decision / assisted reasoning",
  },
];

function SiteChrome() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const span = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / span)));
      setScrolled(window.scrollY > 80);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      className={`site-chrome${scrolled ? " is-scrolled" : ""}`}
      style={{ "--read-progress": progress.toFixed(4) } as CSSProperties}
      aria-label="Buildifo"
    >
      <a className="site-chrome__mark" href="#arrival">
        Buildifo
      </a>
      <a className="site-chrome__contact" href="mailto:hello@buildifo.com">
        hello@buildifo.com
      </a>
      <span className="site-chrome__rail" aria-hidden="true">
        <span className="site-chrome__read" />
      </span>
    </nav>
  );
}

function Arrival() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [depart, setDepart] = useState(0);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    const timer = window.setTimeout(() => setLoaded(true), 60);
    return () => {
      query.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      setDepart(Math.min(1, Math.max(0, -rect.top / viewport)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5;
    const y = (event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5;
    setDrift({ x: x * 12, y: y * 7 });
  };

  const style = {
    "--arrival-depart": depart.toFixed(4),
    "--arrival-drift-x": `${drift.x.toFixed(2)}px`,
    "--arrival-drift-y": `${drift.y.toFixed(2)}px`,
  } as CSSProperties;

  return (
    <header
      ref={sectionRef}
      id="arrival"
      className={`arrival${loaded ? " is-loaded" : ""}${reduced ? " is-static" : ""}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setDrift({ x: 0, y: 0 })}
    >
      <a className="skip-link" href="#work">
        Skip to the work
      </a>

      {/* A dark vestibule with one lit opening: the building, before you are inside it. */}
      <div className="arrival-room" aria-hidden="true">
        <div className="arrival-interior" />
        <div className="arrival-mass" />
        <div className="arrival-opening">
          <span className="arrival-opening__light" />
          <span className="arrival-opening__leaf" />
        </div>
        <div className="arrival-beam" />
        <div className="arrival-floor" />
        <div className="arrival-vignette" />
      </div>

      <div className="arrival-head">
        <p className="arrival-meta">
          <span className="arrival-meta__mark" />
          Creative technology studio
        </p>
        <h1 className="arrival-title">
          <span className="arrival-line">
            <span>We</span>
          </span>
          <span className="arrival-line">
            <span>build.</span>
          </span>
        </h1>
      </div>

      <div className="arrival-foot">
        <span className="arrival-hint">
          <span className="arrival-hint__bar" aria-hidden="true" />
          Scroll to enter
        </span>
        <p className="arrival-tag">
          Digital experiences
          <br />
          Software &amp; intelligent systems
        </p>
      </div>
    </header>
  );
}

function ServiceSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const territoryRefs = useRef<(HTMLElement | null)[]>([]);
  const [entered, setEntered] = useState(false);
  const [visibleTerritories, setVisibleTerritories] = useState<string[]>([]);
  const [focusedTerritory, setFocusedTerritory] = useState<string | null>(null);
  const [walkShift, setWalkShift] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observedTerritories = territoryRefs.current.filter(
      (territory): territory is HTMLElement => territory !== null,
    );

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setEntered(true);
      setVisibleTerritories(capabilities.map((capability) => capability.variant));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.08 },
    );
    sectionObserver.observe(section);

    const territoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const variant = entry.target.getAttribute("data-variant");
          if (variant) {
            setVisibleTerritories((current) =>
              current.includes(variant) ? current : [...current, variant],
            );
          }
          territoryObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -12% 0px" },
    );
    observedTerritories.forEach((territory) => territoryObserver.observe(territory));

    return () => {
      sectionObserver.disconnect();
      territoryObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const updateWalk = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      setWalkShift((progress - 0.45) * 22);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateWalk);
    };

    updateWalk();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toggleFocus = (variant: string) => {
    setFocusedTerritory((current) => (current === variant ? null : variant));
  };

  const handleTerritoryKeyDown = (event: KeyboardEvent<HTMLElement>, variant: string) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleFocus(variant);
  };

  const sectionStyle = { "--walk-shift": `${walkShift.toFixed(2)}px` } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className={`service-sequence${entered ? " is-entered" : ""}`}
      style={sectionStyle}
      aria-labelledby="reveal-title"
    >
      <div className="sequence-wrap">
        <div className="sequence-intro">
          <p className="sequence-kicker">
            <span className="sequence-kicker__mark" aria-hidden="true" />
            02 / Reveal
          </p>
          <h2 id="reveal-title">
            <span>Digital</span>
            <span>experiences</span>
            <span>that work.</span>
          </h2>
          <p className="sequence-lede">
            We move between the visible surface and the system beneath it, keeping both parts in the room.
          </p>
        </div>

        <div className="territory-sequence">
          {capabilities.map((capability, index) => {
            const isVisible = visibleTerritories.includes(capability.variant);
            const isFocused = focusedTerritory === capability.variant;
            return (
              <article
                key={capability.variant}
                ref={(element) => {
                  territoryRefs.current[index] = element;
                }}
                className={`territory territory--${capability.variant}${
                  isVisible ? " is-visible" : ""
                }${isFocused ? " is-focused" : ""}`}
                data-variant={capability.variant}
                tabIndex={0}
                role="button"
                aria-pressed={isFocused}
                aria-label={`${capability.name}. Inspect studio material.`}
                onClick={() => toggleFocus(capability.variant)}
                onKeyDown={(event) => handleTerritoryKeyDown(event, capability.variant)}
              >
                <div className="territory-heading">
                  <div className="territory-index">
                    <span className="territory-index__mark" aria-hidden="true" />
                    <span>{capability.number}</span>
                    <span className="territory-index__total">/ 03</span>
                  </div>
                  <h3>{capability.name}</h3>
                </div>

                <div className="territory-material" aria-hidden="true">
                  <div className="material-track">
                    <div className="material-table" />
                    <div className="material-paper" />
                    <div className="material-draft" />
                    <div className="material-chip" />
                    <div className="material-crop">
                      <span />
                    </div>
                    <div className="material-shadow" />
                  </div>
                </div>

                <div className="territory-copy">
                  <p className="territory-description">{capability.description}</p>
                  <p className="territory-detail">{capability.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectScene({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.variant}`} aria-hidden="true">
      <div className="project-media-slot">
        <div className={`project-surface artwork artwork--${project.variant}`}>
          <div className="artwork-light" />
          {project.variant === "grill" && (
            <>
              <div className="grill-opening" />
              <div className="grill-table" />
              <div className="grill-chair grill-chair--left" />
              <div className="grill-chair grill-chair--right" />
              <div className="grill-glass" />
            </>
          )}
          {project.variant === "ai" && (
            <>
              <div className="ai-plane ai-plane--back" />
              <div className="ai-plane ai-plane--front" />
              <div className="ai-line ai-line--one" />
              <div className="ai-line ai-line--two" />
              <div className="ai-line ai-line--three" />
              <div className="ai-node ai-node--one" />
              <div className="ai-node ai-node--two" />
              <div className="ai-node ai-node--three" />
            </>
          )}
          {project.variant === "restaurant" && (
            <>
              <div className="os-paper" />
              <div className="os-frame" />
              <div className="os-rule os-rule--one" />
              <div className="os-rule os-rule--two" />
              <div className="os-block os-block--one" />
              <div className="os-block os-block--two" />
              <div className="os-shadow" />
            </>
          )}
        </div>
      </div>
      <div className="project-media-edge" />
      <span className="project-media-note">{project.sourceNote}</span>
    </div>
  );
}

function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [exhibitionShift, setExhibitionShift] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observedProjects = projectRefs.current.filter(
      (project): project is HTMLElement => project !== null,
    );

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisibleProjects(projects.map((project) => project.variant));
      return;
    }

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const variant = entry.target.getAttribute("data-project");
          if (variant) {
            setVisibleProjects((current) =>
              current.includes(variant) ? current : [...current, variant],
            );
          }
          projectObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );
    observedProjects.forEach((project) => projectObserver.observe(project));

    return () => projectObserver.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const updateExhibition = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      setExhibitionShift((progress - 0.5) * 28);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateExhibition);
    };

    updateExhibition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLElement>, variant: string) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setSelectedProject((current) => (current === variant ? null : variant));
  };

  const handleProjectMove = (event: MouseEvent<HTMLElement>) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.left = `${event.clientX}px`;
    cursorRef.current.style.top = `${event.clientY}px`;
  };

  const sectionStyle = { "--exhibition-shift": `${exhibitionShift.toFixed(2)}px` } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="selected-work"
      style={sectionStyle}
      aria-labelledby="work-title"
    >
      <div className="work-shell">
        <header className="work-head">
          <div className="work-kicker">
            <span className="work-kicker__dot" aria-hidden="true" />
            <span>03 / Selected Work</span>
          </div>
          <h2 id="work-title">A small exhibition.</h2>
          <p className="work-intro-copy">Three digital works, each with its own room, light, and pace.</p>
        </header>

        <div className="exhibit-list">
          {projects.map((project, index) => {
            const isVisible = visibleProjects.includes(project.variant);
            const isSelected = selectedProject === project.variant;
            return (
              <article
                key={project.variant}
                ref={(element) => {
                  projectRefs.current[index] = element;
                }}
                className={`project-exhibit project-exhibit--${project.variant}${
                  isVisible ? " is-visible" : ""
                }${isSelected ? " is-selected" : ""}`}
                data-project={project.variant}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`${project.title}. View project.`}
                onClick={() => setSelectedProject((current) => (current === project.variant ? null : project.variant))}
                onKeyDown={(event) => handleProjectKeyDown(event, project.variant)}
                onMouseEnter={() => setHoveredProject(project.variant)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={handleProjectMove}
              >
                <ProjectScene project={project} />
                <div className="project-meta">
                  <div className="project-number">
                    <span className="project-number__mark" aria-hidden="true" />
                    <span>{project.number}</span>
                    <span className="project-number__total">/ 03</span>
                  </div>
                  <p className="project-medium">Medium / {project.medium}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags" aria-label="Project disciplines">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p className="project-explore">
                    {isSelected ? "Selected / closer look" : "View project"}
                    <span aria-hidden="true">-&gt;</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="work-status" id="work-status" aria-live="polite">
          {selectedProject
            ? `${projects.find((project) => project.variant === selectedProject)?.title} selected for exploration.`
            : "Select an exhibit to explore it."}
        </p>
      </div>

      <div
        ref={cursorRef}
        className={`work-cursor${hoveredProject ? " is-visible" : ""}`}
        aria-hidden="true"
      >
        <span>View project</span>
      </div>
    </section>
  );
}

function SystemVisualization() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleRoomPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const room = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - room.left) / Math.max(1, room.width) - 0.5;
    const y = (event.clientY - room.top) / Math.max(1, room.height) - 0.5;
    setDrift({ x: x * 7, y: y * 4 });
  };

  const active = systemLayers.find((layer) => layer.name === activeLayer) ?? null;
  const sectionStyle = {
    "--system-drift-x": `${drift.x.toFixed(2)}px`,
    "--system-drift-y": `${drift.y.toFixed(2)}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="system"
      className={`system-visualization${entered ? " is-entered" : ""}${active ? " has-active" : ""}`}
      style={sectionStyle}
      aria-labelledby="system-title"
    >
      <div className="system-wrap">
        <header className="system-head">
          <div>
            <div className="system-kicker">
              <span className="system-kicker__mark" aria-hidden="true" />
              <span>04 / System</span>
            </div>
            <h2 id="system-title">The surface is only part of the machine.</h2>
          </div>
          <div className="system-head-note">
            <span>Inspection bay / assembly 04</span>
            <span>Five connected layers</span>
          </div>
        </header>

        <p className="system-intro">
          We design the visible thing, then stay with the mechanics that make it dependable.
        </p>

        <div
          className="system-room"
          onPointerMove={handleRoomPointerMove}
          onPointerLeave={() => setDrift({ x: 0, y: 0 })}
        >
          <div className="system-room-light" aria-hidden="true">
            <span className="system-room-light__fixture" />
            <span className="system-room-light__pool" />
          </div>
          <div className="system-room-wall" aria-hidden="true">
            <span className="system-wall-line system-wall-line--one" />
            <span className="system-wall-line system-wall-line--two" />
            <span className="system-wall-note">BUILDIFO / WORKBENCH 04</span>
          </div>
          <div className="system-bench" aria-hidden="true">
            <div className="system-bench-top" />
            <div className="system-bench-front" />
            <span className="system-bench-leg system-bench-leg--left" />
            <span className="system-bench-leg system-bench-leg--right" />
          </div>

          <div className="system-workzone">
            <div
              className={`system-stack${active ? " has-active" : ""}`}
              role="list"
              aria-label="Connected system layers"
            >
              {systemLayers.map((layer) => {
                const isActive = activeLayer === layer.name;
                return (
                  <div
                    key={layer.name}
                    className={`system-layer-shell${isActive ? " is-active" : ""}`}
                    role="listitem"
                  >
                    <button
                      type="button"
                      className="system-layer"
                      aria-pressed={isActive}
                      aria-describedby={`system-layer-${layer.number}`}
                      onClick={() => setActiveLayer(isActive ? null : layer.name)}
                    >
                      <span className="system-layer__index">
                        <span className="system-layer__pilot" aria-hidden="true" />
                        {layer.number}
                      </span>
                      <span className="system-layer__main">
                        <span className="system-layer__name">{layer.name}</span>
                        <span className="system-layer__material">{layer.material}</span>
                      </span>
                      <span className="system-layer__short">{layer.shortDescription}</span>
                      <span className="system-layer__state" aria-hidden="true">
                        {isActive ? "Inspecting" : "Standby"}
                      </span>
                      <span className="system-layer__hinge" aria-hidden="true" />
                    </button>
                    <span id={`system-layer-${layer.number}`} className="system-layer__mobile-detail">
                      {layer.description}
                    </span>
                  </div>
                );
              })}
            </div>

            <aside className="system-inspector" aria-live="polite" aria-label="Layer inspection">
              <div className="system-inspector__head">
                <span className="system-inspector__label">Layer inspection</span>
                <span className="system-inspector__status">
                  <span className="system-inspector__status-dot" aria-hidden="true" />
                  {active ? "Active" : "System ready"}
                </span>
              </div>
              {active ? (
                <div className="system-inspector__body">
                  <span className="system-inspector__number">{active.number} / 05</span>
                  <h3>{active.name}</h3>
                  <p>{active.description}</p>
                  <span className="system-inspector__rule" aria-hidden="true" />
                  <span className="system-inspector__foot">Human-readable / controlled / connected</span>
                </div>
              ) : (
                <p className="system-inspector__empty">Select a layer to inspect its role in the system.</p>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [hasPortrait, setHasPortrait] = useState(true);
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [lit, setLit] = useState(false);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleDeskPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const frame = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - frame.left) / Math.max(1, frame.width) - 0.5;
    const y = (event.clientY - frame.top) / Math.max(1, frame.height) - 0.5;
    setDrift({ x: x * 6, y: y * 4 });
  };

  const studioStyle = {
    "--studio-drift-x": `${drift.x.toFixed(2)}px`,
    "--studio-drift-y": `${drift.y.toFixed(2)}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="studio"
      className={`studio-section${entered ? " is-entered" : ""}${lit ? " is-lit" : ""}`}
      style={studioStyle}
      aria-labelledby="studio-title"
    >
      <div className="studio-wrap">
        <div className="studio-kicker">
          <span className="studio-kicker__mark" aria-hidden="true" />
          <span>05 / Studio</span>
        </div>

        <div className="studio-body">
          <figure className="studio-figure">
            <div
              className="studio-media"
              onPointerMove={handleDeskPointerMove}
              onPointerLeave={() => {
                setLit(false);
                setDrift({ x: 0, y: 0 });
              }}
              onPointerEnter={() => setLit(true)}
              onFocus={() => setLit(true)}
              onBlur={() => setLit(false)}
              tabIndex={0}
              aria-label="The Buildifo workspace in the evening, photographed at the desk."
            >
              <div className="studio-plate" aria-hidden="true">
                <div className="desk-wall" />
                <div className="desk-lamp">
                  <span className="desk-lamp__arm" />
                  <span className="desk-lamp__shade" />
                  <span className="desk-lamp__pool" />
                </div>
                <div className="desk-shelf" />
                <div className="desk-books">
                  <span className="desk-book desk-book--one" />
                  <span className="desk-book desk-book--two" />
                  <span className="desk-book desk-book--three" />
                </div>
                <div className="desk-surface" />
                <div className="desk-monitor">
                  <span className="desk-monitor__screen" />
                  <span className="desk-monitor__neck" />
                  <span className="desk-monitor__foot" />
                </div>
                <div className="desk-keyboard" />
                <div className="desk-print desk-print--one" />
                <div className="desk-print desk-print--two" />
                <div className="desk-notebook" />
                <div className="desk-cup">
                  <span className="desk-cup__ring" />
                </div>
                <div className="desk-pencil" />
                <div className="desk-grain" />
                <div className="desk-vignette" />
              </div>

              {hasPortrait && (
                <img
                  className={`studio-portrait${portraitLoaded ? " is-loaded" : ""}`}
                  src="/studio.webp"
                  alt="The Buildifo studio desk in the evening."
                  loading="lazy"
                  decoding="async"
                  onLoad={() => {
                    setPortraitLoaded(true);
                    setHasPortrait(true);
                  }}
                  onError={() => {
                    setPortraitLoaded(false);
                    setHasPortrait(false);
                  }}
                />
              )}
            </div>

            <figcaption className="studio-caption">
              <span>{hasPortrait ? "The desk, late" : "Studio photograph pending / studio.webp"}</span>
              <span className="studio-caption__meta">Warm lamp / one light source</span>
            </figcaption>
          </figure>

          <div className="studio-copy">
            <h2 id="studio-title">No account managers. No handoffs.</h2>
            <p>
              The people who design the work are the people who build it. That is the whole arrangement, and it
              is why the work holds together.
            </p>
            <p>
              A small studio, working close to the work — a real conversation before anything gets built, and
              the same hands on it afterwards.
            </p>
            <div className="studio-signature">
              <span className="studio-signature__rule" aria-hidden="true" />
              <span>Buildifo / worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ProcessStage = {
  index: string;
  title: "Look" | "Shape" | "Design" | "Engineer" | "Intelligence" | "Evolve";
  description: string;
  annotation: string;
  material: "tape" | "sketch" | "annotation" | "draft" | "stack" | "opening";
};

const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Look",
    description: "Before anything is proposed, we read the actual conditions: the work, the people, the constraint nobody wrote down.",
    annotation: "Field notes / first week",
    material: "tape",
  },
  {
    index: "02",
    title: "Shape",
    description: "Scope gets drawn and redrawn until it is honest. What is in, what is out, and what success will be measured by.",
    annotation: "Scope sheet / signed off",
    material: "annotation",
  },
  {
    index: "03",
    title: "Design",
    description: "The experience takes form on paper and in the browser at the same time, so nothing is designed that cannot be built.",
    annotation: "Rough layouts / type studies",
    material: "sketch",
  },
  {
    index: "04",
    title: "Engineer",
    description: "The real system gets written: data, logic, interfaces, and the deployment path that carries it safely into the world.",
    annotation: "Build / reviews / tests",
    material: "draft",
  },
  {
    index: "05",
    title: "Intelligence",
    description: "Automation is added only where it earns its keep, and always in a form a person can read, question, and override.",
    annotation: "Applied where it helps",
    material: "stack",
  },
  {
    index: "06",
    title: "Evolve",
    description: "After launch we stay in the room: measuring, adjusting, and extending what is already there rather than starting again.",
    annotation: "Ongoing / next season",
    material: "opening",
  },
];

function ProcessSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [distance, setDistance] = useState(0);
  const [shift, setShift] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const viewport = window.innerWidth;
      setDistance(Math.max(0, track.scrollWidth - viewport + 48));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const span = Math.max(1, rect.height - viewportHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      setShift(progress * distance);

      const focusLine = (window.innerWidth || 1) * 0.38;
      let nearest = 0;
      let nearestDelta = Number.POSITIVE_INFINITY;
      stageRefs.current.forEach((stage, position) => {
        if (!stage) return;
        const delta = Math.abs(stage.offsetLeft - shift - focusLine);
        if (delta < nearestDelta) {
          nearestDelta = delta;
          nearest = position;
        }
      });
      setFocusIndex(nearest);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [distance, reduced]);

  const handleWallPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const wall = event.currentTarget.getBoundingClientRect();
    setDrift(((event.clientX - wall.left) / Math.max(1, wall.width) - 0.5) * 8);
  };

  const activeIndex = hoverIndex ?? focusIndex;
  const sectionStyle = {
    "--wall-shift": `-${shift.toFixed(2)}px`,
    "--wall-drift": `${drift.toFixed(2)}px`,
    "--wall-progress": distance > 0 ? (shift / distance).toFixed(4) : "0",
    height: reduced ? undefined : `calc(100svh + ${Math.round(distance)}px)`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="approach"
      className={`process-sequence${entered ? " is-entered" : ""}${reduced ? " is-static" : ""}`}
      style={sectionStyle}
      aria-labelledby="approach-title"
    >
      <div className="process-sticky">
        <div className="process-wrap" onPointerMove={handleWallPointerMove} onPointerLeave={() => setDrift(0)}>
          <header className="process-head">
            <div className="process-kicker">
              <span className="process-kicker__mark" aria-hidden="true" />
              <span>06 / Approach</span>
            </div>
            <h2 id="approach-title">A method, not a template.</h2>
            <p className="process-head__note">
              Six stages, laid out along the wall. Keep scrolling and the wall keeps moving.
            </p>
            <div className="process-progress" aria-hidden="true">
              <span className="process-progress__rail" />
              <span className="process-progress__dot" />
            </div>
          </header>

          <div className="process-wall">
            <div className="process-track" ref={trackRef}>
              {processStages.map((stage, position) => {
                const isActive = activeIndex === position;
                return (
                  <article
                    key={stage.title}
                    ref={(element) => {
                      stageRefs.current[position] = element;
                    }}
                    className={`process-stage process-stage--${stage.index}${
                      isActive ? " is-active" : ""
                    }`}
                    onMouseEnter={() => setHoverIndex(position)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onFocus={() => setHoverIndex(position)}
                    onBlur={() => setHoverIndex(null)}
                    tabIndex={0}
                  >
                    <div className={`stage-sheet stage-sheet--${stage.material}`} aria-hidden="true">
                      {stage.material === "tape" && (
                        <>
                          <span className="sheet-tape sheet-tape--top" />
                          <span className="sheet-rule sheet-rule--one" />
                          <span className="sheet-rule sheet-rule--two" />
                          <span className="sheet-block" />
                        </>
                      )}
                      {stage.material === "annotation" && (
                        <>
                          <span className="sheet-margin" />
                          <span className="sheet-annotation">assumptions &rarr; questions</span>
                          <span className="sheet-rule sheet-rule--one" />
                          <span className="sheet-block sheet-block--narrow" />
                        </>
                      )}
                      {stage.material === "sketch" && (
                        <>
                          <span className="sheet-tape sheet-tape--corner" />
                          <span className="sheet-sketch sheet-sketch--one" />
                          <span className="sheet-sketch sheet-sketch--two" />
                          <span className="sheet-sketch sheet-sketch--three" />
                        </>
                      )}
                      {stage.material === "draft" && (
                        <>
                          <span className="sheet-grid" />
                          <span className="sheet-rule sheet-rule--one" />
                          <span className="sheet-rule sheet-rule--three" />
                          <span className="sheet-crosshair" />
                        </>
                      )}
                      {stage.material === "stack" && (
                        <>
                          <span className="sheet-underlay" />
                          <span className="sheet-node sheet-node--one" />
                          <span className="sheet-node sheet-node--two" />
                          <span className="sheet-node sheet-node--three" />
                          <span className="sheet-connector" />
                        </>
                      )}
                      {stage.material === "opening" && (
                        <>
                          <span className="sheet-open" />
                          <span className="sheet-rule sheet-rule--one" />
                          <span className="sheet-arrow">&rarr;</span>
                        </>
                      )}
                      <span className="stage-sheet__shadow" />
                    </div>

                    <div className="process-stage__text">
                      <span className="process-stage__index">
                        <span className="process-stage__signal" aria-hidden="true" />
                        {stage.index}
                        <span className="process-stage__total">/ 06</span>
                      </span>
                      <h3>{stage.title}</h3>
                      <p>{stage.description}</p>
                      <span className="process-stage__note">{stage.annotation}</span>
                    </div>
                  </article>
                );
              })}

              <div className="process-threshold" aria-hidden="true">
                <span className="process-threshold__seam" />
                <span className="process-threshold__label">Chapter 07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [approach, setApproach] = useState(0);
  const [camera, setCamera] = useState(0);
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [ctaNudge, setCtaNudge] = useState({ x: 0, y: 0 });
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced || !("IntersectionObserver" in window)) {
      setEntered(true);
      setApproach(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const span = Math.max(1, rect.height - viewport);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      setCamera(progress);

      const visible = Math.min(1, Math.max(0, (viewport - rect.top) / viewport));
      setApproach(visible);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const handleSectionPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5;
    const y = (event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5;
    setDrift({ x: x * 10, y: y * 6 });
  };

  const handleCtaPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5;
    const y = (event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5;
    setCtaNudge({ x: x * 5, y: y * 4 });
  };

  const sectionStyle = {
    "--cta-camera": camera.toFixed(4),
    "--cta-approach": approach.toFixed(4),
    "--cta-drift-x": `${drift.x.toFixed(2)}px`,
    "--cta-drift-y": `${drift.y.toFixed(2)}px`,
    "--cta-nudge-x": `${ctaNudge.x.toFixed(2)}px`,
    "--cta-nudge-y": `${ctaNudge.y.toFixed(2)}px`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className={`final-cta${entered ? " is-entered" : ""}${engaged ? " is-engaged" : ""}${
        reduced ? " is-static" : ""
      }`}
      style={sectionStyle}
      aria-labelledby="invitation-title"
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={() => setDrift({ x: 0, y: 0 })}
    >
      <div className="cta-viewport">
        {/* The environment: a concrete room with one open, lit threshold. */}
        <div className="cta-environment" aria-hidden="true">
          <div className="env-floor" />
          <div className="env-floor-seam env-floor-seam--one" />
          <div className="env-floor-seam env-floor-seam--two" />
          <div className="env-frame">
            <span className="env-frame__jamb env-frame__jamb--left" />
            <span className="env-frame__jamb env-frame__jamb--right" />
            <span className="env-frame__head" />
            <span className="env-frame__threshold" />
          </div>
          <div className="env-exterior">
            <span className="env-exterior__light" />
            <span className="env-exterior__air" />
            <span className="env-exterior__horizon" />
            <span className="env-exterior__distant" />
          </div>
          <div className="env-glass">
            <span className="env-glass__pane env-glass__pane--upper" />
            <span className="env-glass__pane env-glass__pane--lower" />
            <span className="env-glass__open" />
          </div>
          <div className="env-spill" />
          <div className="env-wall env-wall--left" />
          <div className="env-wall env-wall--right" />
        </div>

        <div className="cta-content">
          <div className="cta-kicker">
            <span className="cta-kicker__mark" aria-hidden="true" />
            <span>07 / Invitation</span>
          </div>

          <h2 className="cta-title" id="invitation-title">
            <span className="cta-line cta-line--one">Step</span>
            <span className="cta-line cta-line--two">outside</span>
            <span className="cta-line cta-line--three">with us.</span>
          </h2>

          <p className="cta-support">
            No forms, no funnels. One conversation about what you are actually trying to build.
          </p>

          <div className="cta-action">
            <a
              ref={ctaRef}
              className="cta-link"
              href="mailto:hello@buildifo.com"
              onPointerMove={handleCtaPointerMove}
              onPointerLeave={() => {
                setCtaNudge({ x: 0, y: 0 });
                setEngaged(false);
              }}
              onPointerEnter={() => setEngaged(true)}
              onFocus={() => setEngaged(true)}
              onBlur={() => setEngaged(false)}
            >
              <span className="cta-link__status" aria-hidden="true">
                <span className="cta-link__lamp" />
              </span>
              <span className="cta-link__text">Start a conversation</span>
              <span className="cta-link__arrow" aria-hidden="true">
                -&gt;
              </span>
              <span className="cta-link__rule" aria-hidden="true" />
            </a>
            <p className="cta-email">hello@buildifo.com</p>
          </div>
        </div>

        {/* Footer as exit signage, integrated into the room. */}
        <footer className="cta-exit">
          <div className="cta-exit__sign">
            <span className="cta-exit__lamp" aria-hidden="true" />
            <span>Exit</span>
            <span className="cta-exit__arrow" aria-hidden="true">
              -&gt;
            </span>
          </div>
          <div className="cta-exit__meta">
            <span className="cta-exit__brand">Buildifo</span>
            <span>Creative technology / worldwide</span>
            <span>&copy; 2026</span>
          </div>
          <div className="cta-exit__room">
            <span>Studio open / Mon&ndash;Fri</span>
            <span>Currently taking two builds</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <SiteChrome />
      <Arrival />
      <ServiceSequence />
      <SelectedWork />
      <SystemVisualization />
      <StudioSection />
      <ProcessSequence />
      <FinalCTA />
    </>
  );
}