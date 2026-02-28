"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ChevronRight } from "lucide-react"
import { CircuitBackground } from "./circuit-background"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <CircuitBackground />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              SYSTEM ONLINE — AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          {/* Name */}
          <h1
            className={`mb-4 text-4xl font-bold tracking-tight text-foreground transition-all delay-200 duration-700 sm:text-5xl md:text-7xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="text-balance">
              Anurag Biswas{" "}
              <span className="text-glow text-primary">Koushik</span>
            </span>
          </h1>

          {/* Title */}
          <p
            className={`mb-6 font-mono text-sm tracking-wider text-muted-foreground transition-all delay-300 duration-700 md:text-base ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            3rd Year Electrical Engineering &bull; University of Alberta
          </p>

          {/* Description */}
          <p
            className={`mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground transition-all delay-[400ms] duration-700 md:text-lg ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Building at the intersection of{" "}
            <span className="text-primary">embedded systems</span>,{" "}
            <span className="text-accent">microcontrollers</span>, and{" "}
            <span className="text-foreground">hardware-software integration</span> — designing reliable,
            practical systems from the ground up.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col items-center gap-4 transition-all delay-500 duration-700 sm:flex-row ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_20px_-3px] hover:shadow-primary/40"
            >
              View My Work
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-mono text-sm text-secondary-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              Get In Touch
            </a>
          </div>

          {/* Floating metrics row */}
          <div
            className={`mt-16 grid grid-cols-2 gap-4 transition-all delay-700 duration-700 sm:grid-cols-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {[
              { value: "11+", label: "Projects Built" },
              { value: "5+", label: "MCU Platforms" },
              { value: "4", label: "Languages" },
              { value: "3rd", label: "Year EE Student" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/50 bg-card/50 px-5 py-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
              >
                <div className="font-mono text-2xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
