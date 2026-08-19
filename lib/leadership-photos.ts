const PROFILE_PHOTOS: Record<string, string> = {
  "Ashvin Nagarajan": "/leadership/ashvin-nagarajan.jpg",
  "Austin Wang": "/leadership/austin-wang.jpg",
  "Cherub Kapoor": "/leadership/cherub-kapoor.jpg",
  "Tina Zhang": "/leadership/tina-zhang.jpg",
  "Krishna Suraj": "/leadership/krishna-suraj.jpg",
  "Natalie DellaMaria": "/leadership/natalie-dellamaria.jpg",
};

const PROFILE_CROPS: Record<
  string,
  { scale: number; x: number; y: number }
> = {
  "Ashvin Nagarajan": { scale: 1, x: 0, y: 0 },
  "Austin Wang": { scale: 2.4, x: 0, y: -16 },
  "Cherub Kapoor": { scale: 1.45, x: 0, y: -4 },
  "Tina Zhang": { scale: 1.15, x: 0, y: 2 },
  "Krishna Suraj": { scale: 1.5, x: 0, y: 7 },
  "Natalie DellaMaria": { scale: 1.2, x: 0, y: 4 },
};

export function leadershipPhoto(name: string, cmsPhoto?: string | null) {
  return cmsPhoto || PROFILE_PHOTOS[name] || null;
}

export function leadershipPhotoCrop(name: string) {
  return PROFILE_CROPS[name] || { scale: 1, x: 0, y: 0 };
}
