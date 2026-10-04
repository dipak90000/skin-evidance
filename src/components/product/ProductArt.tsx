import type { ProductForm } from "@/lib/products";

type LabelProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
};

/** Declared at module scope: defining it inside the component would recreate
    the type on every render and reset any state it held. */
function Label({ x, y, w, h, label, sub }: LabelProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#f7f5f1" />
      <text
        x={x + w / 2}
        y={y + h * 0.42}
        textAnchor="middle"
        fontSize={w * 0.145}
        letterSpacing={w * 0.012}
        fill="#15120e"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontWeight="400"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h * 0.68}
          textAnchor="middle"
          fontSize={w * 0.075}
          letterSpacing={w * 0.008}
          fill="#6b645c"
          fontFamily="var(--font-inter), Inter, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/**
 * Parametric product artwork.
 *
 * Each SKU is drawn as SVG rather than photographed: one shape system, five
 * silhouettes, and a tint per product line. It stays crisp at any size, weighs
 * nothing, and every new SKU is a row of data rather than a new asset.
 *
 * To swap in real photography later, give the product an `image` in the
 * catalogue — ProductImage falls back to this only when there is none.
 */
export default function ProductArt({
  form,
  tint = "#A8611C",
  cap = "#16130f",
  label = "SKIN EVIDANCE",
  sub,
  className = "",
}: {
  form: ProductForm;
  tint?: string;
  cap?: string;
  label?: string;
  sub?: string;
  className?: string;
}) {
  const uid = `${form}-${tint}`.replace(/[^a-z0-9]/gi, "");
  const glass = `glass-${uid}`;
  const sheen = `sheen-${uid}`;
  const capG = `cap-${uid}`;

  const defs = (
    <defs>
      <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={tint} stopOpacity="0.95" />
        <stop offset="18%" stopColor="#fff" stopOpacity="0.38" />
        <stop offset="38%" stopColor={tint} stopOpacity="0.98" />
        <stop offset="78%" stopColor={tint} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#2b1b08" stopOpacity="0.72" />
      </linearGradient>
      <linearGradient id={capG} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={cap} />
        <stop offset="16%" stopColor="#6d6a65" />
        <stop offset="34%" stopColor={cap} />
        <stop offset="82%" stopColor={cap} />
        <stop offset="100%" stopColor="#000" />
      </linearGradient>
      <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  const shadow = (
    <ellipse cx="100" cy="286" rx="52" ry="6" fill="#000" opacity="0.14" />
  );

  const shapes: Record<ProductForm, React.ReactNode> = {
    dropper: (
      <>
        <rect x="88" y="26" width="24" height="52" rx="5" fill={`url(#${capG})`} />
        <rect x="83" y="72" width="34" height="20" rx="3" fill={`url(#${capG})`} />
        <rect x="68" y="92" width="64" height="188" rx="12" fill={`url(#${glass})`} />
        <rect x="74" y="98" width="10" height="70" rx="5" fill={`url(#${sheen})`} />
        <Label x={72} y={160} w={56} h={88} label={label} sub={sub} />
      </>
    ),
    bottle: (
      <>
        <rect x="80" y="30" width="40" height="34" rx="4" fill={`url(#${capG})`} />
        <rect x="86" y="62" width="28" height="14" fill={`url(#${glass})`} />
        <path
          d="M70 96c0-12 16-14 16-22h28c0 8 16 10 16 22v172a12 12 0 0 1-12 12H82a12 12 0 0 1-12-12Z"
          fill={`url(#${glass})`}
        />
        <rect x="76" y="104" width="11" height="76" rx="5" fill={`url(#${sheen})`} />
        <Label x={74} y={150} w={52} h={92} label={label} sub={sub} />
      </>
    ),
    pump: (
      <>
        <rect x="92" y="14" width="30" height="11" rx="5" fill={`url(#${capG})`} />
        <rect x="96" y="25" width="9" height="26" fill={`url(#${capG})`} />
        <rect x="84" y="51" width="32" height="20" rx="4" fill={`url(#${capG})`} />
        <rect x="68" y="71" width="64" height="209" rx="14" fill={`url(#${glass})`} />
        <rect x="75" y="80" width="11" height="80" rx="5" fill={`url(#${sheen})`} />
        <Label x={73} y={148} w={54} h={96} label={label} sub={sub} />
      </>
    ),
    tube: (
      <>
        <path
          d="M74 62h52l10 190a16 16 0 0 1-16 18H80a16 16 0 0 1-16-18Z"
          fill={`url(#${glass})`}
        />
        <rect x="72" y="36" width="56" height="28" rx="5" fill={`url(#${capG})`} />
        <rect x="80" y="74" width="10" height="64" rx="5" fill={`url(#${sheen})`} />
        <Label x={74} y={140} w={52} h={92} label={label} sub={sub} />
      </>
    ),
    jar: (
      <>
        <rect x="56" y="104" width="88" height="22" rx="4" fill={`url(#${capG})`} />
        <rect x="60" y="78" width="80" height="28" rx="8" fill={`url(#${capG})`} />
        <path
          d="M58 126h84v126a14 14 0 0 1-14 14H72a14 14 0 0 1-14-14Z"
          fill={`url(#${glass})`}
        />
        <rect x="66" y="134" width="12" height="54" rx="6" fill={`url(#${sheen})`} />
        <Label x={68} y={178} w={64} h={68} label={label} sub={sub} />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      role="img"
      aria-label={`${label} ${form}`}
    >
      {defs}
      {shadow}
      {shapes[form]}
    </svg>
  );
}
