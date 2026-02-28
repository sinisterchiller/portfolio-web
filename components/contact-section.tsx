"use client"

import { useState, useEffect, useRef } from "react"
import { SectionHeader } from "./about-section"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "akoushik@ualberta.ca",
    href: "mailto:akoushik@ualberta.ca",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 780 935 3110",
    href: "tel:+17809353110",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Edmonton, Alberta",
    href: null,
  },
]

export function ContactSection() {
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
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="// CONTACT"
          title="Let's Work Together"
          description="Open to opportunities, collaborations, and interesting projects. Whether you have a question or just want to say hello, I'd love to hear from you."
        />

        <div
          className={`grid gap-10 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Contact info & details */}
          <div className="space-y-8">
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const content = (
                  <div className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/30 p-5 transition-all hover:border-primary/30 hover:bg-card/60">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="mt-1 text-sm text-foreground">{item.value}</div>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>

            {/* System status */}
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-xs tracking-wider text-accent">
                  SIGNAL ACTIVE
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Currently seeking internship and co-op opportunities in embedded systems,
                firmware development, and hardware engineering roles.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[10px] tracking-wider text-muted-foreground"
                >
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[10px] tracking-wider text-muted-foreground"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block font-mono text-[10px] tracking-wider text-muted-foreground"
              >
                SUBJECT
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                className="w-full rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[10px] tracking-wider text-muted-foreground"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_20px_-3px] hover:shadow-primary/40"
            >
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
