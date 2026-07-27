// All editable content for the site lives in this one file.
// Swap the text and image paths below — nothing else needs to change.

export interface Photo {
  id: string;
  src: string;
  caption: string;
  rotation: number;
  width: number;
  height: number;
}

export interface Gift {
  id: string;
  hint: string;
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface LetterContent {
  greeting: string;
  paragraphs: string[];
  signoff: string;
}

export interface ContentData {
  her: string;
  me: string;
  petName: string;
  date: string;
  eyebrow: string;
  letter: LetterContent;
  photos: Photo[];
  gifts: Gift[];
  signOff: { line: string };
}

export const content: ContentData = {
  // PLACEHOLDER: her real name — this is the page's one <h1>.
  her: 'Someone Wonderful',

  // PLACEHOLDER: your name — used for the letter and sign-off signatures.
  me: 'Your Person',

  // PLACEHOLDER: a nickname/pet name, optional — used in the letter's greeting.
  petName: 'Sunflower',

  // PLACEHOLDER: the date shown on the site, e.g. "August 1, 2026".
  date: 'August 1',

  eyebrow: 'Happy Girlfriends Day',

  // PLACEHOLDER: replace with the real letter. Keep it as short paragraphs —
  // each entry in `paragraphs` becomes its own <p>.
  letter: {
    greeting: 'My dearest Sunflower,',
    paragraphs: [
      'This is a placeholder for the real letter — but even as filler, it means what it says: you make ordinary days feel like something worth writing down.',
      "Whatever's actually true about the two of you goes here. The way you laugh, the thing you always say, the reason today is about you specifically and no one else.",
      "Replace this paragraph, keep the shape. Three short beats is plenty — this isn't the place for an essay.",
    ],
    signoff: 'Always, Your Person',
  },

  // PLACEHOLDER: swap the src for real photos (any image format works),
  // and rewrite the captions. Keep three entries for the asymmetric layout.
  photos: [
    {
      id: 'photo-01',
      src: '/images/us-01.svg',
      caption: 'the day we got caught in the rain',
      rotation: -3,
      width: 1200,
      height: 1500,
    },
    {
      id: 'photo-02',
      src: '/images/us-02.svg',
      caption: 'us, mid-laugh',
      rotation: 2,
      width: 1200,
      height: 900,
    },
    {
      id: 'photo-03',
      src: '/images/us-03.svg',
      caption: 'somewhere we never wanted to leave',
      rotation: -1.5,
      width: 1200,
      height: 1500,
    },
  ],

  // PLACEHOLDER: replace name/description with the real gifts. Add or remove
  // entries freely — the gifts section lays itself out from this array.
  gifts: [
    {
      id: 'gift-01',
      hint: 'something you wear',
      name: 'A Little Piece of Us',
      description: 'Swap in the real thing — a necklace, a bracelet, whatever feels like her.',
      image: '/images/gift-01.svg',
      imageAlt: 'A little piece of us',
    },
    {
      id: 'gift-02',
      hint: 'something you taste',
      name: 'Your Favorite Bite',
      description: 'Whatever treat, dessert, or dinner plan goes here.',
      image: '/images/gift-02.svg',
      imageAlt: 'Your favorite bite',
    },
    {
      id: 'gift-03',
      hint: 'something to keep',
      name: 'A Little Keepsake',
      description: 'A journal, a frame, a trinket — something small that lasts.',
      image: '/images/gift-03.svg',
      imageAlt: 'A little keepsake',
    },
    {
      id: 'gift-04',
      hint: 'something to look forward to',
      name: 'A Day, Just Ours',
      description: 'A planned date, trip, or experience — fill in the actual plan.',
      image: '/images/gift-04.svg',
      imageAlt: 'A day, just ours',
    },
  ],

  signOff: {
    line: "That's everything, for now. Happy Girlfriends Day.",
  },
};
