export const TOTAL_FRAMES = 240;
export const FRAME_ASPECT_RATIO = 16 / 9;

// Used by Next.js <Image> component, which automatically prepends the Next.js basePath
export function getFrameUrl(index: number) {
  const frame = String(index + 1).padStart(3, "0");
  return `/resources/ezgif-frame-${frame}.jpg`;
}

// Used by manual new Image() in the canvas. 
// A relative path perfectly resolves against the trailing slash URL (e.g. /SCM---2026/)
export function getCanvasFrameUrl(index: number) {
  const frame = String(index + 1).padStart(3, "0");
  return `resources/ezgif-frame-${frame}.jpg`;
}

function waitForImageLoad(img: HTMLImageElement) {
  return new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Unable to load ${img.src}`));
  });
}

export async function loadFrame(index: number, retries = 2): Promise<CanvasImageSource> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const img = new Image();
      img.decoding = "async";
      img.src = getCanvasFrameUrl(index);
      await waitForImageLoad(img);

      if ("createImageBitmap" in window) {
        return await createImageBitmap(img);
      }

      return img;
    } catch (error) {
      attempt += 1;

      if (attempt > retries) {
        throw error;
      }

      await new Promise((resolve) => window.setTimeout(resolve, 180 * attempt));
    }
  }

  throw new Error(`Unable to load frame ${index + 1}`);
}

export function closeFrame(source: CanvasImageSource) {
  if ("close" in source && typeof source.close === "function") {
    source.close();
  }
}
