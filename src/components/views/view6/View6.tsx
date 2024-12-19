'use client'

import BrowserMockup from '@/components/BrowserMockup'
import TypeOut from '@/components/TypeOut'
import { useApp } from '@/context/AppContext'
import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import { motion, useScroll, useTransform } from 'framer-motion'
import { forwardRef, useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import TerminalAction from './TerminalAction'
import Caret from '@/components/Caret'
import { frontend, backend } from './data'

const typingSpeed = 15

const View6 = forwardRef<ViewHTMLDivElement, childViewProps>(function View6(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetVisibleSection(internalRef, sectionIndex)
  const { visibleSection } = useApp()

  const [frontendTyping, setFrontendTyping] = useState(false)
  const frontendRef = useRef<HTMLInputElement>(null)

  const [backendTyping, setBackendTyping] = useState(false)
  const backendRef = useRef<HTMLInputElement>(null)

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ['start end', 'start start'],
    layoutEffect: false,
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['#fafafa', '#000000'],
  )

  const handleFocus = () => {
    if (sectionIndex === Number(visibleSection?.dataset.sectionId)) {
      if (!frontendTyping) {
        frontendRef?.current?.focus()
      } else if (!backendTyping) {
        backendRef?.current?.focus()
      }
    }
  }

  useEffect(() => {
    if (sectionIndex === Number(visibleSection?.dataset.sectionId)) {
      handleFocus()
    }
  }, [visibleSection])

  return (
    <motion.section
      id={anchor}
      className='relative z-20 flex flex-col justify-start items-center gap-10 bg-black px-5 py-10 lg:py-28 h-svh'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}
      style={{
        backgroundColor,
        backgroundImage: `url('/grid-bg-transparent.webp')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <h2 className='flex md:flex-row flex-col font-arima font-bold text-4xl text-center text-white sm:text-5xl lg:text-7xl'>
        <span>My Toolkit for</span>
        <span>
          {' '}
          Tech
          <span className='green-gradient-border animated' data-text='Wizardry'>
            Wizardry
          </span>
        </span>
      </h2>
      <div className='flex lg:flex-row flex-col justify-start items-center gap-10 max-w-screen-lg container'>
        <BrowserMockup
          onClick={handleFocus}
          className='border-slate-800 container'
          headerClassName='bg-slate-950 border-b-slate-800 text-slate-100'
          contentClassName='font-vt323 bg-slate-900 text-slate-300 p-4 lg:p-8 h-full text-xs lg:text-lg'
          title='FRONTEND'>
          <TerminalAction
            action={() => setFrontendTyping(true)}
            ref={frontendRef}
            actionText='Do you want to load frontend skills? [y/n]:'
          />
          <TypeOut
            startTyping={frontendTyping}
            typingSpeed={typingSpeed}
            caret={Caret}
            next={handleFocus}>
            <div>
              {Object.entries(frontend).map(([key, value], i) => (
                <ProgressBar
                  key={key}
                  label={key}
                  character='#'
                  characterCount={40}
                  percentage={value}
                />
              ))}
              <span>&nbsp;</span>

              <TerminalAction
                action={() => setBackendTyping(true)}
                ref={backendRef}
                actionText='Do you want to load backend skills? [y/n]:'
                disabled={!frontendTyping}
              />
            </div>
          </TypeOut>
          <TypeOut
            startTyping={backendTyping}
            typingSpeed={typingSpeed}
            caret={Caret}>
            <div>
              {Object.entries(backend).map(([key, value], i) => (
                <ProgressBar
                  key={key}
                  label={key}
                  character='#'
                  characterCount={40}
                  percentage={value}
                />
              ))}
            </div>
          </TypeOut>
        </BrowserMockup>
      </div>
    </motion.section>
  )
})
export default View6
