# Awwwards Scroll Animation Notes

Applied research direction for this rebuild:

- Awwwards inspiration pages for scrollytelling and scroll-sequence sites consistently use fullscreen, sticky visual stages with short narrative beats instead of long explanatory text.
- Awwwards' Scrollsequence nominee tags the pattern directly as Canvas API, fullscreen, scrolling, video, storytelling, GSAP, and JavaScript.
- web.dev animation performance guidance recommends keeping motion to transform and opacity where possible, avoiding layout/paint-heavy properties during animation, and using will-change sparingly.
- web.dev image performance guidance supports eager loading for likely LCP imagery and deferring non-critical resources.
- MDN's prefers-reduced-motion guidance reinforces reducing or replacing motion for users who request it.

Sources:

- https://www.awwwards.com/sites/scrollsequence
- https://www.awwwards.com/inspiration/scrollytelling-seta
- https://www.awwwards.com/inspiration/scroll-animation-evensix
- https://web.dev/animations-and-performance/
- https://web.dev/articles/animations-guide
- https://web.dev/learn/performance/image-performance
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
