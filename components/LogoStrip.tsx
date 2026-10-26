/* "Previous Work" strip in the home hero: a slow, endless scroll of company
   marks. Logos live in public/logos/. An entry without a src shows its name
   as a wordmark until the logo file arrives. */
const LOGOS: { name: string; src?: string; h?: number }[] = [
  { name: "Efficiently" },
  { name: "Passport Unlimited" },
  { name: "Own the Script" },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="logo-row" aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <li key={l.name}>
          {l.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={l.src} alt={hidden ? "" : l.name} style={{ height: `${l.h ?? 1.6}rem` }} />
          ) : (
            <span className="logo-word">{l.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="logo-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
