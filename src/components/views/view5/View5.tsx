'use client'

import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { forwardRef, useState } from 'react'

import { useApp } from '@/context/AppContext'
import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import ProjectCard from './ProjectCard'
import { projects } from './data'

const View5 = forwardRef<ViewHTMLDivElement, childViewProps>(function View5(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  const [isInViewOnce, setIsInViewOnce] = useState(false)

  useSetVisibleSection(internalRef, sectionIndex)

  const { visibleSection } = useApp()

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ['start end', 'start start'],
    layoutEffect: false,
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['#000000', '#fafafa'],
  )

  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    if ((value >= 0.8 && visibleSection) || 0 <= sectionIndex) {
      setIsInViewOnce(true)
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <motion.section
      id={anchor}
      className='relative z-20 flex flex-col justify-start items-center gap-5 md:gap-10 bg-white px-5 sm:px-10 py-10 lg:py-32 h-dvh overflow-y-scroll'
      initial={{ backgroundColor: '#FFFFFF' }}
      style={{
        backgroundColor,
        backgroundImage: `url('/grid-bg-transparent.webp')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      <h2 className='font-arima font-black text-4xl text-black text-center lg:text-6xl'>
        My Dev Adventures
      </h2>
      <motion.div
        className='z-10 justify-center items-center gap-10 grid grid-cols-1 xl:grid-cols-[1fr,1fr] w-full container'
        variants={containerVariants}
        initial='hidden'
        animate={isInViewOnce ? 'visible' : 'hidden'}>
        {projects.map((project, i) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </motion.div>
    </motion.section>
  )
})

export default View5
