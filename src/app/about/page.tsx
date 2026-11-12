// src/app/about/page.tsx
// TODO(Victor): review this copy. It is assembled from text already on the site
// (homepage About section, Built Different cards and footer); nothing new is claimed.

import Link from 'next/link'
import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Massimino is the safety-first fitness platform for personal trainers and athletes, with evidence-based, NASM-aligned programming. A product of Beresol BV.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card className="border-l-4 border-l-brand-primary">
        <CardHeader>
          <CardTitle as="h1">About Massimino</CardTitle>
          <CardDescription>The safety-first fitness platform. Safe workouts for everyone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-800 text-[15px] leading-relaxed">
          <p>
            Massimino is the professional-grade fitness platform built to protect personal trainers and athletes
            while enabling evidence-based, NASM-aligned programming. Our mission is to foster a respectful, secure,
            and effective training environment for all.
          </p>
          <p>
            Connect with verified trainers, access 30+ curated training programs, and track your progress with our
            intelligent workout logging system.
          </p>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">What makes it different</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Safety first:</strong> AI moderation and anti-harassment protection.
              </li>
              <li>
                <strong>Expert guidance:</strong> NASM-certified programming.
              </li>
              <li>
                <strong>Smart tracking:</strong> intelligent workout logging.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Who is behind it</h2>
            <p>Massimino is a product of Beresol BV.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-1">Get in touch</h2>
            <p>
              Write to{' '}
              <a href="mailto:hello@beresol.eu" className="text-brand-primary hover:underline">
                hello@beresol.eu
              </a>{' '}
              or see all the ways to reach us on the{' '}
              <Link href="/contact" className="text-brand-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
