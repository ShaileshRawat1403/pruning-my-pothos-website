# AGENTS.md

Instructions for CLI agents working in this repo.

## Theme + UX intent
- Maintain the editorial, reading-first feel: calm, minimal, text-led.
- Keep navigation subtle and avoid heavy UI or dense sidebars.
- Prefer small, intentional enhancements over sweeping layout changes.

## Layout consistency rules
- Do not change global layout widths/margins unless explicitly requested.
- Use the shared `section-head` pattern for section pages.
- Drop caps only apply to `.lead` paragraphs. Add `.lead` on the intended line.
- Avoid inline styles inside Markdown; use classes and scoped CSS.
- Tables must never clip text or force per-letter wrapping; prefer horizontal scroll.
- For any data table, use `comparison-table` and ensure it can scroll on overflow (desktop + mobile).
- When tables can exceed content width, wrap them in a `table-scroll-wrap` container (or equivalent auto-wrap behavior) so they scroll inside the content column and never overlap TOC/sidebar.
- Do not change nav structure, hero layout, or footer layout without explicit approval.
- Avoid typography changes (fonts, sizes, line-heights) unless requested.
- Keep card content alignment consistent across the site; use uniform spacing and alignment patterns so card sections line up.
- Keep sample docs chronological and coherent; introduce setup before usage, and avoid calling out prerequisites later.

## Content + collections
- Content lives in `src/content/*`; keep schema in `src/content/config.ts` in sync.
- Tags are first-class: update tags in content files and show tag chips consistently.
- Avoid duplicate content files; keep only the fuller version.
- Do not rename or delete existing content files or slugs without explicit approval.
- Do not change `category` enums; only use: `Explanations`, `Concepts`, `How-things-fit-together`.
- When adding new docs, follow the existing frontmatter keys and order.

## External agent guardrails (Gemini, etc.)
- Only edit files in `src/content/sentences/`.
- Do not edit `sentences-001-foundations.md` or `confidence-is-cheap.md`.
- Do not change layouts, components, styles, or `src/content/config.ts`.
- Do not rename, move, or delete files.
- Keep frontmatter exactly: `title`, `summary`, `category`, `tags`.
- `category` must be one of: `Attention`, `Meaning`, `Judgment`.
- Markdown only (no MDX, no HTML tags, no inline SVG).
- No inline CSS, no `<style>`, no `<script>`.
- No code blocks or tables in sentences docs.

## Sentences doc standards
- Short, reflective, plain language; 2–5 short paragraphs.
- One idea per doc; avoid lists unless essential.
- Keep the tone calm and precise; no hype, no emojis.
- End with a short "What this changes in practice" line.

## Sticky notes rules (do not violate)
- Sticky notes are micro‑notes (3–5 short lines) with enough juice to explain intent.
- Do not import assets or components in sticky notes (no `import`, no `<Image>`, no inline SVG).
- Frontmatter allowed: `title`, `rotation`, `color`, optional `tags`. No other fields.
- Keep the tone minimal; avoid blockquotes, headings, figures, or links.
 
## Sticky notes section instructions
- Keep the masonry column layout in `src/pages/sticky-notes.astro`; avoid fixed heights or hard truncation.
- Notes should render Markdown via `note.Content` with `note-title` and `note-body` wrappers.
- Preserve wrapping (`overflow-wrap`) and prevent note splitting (`break-inside: avoid`).
- New notes should use `color: 'var(--color-sticky-*)'` and modest `rotation` (roughly -3 to 3).

## Self section guidelines
- Use a short lead line with `<p class="lead">` at the top of each entry.
- Aim for 3–5 compact paragraphs; keep tone reflective, calm, and concrete.
- Use sparse `<span class="highlight">` emphasis on key phrases (1–3 per doc).
- Keep frontmatter order: `title`, `description`, `publishDate`, `tags`, optional metadata fields.
- Include a small inline SVG diagram inside `<figure class="content-figure">` with a short figcaption; keep it responsive (no inline styles).

## Shelf (music) guidelines
- Music entries live in `src/content/shelf/music/` and must keep frontmatter order.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`.
- Optional metadata fields: `artist`, `album`, `year`, `coverUrl`, `appleMusicUrl`.
- Use the metadata fetch script for enrichment: `npm run shelf:music:fetch`.

## Shelf (tools) guidelines
- Tool entries live in `src/content/shelf/tools/`.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`.
- Each entry covers a single tool only (no mixed notes).
- Include sections: Benefits, Prerequisites, Quick snippets, Resources, Where it fails.
- Links should be short and descriptive (avoid raw URLs in body text).
- Use a unique cover image per entry (no repeated placeholders).

