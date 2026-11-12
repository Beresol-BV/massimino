// src/components/teams/team_cover.tsx
// Card cover for a team: its own cover photo when it has one, otherwise a
// default drawn with CSS only (team colour gradient + the team's initials).

/* eslint-disable @next/next/no-img-element */

interface TeamCoverProps {
  name: string;
  /** Team colour (hex). Falls back to the brand petrol */
  color?: string;
  /** The team's own cover photo URL, if it set one */
  coverImage?: string | null;
  className?: string;
}

export function teamInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const letters = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0];
  return letters.toUpperCase();
}

export function TeamCover({ name, color = '#2b5069', coverImage, className = '' }: TeamCoverProps) {
  if (coverImage) {
    return (
      <div className={`relative h-28 overflow-hidden ${className}`}>
        <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative h-28 overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${color} 0%, #1e3d52 100%)` }}
    >
      {/* Soft rings drawn in CSS for texture */}
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[18px] border-white/10" />
      <div className="absolute right-16 -bottom-12 h-24 w-24 rounded-full border-[12px] border-white/5" />
      <div className="absolute left-5 bottom-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-soft">
        <span className="font-display text-lg font-bold tracking-tight text-brand-primary">
          {teamInitials(name)}
        </span>
      </div>
    </div>
  );
}

export default TeamCover;
