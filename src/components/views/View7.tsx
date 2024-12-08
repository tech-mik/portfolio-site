'use client'

import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import { useScroll, useTransform } from 'framer-motion'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../ContactForm'

const View7 = forwardRef<ViewHTMLDivElement, childViewProps>(function View7(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetVisibleSection(internalRef, sectionIndex)

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

  return (
    <motion.section
      id={anchor}
      style={{
        backgroundColor,
        backgroundImage: `url('/grid-bg-transparent.webp')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      initial={{ backgroundColor: '#FFFFFF' }}
      className='relative z-20 flex flex-col justify-start items-center gap-10 bg-pink-500 px-10 py-32 h-screen'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      <h2 className='font-arima font-black text-4xl text-black lg:text-6xl'>
        Let&apos;s grab a coffee ☕️
      </h2>
      <div className='border-gray-100 bg-white shadow-xl p-12 border rounded-xl container'>
        <ContactForm />
      </div>
    </motion.section>
  )
})
export default View7
