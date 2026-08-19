// All mock data for the VANTA experience — no fake stats, no testimonials, no customer claims

export const IMAGES = {
  // cinematic film stills / set photography
  filmStill1: 'https://picsum.photos/seed/36444143/1200/800',
  filmStill2: 'https://picsum.photos/seed/37911516/1200/800',
  filmStill3: 'https://picsum.photos/seed/18651903/1200/800',
  filmSet1: 'https://picsum.photos/seed/3379932/1200/800',
  filmSet2: 'https://picsum.photos/seed/3379938/1200/800',
  filmSet3: 'https://picsum.photos/seed/13812458/1200/800',
  filmSet4: 'https://picsum.photos/seed/13812463/1200/800',
  filmSet5: 'https://picsum.photos/seed/30878453/1200/800',
  filmSet6: 'https://picsum.photos/seed/19560489/1200/800',

  // portraits / fashion editorial
  portrait1: 'https://picsum.photos/seed/1066171/1200/800',
  portrait2: 'https://picsum.photos/seed/33852945/1200/800',
  portrait3: 'https://picsum.photos/seed/28863302/1200/800',
  portrait4: 'https://picsum.photos/seed/10670833/1200/800',
  portrait5: 'https://picsum.photos/seed/33681519/1200/800',
  portrait6: 'https://picsum.photos/seed/18259227/1200/800',
  portrait7: 'https://picsum.photos/seed/7866520/1200/800',
  portrait8: 'https://picsum.photos/seed/36991336/1200/800',

  // architecture / texture
  arch1: 'https://picsum.photos/seed/18145557/1200/800',
  arch2: 'https://picsum.photos/seed/14343553/1200/800',
  arch3: 'https://picsum.photos/seed/4015825/1200/800',
  arch4: 'https://picsum.photos/seed/3188582/1200/800',
  arch5: 'https://picsum.photos/seed/31438131/1200/800',
  arch6: 'https://picsum.photos/seed/31635618/1200/800',

  // typography / design / print
  type1: 'https://picsum.photos/seed/4088095/1200/800',
  type2: 'https://picsum.photos/seed/7661410/1200/800',
  type3: 'https://picsum.photos/seed/6149/1200/800',
  type4: 'https://picsum.photos/seed/3964576/1200/800',
  type5: 'https://picsum.photos/seed/4108233/1200/800',

  // color / paint / material
  paint1: 'https://picsum.photos/seed/24509321/1200/800',
  paint2: 'https://picsum.photos/seed/13013228/1200/800',
  paint3: 'https://picsum.photos/seed/3209471/1200/800',
  paint4: 'https://picsum.photos/seed/13371111/1200/800',

  // camera / production
  camera1: 'https://picsum.photos/seed/4123586/1200/800',
  camera2: 'https://picsum.photos/seed/30396798/1200/800',
  camera3: 'https://picsum.photos/seed/34680730/1200/800',
  camera4: 'https://picsum.photos/seed/34516665/1200/800',

  // golden hour / landscape
  golden1: 'https://picsum.photos/seed/38908251/1200/800',
  golden2: 'https://picsum.photos/seed/10047505/1200/800',

  // editing / creative work
  edit1: 'https://picsum.photos/seed/8100053/1200/800',
  edit2: 'https://picsum.photos/seed/8100063/1200/800',
  edit3: 'https://picsum.photos/seed/14879064/1200/800',
  edit4: 'https://picsum.photos/seed/15713296/1200/800',

  // team headshots
  team1: 'https://picsum.photos/seed/30133727/1200/800',
  team2: 'https://picsum.photos/seed/14033134/1200/800',
  team3: 'https://picsum.photos/seed/14408910/1200/800',
  team4: 'https://picsum.photos/seed/9092311/1200/800',
  team5: 'https://picsum.photos/seed/10189954/1200/800',
} as const;

export const VIDEOS = {
  showreel: '/videos/showreel.mp4',
  review: '/videos/review.mp4',
  timeline: '/videos/timeline.mp4',
} as const;

export const VIDEO_POSTERS = {
  showreel: IMAGES.filmStill1,
  review: IMAGES.filmSet3,
  timeline: IMAGES.golden1,
} as const;

export const NAV_LINKS = [
  { label: 'Product', href: '#workspace' },
  { label: 'Moodboards', href: '#moodboard' },
  { label: 'Review', href: '#review' },
  { label: 'Workspace', href: '#command' },
] as const;

