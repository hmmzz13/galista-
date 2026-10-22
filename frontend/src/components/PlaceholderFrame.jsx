export default function PlaceholderFrame({ label, caption, ratio = "aspect-[4/3]", className = "", onClick, testid }) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      data-testid={testid}
      aria-label={onClick ? `${label} — agrandir` : label}
      className={`photo-frame group ${ratio} w-full text-left ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <svg viewBox="0 0 64 64" className="h-9 w-9 opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" aria-hidden="true">
          <g fill="none" stroke="#2F8B89" strokeWidth="2.6" strokeLinecap="round">
            <path d="M27 7 c-2.5 3.5 2.5 5.5 0 9" />
            <path d="M35 7 c-2.5 3.5 2.5 5.5 0 9" />
          </g>
          <path d="M13 27 h36 v6 a13 13 0 0 1 -13 13 h-10 a13 13 0 0 1 -13 -13 z" fill="#2F8B89" />
          <path d="M49 29 h3.5 a6 6 0 0 1 0 12 h-5" fill="none" stroke="#2F8B89" strokeWidth="2.6" />
          <path d="M19 31 h24" stroke="#E8D8B8" strokeWidth="2" opacity="0.85" />
          <ellipse cx="31" cy="53" rx="19" ry="3.4" fill="#2F8B89" opacity="0.75" />
        </svg>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brun/75">{label}</p>
        {caption && (
          <p className="text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--iznik-fonce)" }}>
            {caption}
          </p>
        )}
      </div>
    </Comp>
  );
}
