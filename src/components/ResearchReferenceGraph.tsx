type ResearchItem = { id: string; title: string; source: string; topic?: string; tags?: string[] };

const positions = [
  { x: 50, y: 11 },
  { x: 84, y: 51 },
  { x: 50, y: 89 },
  { x: 16, y: 51 },
];

/** A navigable topic map. Edges imply demo topic relationships, not citations. */
export function ResearchReferenceGraph({
  items,
  selectedId,
  onSelect,
}: {
  items: ResearchItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  if (!selected) return null;
  const neighbors = items.filter((item) => item.id !== selected.id).slice(0, 4);
  return (
    <section className="reference-graph" aria-label="Conceptual research reference graph">
      <div className="reference-graph-heading">
        <span>CONCEPT MAP <small>RELATED TOPICS</small></span>
        <span>DEMO</span>
      </div>
      <div className="reference-graph-canvas">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {neighbors.map((item, index) => {
            const point = positions[index];
            return <path key={item.id} d={`M 50 50 Q ${(50 + point.x) / 2} ${(50 + point.y) / 2 - 5} ${point.x} ${point.y}`} />;
          })}
        </svg>
        <div className="reference-graph-center" title={selected.title}>
          <small>ACTIVE PAPER</small>
          <b>{selected.topic ?? selected.tags?.[0] ?? selected.source}</b>
        </div>
        {neighbors.map((item, index) => {
          const point = positions[index];
          return (
            <button
              className="reference-graph-node"
              key={item.id}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => onSelect(item.id)}
              title={`Open ${item.title}`}
            >
              <small>{item.source}</small>
              <b>{item.topic ?? item.tags?.[0] ?? item.title}</b>
            </button>
          );
        })}
      </div>
      <p>Related topics are exploratory links, not verified citation edges.</p>
    </section>
  );
}
