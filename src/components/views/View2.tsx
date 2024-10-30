'use client'

import ScrollableImageSection from '@/components/scrollableSections/ScrollableImageSection'
import { useApp } from '@/context/AppContext'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { childViewProps } from '@/types/Views'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { forwardRef, useEffect } from 'react'

const View2 = forwardRef<HTMLDivElement, childViewProps>(function View2(
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
        src='/bg-mik-4.webp'>
        <div
          className={clsx(
            'top-0 right-0 z-10 fixed flex flex-col justify-center items-start space-y-2 pr-[50px] pl-[300px] w-1/2 h-[100vh] font-light text-7xl text-left text-white transition-opacity duration-700 ease-in-out',
            isInViewText ? 'opacity-100' : 'opacity-0',
          )}>
          <motion.span
            className='font-black font-dancingscript'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{ duration: 1, type: 'spring', bounce: 0.6 }}>
            A
          </motion.span>
          <motion.span
            className='font-arima font-bold text-white'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: 0.05,
            }}>
            Fullstack Developer
          </motion.span>
          <motion.span
            data-text='Hobbyist & Enthusiast'
            className='drop-shadow-lg shadow-white green-gradient-border font-londrinasolid animated'
            initial={{ translateX: 30, opacity: 0 }}
            animate={{
              translateX: isInViewText ? 0 : 30,
              opacity: isInViewText ? 1 : 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              bounce: 0.6,
              delay: 0.1,
            }}>
            Hobbyist & Enthusiast
          </motion.span>
        </div>
      </ScrollableImageSection>
    </section>
  )
})

export default View2
