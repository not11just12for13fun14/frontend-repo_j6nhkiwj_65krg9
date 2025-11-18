import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

function useParallax(ref, speed = 0.18) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (!inView) return
        const y = -(rect.top * speed)
        el.style.transform = `translateY(${y}px)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      el.style.transform = ''
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, speed])
}

export default function HeroEditorial() {
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, margin: '-10% 0px' })

  const heroRef = useRef(null)
  const tallRef = useRef(null)
  const floatRef = useRef(null)
  useParallax(heroRef, 0.22)
  useParallax(tallRef, 0.14)
  useParallax(floatRef, 0.1)

  return (
    <section ref={rootRef} className="relative isolate" aria-label="Bread Theory editorial showcase">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--background))] to-[color-mix(in_oklab,hsl(var(--background)),hsl(var(--accent))_10%)]" />
        <div className="absolute -top-24 -left-20 w-[36rem] h-[36rem] rounded-full bg-[color-mix(in_oklab,hsl(var(--primary)),white_65%)] blur-3xl opacity-30" />
        <div className="absolute -bottom-28 -right-24 w-[40rem] h-[40rem] rounded-full bg-[color-mix(in_oklab,hsl(var(--secondary)),white_70%)] blur-3xl opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_70%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* Top text */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-20 md:pt-28 lg:pt-32 pb-10">
        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} className="max-w-4xl">
          <h1 className="font-abril text-[clamp(2.5rem,6vw,5rem)] leading-[1.08] tracking-tight text-foreground">
            The Bread Theory
          </h1>
          <p className="mt-4 text-[clamp(1.125rem,2.2vw,1.6rem)] text-[color-mix(in_oklab,hsl(var(--foreground)),transparent_35%)]">
            Where artisanal bread meets culinary craftsmanship.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#menu" className="inline-flex items-center rounded-full border border-[color-mix(in_oklab,hsl(var(--foreground)),transparent_80%)]/60 bg-white/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-md shadow-sm hover:shadow transition-shadow">
              Explore menu
            </a>
            <a href="#story" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-[color-mix(in_oklab,hsl(var(--foreground)),transparent_25%)] hover:text-foreground transition-colors">
              Our story
            </a>
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-7 lg:gap-8">
          {/* Hero card */}
          <motion.div ref={heroRef} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} className="relative md:col-span-6 rounded-3xl overflow-hidden shadow-2xl will-change-transform" style={{ transform: 'translateY(0)' }}>
            <div className="relative w-full aspect-[16/9] md:aspect-[14/6] lg:aspect-[16/6]">
              <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2400&auto=format&fit=crop" alt="48-Hour Sourdough artisan loaf" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md ring-1 ring-white/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span className="text-xs font-medium tracking-wide uppercase">Signature Collection</span>
              </div>
              <h2 className="mt-4 font-abril text-[clamp(1.75rem,3.6vw,2.75rem)] leading-tight">48-Hour Sourdough</h2>
              <p className="mt-1 text-white/90 text-sm md:text-base">Slow fermentation meets wild yeast perfection.</p>
            </div>
          </motion.div>

          {/* Tall left */}
          <motion.div ref={tallRef} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} custom={1} className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-xl will-change-transform" style={{ transform: 'translateY(0)' }}>
            <div className="relative w-full aspect-[3/4] md:aspect-[2/3]">
              <img src="https://images.unsplash.com/photo-1639775464726-1cdf62997893?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxLZWJhYiUyMEtyYXplJTIwJUUyJTgwJTkzJTIwYm9sZHxlbnwwfDB8fHwxNzYzNDgxMzkyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Kebab Kraze – bold spices, fresh ingredients" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#6B4423]/70 via-transparent to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="inline-block rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">Spicy Favorite</span>
            </div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-abril text-[clamp(1.4rem,2.8vw,2rem)]">Kebab Kraze</h3>
              <p className="text-white/85 text-xs md:text-sm">Bold spices, fresh ingredients</p>
            </div>
          </motion.div>

          {/* Top middle */}
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} custom={2} className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl">
            <div className="relative w-full aspect-[16/10]">
              <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1600&auto=format&fit=crop" alt="Bombay Bite – street-style freshness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D23]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 md:p-6 text-white">
              <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-[#6B8E23] to-[#8FBC3F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow">Street-Style</span>
              <h3 className="font-abril text-[clamp(1.25rem,2.4vw,1.75rem)]">Bombay Bite</h3>
            </div>
          </motion.div>

          {/* Top right */}
          <motion.div ref={floatRef} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} custom={3} className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl will-change-transform" style={{ transform: 'translateY(0)' }}>
            <div className="relative w-full aspect-[16/10]">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop" alt="Spinach & Corn – comforting and creamy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#5D4E37]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 md:p-6 text-white">
              <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-[#8B7355] to-[#A0826D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow">Comfort Pick</span>
              <h3 className="font-abril text-[clamp(1.25rem,2.4vw,1.75rem)]">Spinach & Corn</h3>
            </div>
          </motion.div>

          {/* Editorial block */}
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp} custom={4} className="md:col-span-4 rounded-3xl border border-[color-mix(in_oklab,hsl(var(--foreground)),transparent_90%)]/60 bg-[color-mix(in_oklab,hsl(var(--background)),white_10%)]/70 p-8 md:p-12 lg:p-16 text-center shadow-xl backdrop-blur-md">
            <h2 className="font-abril text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.2] text-foreground">Crafted with Patience.</h2>
            <p className="mx-auto mt-3 max-w-3xl text-[clamp(1rem,1.9vw,1.25rem)] text-[color-mix(in_oklab,hsl(var(--foreground)),transparent_30%)]">
              Small batches. Deep flavors. Thoughtful textures. Each loaf is fermented, shaped, and baked with an obsession for detail.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
