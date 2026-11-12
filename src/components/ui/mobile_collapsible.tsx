'use client';

// Mobile-only disclosure. Below md (768px) the content is folded behind a button;
// from md up it is always shown and the button disappears, so desktop is unchanged.
// The content is rendered once, so it stays in the HTML (SEO) and is never duplicated.
//
// Two triggers:
//  - "readmore": the content folds under whatever is above it, with a "Read more" button below.
//  - "title":    the title itself is the button on mobile (e.g. footer columns). On desktop the
//                same text shows as a plain heading.
//
// Accessible: real <button> with aria-expanded/aria-controls, visible focus ring, chevron that
// rotates, and a height animation that is skipped under prefers-reduced-motion.

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/core/utils/common';

interface MobileCollapsibleProps {
  children: ReactNode;
  trigger?: 'readmore' | 'title';
  /** Title text (trigger="title") */
  title?: ReactNode;
  /** Heading element used for the title on both breakpoints */
  titleAs?: 'h2' | 'h3' | 'h4';
  /** Classes for the title text, shared by the mobile button and the desktop heading */
  titleClassName?: string;
  /** Optional icon shown before the title on mobile */
  icon?: ReactNode;
  /** Button labels for trigger="readmore" */
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
  contentClassName?: string;
  /** Tone of the read-more button on dark backgrounds */
  tone?: 'light' | 'dark';
  /** trigger="title": skip the desktop heading because the caller keeps its own (desktop-only) header */
  hideDesktopTitle?: boolean;
}

export function MobileCollapsible({
  children,
  trigger = 'readmore',
  title,
  titleAs: Heading = 'h3',
  titleClassName,
  icon,
  moreLabel = 'Read more',
  lessLabel = 'Show less',
  className,
  contentClassName,
  tone = 'light',
  hideDesktopTitle = false,
}: MobileCollapsibleProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const chevron = (
    <ChevronDown
      aria-hidden="true"
      className={cn(
        'h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none',
        open && 'rotate-180'
      )}
    />
  );

  const panel = (
    <div
      id={panelId}
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:grid-rows-[1fr]',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      )}
    >
      <div
        className={cn(
          'min-h-0 overflow-hidden md:overflow-visible md:visible',
          !open && 'invisible',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );

  if (trigger === 'title') {
    return (
      <div className={className}>
        {/* Mobile: the title is the toggle */}
        <Heading className="md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-field py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              titleClassName
            )}
          >
            <span className="flex items-center gap-2.5">
              {icon}
              {title}
            </span>
            {chevron}
          </button>
        </Heading>
        {/* Desktop: the same title as a plain heading (unless the caller renders its own) */}
        {!hideDesktopTitle && <Heading className={cn('hidden md:block', titleClassName)}>{title}</Heading>}
        {panel}
      </div>
    );
  }

  return (
    <div className={className}>
      {panel}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'mt-3 inline-flex items-center gap-1.5 rounded-full px-1 text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 md:hidden',
          tone === 'dark' ? 'text-white focus-visible:ring-white' : 'text-brand-primary focus-visible:ring-brand-primary'
        )}
      >
        {open ? lessLabel : moreLabel}
        {chevron}
      </button>
    </div>
  );
}

export default MobileCollapsible;
