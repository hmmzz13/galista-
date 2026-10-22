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
        <svg viewBox="0 0 64 64" className="h-9 w-9 opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
          <g transform="rotate(24 32 32)">
            <ellipse cx="32" cy="32" rx="15" ry="21" fill="#4B3026" opacity="0.85" />
            <path
              d="M32 12 C 26.5 20, 37.5 25, 32 32 C 26.5 39, 37.5 44, 32 52"
              stroke="#B78352"
              strokeWidth="3.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brun/75">{label}</p>
        {caption && <p className="text-[0.65rem] uppercase tracking-[0.18em] text-caramel-fonce">{caption}</p>}
      </div>
    </Comp>
  );
}
