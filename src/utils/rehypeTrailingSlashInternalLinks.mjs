export default function rehypeTrailingSlashInternalLinks() {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;

      if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href);
        const isInternalPath = href.startsWith('/') && !href.startsWith('//');
        const hasQueryOrHash = href.includes('?') || href.includes('#');
        const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(href);
        if (isInternalPath && !hasQueryOrHash && !hasFileExtension && !href.endsWith('/')) {
          node.properties.href = `${href}/`;
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    };

    walk(tree);
  };
}
