import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollJourney() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".home-root .story-beat");
      cards.forEach((card) => {
        const content = card.querySelector<HTMLElement>(".story-content") ?? card;
        gsap.fromTo(content, { y: 24, autoAlpha: .68 }, {
          y: 0, autoAlpha: 1, ease: "none",
          scrollTrigger: { trigger: card, start: "top 76%", end: "top 48%", scrub: .6 },
        });
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=68",
          end: `+=${Math.round(window.innerHeight * .34)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    });
    return () => media.revert();
  }, []);
  return null;
}
