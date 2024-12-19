'use client'

import ScrollableImage from '@/components/ScrollableImage'
import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { forwardRef } from 'react'
import ScrollableText from '@/components/ScrollableText'
import { useApp } from '@/context/AppContext'

const View4 = forwardRef<ViewHTMLDivElement, childViewProps>(function View4(
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
      className='relative w-full h-svh'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      <ScrollableImage
        alt='Mik ten Holt'
        isInView={isInView}
        src='/bg-mik-2.webp'>
        <ScrollableText
          elementType='div'
          className={isInView ? 'opacity-100 translate-x-px ' : 'opacity-0'}
          side='right'>
          <motion.span
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
            className='font-black font-dancingscript'>
            So let&apos;s
          </motion.span>
          <motion.span
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: isInView ? 0.5 : 0,
            }}
            className='font-bold text-white'>
            Work
          </motion.span>
          <motion.span
            data-text='together'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInView ? 0 : 30,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: isInView ? 1 : 0,
            }}
            className='drop-shadow-lg shadow-white pb-3 green-gradient-border font-londrinasolid text-white,'>
            together
          </motion.span>
        </ScrollableText>
      </ScrollableImage>
    </section>
  )
})

export default View4
