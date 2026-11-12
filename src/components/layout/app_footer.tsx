// src/components/layout/app_footer.tsx
// Thin one-line footer for the signed-in app shell (the public pages keep the full Footer).

import Link from 'next/link';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
];

export function AppFooter() {
  return (
    <footer className="border-t border-brand-primary/10 px-4 py-4 sm:px-5 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <p>&copy; 2025&ndash;2026 Beresol BV</p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default AppFooter;