export const SIDEBAR_ITEMS = [
  { label: 'Projects', icon: 'FolderOpen' },
  { label: 'Moodboards', icon: 'LayoutGrid' },
  { label: 'Assets', icon: 'Image' },
  { label: 'Reviews', icon: 'MessageSquare' },
  { label: 'Timeline', icon: 'Clock' },
  { label: 'Team', icon: 'Users' },
] as const;

export const WORKSPACE_TABS = ['Overview', 'Direction', 'Assets', 'Review', 'Production'] as const;

export const CREATIVE_NOTES = [
  'Late afternoon. Soft contrast. Human. Cinematic.',
  'Push the second frame closer.',
  'Try the warmer grade.',
  'Reference: late afternoon light.',
  'Hold the negative space.',
  'Keep the grade restrained.',
] as const;

export const WORKFLOW_STEPS = [
  { num: '01', title: 'IDEA', copy: 'The first reference. A frame, a color, a feeling.' },
  { num: '02', title: 'DIRECTION', copy: 'The moodboard lock. Visual language defined.' },
  { num: '03', title: 'PRODUCTION', copy: 'The shoot. Capturing what was imagined.' },
  { num: '04', title: 'REVIEW', copy: 'Feedback on the frame. Decisions logged.' },
  { num: '05', title: 'FINAL', copy: 'The finished work. Vision intact.' },
] as const;

export const FOOTER_LINKS = [
  { label: 'Product', href: '#workspace' },
  { label: 'Workspaces', href: '#moodboard' },
  { label: 'About', href: '#timeline-3d' },
  { label: 'Contact', href: '#contact' },
] as const;

export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const;

// === MOODBOARD CARDS ===

export type MoodboardCard = {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'TYPE' | 'COLOR' | 'NOTE';
  title: string;
  subtitle: string;
  image?: string;
  color?: string[];
  note?: string;
  x: number; // percentage position
  y: number;
  w: number; // width in grid units
  h: number;
  rotation: number;
};

export const INITIAL_MOODBOARD: MoodboardCard[] = [
  { id: 'm1', type: 'IMAGE', title: 'Golden Hour', subtitle: 'LIGHTING REFERENCE', image: IMAGES.golden1, x: 2, y: 4, w: 3, h: 4, rotation: -2 },
  { id: 'm2', type: 'IMAGE', title: 'Portrait Study', subtitle: 'CHARACTER REF', image: IMAGES.portrait1, x: 6, y: 2, w: 2, h: 5, rotation: 1.5 },
  { id: 'm3', type: 'VIDEO', title: 'NOVA / Frame 04', subtitle: 'OPENING SEQUENCE', image: IMAGES.filmStill1, x: 20, y: 6, w: 4, h: 4, rotation: -1 },
  { id: 'm4', type: 'COLOR', title: 'Warm Neutral', subtitle: 'COLOR DIRECTION', color: ['#1a1a24', '#3d3528', '#8a7bd6', '#c9c7c1', '#ece7dc'], x: 12, y: 4, w: 3, h: 2, rotation: 0.5 },
  { id: 'm5', type: 'IMAGE', title: 'Concrete & Light', subtitle: 'TEXTURE REF', image: IMAGES.arch1, x: 30, y: 2, w: 3, h: 3, rotation: 2 },
  { id: 'm6', type: 'TYPE', title: 'Display — Condensed', subtitle: 'TYPOGRAPHY', image: IMAGES.type1, x: 36, y: 8, w: 3, h: 2, rotation: -1.5 },
  { id: 'm7', type: 'NOTE', title: 'Late afternoon light', subtitle: 'CREATIVE NOTE', note: 'Hold the negative space before the first cut. Warm but restrained.', x: 16, y: 12, w: 3, h: 2, rotation: 1 },
  { id: 'm8', type: 'IMAGE', title: 'Architecture', subtitle: 'COMPOSITION', image: IMAGES.arch3, x: 2, y: 16, w: 3, h: 3, rotation: -0.5 },
  { id: 'm9', type: 'IMAGE', title: 'Fashion Editorial', subtitle: 'WARDROBE REF', image: IMAGES.portrait3, x: 24, y: 14, w: 2, h: 4, rotation: 2.5 },
  { id: 'm10', type: 'IMAGE', title: 'Film Set', subtitle: 'PRODUCTION REF', image: IMAGES.filmSet2, x: 6, y: 22, w: 4, h: 3, rotation: -2 },
  { id: 'm11', type: 'COLOR', title: 'Shadow Palette', subtitle: 'GRADE STUDY', color: ['#07070a', '#121218', '#22222c', '#2a2a33', '#6e6a63'], x: 12, y: 20, w: 3, h: 2, rotation: 0 },
  { id: 'm12', type: 'IMAGE', title: 'Painted Light', subtitle: 'TEXTURE', image: IMAGES.paint1, x: 30, y: 20, w: 2, h: 2, rotation: 1.5 },
];

