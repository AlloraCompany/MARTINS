"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/all";

gsap.registerPlugin([useGSAP, SplitText]);

export default function HeroText() {
  const heroText1 = useRef(null);
  const heroText2 = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: Infinity,
      repeatDelay: 0.5,
    });
    const split1 = SplitText.create(heroText1.current, {
      type: "chars",
    });

    const split2 = SplitText.create(heroText2.current, {
      type: "chars",
    });

    tl.from(split1.chars, {
      display: "none",
      stagger: 0.1,
      duration: 0.1,
      ease: "none",
    });

    tl.to(split1.chars, {
      display: "none",
      stagger: {
        from: "end",
        amount: 1.5,
      },
      delay: 1,
      duration: 0.1,
      ease: "none",
    });

    tl.from(split2.chars, {
      display: "none",
      stagger: 0.1,
      delay: 0.5,
      duration: 0.1,
      ease: "none",
    });

    tl.to(split2.chars, {
      display: "none",
      stagger: {
        from: "end",
        amount: 1.5,
      },
      delay: 1,
      duration: 0.1,
      ease: "none",
    });
  });
  return (
    <h1 className="text-clamp-xl leading-tight font-bold mr-auto">
      Construímos <span ref={heroText1}>mais que prédios...</span>
      <span ref={heroText2}>histórias.</span>
    </h1>
  );
}
