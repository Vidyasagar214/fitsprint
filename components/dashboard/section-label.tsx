/** Monospace section kicker — braces avoid JSX `//` comment lint false positives */
export function SectionLabel({ text }: { text: string }) {
  return <p className="font-mono text-xs font-medium tracking-wider text-primary">{text}</p>;
}