// === ASSET LIBRARY ===

export type Asset = {
  id: string;
  title: string;
  project: string;
  category: 'PHOTO' | 'VIDEO' | 'DESIGN' | 'TYPE' | 'AUDIO';
  image: string;
  dimensions: string;
  date: string;
  size: string;
};

export const ASSETS: Asset[] = [
  { id: 'a1', title: 'Opening Sequence', project: 'NOVA / Campaign', category: 'VIDEO', image: IMAGES.filmStill1, dimensions: '3840 × 2160', date: 'MAY 18, 2026', size: '248 MB' },
  { id: 'a2', title: 'Character Study', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.portrait1, dimensions: '3267 × 4894', date: 'MAY 16, 2026', size: '12.4 MB' },
  { id: 'a3', title: 'Concrete Facade', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.arch1, dimensions: '6000 × 4000', date: 'MAY 14, 2026', size: '18.2 MB' },
  { id: 'a4', title: 'Display Type', project: 'NOVA / Identity', category: 'TYPE', image: IMAGES.type1, dimensions: '6337 × 3564', date: 'MAY 12, 2026', size: '3.1 MB' },
  { id: 'a5', title: 'Film Set — Day 03', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.filmSet2, dimensions: '2792 × 1861', date: 'MAY 10, 2026', size: '8.7 MB' },
  { id: 'a6', title: 'Color Study', project: 'NOVA / Direction', category: 'DESIGN', image: IMAGES.paint1, dimensions: '3000 × 3000', date: 'MAY 08, 2026', size: '4.2 MB' },
  { id: 'a7', title: 'Wardrobe Ref', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.portrait3, dimensions: '4016 × 6016', date: 'MAY 06, 2026', size: '15.3 MB' },
  { id: 'a8', title: 'Architecture Study', project: 'NOVA / Direction', category: 'PHOTO', image: IMAGES.arch3, dimensions: '4977 × 3318', date: 'MAY 04, 2026', size: '11.8 MB' },
  { id: 'a9', title: 'Typography Poster', project: 'NOVA / Identity', category: 'DESIGN', image: IMAGES.type2, dimensions: '7057 × 4705', date: 'MAY 02, 2026', size: '6.4 MB' },
  { id: 'a10', title: 'Golden Hour Plate', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.golden1, dimensions: '7728 × 5152', date: 'APR 28, 2026', size: '22.1 MB' },
  { id: 'a11', title: 'Texture — Paint', project: 'NOVA / Direction', category: 'DESIGN', image: IMAGES.paint2, dimensions: '3024 × 3024', date: 'APR 26, 2026', size: '5.7 MB' },
  { id: 'a12', title: 'Camera Setup', project: 'NOVA / Production', category: 'PHOTO', image: IMAGES.camera1, dimensions: '3500 × 2333', date: 'APR 24, 2026', size: '9.3 MB' },
  { id: 'a13', title: 'Editorial Portrait', project: 'NOVA / Campaign', category: 'PHOTO', image: IMAGES.portrait6, dimensions: '2333 × 3500', date: 'APR 22, 2026', size: '7.8 MB' },
  { id: 'a14', title: 'Poster Design', project: 'NOVA / Identity', category: 'DESIGN', image: IMAGES.type3, dimensions: '5472 × 3648', date: 'APR 20, 2026', size: '4.9 MB' },
  { id: 'a15', title: 'Film Set — Day 01', project: 'NOVA / Production', category: 'PHOTO', image: IMAGES.filmSet3, dimensions: '2500 × 1667', date: 'APR 18, 2026', size: '6.2 MB' },
  { id: 'a16', title: 'Soundtrack — Theme 01', project: 'NOVA / Campaign', category: 'AUDIO', image: IMAGES.edit2, dimensions: 'WAV 48kHz', date: 'APR 16, 2026', size: '42.8 MB' },
];

export const ASSET_CATEGORIES = ['ALL', 'PHOTO', 'VIDEO', 'DESIGN', 'TYPE', 'AUDIO'] as const;

// === VIDEO REVIEW ===

export type TimelineMarker = {
  time: number;
  label: string;
  comment: string;
  author: string;
};

export const TIMELINE_MARKERS: TimelineMarker[] = [
  { time: 3, label: 'Opening', comment: 'The silence here is important. Let it breathe.', author: 'Mara K.' },
  { time: 8, label: 'Camera', comment: "Let's hold this shot two frames longer.", author: 'Devon R.' },
  { time: 14, label: 'Grade', comment: 'Try the warmer grade here.', author: 'Mara K.' },
  { time: 20, label: 'Typography', comment: 'Push the title card closer to the subject.', author: 'Yuki T.' },
  { time: 26, label: 'Cut', comment: 'This transition feels too fast.', author: 'Devon R.' },
];

