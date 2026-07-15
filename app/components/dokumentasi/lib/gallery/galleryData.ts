export interface GalleryTransform {
  x: string;
  y: string;
  rotation: number;
  scale: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  zIndex: number;
  initialTransform: GalleryTransform;
  finalTransform: GalleryTransform;
}

// NOTE on spacing:
// Final layout uses 3 rows (top / mid / bottom) x up to 4 columns.
// Scale values were trimmed slightly (max ~1.0, most ~0.85-0.95) and
// vh/vw gaps widened so that only image BORDERS touch/overlap slightly
// (a few vw/vh of shadow overlap for a "collage" feel), never centers
// or large image bodies. Verified against width/height * scale in vw units
// (assuming ~1600px viewport reference) to avoid center-mass collisions.

export const galleryData: GalleryImage[] = [
  // --- ROW 1: TOP ---
  {
    id: "img12",
    src: "/Gallery/img12.webp",
    width: 280,
    height: 224,
    zIndex: 1,
    initialTransform: { x: "-6vw", y: "2vh", rotation: 3, scale: 0.5 },
    finalTransform: { x: "-34vw", y: "-46vh", rotation: -8, scale: 0.85 },
  },
  {
    id: "img5",
    src: "/Gallery/img5.webp",
    width: 266,
    height: 196,
    zIndex: 2,
    initialTransform: { x: "-1vw", y: "-5vh", rotation: 1, scale: 0.6 },
    finalTransform: { x: "-10vw", y: "-50vh", rotation: 4, scale: 0.9 },
  },
  {
    id: "img6",
    src: "/Gallery/img6.webp",
    width: 294,
    height: 210,
    zIndex: 1,
    initialTransform: { x: "6vw", y: "2vh", rotation: -4, scale: 0.7 },
    finalTransform: { x: "14vw", y: "-46vh", rotation: -5, scale: 0.85 },
  },
  {
    id: "img2",
    src: "/Gallery/img2.webp",
    width: 280,
    height: 210,
    zIndex: 2,
    initialTransform: { x: "2vw", y: "4vh", rotation: 3, scale: 0.6 },
    finalTransform: { x: "38vw", y: "-42vh", rotation: 10, scale: 0.9 },
  },

  // --- ROW 2: MIDDLE ---
  {
    id: "img1",
    src: "/Gallery/img1.webp",
    width: 280,
    height: 210,
    zIndex: 2,
    initialTransform: { x: "-5vw", y: "-2vh", rotation: -5, scale: 0.7 },
    finalTransform: { x: "-40vw", y: "-11vh", rotation: 6, scale: 0.85 },
  },
  {
    id: "img3",
    src: "/Gallery/img3.webp",
    width: 245,
    height: 280,
    zIndex: 4,
    initialTransform: { x: "-3vw", y: "1vh", rotation: -2, scale: 0.65 },
    finalTransform: { x: "-14vw", y: "-16vh", rotation: -4, scale: 0.9 },
  },
  {
    id: "img4",
    src: "/Gallery/img4.webp",
    width: 315,
    height: 210,
    zIndex: 3,
    initialTransform: { x: "4vw", y: "-3vh", rotation: 6, scale: 0.55 },
    finalTransform: { x: "13vw", y: "-9vh", rotation: 5, scale: 0.85 },
  },
  {
    id: "img10",
    src: "/Gallery/img10.webp",
    width: 210,
    height: 280,
    zIndex: 3,
    initialTransform: { x: "-2vw", y: "-4vh", rotation: 4, scale: 0.55 },
    finalTransform: { x: "40vw", y: "-3vh", rotation: -7, scale: 0.85 },
  },

  // --- ROW 3: BOTTOM ---
  {
    id: "img9",
    src: "/Gallery/img9.webp",
    width: 315,
    height: 210,
    zIndex: 1,
    initialTransform: { x: "0vw", y: "3vh", rotation: -1, scale: 0.5 },
    finalTransform: { x: "-36vw", y: "22vh", rotation: -12, scale: 0.9 },
  },
  {
    id: "img7",
    src: "/Gallery/img7.webp",
    width: 280,
    height: 245,
    zIndex: 5,
    initialTransform: { x: "-4vw", y: "6vh", rotation: 2, scale: 0.65 },
    finalTransform: { x: "-9vw", y: "17vh", rotation: 3, scale: 0.85 },
  },
  {
    id: "img8",
    src: "/Gallery/img8.webp",
    width: 245,
    height: 175,
    zIndex: 2,
    initialTransform: { x: "3vw", y: "-1vh", rotation: -3, scale: 0.6 },
    finalTransform: { x: "13vw", y: "25vh", rotation: -6, scale: 0.9 },
  },
  {
    id: "img11",
    src: "/Gallery/img11.webp",
    width: 266,
    height: 196,
    zIndex: 1,
    initialTransform: { x: "5vw", y: "5vh", rotation: -6, scale: 0.6 },
    finalTransform: { x: "37vw", y: "27vh", rotation: 8, scale: 0.85 },
  },
];