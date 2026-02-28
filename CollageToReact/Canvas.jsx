export default function Canvas({
  width,
  height,
  layoutKey,
  layout,
}) {
  return (
    <div className="workspace">
      <div
        className="the-canvas"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div className="the-grid">
          <p>
            Coming Soon! {layoutKey} ({layout.rows}x{layout.columns})
          </p>
        </div>
      </div>
    </div>
  );
}