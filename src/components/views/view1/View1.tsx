'use client'

import ScrollableImage from '@/components/ScrollableImage'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { useApp } from '@/context/AppContext'
import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { motion } from 'framer-motion'
import ScrollableText from '@/components/ScrollableText'

const View1 = forwardRef<ViewHTMLDivElement, childViewProps>(function View1(
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
      className='relative w-full h-dvh'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      <ScrollableImage
        alt='Mik ten Holt'
        isInView={isInView}
        src='/bg-mik-1.webp'>
        <ScrollableText
          elementType='h1'
          className={isInView ? 'opacity-100' : 'opacity-0'}
          side='left'>
          <motion.span
            initial={{ translateX: -30 }}
            animate={{
              translateX: isInView ? 0 : -30,
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
              bounce: 0.5,
              delay: 0.15,
            }}
            className={clsx(
              'drop-shadow-lg shadow-white font-dancingscript text-white',
            )}>
            Hi there, I&apos;m
          </motion.span>
          <motion.span
            className='font-black'
            initial={{ translateX: 30 }}
            animate={{
              translateX: isInView ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
              bounce: 0.5,
              delay: 0.15,
            }}>
            <span
              className='green-gradient-border font-londrinasolid animated'
              data-text='Mik ten Holt'>
              Mik ten Holt
            </span>
          </motion.span>
        </ScrollableText>
      </ScrollableImage>
    </section>
  )
})

export default View1
