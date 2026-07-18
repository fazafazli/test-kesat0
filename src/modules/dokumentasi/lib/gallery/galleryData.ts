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

export const galleryData: GalleryImage[] = [
// --- ROW 1: TOP ---
  {
    id: "img12",
    src: "/Gallery/img12.webp",
    width: 280,
    height: 224,
    zIndex: 1,
    initialTransform: { x: "-6vw", y: "2vh", rotation: 3, scale: 0.5 },
    finalTransform: { x: "-30vw", y: "-44vh", rotation: -8, scale: 1 }, // Pushed way up
  },
  {
    id: "img5",
    src: "/Gallery/img5.webp",
    width: 266,
    height: 196,
    zIndex: 2,
    initialTransform: { x: "-1vw", y: "-5vh", rotation: 1, scale: 0.6 },
    finalTransform: { x: "-8vw", y: "-48vh", rotation: 4, scale: 1.05 }, // Pushed way up
  },
  {
    id: "img6",
    src: "/Gallery/img6.webp",
    width: 294,
    height: 210,
    zIndex: 1,
    initialTransform: { x: "6vw", y: "2vh", rotation: -4, scale: 0.7 },
    finalTransform: { x: "16vw", y: "-44vh", rotation: -5, scale: 1 }, // Pushed way up
  },
  {
    id: "img2",
    src: "/Gallery/img2.webp",
    width: 280,
    height: 210,
    zIndex: 2,
    initialTransform: { x: "2vw", y: "4vh", rotation: 3, scale: 0.6 },
    finalTransform: { x: "36vw", y: "-40vh", rotation: 10, scale: 1.1 }, // Pushed way up
  },

   {
    id: "img1",
    src: "/Gallery/img1.webp",
    width: 280,
    height: 210,
    zIndex: 2,
    initialTransform: { x: "-5vw", y: "-2vh", rotation: -5, scale: 0.7 },
    finalTransform: { x: "-38vw", y: "-9.5vh", rotation: 6, scale: 1 }, 
  },
  {
    id: "img3",
    src: "/Gallery/img3.webp",
    width: 245,
    height: 280,
    zIndex: 4,
    initialTransform: { x: "-3vw", y: "1vh", rotation: -2, scale: 0.65 },
    finalTransform: { x: "-15vw", y: "-12.5vh", rotation: -4, scale: 1.1 }, 
  },
  {
    id: "img4",
    src: "/Gallery/img4.webp",
    width: 315,
    height: 210,
    zIndex: 3,
    initialTransform: { x: "4vw", y: "-3vh", rotation: 6, scale: 0.55 },
    finalTransform: { x: "14vw", y: "-8.5vh", rotation: 5, scale: 1.05 }, 
  },
  {
    id: "img10",
    src: "/Gallery/img10.webp",
    width: 210,
    height: 280,
    zIndex: 3,
    initialTransform: { x: "-2vw", y: "-4vh", rotation: 4, scale: 0.55 },
    finalTransform: { x: "38vw", y: "-4.5vh", rotation: -7, scale: 1 }, 
  },

  // --- ROW 3: BOTTOM (Shifted up to ~15vh) ---
  {
    id: "img9",
    src: "/Gallery/img9.webp",
    width: 315,
    height: 210,
    zIndex: 1,
    initialTransform: { x: "0vw", y: "3vh", rotation: -1, scale: 0.5 },
    finalTransform: { x: "-32vw", y: "20.5vh", rotation: -12, scale: 1.05 }, 
  },
  {
    id: "img7",
    src: "/Gallery/img7.webp",
    width: 280,
    height: 245,
    zIndex: 5,
    initialTransform: { x: "-4vw", y: "6vh", rotation: 2, scale: 0.65 },
    finalTransform: { x: "-10vw", y: "15.5vh", rotation: 3, scale: 1 }, 
  },
  {
    id: "img8",
    src: "/Gallery/img8.webp",
    width: 245,
    height: 175,
    zIndex: 2,
    initialTransform: { x: "3vw", y: "-1vh", rotation: -3, scale: 0.6 },
    finalTransform: { x: "14vw", y: "23.5vh", rotation: -6, scale: 1.1 }, 
  },
  {
    id: "img11",
    src: "/Gallery/img11.webp",
    width: 266,
    height: 196,
    zIndex: 1,
    initialTransform: { x: "5vw", y: "5vh", rotation: -6, scale: 0.6 },
    finalTransform: { x: "35vw", y: "25.5vh", rotation: 8, scale: 0.95 }, 
  },
];