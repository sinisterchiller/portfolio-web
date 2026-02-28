import { Github, Linkedin, Mail } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/sinisterchiller", label: "GitHub" },
  { icon: Linkedin, href: "https://www.instagram.com/koushik_xdd/", label: "Instagram" },
  { icon: Mail, href: "mailto:akoushik@ualberta.ca", label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-mono text-sm font-bold tracking-wider text-primary">
              {"<ABK />"}
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              Electrical Engineering &bull; Embedded Systems
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/30 pt-8 text-center">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
            {"\u00A9"} {new Date().getFullYear()} Anurag Biswas Koushik. Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
