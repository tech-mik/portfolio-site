'use client'

import ScrollableImageSection from '@/components/scrollableSections/ScrollableImageSection'
import { childViewProps } from '@/types/Views'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { motion, useInView } from 'framer-motion'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'

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
      <ScrollableImageSection
        alt='Mik ten Holt'
        isInView={isInViewImg}
        src='/bg-mik-1.webp'>
        <motion.h1
          className={clsx(
            'top-0 left-0 z-10 fixed flex flex-col justify-center items-end space-y-2 pr-[200px] w-1/2 h-[100vh] font-light text-8xl text-left text-white transition-opacity duration-700 ease-in-out',
            isInViewText ? 'opacity-100' : 'opacity-0',
          )}>
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
        </motion.h1>
      </ScrollableImageSection>
    </section>
  )
})

export default View1
