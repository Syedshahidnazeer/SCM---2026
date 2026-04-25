export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  if (inMin === inMax) {
    return outMin;
  }

  const progress = clamp((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * progress;
}

export function scheduleIdle(callback: () => void) {
  if (typeof window === "undefined") {
    return 0;
  }

  const browserWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  };

  if (typeof browserWindow.requestIdleCallback === "function") {
    return browserWindow.requestIdleCallback(callback, { timeout: 1200 });
  }

  return window.setTimeout(callback, 120);
}

export function cancelIdle(handle: number) {
  if (typeof window === "undefined") {
    return;
  }

  const browserWindow = window as Window & {
    cancelIdleCallback?: (handle: number) => void;
  };

  if (typeof browserWindow.cancelIdleCallback === "function") {
    browserWindow.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
}
