# Playbook: Schema Rollout (SEO/AEO/GEO)

## Objective
Improve machine readability and answer extraction reliability through accurate, minimal structured data.

## Steps
1. Identify page intent type (article, faq, category, resource, profile).
2. Choose minimal schema set that truthfully matches visible content.
3. Ensure required fields are present and semantically accurate.
4. Validate schema output and check for conflicts/duplication.
5. Verify rendered content still matches schema claims after edits.

## Allowed-by-need guidance
- Article pages: `Article` + `BreadcrumbList`.
- FAQ sections: `FAQPage` only if real question-answer pairs are visible.
- Site-level: `WebSite`; author entity where consistently represented.

## Acceptance criteria
- Schema validates without critical errors.
- No schema type is present without matching visible content.
- No contradictory values between metadata and schema.

## Failure modes
- Stuffing multiple unrelated schema types into one page.
- FAQ schema for non-FAQ prose.
- Invalid date/entity fields causing noisy parse results.
