const PROFILE_PHOTOS: Record<string, string> = {
  "Ashvin Nagarajan": "/leadership/ashvin-nagarajan.jpg",
  "Austin Wang": "/leadership/austin-wang.jpg",
  "Cherub Kapoor": "/leadership/cherub-kapoor.jpg",
  "Tina Zhang": "/leadership/tina-zhang.jpg",
  "Krishna Suraj": "/leadership/krishna-suraj.jpg",
  "Natalie DellaMaria": "/leadership/natalie-dellamaria.jpg",
};

export function leadershipPhoto(name: string, cmsPhoto?: string | null) {
  return cmsPhoto || PROFILE_PHOTOS[name] || null;
}
