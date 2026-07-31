// All editable content for the site lives in this one file.
// Swap the text and image paths below — nothing else needs to change.

export interface MediaItem {
  id: string;
  /** 'photo' renders an <img>, 'video' renders a muted looping <video>. */
  kind: 'photo' | 'video';
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
  media: MediaItem[];
  gifts: Gift[];
  signOff: { line: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// FILL THESE IN — the only three things left. Everything else is real.
const HER_NAME = 'Angelic Sunshine'; // ← her name. This is the page's one <h1>.
const MY_NAME = 'Angela'; //         ← your name. Signs the letter + sign-off.
const PET_NAME = 'Sweets'; //          ← what you call her, used in the greeting.
// ─────────────────────────────────────────────────────────────────────────────

export const content: ContentData = {
  her: HER_NAME,
  me: MY_NAME,
  petName: PET_NAME,

  date: 'August 1, 2026',

  eyebrow: 'Happy Girlfriends Day',

  // Each entry in `paragraphs` becomes its own <p> on the letter card.
  letter: {
    greeting: `My dearest ${PET_NAME},`,
    paragraphs: [
      "It's so wonderful, how amazing life can be.",
      "From the day I met you till today, you've been a lover, a friend, my best friend, and my partner.",
      "I am grateful for your patient moments and for the harsh talks too. Sometimes they weren't needed, but I learn a lot of lessons from them.",
      "You showed and taught me things I didn't get to learn or experience growing up. Sometimes your ways can be confusing, but your patience and understanding helped me.",
      'I love you so much, and I want to wish you a Happy Girlfriends Day for being the best girlfriend ever. Enjoy this day, and a few tokens of my appreciation.',
    ],
    signoff: `All my love, ${MY_NAME}`,
  },

  // The middle entry lands in the raised centre slot of the asymmetric layout,
  // so keep the video (or the shortest item) second.
  media: [
    {
      id: 'media-01',
      kind: 'photo',
      src: '/images/us-01.jpg',
      caption: 'us',
      rotation: -3,
      width: 1242,
      height: 2208,
    },
    {
      id: 'media-02',
      kind: 'video',
      src: '/images/us-video.mp4',
      caption: 'this one, always',
      rotation: 2,
      width: 720,
      height: 1280,
    },
    {
      id: 'media-03',
      kind: 'photo',
      src: '/images/us-02.jpg',
      caption: 'my favourite face',
      rotation: -1.5,
      width: 1242,
      height: 2208,
    },
  ],

  // Add or remove entries freely — the gifts section lays itself out from this
  // array. `hint` shows while locked; the rest appears once she unlocks it.
  gifts: [
    {
      id: 'gift-slippers',
      hint: 'something for an outing or an outfit',
      name: 'An Outfit Slippers',
      description: 'Soft, and yours.',
      image: '/images/gift-slippers.svg',
      imageAlt: 'A pair of soft house slippers',
    },
    {
      id: 'gift-bag',
      hint: 'something to carry',
      name: 'A Bag, Just Your Style',
      description: 'Small, cute, and made to be shown off.',
      image: '/images/gift-bag.svg',
      imageAlt: 'A small handbag with a round clasp',
    },
    {
      id: 'gift-necklace',
      hint: 'something you wear',
      name: 'Lovely Necklaces',
      description: 'So little pieces of me goes wherever you go.',
      image: '/images/gift-necklace.svg',
      imageAlt: 'A fine necklace with a sunflower pendant',
    },
  ],

  signOff: {
    line: "That's everything, for now. Happy Girlfriends Day.",
  },
};
