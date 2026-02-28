"use client"

import { useEffect, useRef, useState } from "react"
import { Cpu, Cog, Zap, Target } from "lucide-react"

export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-16 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs tracking-wider text-primary">
        {label}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

const strengths = [
  {
    icon: Cpu,
    title: "Embedded Systems",
    desc: "Designing robust firmware and hardware interfaces using AVR, ARM, and FPGA platforms.",
  },
  {
    icon: Cog,
    title: "Hardware-Software Integration",
    desc: "Bridging the gap between circuits and code to build cohesive, reliable systems.",
  },
  {
    icon: Zap,
    title: "Microcontroller Development",
    desc: "Proficient across ATtiny, ATmega, and STM32 families with real-world project experience.",
  },
  {
    icon: Target,
    title: "System Design",
    desc: "Architecting clean, modular solutions from schematic to firmware to final deployment.",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="// ABOUT"
          title="Building Where Hardware Meets Software"
          description="Third-year Electrical Engineering student at the University of Alberta, passionate about creating systems that are practical, intuitive, and satisfying to use."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div
            className={`space-y-5 transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="leading-relaxed text-muted-foreground">
              I spend my time designing circuits, experimenting with microcontrollers, and writing
              Embedded C to build clean and reliable systems. From{" "}
              <span className="text-foreground font-medium">ATtiny2313A</span> and{" "}
              <span className="text-foreground font-medium">ATmega328P</span> to{" "}
              <span className="text-foreground font-medium">STM32</span> and{" "}
              <span className="text-foreground font-medium">FPGA/VHDL</span> platforms, I enjoy
              working across the full spectrum of embedded development.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My hands-on experience spans RGB LEDs, buzzers, pushbuttons, touch sensors, ultrasonic
              sensors, LCDs, PWM, debouncing, UART, ADC, and digital logic. I am also comfortable
              with ARM assembly, though Embedded C and system design remain my strongest interests.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Outside of engineering, I enjoy gaming, exploring new tech, and building side projects
              for fun. My goal is to make systems that are{" "}
              <span className="text-primary">practical</span>,{" "}
              <span className="text-accent">intuitive</span>, and{" "}
              <span className="text-foreground font-medium">satisfying to use</span>.
            </p>
          </div>

          {/* Strength cards */}
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-700 delay-200 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            {strengths.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-xl border border-border/50 bg-card/50 p-5 transition-all hover:border-primary/30 hover:bg-card/80 glow-border-hover"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
