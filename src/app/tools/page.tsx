import SpotlightCard from "../../components/SpotlightCard";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const HERO_LINES = [
  "I wrote programs in string and pegs, and the little theatre moved itself. No electricity required.",
  "A door that opens on its own is only a sequence of causes, patiently arranged.",
  "They called it magic. I called it a list of steps that happened to be brass.",
  "Give a machine one clear instruction and it will repeat it forever, faithfully, stupidly.",
  "I automated the temple so the priests could seem divine. The oldest use of a good demo.",
];

export const metadata = constructMetadata({
  title: "ToolSmith Playgrounds",
  description: "Stateless, browser-native utilities for anyone who builds with intent. Structure context, evaluate loops, and compile workflow blueprints.",
  path: "/tools"
});

export default function ToolsIndexPage() {
  const schema = getWebPageSchema({
    title: "ToolSmith Playgrounds | Sans Serif Systems",
    description: "Stateless, browser-native utilities for anyone who builds with intent. Structure context, evaluate loops, and compile workflow blueprints.",
    path: "/tools"
  });

  const toolItems = [
    {
      title: "Secret Shape Scanner",
      description: "Detect secrets by shape, not just by key name, and redact them in place. A browser preview of the Tessera config pack.",
      path: "/tools/secret-scanner",
      status: "Live · Tessera",
      accent: "var(--accent-green)"
    },
    {
      title: "Dockerfile Hygiene",
      description: "Flag unpinned base images, root users, secrets baked into layers, and missing healthchecks. Preview of the Tessera dockerfile pack.",
      path: "/tools/dockerfile-hygiene",
      status: "Live · Tessera",
      accent: "var(--accent-cyan)"
    },
    {
      title: "SQL Migration Safety",
      description: "Catch DELETE and UPDATE without WHERE, DROP without IF EXISTS, and unsafe NOT NULL columns. Preview of the Tessera sql pack.",
      path: "/tools/sql-safety",
      status: "Live · Tessera",
      accent: "var(--accent-amber)"
    },
    {
      title: "GitHub Actions Linter",
      description: "Find the pull_request_target RCE combo, unpinned actions, write-all tokens, and script injection. Preview of the Tessera gha pack.",
      path: "/tools/gha-lint",
      status: "Live · Tessera",
      accent: "var(--accent-purple)"
    },
    {
      title: "JSON Schema Lint",
      description: "Catch required keys missing from properties, open objects, and untyped fields. Preview of the Tessera schema pack.",
      path: "/tools/json-schema-lint",
      status: "Live · Tessera",
      accent: "var(--accent-blue)"
    },
    {
      title: "Markdown Link Checker",
      description: "Verify in-page anchors against real headings; inventory external links without fetching. Preview of the Tessera links pack.",
      path: "/tools/markdown-links",
      status: "Live · Tessera",
      accent: "var(--accent-cyan)"
    },
    {
      title: "TODO Triage",
      description: "Turn TODO, FIXME, HACK, and XXX markers into an owner-grouped backlog. Preview of the Tessera todo pack.",
      path: "/tools/todo-triage",
      status: "Live · Tessera",
      accent: "var(--accent-amber)"
    },
    {
      title: "Commits to Changelog",
      description: "Compile Conventional Commits into a grouped CHANGELOG.md with breaking changes on top. Preview of the Tessera changelog pack.",
      path: "/tools/changelog",
      status: "Live · Tessera",
      accent: "var(--accent-green)"
    },
    {
      title: "Prompt ➔ JSON Schema",
      description: "Convert raw prose specifications into typed, structured output JSON schemas and matching examples.",
      path: "/tools/prompt-to-json",
      status: "Live Demo",
      accent: "var(--accent-cyan)"
    },
    {
      title: "Change ➔ HITL Checklist",
      description: "Analyze codebase modifications to estimate risks, touchpoints, and output review check checklists.",
      path: "/tools/change-to-checklist",
      status: "Local Prototype",
      accent: "var(--accent-purple)"
    },
    {
      title: "CSV ➔ Eval Dataset",
      description: "Convert tabular query-response CSV outputs into RAG assertion evaluation packets.",
      path: "/tools/csv-to-eval",
      status: "Local Prototype",
      accent: "var(--accent-amber)"
    },
    {
      title: "Notes ➔ PDF Brief",
      description: "Format messy chat history or your stream of thought into structured briefs for printing.",
      path: "/tools/notes-to-brief",
      status: "Local Prototype",
      accent: "var(--accent-pink)"
    },
    {
      title: "Repo ➔ Context Pack",
      description: "Aggregate multi-file configurations and source blocks into structured XML contexts.",
      path: "/tools/repo-context-pack",
      status: "Local Prototype",
      accent: "var(--accent-cyan)"
    },
    {
      title: "Workflow ➔ Diagram",
      description: "Compile transition actions and process steps into dynamically rendered Mermaid flowcharts.",
      path: "/tools/workflow-to-diagram",
      status: "Live Demo",
      accent: "var(--accent-purple)"
    }
  ];

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Hero of Alexandria, who programmed in brass */}
      <PlateHero
        eyebrow="Browser-Native Utilities"
        title="Stack"
        intro="The stack I reach for: stateless, browser-native utilities to design schemas, audit changes, package directories, and compile flowcharts offline. Lean on the plate and Hero of Alexandria will explain the oldest automation trick in the book."
        htmlSrc="/scenes/character.html?img=/images/characters/hero-of-alexandria-automata.jpg&fallback=/scenes/hero.html"
        alt="Oil painting of Hero of Alexandria in a workshop of brass automata with a self-moving cart and a pegged program drum"
        plateLabel="Plate · hero_automata"
        caption="He programmed in string and pegs."
        attribution="Hero of Alexandria"
        quotes={HERO_LINES}
        accent="var(--accent-cyan)"
      />

      <SceneFigure
        src="/scenes/hero.html"
        label="Figure · hero_automata"
        accent="var(--accent-cyan)"
        caption="A program written in gears, pegs, and string. Wind the drum, and the little cart moves itself along its track. The oldest automation there is, running on nothing but patience and brass."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolItems.map((tool, idx) => (
          <SpotlightCard key={idx} href={tool.path} accent={tool.accent} className="gap-5 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  MODULE // 0{idx + 1}
                </span>
                <span
                  className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-semibold uppercase"
                  style={{ color: "var(--text-secondary)", background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", border: "1px solid var(--card-border)" }}
                >
                  {tool.status}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {tool.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tool.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-4 mt-2" style={{ borderColor: "var(--card-border)" }}>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-green)" }}></span>
                <span className="text-[9px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>100% Client-Side</span>
              </div>
              <span
                className="text-xs font-semibold inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                style={{ color: tool.accent }}
              >
                Launch Console ➔
              </span>
            </div>
          </SpotlightCard>
        ))}
      </section>
    </div>
  );
}
