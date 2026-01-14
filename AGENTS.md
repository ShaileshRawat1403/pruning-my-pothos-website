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
- Do not change nav structure, hero layout, or footer layout without explicit approval.
- Avoid typography changes (fonts, sizes, line-heights) unless requested.

## Content + collections
- Content lives in `src/content/*`; keep schema in `src/content/config.ts` in sync.
- Tags are first-class: update tags in content files and show tag chips consistently.
- Avoid duplicate content files; keep only the fuller version.
- Do not rename or delete existing content files or slugs without explicit approval.
- Do not change `category` enums; only use: `Explanations`, `Concepts`, `How-things-fit-together`.
- When adding new docs, follow the existing frontmatter keys and order.

## Sticky notes rules (do not violate)
- Sticky notes are micro‑notes (1–3 short lines). No essays.
- Do not import assets or components in sticky notes (no `import`, no `<Image>`, no inline SVG).
- Frontmatter allowed: `title`, `rotation`, `color`, optional `tags`. No other fields.
- Keep the tone minimal; avoid blockquotes, headings, figures, or links.

## Systems doc standards (match Systems 001)
- Use plain‑text `description` in frontmatter (no HTML).
- Keep the 3‑act structure with clear section headers and a short lead.
- Tables should use the `comparison-table` class so grid lines render.
- Diagrams, when needed, should be small inline SVGs in the body (no external assets).
- Do not add inline CSS or `<script>` inside MDX.
- Do not use HTML comments (`<!-- -->`) inside MDX; use `{/* ... */}` if needed.
- Systems docs are MDX (`.mdx`) so inline SVG/HTML renders correctly.

## Navigation + interlinking
- End-of-article "Continue" block should stay consistent across types.
- Keep links succinct; avoid long URLs in body text.
- Do not introduce new nav items without updating all pages.
- No new interactive UI patterns (modals, drawers, search behavior) without approval.

## Safety checks (before pushing)
- Check these pages: home, a systems doc, sentences doc, sticky note, self, shelf.
- Verify mobile layout for any layout changes.
- Ensure `site.zip` stays out of git (already in `.gitignore`).
- Restart the dev server after content schema or MDX changes.

## Editing style
- Use ASCII by default.
- Keep styles scoped and reusable; avoid one-off hacks.
