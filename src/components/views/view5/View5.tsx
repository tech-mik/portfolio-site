'use client'

import { childViewProps } from '@/types/Views'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { forwardRef, useEffect, useRef } from 'react'

import ProjectCard from './ProjectCard'
import { projects } from './data'
import { useApp } from '@/context/AppContext'
import useSetView from '@/hooks/useSetView'
import useInternalRef from '@/hooks/useInternalRef'

const View5 = forwardRef<HTMLDivElement, childViewProps>(function View5(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)
  const { currentView } = useApp()

  // const { scrollYProgress } = useScroll({
  //   target: internalRef,
  //   offset: ['start end', 'start start'],
  // })

  // const backgroundColor = useTransform(
  //   scrollYProgress,
  //   [0.2, 1],
  //   ['#000000', '#fafafa'],
  // )

  const backgroundColor = '#FFFFFF'

  return (
    <motion.section
      id={anchor}
      className='relative z-20 flex flex-col justify-start items-center gap-10 bg-white py-20 min-h-screen'
      initial={{ backgroundColor: '#FFFFFF' }}
      style={{
        backgroundColor,
      }}
      transition={{ duration: 0.5 }}
      ref={ref}
      data-scroll-lock={scrollLock}>
      {/* DECORATION */}
      <div
        className={`${
          currentView === sectionIndex ? 'fixed' : 'absolute'
        } top-0 left-0 w-full h-screen `}>
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
        transition={{ staggerChildren: 0.25 }}>
        {projects.map((project, i) => (
          <div key={i}>
            <ProjectCard project={project} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
})

export default View5
