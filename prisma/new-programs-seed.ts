/**
 * New Programs Seed
 * Creates the Post-Christmas Rentree program template
 */

import { PrismaClient, PhaseType } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🏋️ Seeding New Program Templates...');

  // Get system user
  const systemUser = await prisma.users.findFirst({
    where: { email: 'system@massimino.fitness' }
  });

  if (!systemUser) {
    throw new Error('System user not found. Run periodization-seed.ts first.');
  }

  // Load JSON templates
  const templatesDir = path.join(process.cwd(), 'src', 'templates');

  // Post Christmas Holidays Rentree
  console.log('📝 Creating Post Christmas Holidays Rentree Workout...');
  const christmasJson = JSON.parse(fs.readFileSync(path.join(templatesDir, 'post_christmas_rentree.json'), 'utf-8'));

  await prisma.program_templates.upsert({
    where: { id: 'post-christmas-rentree' },
    update: {
      templateData: christmasJson,
      updatedAt: new Date(),
    },
    create: {
      id: 'post-christmas-rentree',
      name: 'Post Christmas Holidays Rentree Workout',
      description: 'Your New Year resolution made real. This 6-week program is designed specifically for those returning to fitness after the holiday season. Progressive full-body workouts that burn fat, rebuild muscle, and establish sustainable habits - without burning you out. Perfect for January resolutioners and anyone getting back on track after a break.',
      createdBy: systemUser.id,
      duration: '6 weeks',
      difficulty: 'BEGINNER',
      category: 'FAT_LOSS',
      isPublic: true,
      price: 0,
      rating: 5.0,
      ratingCount: 0,
      isActive: true,
      tags: ['Fat Loss', 'Muscle Building', 'New Year', 'Beginner Friendly', 'Full Body', 'Metabolic Training', 'Lifestyle', 'Return to Fitness', 'Weight Loss'],
      programType: 'LIFESTYLE',
      hasExerciseSlots: false,
      progressionStrategy: 'LINEAR',
      autoRegulation: false,
      templateData: christmasJson,
      updatedAt: new Date(),
    }
  });

  // Delete existing phases and recreate
  await prisma.program_phases.deleteMany({ where: { programId: 'post-christmas-rentree' } });
  await prisma.program_phases.createMany({
    data: [
      {
        programId: 'post-christmas-rentree',
        phaseNumber: 1,
        phaseName: 'Re-Entry',
        phaseType: PhaseType.HYPERTROPHY,
        startWeek: 1,
        endWeek: 2,
        description: 'Ease back into training, rebuild movement patterns',
        targetIntensity: '60-65%',
        targetVolume: 'MEDIUM',
        repRangeLow: 12,
        repRangeHigh: 15,
        setsPerExercise: 3,
        restSecondsMin: 60,
        restSecondsMax: 90,
      },
      {
        programId: 'post-christmas-rentree',
        phaseNumber: 2,
        phaseName: 'Build Up',
        phaseType: PhaseType.HYPERTROPHY,
        startWeek: 3,
        endWeek: 4,
        description: 'Increase intensity, add complexity',
        targetIntensity: '70-75%',
        targetVolume: 'HIGH',
        repRangeLow: 10,
        repRangeHigh: 12,
        setsPerExercise: 4,
        restSecondsMin: 60,
        restSecondsMax: 90,
      },
      {
        programId: 'post-christmas-rentree',
        phaseNumber: 3,
        phaseName: 'Push Through',
        phaseType: PhaseType.STRENGTH,
        startWeek: 5,
        endWeek: 6,
        description: 'Maximum effort, fat loss focus',
        targetIntensity: '75-80%',
        targetVolume: 'HIGH',
        repRangeLow: 8,
        repRangeHigh: 12,
        setsPerExercise: 4,
        restSecondsMin: 60,
        restSecondsMax: 90,
      },
    ]
  });
  console.log('✅ Created Post Christmas Holidays Rentree Workout with phases');

  console.log('🎉 New programs seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding new programs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