## Shelf (notes) guidelines
- Notes entries live in `src/content/shelf/notes/`.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`.
- Each entry is notes-only (no tool reviews).
- Keep tone reflective and compact (3–5 short paragraphs).
- Use a unique cover image per entry (no repeated placeholders).

## Shelf (philosophy) guidelines
- Philosophy entries live in `src/content/shelf/philosophy/`.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`.
- Tone: reflective, calm, personal; 2–4 short paragraphs.
- Include a brief line on the source or event that shaped the belief.
- Use a unique cover image per entry (no repeated placeholders).

## Shelf (local experiments) guidelines
- Local experiment entries live in `src/content/shelf/local-experiments/`.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`, `coverUrl`.
- Tone: story-led technical writing; teach the architecture, not just steps.
- Use a **Key takeaways** blockquote near the top.
- Use the Systems-style TOC pattern with Acts (`details` + headings) and `#toc-anchor`.
- Prefer conceptual diagrams (inline SVG in `<figure class="diagram">`) over UI screenshots.
- Screenshots are allowed only when user-supplied; store them under `public/images/screenshots` and include a brief caption noting UI may change.
- Use concise, repeatable sections: What happened, The two gates, Setup walkthrough (or Portal walkthrough), First-time config, Quick checks, Failure modes, What made the difference, What I would do next time.
- Keep code blocks short and purpose-driven; include a quick verification loop.
- Links should be short and descriptive (avoid raw URLs in body text).
- Use a unique cover image per entry (no repeated placeholders).

## Shelf (shared resources) guidelines
- Shared resource entries live in `src/content/shelf/shared-resources/`.
- Required frontmatter: `title`, `description`, `publishDate`, `tags`, `coverUrl`.
- Optional metadata fields: `pdfUrl`, `videoUrl`, `resourceHighlights`.
- For PDF resources, use `pdfUrl` so the shared `ResourcePdf` experience renders on detail pages.
- For video resources, use `videoUrl` with short context links in the body.
- Keep body links short and descriptive; avoid raw URLs in prose.
- Include 2-3 related internal links per entry to keep cross-navigation strong.

## Shelf resource cover style (mandatory)
- Store resource covers in `public/covers/shelf/` and use stable, slug-like names.
- Use unique editorial SVG covers; do not reuse generic placeholders.
- Keep a calm, intentional visual language: limited palette, one focal motif, and clear title hierarchy.
- Cover text should be short and readable at card size (title line + subtitle line max).
- Prefer abstract/system motifs (nodes, flows, blocks, signals) over literal screenshots.
- Avoid visual noise: no dense textures, no heavy gradients, no overly decorative effects.
- Every new shared resource must include a new cover following `docs/style-guides/shelf-resource-cover-style.md`.

## Systems doc standards (match Systems 001)
- Use plain‑text `description` in frontmatter (no HTML).
- Keep the 3‑act structure with clear section headers and a short lead.
- Include a **Key takeaways** blockquote near the top of every systems doc.
- Use the shared 3‑act TOC pattern (details + Act headings).
- Tables should use the `comparison-table` class so grid lines render.
- Systems tables must stay readable: no clipped cells; allow horizontal scrolling when width is tight.
- Systems pages with sticky TOC must keep tables constrained to main content: scrolling should happen in-content, not under the sidebar.
- Diagrams, when needed, should be small inline SVGs in the body (no external assets).
- Do not add inline CSS or `<script>` inside MDX.
- Do not use HTML comments (`<!-- -->`) inside MDX; use `{/* ... */}` if needed.
- Systems docs are MDX (`.mdx`) so inline SVG/HTML renders correctly.

## Navigation + interlinking
- End-of-article "Continue" block should stay consistent across types.
- Keep links succinct; avoid long URLs in body text.
- Do not introduce new nav items without updating all pages.
- No new interactive UI patterns (modals, drawers, search behavior) without approval.

## Resource embeds
- For shelf presentation/resource entries with PDFs, use the shared `ResourcePdf` component on detail pages.
- Keep embeds optional/expandable (preview behind a disclosure) and always include open/download actions.
- Keep the embed container calm and editorial (bordered, rounded, no heavy viewer chrome by default).

## Safety checks (before pushing)
- Check these pages: home, a systems doc, sentences doc, sticky note, self, shelf.
- Verify mobile layout for any layout changes.
- Ensure `site.zip` stays out of git (already in `.gitignore`).
- Restart the dev server after content schema or MDX changes.

## Agent handoff memory protocol
- Maintain `docs/agent-handoff/current.md` as the active handoff state for future agents.
- Update it whenever major changes are made to: IA/navigation, SEO metadata/schema, content model/schema, or visual system rules.
- Every handoff update must include: date, summary of changes, affected files, decisions made, open risks, and next suggested actions.
- Keep entries concise and factual; avoid speculative notes that cannot be verified in-repo.
- When starting new work, read `docs/agent-handoff/current.md` first to preserve continuity.
- Do not store secrets, credentials, or private tokens in handoff files.

## Editing style
- Use ASCII by default.
- Keep styles scoped and reusable; avoid one-off hacks.
