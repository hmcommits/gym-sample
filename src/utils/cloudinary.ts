/**
 * Cloudinary & Asset URL helper for Peakform Fitness Club.
 * 
 * Streams all assets directly from Cloudinary CDN with automatic format (f_auto)
 * and quality (q_auto) optimization.
 */

export const ASSET_MAP = {
  logo: 'logo.webp',
  hero: 'hero.webp',
  heroMobile: 'hero-mobile.webp',
  programStrength: 'program-strength.webp',
  programWeightloss: 'program-weightloss.webp',
  programEndurance: 'program-endurance.webp',
  programMobility: 'program-mobility.webp',
  gymInterior: 'gym-interior.webp',
  trainerRohan: 'trainer-rohan.webp',
  trainerAarya: 'trainer-aarya.webp',
  trainerKaran: 'trainer-karan.webp',
  trainerNikita: 'trainer-nikita.webp',
  membershipKettlebell: 'membership-kettlebell.webp',
  memberAditya: 'member-aditya.webp',
  memberSneha: 'member-sneha.webp',
  memberRohit: 'member-rohit.webp',
  ctaAthlete: 'cta-athlete.webp',
} as const;

export type AssetKey = keyof typeof ASSET_MAP;

export const VIDEO_MAP = {
  gymTour: 'gym-tour',
} as const;

export type VideoKey = keyof typeof VIDEO_MAP;

const CLOUDINARY_CLOUD_NAME = 
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME) ||
  (typeof process !== 'undefined' && (process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME)) ||
  'me9hwxub';

const CLOUDINARY_FOLDER = 'peakform';

const ASSET_VERSIONS: Partial<Record<AssetKey, string>> = {
  heroMobile: 'v1794049695',
};

/**
 * Returns the optimized WebP Cloudinary CDN URL for an image asset.
 */
export function getAssetUrl(key: AssetKey, transformations: string = 'f_auto,q_auto'): string {
  const fileName = ASSET_MAP[key];
  if (!fileName) return '';

  const assetId = fileName.replace(/\.[^/.]+$/, '');
  const version = ASSET_VERSIONS[key] || 'v1';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${version}/${CLOUDINARY_FOLDER}/${assetId}.webp`;
}

/**
 * Returns the optimized streaming Cloudinary CDN URL for a video asset.
 */
export function getVideoUrl(key: VideoKey = 'gymTour', transformations: string = 'f_auto,q_auto'): string {
  const videoId = VIDEO_MAP[key] || 'gym-tour';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/v1/${CLOUDINARY_FOLDER}/${videoId}.mp4`;
}

/**
 * Returns the auto-generated video poster/thumbnail URL from Cloudinary.
 */
export function getVideoPosterUrl(key: VideoKey = 'gymTour'): string {
  const videoId = VIDEO_MAP[key] || 'gym-tour';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,f_auto,q_auto/v1/${CLOUDINARY_FOLDER}/${videoId}.jpg`;
}
