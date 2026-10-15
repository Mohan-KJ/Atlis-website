import { readFileSync } from "node:fs";
const files = ["client/src/pages/Home.tsx", "client/src/pages/Product.tsx", "client/src/pages/Pilot.tsx", "client/src/pages/ContentPage.tsx", "client/src/components/SiteShell.tsx"];
const forbidden = ["JavaScript", "reduced motion", "Home story", "Product page", "Status to be confirmed", "[CONFIRM", "TODO", "lorem", "placeholder"];
const failures = [];
for (const file of files) {
  const text = readFileSync(file, "utf8").replace(/<[^>]+>/g, " ");
  for (const term of forbidden) if (text.toLowerCase().includes(term.toLowerCase())) failures.push(`${file}: ${term}`);
}
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Rendered-copy check passed: ${files.length} live route files scanned.`);
