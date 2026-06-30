import { allSystems } from "content-collections";
import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Systems | Sans Serif Systems",
  description: "Explore operating systems, workflows, and tools built for natural language programming.",
  path: "/systems"
});

export default function SystemsIndexPage() {
  const schema = getWebPageSchema({
    title: "Systems | Sans Serif Systems",
    description: "Explore operating systems, workflows, and tools built for natural language programming.",
    path: "/systems"
  });

  return (
    <div className="flex flex-col gap-12 py-12 animate-on-scroll">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <section className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Systems
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-[640px]">
          Architectural patterns, operating systems, and functional structures designed to govern and inspect AI-assisted workflows.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSystems.map((system) => (
          <Link 
            key={system._meta.path} 
            href={`/systems/${system._meta.path}`}
            className="card-glass p-6 flex flex-col justify-between hover:bg-white/[0.03] transition-colors group"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest font-semibold">
                System Structure
              </span>
              <h2 className="font-heading text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                {system.title}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-3">
                {system.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {system.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] font-mono text-text-muted bg-white/[0.05] px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
