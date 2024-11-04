'use client'

import ScrollableImage from '@/components/ScrollableImage'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { childViewProps } from '@/types/Views'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { forwardRef } from 'react'
import ScrollableText from '../ScrollableText'

const View4 = forwardRef<HTMLDivElement, childViewProps>(function View4(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)

  const isInViewImg = useInView(internalRef, { amount: 0.5 })
  const isInViewText = useInView(internalRef, { amount: 0.9 })

  return (
    <section
      id={anchor}
      className='relative w-full h-[100vh]'
      ref={ref}
      data-scroll-lock={scrollLock}>
      <ScrollableImage
        alt='Mik ten Holt'
        isInView={isInViewImg}
        src='/bg-mik-2.webp'>
        <ScrollableText
          elementType='div'
          className={isInViewText ? 'opacity-100 translate-x-px ' : 'opacity-0'}
          side='right'>
          <motion.span
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
            className='font-black font-dancingscript'>
            So let&apos;s
          </motion.span>
          <motion.span
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: isInViewText ? 0.5 : 0,
            }}
            className='font-bold text-white'>
            Work
          </motion.span>
          <motion.span
            data-text='together'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: isInViewText ? 1 : 0,
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
