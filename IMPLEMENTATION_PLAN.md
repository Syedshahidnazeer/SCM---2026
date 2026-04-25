# Premium Scrollytelling Landing Page - Implementation Plan

## Project Overview
**Project**: Kadapa Cycles Premium Scrollytelling Landing Page
**Location**: Kadapa, India  
**Core Feature**: Scroll-linked bicycle animation (assembled → exploded view)
**Image Sequence**: 240 frames (ezgif-frame-001.jpg to ezgif-frame-240.jpg)
**Target**: Awwwards-level creative development with production-grade performance

---

## 1. Project Structure & Architecture

### Directory Layout
```
s:\APPs\SCM-26/
├── public/
│   └── resources/
│       ├── ezgif-frame-001.jpg  → frame-240.jpg  (240 frames, 1.8MB total estimated)
│       └── bicycle-favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with global styles
│   │   ├── page.tsx                      # Main landing page entry
│   │   ├── globals.css                   # Global tailwind + custom CSS
│   │   └── apple-icon.png
│   ├── components/
│   │   ├── Navbar.tsx                    # Fixed header navigation
│   │   ├── Hero.tsx                      # Hero section with headline
│   │   ├── ScrollytellingSection.tsx     # Sticky canvas container + scroll region
│   │   ├── BicycleCanvas.tsx             # Canvas rendering logic
│   │   ├── TextOverlays.tsx              # Phase-based text animations
│   │   ├── StoreStory.tsx                # Brand narrative section
│   │   ├── ProductHighlights.tsx         # Feature cards section
│   │   ├── VisitStore.tsx                # CTA + location section
│   │   ├── Footer.tsx                    # Footer with links
│   │   └── SmoothScroll.tsx              # Lenis integration wrapper
│   ├── hooks/
│   │   ├── useScrollProgress.ts          # Scroll → 0–1 progress calculation
│   │   ├── useImageSequence.ts           # Preload + cache image sequence
│   │   ├── useCanvasRenderer.ts          # Canvas drawing utility
│   │   └── useResponsiveSize.ts          # Responsive canvas dimensions
│   ├── utils/
│   │   ├── colorSystem.ts                # Design tokens (colors, spacing)
│   │   ├── typography.ts                 # Font families, scales
│   │   ├── frameLoader.ts                # Smart image preloading
│   │   └── performance.ts                # Memoization, debounce helpers
│   └── types/
│       └── index.ts                      # Shared TypeScript definitions
├── next.config.js                        # Next.js configuration
├── tailwind.config.js                    # Tailwind design system
├── postcss.config.js                     # PostCSS plugins
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
└── IMPLEMENTATION_PLAN.md                # This file
```

---

## 2. Technology Decisions & Rationale

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14 (App Router) | Server components, optimized image handling, built-in performance |
| **Styling** | Tailwind CSS 3 | Utility-first, design tokens, responsive, performant |
| **Animation** | Framer Motion | Scroll-linked animations, spring physics, memoization support |
| **Canvas Rendering** | HTML5 Canvas 2D | Smooth scrubbing, 60fps capable, pixel-perfect control |
| **Scroll Library** | Lenis | Smooth scroll interpolation, momentum, hardware acceleration |
| **Image Loading** | Custom preloader | Sequential loading, memory-aware caching, retry logic |
| **Typography** | Inter / General Sans via Google Fonts | Premium, clean, industry-standard |
| **DevTools** | TypeScript | Type safety, refactoring confidence, IDE support |

---

## 3. Image Sequence Optimization Strategy

### Frame Count: 240 frames
- **First 60 frames**: Bicycle fully assembled (side profile)
- **Frames 61–180**: Gradual disassembly (components loosening)
- **Frames 181–240**: Full exploded view (all parts separated)

### Loading Pipeline
```
1. Detect viewport + device pixel ratio
2. Request frame list manifest (or dynamically list frames)
3. Preload frames 1–20 immediately (critical path)
4. Preload next 40 frames in background (requestIdleCallback)
5. Cache loaded frames in memory (Blob → ImageBitmap for perf)
6. On scroll: drawImage(cachedFrame) to canvas
```

### Performance Targets
- **First frame render**: < 100ms (no black flash)
- **Scroll scrub**: 60fps maintained (< 16.67ms per frame)
- **Total preload time**: < 2s on 4G
- **Memory footprint**: ~50MB (240 × ~210KB JPEGs)

### Frame Dimensions (estimate)
- Assume 1600px wide × 1200px tall @ 72dpi
- Responsive scaling: 100% width on desktop, 100vw on mobile (with aspect ratio lock)
- Canvas DPI handling: `canvas.width = displayWidth * devicePixelRatio` for crisp rendering

