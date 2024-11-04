'use client'

import ScrollableImage from '@/components/ScrollableImage'
import { childViewProps } from '@/types/Views'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { motion, useInView } from 'framer-motion'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import ScrollableText from '../ScrollableText'

const View1 = forwardRef<HTMLDivElement, childViewProps>(function View1(
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
        src='/bg-mik-1.webp'>
        <ScrollableText
          elementType='h1'
          className={isInViewText ? 'opacity-100' : 'opacity-0'}
          side='left'>
          <motion.span
            initial={{ translateX: -30 }}
            animate={{
              translateX: isInViewText ? 0 : -30,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.5,
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
              translateX: isInViewText ? 0 : 30,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.5,
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
