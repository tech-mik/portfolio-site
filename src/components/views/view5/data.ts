import projectTodoBird from '@/assets/images/project-browser-1.jpg'
import projectWildOasis from '@/assets/images/project-browser-2.jpg'
import projectWildOasisDashboard from '@/assets/images/project-browser-3.jpg'

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
} from 'react-icons/si'

export const projects: Project[] = [
  {
    title: 'Todo Bird',
    github: 'http://github.com',
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
    ],
  },
  {
    title: 'The Wild Oasis',
    github: 'http://github.com',
    description:
      'A website for a fictional resort in the middle of the jungle. A place to relax and enjoy the nature.',
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
    github: 'http://github.com',
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
]
