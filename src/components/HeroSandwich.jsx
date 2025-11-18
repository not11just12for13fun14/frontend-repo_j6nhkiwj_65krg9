import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import lottie from 'lottie-web';

export default function HeroSandwich({
  id = 'hero-sandwich',
  height = '100vh',
  gradient = 'linear-gradient(120deg, hsl(var(--background)) 0%, hsl(var(--primary)/0.3) 50%, hsl(var(--secondary)) 100%)',
  blobs = [
    { size: 320, className: 'bg-primary/25 blur-3xl animate-blob top-10 right-10' },
    { size: 260, className: 'bg-accent/20 blur-2xl animate-blob bottom-20 left-14' },
  ],
  left = {
    heading: 'Golden Toast. Science of Flavor.',
    text: 'Where chemistry meets cravings — scroll to craft your sandwich.',
    cta: 'Explore Menu',
  },
  lottieSrc = '/animations/sandwich-hero.json',
  parallaxDepth = 0.25,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const lottieRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const leftOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, parallaxDepth * -200]);

  // Initialize Lottie
  useEffect(() => {
    if (!lottieContainerRef.current) return;
    lottieRef.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: lottieSrc,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice', progressiveLoad: true },
    });

    return () => {
      try { lottieRef.current?.destroy?.(); } catch {}
    };
  }, [lottieSrc]);

  // Drive frames with scroll
  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim) return;

    const unsubscribe = scrollYProgress.on('change', (v) => {
      const total = anim.totalFrames || 100;
      anim.goToAndStop(Math.max(0, Math.min(total, v * total)), true);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const blobEls = useMemo(() => (
    blobs.map((b, i) => (
      <div
        key={i}
        className={`pointer-events-none absolute ${b.className}`}
        style={{ width: b.size, height: b.size, borderRadius: b.size }}
      />
    ))
  ), [blobs]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: height }}
    >
      {/* Background gradient and blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
        {blobEls}
      </div>

      {/* Sticky stage */}
      <div ref={stickyRef} className="sticky top-0 h-[100vh] flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div style={{ opacity: leftOpacity, y: leftY }}>
              <h1 className="font-abril text-5xl md:text-6xl text-foreground leading-[1.05]">
                {left.heading}
              </h1>
              <p className="text-muted-foreground font-body mt-6 text-lg">
                {left.text}
              </p>
              <button className="bg-primary text-primary-foreground rounded-lg px-8 py-3 mt-10 shadow-xl hover:scale-105 transition-all ease-out">
                {left.cta}
              </button>
            </motion.div>

            {/* Right Lottie visual */}
            <motion.div style={{ y: rightY }} className="w-[80%] mx-auto">
              <div ref={lottieContainerRef} className="w-full aspect-square" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spacer to enable scroll distance for pinning */}
      <div className="h-[120vh]" />
    </section>
  );
}
