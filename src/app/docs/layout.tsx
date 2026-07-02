import DocsSidebar from "../../components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      {/* Background Glow Blobs */}

      {/* Grid container with sidebar and content */}
      <div className="flex flex-col md:flex-row gap-8 max-w-[1100px] mx-auto py-12">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0">
          <DocsSidebar />
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
