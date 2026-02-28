"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./about-section"

const skillCategories = [
  {
    title: "Hardware / Engineering",
    color: "primary",
    skills: ["Hardware Design", "Embedded Systems", "Microcontrollers", "Digital Logic", "FPGA / VHDL"],
  },
  {
    title: "Programming",
    color: "accent",
    skills: ["Embedded C", "C++", "Python", "Assembly"],
  },
  {
    title: "Tools / CAD",
    color: "glow-amber",
    skills: ["KiCad", "Fusion 360", "AutoCAD"],
  },
  {
    title: "Platforms / Concepts",
    color: "primary",
    skills: [
      "ATtiny2313A",
      "ATmega328P",
      "STM32",
      "UART",
      "ADC",
      "PWM",
      "LCD Interfacing",
      "Debouncing",
      "THUMB-2",
      "FPGA Design",
    ],
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  primary: {
    border: "border-primary/30",
    bg: "bg-primary/5",
    text: "text-primary",
    glow: "hover:shadow-primary/20",
  },
  accent: {
    border: "border-accent/30",
    bg: "bg-accent/5",
    text: "text-accent",
    glow: "hover:shadow-accent/20",
  },
  "glow-amber": {
    border: "border-glow-amber/30",
    bg: "bg-glow-amber/5",
    text: "text-glow-amber",
    glow: "hover:shadow-glow-amber/20",
  },
}

export function SkillsSection() {
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
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-32">
      {/* subtle horizontal line separator */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="// SKILLS"
          title="Technical Arsenal"
          description="A comprehensive toolkit spanning hardware design, firmware development, and system-level programming."
        />

        <div
          className={`grid gap-6 md:grid-cols-2 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {skillCategories.map((cat, catIdx) => {
            const colors = colorMap[cat.color] || colorMap.primary
            return (
              <div
                key={cat.title}
                className={`group rounded-xl border ${colors.border} bg-card/30 p-6 transition-all hover:bg-card/60 hover:shadow-[0_0_20px_-5px] ${colors.glow}`}
                style={{ transitionDelay: `${catIdx * 100}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className={`h-1.5 w-1.5 rounded-full ${colors.bg} ${colors.text}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${colors.text === "text-primary" ? "bg-primary" : colors.text === "text-accent" ? "bg-accent" : "bg-glow-amber"}`} />
                  </div>
                  <h3 className={`font-mono text-sm font-semibold tracking-wider ${colors.text}`}>
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-md border ${colors.border} ${colors.bg} px-3 py-1.5 font-mono text-xs ${colors.text} transition-all hover:border-opacity-60 hover:bg-opacity-20`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
