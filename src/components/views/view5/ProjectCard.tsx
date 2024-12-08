import ProjectTypeBadge from '@/components/ProjectTypeBadge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IconWithTooltip } from '@/components/views/view5'
import { Project } from '@/types/Views'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { SiGithub } from 'react-icons/si'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, x: 10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: 'spring', bounce: 1, damping: 8 },
  },
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.article
      whileHover={{ scale: 1.05 }}
      variants={itemVariants}
      className='flex flex-row border-gray-100 bg-white shadow-xl border rounded-xl w-full h-[300px] cursor-pointer overflow-hidden'
      ref={ref}>
      <Link
        href={project.URL}
        target='_blank'
        className='flex flex-col justify-between items-start gap-5 p-5 sm:p-10 w-4/5 sm:w-3/5'>
        <div className='space-y-3'>
          <div className='justify-start items-center gap-2'>
            <div className='flex flex-row items-start gap-3'>
              <h3 className='font-arima font-extrabold text-2xl'>
                {project.title}
              </h3>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target='_blank'
                      className='bg-white shadow-sm mb-1 p-1 border rounded-full'>
                      <SiGithub />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>View on Github</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ProjectTypeBadge projectType={project.type} />
          </div>
          <p className='text-sm'>{project.description}</p>
        </div>
        <div className='flex flex-row flex-wrap gap-2'>
          <TooltipProvider delayDuration={100}>
            {project.icons.map((icon, i) => (
              <IconWithTooltip key={i} icon={icon} />
            ))}
          </TooltipProvider>
        </div>
      </Link>
      <div className='relative w-1/5 sm:w-2/5 h-full'>
        <div className='top-10 absolute flex flex-col shadow-xl border rounded-lg w-[110%] h-full overflow-hidden'>
          <div className='flex flex-row justify-start items-center gap-1 border-gray-150 bg-gray-100 px-2 border-b h-6'>
            <div className='bg-red-500 rounded-full w-2 h-2'></div>
            <div className='bg-yellow-500 rounded-full w-2 h-2'></div>
            <div className='bg-green-500 rounded-full w-2 h-2'></div>
          </div>
          <Image
            className='object-left-top mt-6 object-cover'
            quality={100}
            src={project.image}
            alt='todo-bird'
            fill
          />
        </div>
      </div>
    </motion.article>
  )
}
export default ProjectCard
