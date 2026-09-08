export function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-diamond">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {desc && <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">{desc}</p>}
    </div>
  );
}