export const INITIAL_COMMENTS = [
  { id: 'c1', time: 8, text: "Let's hold this shot two frames longer.", author: 'Devon R.', role: 'Filmmaker' },
  { id: 'c2', time: 14, text: 'Try the warmer grade here.', author: 'Mara K.', role: 'Creative Director' },
  { id: 'c3', time: 20, text: 'Push the title card closer to the subject.', author: 'Yuki T.', role: 'Designer' },
];

// === 3D TIMELINE STAGES ===

export type TimelineStage = {
  num: string;
  title: string;
  copy: string;
  image: string;
  status: 'done' | 'active' | 'pending';
};

export const TIMELINE_STAGES: TimelineStage[] = [
  { num: '01', title: 'IDEA', copy: 'The first reference. A frame, a color, a feeling.', image: IMAGES.golden1, status: 'done' },
  { num: '02', title: 'DIRECTION', copy: 'The moodboard lock. Visual language defined.', image: IMAGES.arch1, status: 'done' },
  { num: '03', title: 'PRODUCTION', copy: 'The shoot. Capturing what was imagined.', image: IMAGES.filmSet2, status: 'active' },
  { num: '04', title: 'REVIEW', copy: 'Feedback on the frame. Decisions logged.', image: IMAGES.filmStill1, status: 'pending' },
  { num: '05', title: 'FINAL', copy: 'The finished work. Vision intact.', image: IMAGES.portrait1, status: 'pending' },
];

// === TEAM ===

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
};

export const TEAM: TeamMember[] = [
  { name: 'Mara Kovac', role: 'Creative Director', avatar: IMAGES.team1 },
  { name: 'Devon Reyes', role: 'Filmmaker', avatar: IMAGES.team2 },
  { name: 'Yuki Tanaka', role: 'Designer', avatar: IMAGES.team3 },
  { name: 'Nora Lindqvist', role: 'Editor', avatar: IMAGES.team4 },
  { name: 'Ari Okafor', role: 'Photographer', avatar: IMAGES.team5 },
];

// === 3D MOODBOARD PANELS ===

export type Panel3D = {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  image?: string;
  label: string;
  sublabel: string;
  typeLabel: string;
};

export const PANELS_3D: Panel3D[] = [
  { id: 0, position: [-2.5, 0.8, 0], rotation: [0, 0.35, 0.04], image: IMAGES.golden1, label: 'Golden Hour', sublabel: 'LIGHTING', typeLabel: 'IMAGE' },
  { id: 1, position: [0, 1.2, -0.8], rotation: [0, 0, 0], image: IMAGES.portrait1, label: 'Portrait Study', sublabel: 'CHARACTER', typeLabel: 'IMAGE' },
  { id: 2, position: [2.5, 0.6, 0.2], rotation: [0, -0.35, -0.04], image: IMAGES.filmStill1, label: 'NOVA / Frame 04', sublabel: 'VIDEO', typeLabel: 'VIDEO' },
  { id: 3, position: [-1.8, -1.4, 0.4], rotation: [0, 0.25, -0.03], image: IMAGES.arch1, label: 'Concrete & Light', sublabel: 'TEXTURE', typeLabel: 'IMAGE' },
  { id: 4, position: [1.5, -1.2, -0.3], rotation: [0, -0.25, 0.03], image: IMAGES.type1, label: 'Display Type', sublabel: 'TYPOGRAPHY', typeLabel: 'TYPE' },
  { id: 5, position: [0, -0.3, 1.2], rotation: [0, 0, 0], label: 'Color Direction', sublabel: 'WARM NEUTRAL', typeLabel: 'COLOR' },
  { id: 6, position: [-3.2, -0.4, -1.5], rotation: [0, 0.5, 0.06], image: IMAGES.paint1, label: 'Painted Light', sublabel: 'MATERIAL', typeLabel: 'IMAGE' },
  { id: 7, position: [3.2, 1.5, -1.2], rotation: [0, -0.5, -0.06], image: IMAGES.portrait3, label: 'Editorial', sublabel: 'WARDROBE', typeLabel: 'IMAGE' },
];

// === MOODBOARD FILTERS ===

export const MOODBOARD_FILTERS = ['ALL', 'IMAGE', 'VIDEO', 'TYPE', 'COLOR', 'NOTE'] as const;
