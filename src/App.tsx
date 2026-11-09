import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import { gsap } from 'gsap'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Menu,
  MousePointer2,
  Sparkles,
  X,
} from 'lucide-react'
import { siGithub, siInstagram, type SimpleIcon } from 'simple-icons'
import { contact, milestones, projects, skills } from './data'
import arhamPortrait from './assets/arham-portrait.png'
import './App.css'

const currentYear = new Date().getFullYear()

const sourceCode = [
  'import { Portfolio } from "./experience";',
  '',
  'const arham = {',
  '  curiosity: "always on",',
  '  coffee: true,',
  '  ideas: ["thoughtful", "useful", "a little unexpected"],',
  '};',
  '',
  'export default function Experience() {',
  '  return <Portfolio builtWith={arham} />;',
  '}',
].join('\n')

type IntroStage = 'typing' | 'terminal' | 'compiling' | 'ready'

function Intro({ onFinish }: { onFinish: () => void }) {
  const skipButtonRef = useRef<HTMLButtonElement>(null)
  const [stage, setStage] = useState<IntroStage>('typing')
  const [characters, setCharacters] = useState(0)
  const [progress, setProgress] = useState(0)
  const visibleCode = sourceCode.slice(0, characters)
  const codeLines = visibleCode.split('\n')

  useEffect(() => {
    skipButtonRef.current?.focus()
    let terminalTimeout = 0
    let readyTimeout = 0
    let progressInterval = 0

    const typingInterval = window.setInterval(() => {
      setCharacters((current) => {
        const next = Math.min(current + 2, sourceCode.length)
        if (next === sourceCode.length) {
          window.clearInterval(typingInterval)
          setStage('terminal')
          terminalTimeout = window.setTimeout(() => {
            setStage('compiling')
            progressInterval = window.setInterval(() => {
              setProgress((value) => {
                const nextProgress = Math.min(value + 4, 100)
                if (nextProgress === 100) {
                  window.clearInterval(progressInterval)
                  setStage('ready')
                  readyTimeout = window.setTimeout(onFinish, 650)
                }
                return nextProgress
              })
            }, 32)
          }, 780)
        }
        return next
      })
    }, 17)

    return () => {
      window.clearInterval(typingInterval)
      window.clearTimeout(terminalTimeout)
      window.clearTimeout(readyTimeout)
      window.clearInterval(progressInterval)
    }
  }, [onFinish])

  return (
    <motion.div
      className="intro-shell"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio build animation"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="intro-topline">
        <a className="wordmark" href="#home" aria-label="Arham Jawed, home">
          a<span>.</span>
        </a>
        <span className="intro-caption">A SMALL LOOK UNDER THE HOOD</span>
        <button ref={skipButtonRef} className="intro-skip" type="button" onClick={onFinish}>
          Skip intro <ArrowRight size={14} />
        </button>
      </div>

      <div className="editor-layout">
        <section className="editor-window" aria-label="Animated code editor">
          <div className="editor-chrome">
            <div className="window-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span className="editor-tab"><Code2 size={13} /> experience.tsx</span>
            <span className="editor-state"><span /> {stage === 'ready' ? 'READY' : 'EDITING'}</span>
          </div>
          <div className="code-area" aria-live="polite">
            <div className="code-lines" aria-hidden="true">
              {codeLines.map((line, index) => (
                <div className="code-row" key={index}>
                  <span className="line-number">{index + 1}</span>
                  <code>{highlightLine(line)}{index === codeLines.length - 1 && stage === 'typing' ? <i className="typing-cursor" /> : null}</code>
                </div>
              ))}
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-heading"><span /> TERMINAL <span className="terminal-path">~/arham-portfolio</span></div>
            <p className={stage !== 'typing' ? 'terminal-line is-visible' : 'terminal-line'}>
              <span className="terminal-prompt">➜</span> building something thoughtful<span className="terminal-dots">...</span>
            </p>
            <p className={stage === 'compiling' || stage === 'ready' ? 'terminal-line is-visible' : 'terminal-line'}>
              <span className="terminal-check">{stage === 'ready' ? '✓' : '◌'}</span> compiling the good stuff
            </p>
            <div className="compile-track" aria-label={`Compilation progress ${progress}%`}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="compile-foot"><span>{stage === 'ready' ? 'COMPILED SUCCESSFULLY' : 'COMPILING EXPERIENCE'}</span><span>{progress}%</span></div>
          </div>
        </section>

        <motion.aside
          className="editor-preview"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.75 }}
          aria-label="Website preview"
        >
          <div className="preview-meta"><span>LIVE PREVIEW</span><span className="preview-live"><i /> LOCALHOST:5173</span></div>
          <div className="preview-site">
            <div className="preview-nav"><b>AJ<span>.</span></b><span>CREATIVE DEVELOPER</span><i /></div>
            <div className="preview-rule" />
            <span className="preview-eyebrow">INDEPENDENT BY NATURE · ALWAYS CURIOUS</span>
            <div className="preview-headline">MAKING<br />THE WEB<br /><em>FEEL MORE.</em></div>
            <div className="preview-bottom"><span>DESIGN × CODE × CURIOSITY</span><ArrowDownRight size={14} /></div>
          </div>
          <div className="preview-caption"><Sparkles size={12} /> What starts as a few lines becomes a whole experience.</div>
        </motion.aside>
      </div>
      <div className="intro-footer"><span>CREATED WITH CURIOSITY, BY ARHAM JAWED</span><span>NO SHORTCUTS. JUST THE GOOD STUFF.</span></div>
    </motion.div>
  )
}