---

## 4. Color System & Design Tokens

### Extracted from Image Sequence
- **Primary Background**: `#000000` (pure black—bicycle sits on void)
- **Fallback Site Background**: `#0a0a0a` (near-black, prevents sharp edge)
- **Text Primary (Headings)**: `#1a1a1a` (dark charcoal)
- **Text Secondary (Body)**: `#666666` (muted gray)
- **Text Tertiary (Captions)**: `#999999` (lighter gray)
- **Accent 1 (Highlights)**: `#d4af37` (soft gold—bicycle chrome echoes)
- **Accent 2 (Subtle)**: `#e8f4f8` (pale sky blue—complements bicycle frame)

### Tailwind Extensions
```javascript
// tailwind.config.js
theme: {
  colors: {
    'bicycle-bg': '#000000',
    'site-bg': '#0a0a0a',
    'text-primary': '#1a1a1a',
    'text-secondary': '#666666',
    'accent-gold': '#d4af37',
    'accent-sky': '#e8f4f8',
  },
  fontFamily: {
    'sans': ['var(--font-inter)', 'system-ui'],
  },
  spacing: {
    // Use 8px base unit
    // sm: 0.5rem, base: 1rem, md: 1.5rem, lg: 2rem, xl: 3rem, 2xl: 4rem
  }
}
```

---

## 5. Component Breakdown & Responsibilities

### A. `Navbar.tsx`
- Fixed header (sticky on scroll, elegant fade-in)
- Logo on left
- Navigation links: "Bikes" | "Accessories" | "Service" | "About" | "Visit Store"
- Minimal design, subtle background blur on scroll
- Mobile hamburger menu with smooth drawer

### B. `Hero.tsx`
- Full viewport (100vh) section
- Centered content with optical centering
- Headline: "Single-Speed Elegance for Urban Riders"
- Subheading: "Handcrafted bicycles designed for timeless style and everyday grace"
- Scroll prompt: "Scroll to Explore" with animated chevron (Framer Motion)
- No parallax (keeps focus on content)

### C. `ScrollytellingSection.tsx`
- **Container**: Extended scroll region (height = 300vh for 3× screen heights to allow smooth scrub)
- **Sticky Canvas**: Positioned sticky, width 100%, max-width 1200px, aspect ratio locked
- **Text Overlays**: Fade in/out layers synced to scroll progress
  - Progress 0–0.3: "Built for the city"
  - Progress 0.3–0.65: "Crafted in every detail"
  - Progress 0.65–1.0: "Simplicity, beautifully engineered"
