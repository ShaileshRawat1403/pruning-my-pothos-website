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

## Content + collections
- Content lives in `src/content/*`; keep schema in `src/content/config.ts` in sync.
- Tags are first-class: update tags in content files and show tag chips consistently.
- Avoid duplicate content files; keep only the fuller version.

## Navigation + interlinking
- End-of-article "Continue" block should stay consistent across types.
- Keep links succinct; avoid long URLs in body text.
- Do not introduce new nav items without updating all pages.

## Safety checks (before pushing)
- Check these pages: home, a systems doc, sentences doc, sticky note, self, shelf.
- Verify mobile layout for any layout changes.
- Ensure `site.zip` stays out of git (already in `.gitignore`).

## Editing style
- Use ASCII by default.
- Keep styles scoped and reusable; avoid one-off hacks.
