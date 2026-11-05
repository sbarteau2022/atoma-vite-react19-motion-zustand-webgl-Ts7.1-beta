import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduce =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const node = root.current
    if (!node || reduce) return

    const ctx = gsap.context(() => {
      gsap.from('.hero .kicker, .hero h1, .hero .lede, .hero .wide-cta', {
        y: 22,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.08,
      })
      gsap.from('.layer-acc li', {
        y: 12,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.35,
      })

      const later = node.querySelectorAll(
        '.overview-text, .flow-cards li, .workflow li, .block, .insight-list li, .faq-split, .live-demo, .video-panel',
      )
      later.forEach((el) => {
        gsap.from(el, {
          y: 16,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        })
      })
    }, node)

    return () => ctx.revert()
  }, [root])
}
