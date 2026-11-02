// src/lib/trainer-aliases.ts

/**
 * Optional vanity usernames for trainer bio pages, set per deployment:
 *   TRAINER_ALIASES='{"janedoe":"jane@example.com","jane-doe":"jane@example.com"}'
 * Server-only. Personal addresses belong in the environment, never in source.
 */
function trainer_aliases(): Record<string, string> {
  const raw = process.env.TRAINER_ALIASES;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    return Object.fromEntries(
      Object.entries(parsed).map(([alias, email]) => [alias.toLowerCase(), email]),
    );
  } catch {
    console.error('TRAINER_ALIASES is not valid JSON; ignoring it');
    return {};
  }
}

export function email_for_trainer_alias(username: string): string | undefined {
  return trainer_aliases()[username.toLowerCase()];
}

export function alias_for_trainer_email(email?: string | null): string | undefined {
  if (!email) return undefined;
  const match = Object.entries(trainer_aliases()).find(([, value]) => value === email);
  return match?.[0];
}
