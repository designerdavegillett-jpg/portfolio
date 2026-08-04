export type ThumbKind = "canvas" | "system" | "dark" | "neutral";

/**
 * Placeholder visuals. These are deliberately abstract — they hold the
 * layout's proportions and rhythm until real screenshots replace them.
 * Swap the <svg> for an <Image> when you have the assets; nothing else changes.
 */
export default function Thumb({
  kind = "neutral",
  tag,
}: {
  kind?: ThumbKind;
  tag?: string;
}) {
  return (
    <div className="thumb reveal" style={{ "--d": ".06s" } as React.CSSProperties}>
      {tag ? <span className="tag">{tag}</span> : null}
      <div className="inner">{VISUALS[kind]}</div>
    </div>
  );
}

const svgProps = {
  viewBox: "0 0 800 550",
  preserveAspectRatio: "xMidYMid slice",
  style: { width: "100%", height: "100%" },
  "aria-hidden": true,
} as const;

const VISUALS: Record<ThumbKind, React.ReactElement> = {
  canvas: (
    <svg {...svgProps}>
      <rect width="800" height="550" fill="#F2F0EB" />
      <rect x="70" y="55" width="660" height="440" rx="10" fill="#fff" stroke="rgba(20,20,20,.08)" />
      <rect x="70" y="55" width="660" height="34" rx="10" fill="#FBFAF8" />
      <circle cx="90" cy="72" r="4" fill="#DCD8D1" />
      <circle cx="104" cy="72" r="4" fill="#DCD8D1" />
      <circle cx="118" cy="72" r="4" fill="#DCD8D1" />
      <rect x="70" y="89" width="150" height="406" fill="#FBFAF8" />
      <g fill="#E4E0D9">
        <rect x="88" y="110" width="110" height="8" rx="4" />
        <rect x="88" y="130" width="86" height="8" rx="4" />
        <rect x="88" y="150" width="98" height="8" rx="4" />
        <rect x="88" y="170" width="72" height="8" rx="4" />
      </g>
      <rect x="88" y="205" width="114" height="70" rx="6" fill="#E9E5DE" />
      <rect x="88" y="285" width="114" height="70" rx="6" fill="#E9E5DE" />
      <rect x="250" y="120" width="320" height="200" rx="8" fill="#EDEAE3" stroke="rgba(20,20,20,.06)" />
      <rect x="270" y="140" width="130" height="90" rx="4" fill="#2B5F5A" opacity=".18" />
      <rect x="418" y="140" width="130" height="90" rx="4" fill="#2B5F5A" opacity=".1" />
      <g fill="#DAD5CD">
        <rect x="270" y="248" width="180" height="7" rx="3.5" />
        <rect x="270" y="264" width="130" height="7" rx="3.5" />
        <rect x="270" y="280" width="210" height="7" rx="3.5" />
      </g>
      <rect x="250" y="340" width="320" height="130" rx="8" fill="#F5F3EE" stroke="rgba(20,20,20,.05)" />
      <g fill="#E4E0D9">
        <rect x="270" y="360" width="80" height="60" rx="4" />
        <rect x="360" y="360" width="80" height="60" rx="4" />
        <rect x="450" y="360" width="80" height="60" rx="4" />
      </g>
      <rect x="600" y="120" width="112" height="350" rx="8" fill="#FBFAF8" stroke="rgba(20,20,20,.06)" />
      <g fill="#E4E0D9">
        <rect x="616" y="140" width="70" height="7" rx="3.5" />
        <rect x="616" y="158" width="80" height="7" rx="3.5" />
        <rect x="616" y="188" width="80" height="26" rx="4" />
        <rect x="616" y="224" width="80" height="26" rx="4" />
      </g>
      <rect x="616" y="430" width="80" height="24" rx="12" fill="#2B5F5A" opacity=".8" />
    </svg>
  ),

  system: (
    <svg {...svgProps}>
      <rect width="800" height="550" fill="#EFEDE7" />
      <g stroke="rgba(20,20,20,.10)" strokeWidth="1" fill="none">
        <path d="M400 275 L400 130 M400 275 L545 195 M400 275 L545 355 M400 275 L400 420 M400 275 L255 355 M400 275 L255 195" />
        <path d="M400 130 L545 195 L545 355 L400 420 L255 355 L255 195 Z" />
        <path d="M400 130 L640 90 M545 195 L700 250 M545 355 L680 430 M255 195 L120 130 M255 355 L110 400" />
      </g>
      <g fill="#FBFAF8" stroke="rgba(20,20,20,.12)">
        <circle cx="400" cy="130" r="26" />
        <circle cx="545" cy="195" r="26" />
        <circle cx="545" cy="355" r="26" />
        <circle cx="400" cy="420" r="26" />
        <circle cx="255" cy="355" r="26" />
        <circle cx="255" cy="195" r="26" />
      </g>
      <g fill="#2B5F5A" opacity=".55">
        <circle cx="640" cy="90" r="13" />
        <circle cx="700" cy="250" r="13" />
        <circle cx="680" cy="430" r="13" />
        <circle cx="120" cy="130" r="13" />
        <circle cx="110" cy="400" r="13" />
      </g>
      <circle cx="400" cy="275" r="42" fill="#141414" />
    </svg>
  ),

  dark: (
    <svg {...svgProps}>
      <rect width="800" height="550" fill="#17201F" />
      <rect x="90" y="70" width="620" height="410" rx="12" fill="#1E2A28" stroke="rgba(255,255,255,.08)" />
      <rect x="90" y="70" width="620" height="36" rx="12" fill="#233230" />
      <circle cx="112" cy="88" r="4" fill="rgba(255,255,255,.2)" />
      <circle cx="126" cy="88" r="4" fill="rgba(255,255,255,.2)" />
      <g fill="rgba(255,255,255,.12)">
        <rect x="120" y="140" width="300" height="9" rx="4.5" />
        <rect x="120" y="160" width="240" height="9" rx="4.5" />
      </g>
      <rect x="120" y="196" width="360" height="70" rx="10" fill="rgba(255,255,255,.06)" />
      <g fill="rgba(255,255,255,.14)">
        <rect x="140" y="216" width="220" height="8" rx="4" />
        <rect x="140" y="234" width="160" height="8" rx="4" />
      </g>
      <rect x="440" y="300" width="240" height="54" rx="10" fill="#4E9B92" opacity=".85" />
      <g fill="rgba(0,0,0,.35)">
        <rect x="458" y="320" width="150" height="7" rx="3.5" />
        <rect x="458" y="334" width="100" height="7" rx="3.5" />
      </g>
      <rect x="440" y="140" width="240" height="140" rx="10" fill="rgba(255,255,255,.07)" />
      <g fill="rgba(255,255,255,.13)">
        <rect x="460" y="162" width="90" height="70" rx="6" />
        <rect x="562" y="162" width="90" height="70" rx="6" />
        <rect x="460" y="244" width="192" height="7" rx="3.5" />
      </g>
      <rect x="120" y="410" width="560" height="42" rx="21" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.10)" />
      <rect x="142" y="427" width="180" height="8" rx="4" fill="rgba(255,255,255,.16)" />
      <circle cx="650" cy="431" r="14" fill="#4E9B92" />
    </svg>
  ),

  neutral: (
    <svg {...svgProps}>
      <rect width="800" height="550" fill="#F2F0EB" />
      <rect x="110" y="90" width="580" height="370" rx="10" fill="#FBFAF8" stroke="rgba(20,20,20,.07)" />
      <g fill="#E7E3DC">
        <rect x="150" y="130" width="220" height="10" rx="5" />
        <rect x="150" y="152" width="160" height="10" rx="5" />
      </g>
      <rect x="150" y="196" width="250" height="150" rx="8" fill="#EDEAE3" />
      <rect x="420" y="196" width="230" height="70" rx="8" fill="#EDEAE3" />
      <rect x="420" y="276" width="230" height="70" rx="8" fill="#2B5F5A" opacity=".14" />
      <g fill="#E7E3DC">
        <rect x="150" y="380" width="330" height="9" rx="4.5" />
        <rect x="150" y="400" width="260" height="9" rx="4.5" />
      </g>
    </svg>
  ),
};
