'use client'

import ScrollableImage from '@/components/ScrollableImage'
import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { forwardRef } from 'react'
import ScrollableText from '../ScrollableText'
import { useApp } from '@/context/AppContext'

const View2 = forwardRef<ViewHTMLDivElement, childViewProps>(function View2(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetVisibleSection(internalRef, sectionIndex)

  const { visibleSection } = useApp()
  const isInView = Number(visibleSection?.dataset.sectionId) === sectionIndex

  return (
    <section
      id={anchor}
      className='relative w-full h-[100vh]'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      <ScrollableImage
        alt='Mik ten Holt'
        isInView={isInView}
        src='/bg-mik-4.webp'>
        <ScrollableText
          className={`${isInView ? 'opacity-100' : 'opacity-0'} lg:pl-[150px]`}
          side='right'
          elementType='h2'>
          <motion.span
            className='font-black font-dancingscript'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 1, type: 'spring', bounce: 0.6 }}>
            A
          </motion.span>
          <motion.span
            className='font-arima font-bold text-white'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: 0.05,
            }}>
            Fullstack
            <br /> Developer
          </motion.span>
          <motion.span
            data-text='Hobbyist & Enthusiast'
            className='drop-shadow-lg shadow-white green-gradient-border font-londrinasolid text-wrap animated'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: 0.1,
            }}>
            Hobbyist &<br />
            Enthusiast
          </motion.span>
        </ScrollableText>
      </ScrollableImage>
    </section>
  )
})

export default View2
