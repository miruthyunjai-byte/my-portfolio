import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const resumePath = `${import.meta.env.BASE_URL}resume.pdf`
const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Contact']

function SectionTitle({ eyebrow, title, children }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="site-header"><div className="nav-wrap">
    <a className="brand" href="#home" onClick={close}>SM<span>.</span></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span className="sr-only">Toggle navigation</span><span></span><span></span><span></span></button>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main navigation">{navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={close}>{item}</a>)}</nav>
  </div></header>
}

const skillGroups = [
  ['Programming', 'Java', 'C', 'Python'], ['Web', 'HTML', 'CSS', 'JavaScript', 'React.js'],
  ['Backend / APIs', 'Flask', 'REST APIs', 'JDBC'], ['Databases', 'MySQL', 'Oracle Database'],
  ['Tools', 'Git', 'GitHub', 'VS Code'], ['Core CS', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
]

const projects = [
  { title: 'Gym Management System', tech: 'Java · MySQL · JDBC · HTML · CSS · JavaScript', text: 'An application for managing gym members, records, attendance, and payments.', features: 'Member records, attendance tracking, and payment management.', contribution: 'Built the interface, Java application logic, and database operations using JDBC and MySQL.' },
  { title: 'Event Management and Recommendation System', tech: 'React.js · JavaScript · HTML · CSS · SQL', text: 'A web application concept for exploring event services and finding options within a budget.', features: 'Service selection and budget-based recommendations.', contribution: 'Worked on the UI, service selection, and budget-based recommendation logic.' },
  { title: 'AI-driven Tourism Planner', tech: 'Tourism Planning · Recommendation Logic · User Constraints', text: 'A tourism-planning concept based on destination, budget, duration, group type, and travel style.', features: 'Proposed features: personalized itineraries, map exploration, sustainable destinations, and dynamic itinerary adjustment.', contribution: 'Developed the project concept, travel preference inputs, itinerary structure, and recommendation planning.' },
]

function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' })
  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) { form.reportValidity(); return }
    const data = new FormData(form)
    if (!formEndpoint) {
      const subject = encodeURIComponent(data.get('subject'))
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`)
      setStatus({ type: 'info', message: 'No form service is configured. Your email app will open so you can send this message.' })
      window.location.href = `mailto:miruthyunjaism@gmail.com?subject=${subject}&body=${body}`
      return
    }
    setStatus({ type: 'info', message: 'Sending your message…' })
    try {
      const response = await fetch(formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Request failed')
      form.reset(); setStatus({ type: 'success', message: 'Your message was sent successfully. Thank you!' })
    } catch {
      setStatus({ type: 'error', message: 'Your message could not be sent. Please email me directly instead.' })
    }
  }
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-grid">
    <label>Full Name<input name="name" required autoComplete="name" /></label>
    <label>Email<input name="email" type="email" required autoComplete="email" /></label>
  </div><label>Subject<input name="subject" required /></label><label>Message<textarea name="message" rows="5" required></textarea></label>
  <button className="button" type="submit">Send Message</button>
  {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}</form>
}

function App() {
  return <><Header /><main>
    <section id="home" className="hero"><div className="hero-copy"><p className="eyebrow">Hello, I’m</p><h1>S M <span>MIRUTHYUNJAI</span></h1><p className="hero-title">Java Developer <b>|</b> Software Developer</p><p className="lead">I’m a Computer Science and Engineering student who enjoys solving problems and building useful applications. I mainly work with Java and continue improving my programming skills through hands-on projects.</p><div className="actions"><a className="button" href="#contact">Contact Me</a><a className="button secondary" href={resumePath} download>Download Resume</a></div></div><aside className="hero-card"><p>Currently studying</p><strong>B.E. Computer Science<br />and Engineering</strong><span>Rajalakshmi Engineering College, Chennai</span><div></div><small>Expected graduation · 2027</small></aside></section>
    <section id="about"><SectionTitle eyebrow="ABOUT ME" title="Building practical solutions, one project at a time." /><div className="about-grid"><p className="body-copy">I’m pursuing a B.E. in Computer Science and Engineering at Rajalakshmi Engineering College. I enjoy solving programming problems and developing practical applications. I’m interested in Java development, backend programming, and writing clean, reliable code. My goal is to grow as a software developer and contribute to meaningful projects.</p><div><h3>Career interests</h3><div className="tag-list">{['Java Development','Backend Development','Problem Solving','Application Development'].map(x => <span key={x}>{x}</span>)}</div><h3>Strengths</h3><div className="tag-list">{['Quick learner','Problem-solving mindset','Teamwork','Adaptability','Willingness to learn'].map(x => <span key={x}>{x}</span>)}</div></div></div></section>
    <section id="skills" className="muted"><SectionTitle eyebrow="SKILLS" title="Tools and technologies" /><div className="skills-grid">{skillGroups.map(([title, ...skills]) => <article className="card skill-card" key={title}><h3>{title}</h3><div className="tag-list">{skills.map(x => <span key={x}>{x}</span>)}</div></article>)}</div></section>
    <section id="projects"><SectionTitle eyebrow="PROJECTS" title="Selected work" >A snapshot of applications and concepts I have worked on.</SectionTitle><div className="projects-grid">{projects.map((p, i) => <article className="card project-card" key={p.title}><span className="project-number">0{i + 1}</span><h3>{p.title}</h3><p>{p.text}</p><dl><dt>Technologies</dt><dd>{p.tech}</dd><dt>{i === 2 ? 'Proposed features' : 'Features'}</dt><dd>{p.features}</dd><dt>My contribution</dt><dd>{p.contribution}</dd></dl></article>)}</div></section>
    <section id="education" className="muted"><SectionTitle eyebrow="EDUCATION" title="Academic background" /><div className="education-grid"><article className="card education-primary"><p className="eyebrow">2023–2027</p><h3>B.E. Computer Science and Engineering</h3><p>Rajalakshmi Engineering College, Chennai</p><strong>CGPA: 7.07/10</strong><small>Expected graduation 2027</small></article><article className="card"><h3>12th Grade</h3><p>Maharishi Vidya Mandir, Hosur</p><strong>71.80%</strong></article><article className="card"><h3>10th Grade</h3><p>Maharishi Vidya Mandir, Hosur</p><strong>65.20%</strong></article></div></section>
    <section id="achievements"><SectionTitle eyebrow="ACHIEVEMENTS" title="Recognition and learning" /><div className="achievement-grid"><article className="card"><p className="eyebrow">IMPACT AI THON</p><h3>St. Joseph’s Engineering College</h3><p>Selected among the Top 75 teams out of 650 for an AI-driven Tourism Planner.</p></article></div></section>
    <section id="contact" className="contact-section"><div><SectionTitle eyebrow="CONTACT" title="Let’s connect" >Feel free to reach out for opportunities, collaborations, or a conversation about technology.</SectionTitle><div className="contact-links"><a href="mailto:miruthyunjaism@gmail.com">miruthyunjaism@gmail.com</a><a href="tel:+919385609075">+91 9385609075</a><a href="https://www.linkedin.com/in/miruthyunjai-manivannan-53b20b2a2/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/miruthyunjai-codes" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://leetcode.com/u/Miruthyunjaism/" target="_blank" rel="noreferrer">LeetCode ↗</a></div></div><ContactForm /></section>
  </main><footer><div className="brand">SM<span>.</span></div><p>Designed and built by S M MIRUTHYUNJAI.</p><p>Java Developer | Software Developer</p><small>© 2026 S M MIRUTHYUNJAI. All rights reserved.</small></footer></>
}

createRoot(document.getElementById('root')).render(<App />)
