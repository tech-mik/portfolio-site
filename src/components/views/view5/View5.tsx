'use client'

import { childViewProps } from '@/types/Views'
import {
  motion,
  px,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { forwardRef, use, useRef, useState } from 'react'

import { useApp } from '@/context/AppContext'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import ProjectCard from './ProjectCard'
import { projects } from './data'

const View5 = forwardRef<HTMLDivElement, childViewProps>(function View5(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  const [isInView, setIsInView] = useState(false)
  const [isInViewOnce, setIsInViewOnce] = useState(false)

  useSetView(internalRef, sectionIndex)

  const { isLocked, currentView } = useApp()

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ['start end', 'start start'],
    layoutEffect: false,
  })

  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    if (value === 1 && currentView <= sectionIndex) {
      setIsInView(true)
      setIsInViewOnce(true)
    } else {
      setIsInView(false)
    }
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['#000000', '#fafafa'],
  )

  const opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1])

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
      className='relative z-20 flex flex-col justify-start items-center gap-10 bg-white pt-20 pb-96 min-h-screen'
      initial={{ backgroundColor: '#FFFFFF' }}
      style={{
        backgroundColor,
      }}
      ref={ref}
      data-scroll-lock={scrollLock}>
      {/* DECORATION */}
      <div
        className={`${
          isInView ? 'fixed' : 'absolute'
        } top-0 left-0 h-screen w-full`}
        style={{ opacity: opacity.get() }}>
        <Image
          src='/grid-bg-transparent.webp'
          fill
          className={`top-0 left-0 z-[-1] opacity-70 object-cover`}
          alt='background-grid-transparent'
        />
      </div>
      {/* END DECORATION */}

      <h2 className='font-arima font-black text-6xl text-black'>
        Some of my projects
      </h2>
      <motion.div
        className='z-10 justify-center items-center gap-10 grid grid-cols-[1fr,1fr] w-full container'
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
