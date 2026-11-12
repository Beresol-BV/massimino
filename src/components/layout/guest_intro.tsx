// src/components/layout/guest_intro.tsx
// Presentation screen for signed-out visitors on pages that need an account:
// shared PageHero, three cards on what is inside, and sign-up / sign-in actions.

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from './page_hero';

export interface GuestIntroFeature {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface GuestIntroProps {
  image: string;
  imagePosition?: string;
  eyebrow?: string;
  title: string;
  description: string;
  features: [GuestIntroFeature, GuestIntroFeature, GuestIntroFeature];
}

export function GuestIntro({ image, imagePosition, eyebrow, title, description, features }: GuestIntroProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHero
        image={image}
        imagePosition={imagePosition}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title: featureTitle, text }) => (
          <li key={featureTitle} className="rounded-card bg-card shadow-soft p-6">
            <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-brand-primary" aria-hidden="true" />
            </div>
            <h2 className="font-display text-lg font-semibold text-brand-primary mb-1.5">{featureTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          Create free account
        </Link>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default GuestIntro;
