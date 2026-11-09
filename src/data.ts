import type { mark } from 'framer-motion/client'
import {
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siPostgresql,
  siPython,
  siReact,
  siClaude,
} from 'simple-icons'

export const contact = {
  email: 'arhamjawed32@gmail.com',
  github: 'https://github.com/arham969',
  linkedin: 'https://www.linkedin.com/in/arham-jawed-329062449/',
  instagram: 'https://www.instagram.com/arham_jawed20?vrfl=dTQyNDRkM3UyeXRz',
}

export const skills = [
  { name: 'HTML5', icon: siHtml5, color: '#e34f26', level: 'Advanced' },
  { name: 'CSS3', icon: siCss, color: '#1572b6', level: 'Advanced' },
  { name: 'JavaScript', icon: siJavascript, color: '#f7df1e', level: 'Advanced' },
  { name: 'Machine Learning', mark: 'ML', color: '#61dafb', level: 'Building' },
  { name: 'Python', icon: siPython, color: '#3776ab', level: 'Building' },
  { name: 'SQL', mark: 'SQL', color: '#e38b50', level: 'Learning' },
  { name: 'PostgreSQL', icon: siPostgresql, color: '#4169e1', level: 'Learning' },
  { name: 'Git', icon: siGit, color: '#f05032', level: 'Daily use' },
  { name: 'GitHub', icon: siGithub, color: '#f0f0ef', level: 'Daily use' },
  { name: 'ChatGPT', mark: 'Chatgpt', color: '#74aa9c', level: 'Daily use' },
  { name: 'Claude', icon: siClaude, color: '#d97757', level: 'Daily use' },
  { name: 'Prompting', mark: 'P', color: '#ff5a30', level: 'Exploring' },
] as const

export const projects = [
  {
    number: '01',
    name: 'H.E.A.R.T AI',
    type: 'Asistant AI / Personal research project',
    description:
      'HEART AI — Human Emotions Analysis & Response Technology. An intelligent AI system designed to understand emotional signals, generate adaptive responses, and improve human-AI interaction.',
    tags: ['Python', 'SQLite', 'Safety'],
    image: '/projects/heromic-ai.svg',
    tone: 'heromic',
  },
  {
    number: '02',
    name: 'TaskFlow',
    type: 'Backend application / API project',
    description:
      'A task management API built to practice reliable CRUD operations, task status workflows, validation, and PostgreSQL-backed data handling.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'REST API'],
    image: '/projects/taskflow.svg',
    tone: 'taskflow',
  },
  {
    number: '03',
    name: 'Nexus Business Suite',
    type: 'Full-stack business dashboard',
    description:
      'A unified CRM and ERP dashboard concept connecting customer management, HR, inventory, sales, purchasing, finance, and business analytics.',
    tags: ['React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL'],
    image: '/projects/nexus-dashboard.svg',
    tone: 'nexus',
  },
] as const

export const milestones = [
  {
    date: 'COMPLETED',
    title: 'Matric',
    kind: 'RRBK School',
    description: 'Marks: 58%',
  },
  {
    date: 'COMPLETED',
    title: 'Intermediate',
    kind: 'Govt Inter Boy College',
    description: 'Marks: 40%',
  },
  {
    date: 'IN PROGRESS',
    title: 'Diploma',
    kind: 'Poly Technic Institute',
    description: 'Currently pursuing diploma studies.',
  },
] as const
