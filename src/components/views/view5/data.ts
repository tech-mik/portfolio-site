import projectTodoBird from '@/assets/images/project-browser-1.jpg'
import projectWildOasis from '@/assets/images/project-browser-2.jpg'
import projectWildOasisDashboard from '@/assets/images/project-browser-3.jpg'
import nextjsAcme from '@/assets/images/project-browser-4.jpg'
import portfolioSite from '@/assets/images/project-browser-5.jpg'
import backstrapp from '@/assets/images/project-browser-6.jpg'
import nextAuth from '@/assets/images/project-browser-7.jpg'

import { Project } from '@/types/Views'
import { RiNextjsLine } from 'react-icons/ri'
import {
  SiTypescript,
  SiReact,
  SiReactquery,
  SiShadcnui,
  SiDrizzle,
  SiReacthookform,
  SiResend,
  SiSupabase,
  SiTailwindcss,
  SiJavascript,
  SiStyledcomponents,
  SiZod,
  SiFramer,
  SiPostgresql,
  SiAuth0,
  SiPrisma,
} from 'react-icons/si'

export const projects: Project[] = [
  {
    title: 'My Portfolio Site',
    github: 'https://github.com/tech-mik/portfolio-site',
    URL: 'https://10holt.dev',
    description:
      'A personal portfolio website showcasing my projects, skills, and experience. Built with Next.js, TypeScript, and Tailwind CSS.',
    image: portfolioSite,
    type: 'Hobby Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'React', icon: SiReact },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'Framer Motion', icon: SiFramer },
      { title: 'Zod', icon: SiZod },
      { title: 'Resend', icon: SiResend },
      { title: 'Postgress', icon: SiPostgresql },
      { title: 'DrizzleORM', icon: SiDrizzle },
    ],
  },
  {
    title: 'Next.js ACME Dashboard',
    github: 'https://github.com/tech-mik/nextjs-acme-dashboard',
    URL: 'https://nextjs-acme-dashboard-mu.vercel.app/login?testing=true',
    description:
      'An official tutorial from Next.js, showcasing a comprehensive dashboard built with Next.js.',
    image: nextjsAcme,
    type: 'Course Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'React', icon: SiReact },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'Zod', icon: SiZod },
      { title: 'Postgress', icon: SiPostgresql },
    ],
  },
  {
    title: 'Todo Bird',
    github: 'https://github.com/tech-mik/TODO_BIRD',
    URL: 'https://todo-bird.vercel.app/auth/signin?testing=true',
    description:
      'A simple todo app with a twist. A bird that helps you keep track of your tasks.',
    image: projectTodoBird,
    type: 'Hobby Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'React', icon: SiReact },
      { title: 'React Query', icon: SiReactquery },
      { title: 'Shadcn UI', icon: SiShadcnui },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'Drizzle ORM', icon: SiDrizzle },
      { title: 'React Hook Form', icon: SiReacthookform },
      { title: 'Resend', icon: SiResend },
      { title: 'Zod', icon: SiZod },
    ],
  },
  {
    title: 'The Wild Oasis',
    github: 'https://github.com/tech-mik/the-wild-oasis-website-ts',
    URL: 'https://the-wild-oasis-website-ts.vercel.app',
    description:
      'A website for a fictional resort in the middle of the jungle. A place to relax and enjoy the nature. A project I migrated to TypeScript myself.',
    image: projectWildOasis,
    type: 'Course Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'React', icon: SiReact },
      { title: 'Supabase', icon: SiSupabase },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'The Wild Oasis Dashboard',
    github: 'https://github.com/tech-mik/the-wild-oasis',
    URL: 'https://the-wild-oasis-three-eta.vercel.app/login?testing=true',

    description:
      'A dashboard for the resort owners to manage the bookings and the resort.',
    image: projectWildOasisDashboard,
    type: 'Course Project',
    icons: [
      { title: 'JavaScript', icon: SiJavascript },
      { title: 'React', icon: SiReact },
      { title: 'React Query', icon: SiReactquery },
      { title: 'Supabase', icon: SiSupabase },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'Styled Components', icon: SiStyledcomponents },
    ],
  },
  {
    title: 'Backstr.app',
    github: 'https://github.com/tech-mik/backstrapp',
    URL: 'https://backstrapp.vercel.app/auth/signin',
    description:
      'I had the ambition to build a production management app for our festivals. This is the first iteration of that idea, and contains only the layout.',
    image: backstrapp,
    type: 'Hobby Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'React', icon: SiReact },
      { title: 'Shadcn UI', icon: SiShadcnui },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'React Hook Form', icon: SiReacthookform },
      { title: 'Zod', icon: SiZod },
      { title: 'Framer Motion', icon: SiFramer },
    ],
  },
  {
    title: 'Auth.js Course',
    github: 'https://github.com/tech-mik/next-auth',
    URL: 'https://next-auth-zeta-one.vercel.app/',
    description:
      'A course project from Code With Antonio, showcasing how to build an authentication system with Next-Auth / Auth.js.',
    image: nextAuth,
    type: 'Course Project',
    icons: [
      { title: 'TypeScript', icon: SiTypescript },
      { title: 'Next.js', icon: RiNextjsLine },
      { title: 'Auth.js', icon: SiAuth0 },
      { title: 'React', icon: SiReact },
      { title: 'Shadcn UI', icon: SiShadcnui },
      { title: 'Tailwind CSS', icon: SiTailwindcss },
      { title: 'React Hook Form', icon: SiReacthookform },
      { title: 'Zod', icon: SiZod },
      { title: 'Postgress', icon: SiPostgresql },
      { title: 'Prisma', icon: SiPrisma },
      { title: 'Resend', icon: SiResend },
    ],
  },
]
