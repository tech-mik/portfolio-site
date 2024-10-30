import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IconWithTooltip } from '@/components/views/view5'
import { Project } from '@/types/Views'
import { HTMLMotionProps, motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { SiGithub } from 'react-icons/si'

const childVariant: HTMLMotionProps<'div'>['variants'] = {
  hidden: {
    opacity: 0,
    y: 50,
    x: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      damping: 10,
      duration: 0.5,
    },
  },
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInViewOnce = useInView(ref, { once: true, amount: 0.8 })

  return (
    <motion.article
      initial='hidden'
      animate={isInViewOnce ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.05 }}
      variants={childVariant}
      className='flex flex-row border-gray-100 bg-white drop-shadow-xl border rounded-xl w-full h-[300px] overflow-hidden'
      ref={ref}>
      <div className='flex flex-col justify-between items-start p-10 w-3/5'>
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
            <span className='bg-green-300 px-2 p-0.5 rounded-full text-[10px] text-green-950 text-xs whitespace-nowrap'>
              {project.type}
            </span>{' '}
          </div>
          <p className='text-sm'>{project.description}</p>
        </div>
        <div className='flex flex-row gap-2'>
          <TooltipProvider delayDuration={100}>
            {project.icons.map((icon, i) => (
              <IconWithTooltip key={i} icon={icon} />
            ))}
          </TooltipProvider>
        </div>
      </div>
      <div className='relative w-2/5 h-full'>
        <div className='top-10 absolute flex flex-col drop-shadow-xl border rounded-lg w-[110%] h-full overflow-hidden'>
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