- **Background**: Matches frame background (#000000) to blend edges
- **Padding**: Generous margins, viewport-centered

### D. `BicycleCanvas.tsx`
- Ref-based canvas element
- Props:
  - `imageUrls`: Array of frame paths
  - `scrollProgress`: 0–1 normalized scroll position
  - `isReduced Motion`: Boolean (from prefers-reduced-motion)
- Logic:
  - Map `scrollProgress` to frame index: `frameIndex = Math.round(scrollProgress * 239)`
  - Use `useCanvasRenderer()` hook to draw cached image to canvas
  - Debounce resize handler to recalculate canvas dimensions
  - Clear canvas, set context properties, `drawImage()` with pixel-ratio correction
- Fallback: If prefers-reduced-motion, show static frame (frame 120, mid-sequence)

### E. `TextOverlays.tsx`
- Three text layers, positioned absolutely over canvas
- Use Framer Motion `useTransform` to map scroll → opacity + translateY
- Stagger fade-in/fade-out (0.2s duration, ease-in-out)
- Text color: accent-gold (#d4af37) for premium feel
- Font size: responsive (clamp 24px – 48px on desktop, 18px – 32px on mobile)
- Line height: 1.3 (tight editorial style)

### F. `StoreStory.tsx`
- Section with editorial narrative
- Asymmetrical grid: text on left (50%), image placeholder on right (50%)
- Headline: "The Kadapa Cycles Philosophy"
- Body text: 2–3 paragraphs on craftsmanship, urban culture, sustainability
- Intersection observer: fade-in on scroll into view
- Background: White (#ffffff), generous padding

### G. `ProductHighlights.tsx`
- 4–5 premium feature cards:
  1. "Lightweight Frame" — Aluminum alloy, XXkg weight
  2. "Timeless Geometry" — Designed for comfort + efficiency
  3. "Everyday Practicality" — Built for daily urban rides
  4. "Hand-Finished Details" — Chrome, leather grips, precision welds
  5. "Local Craft" — Made in Kadapa, India
- Layout: CSS Grid, 2 columns on desktop, 1 on mobile
- Cards: Simple border, icon or illustration (SVG), minimal text
- No gradients, no shadows except subtle (0 2px 8px rgba(0,0,0,0.04))

### H. `VisitStore.tsx`
- CTA section with address, hours, booking link
- Headline: "Visit Kadapa Cycles"
- Address: [Store Address in Kadapa, India]
- Hours: Operating hours
- CTA Button: "Book a Test Ride" (primary, hover effect)
- Optional map preview (Google Maps embed or simple location card)

### I. `Footer.tsx`
- Minimal footer with grid layout
- Links: Home | Bikes | Accessories | Service | About | Contact
- Social: Instagram | Facebook | Twitter (icon links)
- Copyright: "© 2026 Kadapa Cycles. All rights reserved."
- Background: Dark (#0a0a0a), text: light gray (#999999)

### J. `SmoothScroll.tsx`
- Wrapper component that initializes Lenis
- Hooks into next/image for scroll-linked effects
- Optional: Disable on mobile for better touch performance (test on device)

---

## 6. Scroll Interaction Pipeline

### Scroll Progress Calculation
```
useScrollProgress Hook:
1. useRef for container section
2. useEffect: Attach scroll listener to window
3. Calculate: scrollProgress = (scrollY - sectionTop) / sectionHeight
4. Clamp: Math.max(0, Math.min(1, scrollProgress))
5. Return via state (update @ requestAnimationFrame for 60fps)
```

### Frame Mapping
```
scrollProgress (0–1) → frameIndex (0–239):
frameIndex = Math.round(scrollProgress * (totalFrames - 1))

Example:
- scrollProgress = 0.0 → frame 0 (fully assembled)
- scrollProgress = 0.5 → frame 119–120 (mid-disassembly)
- scrollProgress = 1.0 → frame 239 (fully exploded)
```

### Canvas Drawing Loop
```
requestAnimationFrame(() => {
  if (cachedImages[frameIndex] exists) {
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.drawImage(cachedImages[frameIndex], 0, 0, displayWidth, displayHeight);
  }
});
```

---

## 7. Image Preloading & Caching Strategy

### `useImageSequence.ts` Hook
```typescript
// Pseudocode structure
const useImageSequence = (baseUrl: string, totalFrames: number) => {
  const [cache, setCache] = useState<Map<number, ImageBitmap>>(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Load frames 1–20 (critical)
    loadFrames(1, 20, true);
    
    // Phase 2: Load remaining frames (requestIdleCallback)
    requestIdleCallback(() => loadFrames(21, totalFrames, false));
  }, []);

  const loadFrames = async (start, end, isCritical) => {
    for (let i = start; i <= end; i++) {
      const img = new Image();
      img.onload = () => {
        // Convert to ImageBitmap for faster canvas rendering
        const bitmap = await createImageBitmap(img);
        cache.set(i, bitmap);
        setLoadingProgress((i / totalFrames) * 100);
      };
      img.src = `${baseUrl}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
    }
  };

  return { cache, loadingProgress };
};
```

### Caching Strategy
- **Memory Caching**: Use `Map<frameIndex, ImageBitmap>` for O(1) lookup
- **Lazy Loading**: Load frames on-demand (request idle callback for non-critical)
- **Cleanup**: Dispose of bitmaps on unmount or if memory limit exceeded
- **Retry Logic**: Failed frame loads retry 3× with exponential backoff

---

## 8. Animation Choreography

### Text Overlay Phases
```
Scroll Progress → Text Opacity + Position

Phase 1 (0.0–0.35):
  "Built for the city"
  opacity: 0 → 1 → 0.7
  translateY: 20px → 0px
  
Phase 2 (0.25–0.65):
  "Crafted in every detail"
  opacity: 0 → 1 → 0.7
  translateY: -20px → 0px
  
Phase 3 (0.55–1.0):
  "Simplicity, beautifully engineered"
  opacity: 0 → 1 → 1
  translateY: 30px → 0px
```

### Canvas Animation
- Canvas itself doesn't animate (image swap is the animation)
- Subtle zoom-in/zoom-out as progress changes (scale: 0.98 → 1.0 → 1.02)
- Optional: Very light parallax blur filter as disassembly progresses

### Entry Animations (Scroll-into-view)
- **Hero**: Fade-in + slight up motion on mount (useInView)
- **Store Story**: Fade-in + left slide on intersection
- **Product Highlights**: Staggered card fade-in (150ms delay per card)
- **CTA**: Fade-in + subtle scale-up on visibility

---

## 9. Responsive Design Strategy

### Breakpoints (Tailwind standard)
- `sm: 640px` — Small phones
- `md: 768px` — Tablets
- `lg: 1024px` — Desktops
- `xl: 1280px` — Large desktops
- `2xl: 1536px` — Ultra-wide

### Canvas Responsive Sizing
```
Desktop (lg+):
  width: 90vw, max-width: 1200px
  height: aspect-ratio maintained (4:3 or based on frame)

Tablet (md–lg):
  width: 95vw
  height: 70vh (capped to prevent excessive scrolling)

Mobile (sm):
  width: 100vw
  height: 80vh (full width, prevent layout shift)
  padding: 0 (edges can touch screen, but frame content is safe)
```

### Typography Scaling
```
Headline (H1):
  Desktop: 56px (3.5rem)
  Tablet: 42px (2.625rem)
  Mobile: 32px (2rem)
  Using clamp(): clamp(2rem, 5vw, 3.5rem)

Body Text:
  Desktop: 18px (1.125rem)
  Mobile: 16px (1rem)
```

### Navigation
- **Desktop**: Horizontal nav bar (all links visible)
- **Mobile**: Hamburger menu (drawer slides from left)

---

## 10. Performance Optimization Checklist

### Image Optimization
- [ ] Lazy-load non-critical frames (frames 41+ via requestIdleCallback)
- [ ] Use ImageBitmap for faster canvas drawing
- [ ] Compress JPEGs to max quality while maintaining < 300KB per frame
- [ ] Serve via CDN or optimized static hosting

### Canvas Performance
- [ ] Use `canvas.width/height` (not CSS scaling) for crisp rendering
- [ ] Handle `devicePixelRatio` for Retina displays
- [ ] Debounce resize handler (max 300ms)
- [ ] Memoize canvas context getters

### React Performance
- [ ] Memoize BicycleCanvas with React.memo()
- [ ] Use useCallback for scroll event handlers
- [ ] Lazy-load sections below fold (next/dynamic)
- [ ] Disable animations on `prefers-reduced-motion`

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
  - Ensure first frame is rendered immediately
  - Preload critical resources
- **FID** (First Input Delay): < 100ms
  - Keep main thread responsive
  - Debounce scroll handlers
- **CLS** (Cumulative Layout Shift): < 0.1
  - Lock canvas dimensions early
  - Avoid dynamic height changes

---

## 11. Accessibility Strategy

### Semantic HTML
- Use `<section>`, `<article>`, `<nav>`, `<footer>` appropriately
- Heading hierarchy: H1 → H2 → H3 (no skipping)
- `<main>` wrapper for primary content

### Keyboard Navigation
- Tab order follows visual flow
- Focus styles visible (outline or border, >2px, sufficient contrast)
- Links and buttons have :focus-visible states
- Modal/drawer: Trap focus, close on Escape

### Screen Readers
- Add `aria-label` to icon-only buttons
- Describe canvas via `aria-live` region (frame progress: "Frame 120 of 240")
- Use `aria-hidden="true"` for decorative elements

### Motion Accessibility
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Show static key frame instead of scrubbing animation
  // Disable text overlay animations
  // Keep layout interactive but no transforms
}
```

### Color Contrast
- Text on white: #1a1a1a (AAA, 10.5:1)
- Text on dark: #e8f4f8 (AA, 4.5:1)
- All UI elements: Minimum 4.5:1 (AA standard)

### Mobile Touch
- Buttons: Min 44×44px tap target
- Spacing: 16px minimum between interactive elements
- No hover-only interactions (use focus + active states)

---

## 12. File-by-File Implementation Order

### Phase 1: Foundation (Days 1–2)
1. **package.json** — Dependencies
2. **next.config.js** — Next.js config (images, fonts)
3. **tailwind.config.js** — Design tokens
4. **tsconfig.json** — TypeScript setup
5. **src/types/index.ts** — Shared types
6. **src/utils/colorSystem.ts** — Color tokens
7. **src/utils/frameLoader.ts** — Frame preloading logic

### Phase 2: Hooks & Utilities (Days 2–3)
1. **src/hooks/useScrollProgress.ts**
2. **src/hooks/useImageSequence.ts**
3. **src/hooks/useCanvasRenderer.ts**
4. **src/hooks/useResponsiveSize.ts**

### Phase 3: Core Components (Days 3–5)
1. **src/components/Navbar.tsx**
2. **src/components/Hero.tsx**
3. **src/components/BicycleCanvas.tsx**
4. **src/components/TextOverlays.tsx**
5. **src/components/ScrollytellingSection.tsx** (integrate canvas + overlays)

### Phase 4: Supporting Sections (Days 5–6)
1. **src/components/StoreStory.tsx**
2. **src/components/ProductHighlights.tsx**
3. **src/components/VisitStore.tsx**
4. **src/components/Footer.tsx**

### Phase 5: Layout & Integration (Day 6)
1. **src/app/layout.tsx** — Root layout, fonts, providers
2. **src/app/page.tsx** — Main page composition
3. **src/app/globals.css** — Global styles
4. **src/components/SmoothScroll.tsx** — Lenis wrapper (optional)

### Phase 6: Polish & Testing (Days 7–8)
1. Mobile responsive testing & adjustments
2. Performance profiling (DevTools, Lighthouse)
3. Accessibility audit (WAVE, axe DevTools)
4. Cross-browser testing (Chrome, Firefox, Safari, Edge)
5. Touch & scroll testing on real devices
6. Animation polish & frame timing tweaks

---

## 13. Build & Deployment

### Local Development
```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
# Fully optimized static export or server deployment
```

### Deployment Options
- **Vercel** (recommended for Next.js): Zero-config deployment, edge functions
- **Netlify**: Similar, excellent performance
- **Self-hosted**: Node.js server, PM2 for process management

### Environment Variables (if needed)
```
.env.local:
NEXT_PUBLIC_STORE_NAME="Kadapa Cycles"
NEXT_PUBLIC_STORE_ADDRESS="[Address, Kadapa, India]"
NEXT_PUBLIC_STORE_PHONE="[Phone Number]"
```

---

## 14. Testing Strategy

### Unit Tests (optional but recommended)
- `useScrollProgress.ts`: Verify clamping logic, edge cases
- `frameLoader.ts`: Test preload order, retry logic
- Text overlay phasing: Verify opacity/position at key progress points

### E2E Tests (critical)
- Canvas renders without flicker on mount
- Scroll progresses smoothly through all 240 frames
- Reduced motion respected (no animations if enabled)
- Mobile nav opens/closes correctly
- CTA buttons navigate correctly

### Visual Regression Tests
- Lighthouse scores >90 across all metrics
- No layout shifts during scroll
- Mobile layout matches desktop proportionally

---

## 15. Success Metrics

### Performance
- First paint: < 1s
- LCP: < 2.5s
- Scroll FPS: Consistent 60fps
- Image preload time: < 2s on 4G

### UX
- All frames load without user-visible delay
- Scroll feels smooth and responsive
- Text overlays appear at expected moments
- Mobile experience is as premium as desktop

### Accessibility
- WAVE audit: 0 errors
- WCAG 2.1 AA compliance
- 100% keyboard navigable
- Screen reader tested

### Conversion
- CTA buttons are above the fold and prominent
- "Book a Test Ride" has clear hover/focus states
- Contact info is easily accessible in footer

---

## Key Design Decisions Rationale

| Decision | Rationale |
|----------|-----------|
| Black background (#000000) | Matches frame sequence, creates void/space effect, focuses attention on bicycle |
| 240 frames over fewer | Smooth, buttery scrubbing (one frame per ~0.4% scroll) |
| Sticky canvas over parallax | Keeps focal point centered, prevents distraction |
| Text overlays fade (not scroll) | Reads as "narrative reveals" not "text moves" |
| No hamburger on desktop | Clean, premium aesthetic for large screens |
| Lenis for smooth scroll | Feels luxurious, matches premium brand positioning |
| TypeScript + React.memo | Prevents accidental re-renders, improves performance |
| Canvas over WebGL | Simpler, faster to implement, sufficient for this use case |

---

## Estimated Timeline
- **Setup & Configuration**: 4–6 hours
- **Core Components**: 12–16 hours
- **Canvas Integration**: 8–10 hours
- **Mobile Responsive**: 6–8 hours
- **Polish & Optimization**: 6–8 hours
- **Testing & Deploy**: 4–6 hours

**Total**: ~40–54 hours (5–7 days for full-time developer)

---

## Next Steps
1. Review and approve this plan
2. Gather any final requirements or content
3. Confirm store details (address, phone, hours)
4. Extract final color palette from frame sequence
5. Begin Phase 1 implementation

---

**Document Version**: 1.0  
**Last Updated**: April 25, 2026  
**Status**: Ready for Implementation
