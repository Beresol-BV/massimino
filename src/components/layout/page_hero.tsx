// src/components/layout/page_hero.tsx
// Shared header for subpages: a photo, a large title and one line on what the page holds.

import Image from 'next/image';
import { cn } from '@/core/utils/common';

interface PageHeroProps {
  /** Photo already in /public, e.g. "/images/background/athletism_blue.jpg" */
  image: string;
  /** Alt text; leave empty when the photo is purely decorative */
  imageAlt?: string;
  /** CSS object-position, to keep the important part of the photo in view */
  imagePosition?: string;
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  /** Render the title as h1 (default) or h2 when the page already has an h1 */
  as?: 'h1' | 'h2';
  className?: string;
  /** Optional content under the description, such as buttons styled for a dark background */
  children?: React.ReactNode;
}

export function PageHero({
  image,
  imageAlt = '',
  imagePosition = 'center',
  eyebrow,
  title,
  description,
  as: Heading = 'h1',
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden rounded-card shadow-soft min-h-[200px] sm:min-h-[240px] md:min-h-[280px] flex items-end',
        className
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover -z-10"
        style={{ objectPosition: imagePosition }}
      />
      {/* Petrol overlay so the text stays readable on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f202c]/85 via-[#1e3d52]/55 to-[#2b5069]/25"
      />
      <div className="w-full p-6 sm:p-8 md:p-10">
        {eyebrow && (
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-white/80 mb-2">
            {eyebrow}
          </p>
        )}
        <Heading className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {title}
        </Heading>
        {description && (
          <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}

export default PageHero;
