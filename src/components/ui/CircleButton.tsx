import Link from "next/link";

/**
 * The reference's pill action: a dark disc holding an arrow, with the label
 * beside it. On hover the disc's fill collapses to reveal the outlined ring
 * and the arrow slides out to the right while a second one slides in behind
 * it, so the motion reads as continuous travel rather than a swap.
 */
export default function CircleButton({
  href,
  label,
  theme = "dark",
  className = "",
}: {
  href: string;
  label: string;
  theme?: "dark" | "light";
  className?: string;
}) {
  const dark = theme === "dark";
  const ring = dark ? "border-ink" : "border-paper";
  const fill = dark ? "bg-ink" : "bg-paper";
  const onFill = dark ? "text-paper" : "text-ink";
  const onPage = dark ? "text-ink" : "text-paper";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 ${className}`}
    >
      <span
        className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border ${ring}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full ${fill} transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-0`}
        />
        <span className="relative block h-4 w-6 overflow-hidden">
          <svg
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 h-4 w-6 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${onFill} group-hover:translate-x-8 group-hover:opacity-0`}
          >
            <path d="M1 8h21M16 2l6 6-6 6" />
          </svg>
          <svg
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 h-4 w-6 -translate-x-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${onPage} group-hover:translate-x-0 group-hover:opacity-100`}
          >
            <path d="M1 8h21M16 2l6 6-6 6" />
          </svg>
        </span>
      </span>
      <span className={`text-[17px] ${onPage}`}>{label}</span>
    </Link>
  );
}