function highlightLine(line: string) {
  const tokens = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|<\/?[\w.]+[^>]*>|\/\/.*|[{}()[\].,;]|[A-Za-z_$][\w$]*)/g)
  return tokens.map((token, index) => {
    if (/^["']/.test(token)) return <span className="syntax-string" key={index}>{token}</span>
    if (/^<\/?/.test(token)) return <span className="syntax-tag" key={index}>{token}</span>
    if (['import', 'from', 'const', 'export', 'default', 'function', 'return'].includes(token)) {
      return <span className="syntax-keyword" key={index}>{token}</span>
    }
    if (/^[A-Z]/.test(token)) return <span className="syntax-type" key={index}>{token}</span>
    if (/^[{}()[\].,;]$/.test(token)) return <span className="syntax-punctuation" key={index}>{token}</span>
    return token
  })
}

function BrandMark({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MagneticLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}: {
  href: string
  children: ReactNode
  className: string
  target?: string
  rel?: string
  onClick?: () => void
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const element = linkRef.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return
    const move = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect()
      gsap.to(element, {
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    element.addEventListener('mousemove', move)
    element.addEventListener('mouseleave', leave)
    return () => {
      element.removeEventListener('mousemove', move)
      element.removeEventListener('mouseleave', leave)
      gsap.killTweensOf(element)
    }
  }, [])

  return <a ref={linkRef} href={href} className={className} target={target} rel={rel} onClick={onClick}>{children}</a>
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' })
    const move = (event: MouseEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
      const target = event.target
      cursor.classList.toggle('is-hovering', target instanceof Element && Boolean(target.closest('a, button, input, textarea')))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span /></div>
}

function App() {
  const reducedMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('arham-intro-seen')
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)
  const [formStatus, setFormStatus] = useState('')
  const { scrollYProgress } = useScroll()

  const finishIntro = useCallback(() => {
    sessionStorage.setItem('arham-intro-seen', '1')
    setShowIntro(false)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('intro-active', showIntro)
    return () => document.body.classList.remove('intro-active')
  }, [showIntro])

  useEffect(() => {
    if (!menuOpen && !activeProject) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setActiveProject(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, activeProject])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = encodeURIComponent(`A note from ${name}`)
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`)
    setFormStatus('Your email app is opening with your message ready to send.')
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <Cursor />
      <header className="site-header" inert={showIntro || Boolean(activeProject)}>
        <a href="#home" className="wordmark" aria-label="Arham Jawed, home">a<span>.</span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {['About', 'Selected work', 'Skills', 'Education'].map((item) => (
            <a key={item} href={`#${item === 'Selected work' ? 'projects' : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <MagneticLink href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={14} /></MagneticLink>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main inert={showIntro || Boolean(activeProject)}>
        <section className="hero-section" id="home">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-topline">
            <span className="eyebrow"><span className="availability-dot" /> AVAILABLE FOR WHAT&apos;S NEXT</span>
            <span className="hero-location">INDEPENDENT DEVELOPER <span>·</span> 2026</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 0.3 : 0.1 }}>
                ARHAM JAWED <span>—</span> CREATIVE DEVELOPER
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 0.6 : 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                I BUILD<br />
                DIGITAL<br />
                EXPERIENCES<span className="hero-period">.</span>
                <span className="hero-last-line">THAT MAKE AN IMPACT.</span>
              </motion.h1>
              <div className="hero-lower">
                <p>Creative Developer <span>·</span> AI Enthusiast <span>·</span> Software Developer</p>
                <div className="hero-actions">
                  <MagneticLink href="#projects" className="button button-primary">View projects <ArrowDownRight size={16} /></MagneticLink>
                  <MagneticLink href="#contact" className="button button-quiet">Contact me <ArrowUpRight size={16} /></MagneticLink>
                </div>
              </div>
            </div>
            <motion.div className="portrait-frame" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: showIntro ? 0.8 : 0.3, duration: 0.8 }}>
              <img
                src={arhamPortrait}
                alt="Arham Jawed"
                fetchPriority="high"
              />
              <div className="portrait-grain" />
              <span className="portrait-index">01 / THE BUILDER</span>
              <span className="portrait-caption">A good idea deserves<br />a good build.</span>
              <div className="portrait-stamp"><span>ALWAYS<br />IN PROGRESS</span><ArrowDownRight size={17} /></div>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <span>THOUGHTFUL CODE. USEFUL THINGS.</span>
            <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
            <span className="hero-coordinate">INDEPENDENT BY NATURE</span>
          </div>
        </section>

        <section className="intro-note section-pad" id="about">
          <Reveal className="section-label"><span>01 — A LITTLE ABOUT ME</span><span>THE PERSON BEHIND THE PIXELS</span></Reveal>
          <div className="about-grid">
            <Reveal className="about-title">
              <span className="eyebrow">PART BUILDER, PART QUESTION-ASKER</span>
              <h2>Code is how<br />I make <em>ideas</em><br />feel real.</h2>
            </Reveal>
            <Reveal className="about-copy" delay={0.12}>
              <p className="about-lead">I&apos;m Arham — a developer drawn to the sweet spot between how something works and how it makes you feel.</p>
              <p>I like clean foundations, considered details, and the moment a rough idea becomes something someone can actually use. Lately, I&apos;ve been exploring the ways AI can make that process more useful, not just more automated.</p>
              <p>My goal is simple: keep learning, build with care, and make digital spaces that leave things a little better than I found them.</p>
              <a className="text-link" href={`mailto:${contact.email}`}>A bit more? Say hello <ArrowUpRight size={15} /></a>
            </Reveal>
          </div>
          <div className="stats-row">
            <Reveal className="stat"><strong>03<span>+</span></strong><span>CREATIVE STUDIES</span></Reveal>
            <Reveal className="stat" delay={0.08}><strong>12<span>+</span></strong><span>TOOLS TO EXPLORE</span></Reveal>
            <Reveal className="stat" delay={0.16}><strong>∞</strong><span>THINGS LEFT TO LEARN</span></Reveal>
            <Reveal className="stats-note">Still a work in progress.<br />That&apos;s the fun part.</Reveal>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <Reveal className="section-label"><span>02 — SELECTED WORK</span><span>SOFTWARE, AI &amp; FULL-STACK PROJECTS</span></Reveal>
          <div className="section-heading-row">
            <Reveal><h2 className="section-heading">A few things<br />I&apos;ve <em>made.</em></h2></Reveal>
            <Reveal className="projects-intro" delay={0.12}>
              <p>A selection of software and AI projects that demonstrate my growing skills in application development, backend engineering, and intelligent systems.</p>
              <a href="#contact" className="text-link">Have a good question? <ArrowUpRight size={15} /></a>
            </Reveal>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal className={`project-card project-${project.tone}`} delay={index * 0.08} key={project.name}>
                <button className="project-visual" type="button" onClick={() => setActiveProject(project)} aria-label={`Open ${project.name} preview`}>
                  <img src={project.image} alt="" loading="lazy" />
                  <div className="project-art-overlay" />
                  <div className="project-art-label"><span>FEATURED PROJECT / {project.number}</span><ArrowUpRight size={16} /></div>
                  <span className="project-art-title">{project.name}</span>
                  <span className="project-art-mark">{project.number}</span>
                </button>
                <div className="project-info">
                  <div className="project-info-top"><span>{project.type}</span><span>{project.number} / 03</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-actions">
                      <button className="project-open" type="button" onClick={() => setActiveProject(project)}>Live demo <ArrowUpRight size={14} /></button>
                      <a className="project-open" href={contact.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={12} /></a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="projects-footnote"><span><span className="tiny-spark">✳</span> THE NEXT ONE IS ALREADY IN MY NOTES.</span><span>MORE IN THE WORKS <ArrowRight size={13} /></span></Reveal>
        </section>

        <section className="skills-section section-pad" id="skills">
          <Reveal className="section-label"><span>03 — THE TOOLKIT</span><span>ALWAYS GROWING, NEVER FINISHED</span></Reveal>
          <div className="skills-head">
            <Reveal><h2 className="section-heading">Good tools.<br /><em>Better questions.</em></h2></Reveal>
            <Reveal className="skills-aside" delay={0.1}><p>A practical mix of front-end craft, thoughtful tooling, and a healthy curiosity about what comes next.</p><span><MousePointer2 size={14} /> Hover to explore</span></Reveal>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <Reveal className="skill-cell" delay={(index % 4) * 0.035} key={skill.name}>
                <div className="skill-icon" style={{ '--skill-color': skill.color } as CSSProperties}>
                  {'icon' in skill ? <svg viewBox="0 0 24 24" role="img" aria-label={`${skill.name} logo`}><path d={skill.icon.path} /></svg> : <span>{skill.mark}</span>}
                </div>
                <div className="skill-label"><strong>{skill.name}</strong><span>{skill.level}</span></div>
                <div className="skill-line"><span style={{ '--skill-level': skill.level === 'Advanced' ? '88%' : skill.level === 'Daily use' ? '72%' : skill.level === 'Building' ? '60%' : skill.level === 'Learning' ? '44%' : '36%', animationDelay: `${index * 65}ms` } as CSSProperties} /></div>
              </Reveal>
            ))}
          </div>
          <Reveal className="skills-note"><Sparkles size={15} /><span>AI is at its best when it helps people do their best thinking.</span></Reveal>
        </section>

        <section className="journey-section section-pad" id="education">
          <Reveal className="section-label"><span>04 — MY EDUCATION</span><span>ACADEMIC BACKGROUND</span></Reveal>
          <div className="journey-grid">
            <Reveal className="journey-heading">
              <span className="eyebrow">MY ACADEMIC BACKGROUND</span>
              <h2 className="section-heading">My <em>Education.</em></h2>
              <p>My academic journey so far, with my diploma currently in progress.</p>
            </Reveal>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <Reveal className="timeline-entry" delay={index * 0.1} key={milestone.title}>
                  <span className="timeline-marker">{index === 0 ? <span /> : '0' + (index + 1)}</span>
                  <div className="timeline-content">
                    <span className="timeline-date">{milestone.date} <i /> {milestone.kind}</span>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="journey-footer"><span>LEARNING, BUILDING, AND MOVING FORWARD.</span><span>THE STORY IS STILL BEING WRITTEN <ArrowDownRight size={15} /></span></Reveal>
        </section>

        <section className="contact-section section-pad" id="contact">
          <Reveal className="section-label"><span>05 — YOUR TURN</span><span>MY INBOX IS OPEN</span></Reveal>
          <div className="contact-grid">
            <Reveal className="contact-copy">
              <span className="eyebrow"><span className="availability-dot" /> OPEN TO GOOD CONVERSATIONS</span>
              <h2>Have a project<br />in mind? Let&apos;s build<br /><em>something great.</em></h2>
              <p>Got a curious idea, a tricky problem, or just want to talk shop? I&apos;d love to hear what you&apos;re thinking.</p>
              <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={16} /></a>
              <div className="social-links">
                <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><BrandMark icon={siGithub} /></a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="linkedin-mark">in</span></a>
                <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><BrandMark icon={siInstagram} /></a>
              </div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.12}>
              <div className="form-topline"><span>01—03 / A NOTE FROM YOU</span><ArrowDownRight size={17} /></div>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name">YOUR NAME</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="How should I address you?" minLength={2} maxLength={80} required />
                <label htmlFor="contact-email">EMAIL ADDRESS</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" maxLength={254} required />
                <label htmlFor="contact-message">WHAT ARE YOU THINKING?</label>
                <textarea id="contact-message" name="message" rows={3} minLength={10} maxLength={3000} placeholder="A little about your project, idea, or question..." required />
                <button className="button button-primary form-submit" type="submit">Send a note <ArrowUpRight size={16} /></button>
                <p className="form-disclaimer">Your email app opens with a ready-to-send note. No bots, no mailing list.</p>
                <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
              </form>
            </Reveal>
          </div>
          <div className="contact-bottom"><span>INDEPENDENT <span>·</span> WORKING EVERYWHERE</span><span>THOUGHTFUL BY DESIGN, ALWAYS.</span></div>
        </section>
      </main>

      <footer className="site-footer" inert={showIntro || Boolean(activeProject)}>
        <a href="#home" className="footer-wordmark">a<span>.</span></a>
        <span>MADE WITH CARE &amp; A LITTLE TOO MUCH COFFEE.</span>
        <a href="#home" className="back-top">BACK TO THE TOP <ArrowUpRight size={13} /></a>
        <span className="copyright">© {currentYear} ARHAM JAWED</span>
      </footer>

      <AnimatePresence>{showIntro && <Intro key="intro" onFinish={finishIntro} />}</AnimatePresence>
      <AnimatePresence>
        {activeProject && (
          <motion.div className="preview-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}>
            <motion.section className={`preview-modal preview-modal-${activeProject.tone}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.985 }} onClick={(event) => event.stopPropagation()}>
              <div className="modal-topbar"><span>ARHAM JAWED / PROJECT OVERVIEW</span><button type="button" onClick={() => setActiveProject(null)} aria-label="Close preview"><X size={18} /></button></div>
              <div className="modal-image"><img src={activeProject.image} alt="" /><span>VISUAL EXPLORATION / {activeProject.number}</span></div>
              <div className="modal-content">
                <span className="eyebrow">{activeProject.type}</span>
                <h2 id="modal-title">{activeProject.name}<span>.</span></h2>
                <p>{activeProject.description}</p>
                <div className="project-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="modal-note"><span className="availability-dot" /> Project status and implementation details are available in the source repository.</div>
                <a className="button button-primary modal-link" href={contact.github} target="_blank" rel="noreferrer">Find me on GitHub <ExternalLink size={15} /></a>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{reducedMotion ? 'Reduced motion enabled.' : ''}</span>
    </>
  )
}

export default App
