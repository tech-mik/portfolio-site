'use client'

import ScrollableImage from '@/components/ScrollableImage'
import { childViewProps } from '@/types/Views'
import { Component, forwardRef } from 'react'

import Sntx, { SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { anOldHope as highlightTheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
const SyntaxHighlighter = Sntx as typeof Component<SyntaxHighlighterProps>

import TypeOut from '@/components/TypeOut'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { removeIndentation } from '@/utils'
import { motion, useInView } from 'framer-motion'
import ScrollableText from '../ScrollableText'
import { useApp } from '@/context/AppContext'

const View3 = forwardRef<HTMLDivElement, childViewProps>(function View3(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)

  const { currentView } = useApp()
  const isInView = currentView === sectionIndex

  const codeString = removeIndentation(`
    let profession = 'Boring job';

    function makeMyHobbyMyProfession() {
      profession = 'Software Developer';
    }

    makeMyHobbyMyProfession();
  `)

  return (
    <section
      id={anchor}
      className='relative w-full h-[100vh]'
      ref={ref}
      data-scroll-lock={scrollLock}>
      <ScrollableImage
        alt='Mik ten Holt'
        isInView={isInView}
        src='/bg-mik-3.webp'>
        <ScrollableText
          elementType='div'
          className={isInView ? 'opacity-100 translate-y-px ' : 'opacity-0'}>
          <div className='flex flex-col items-center gap-5'>
            <motion.span
              className='green-gradient-border font-bold font-dancingscript animated'
              data-text='Ready to'
              initial={{ translateY: 30, opacity: 0 }}
              animate={{
                translateY: isInView ? 0 : 30,
                opacity: isInView ? 1 : 0,
              }}
              transition={{ duration: 1, type: 'spring', bounce: 0.6 }}>
              Ready to
            </motion.span>
            <motion.div
              className='code-block flex flex-row gap-5 border-slate-900 bg-black drop-shadow-2xl p-5 border rounded-xl text-white text-xs lg:text-lg xl:text-xl'
              initial={{ translateY: 30, translateX: 10, opacity: 0 }}
              animate={{
                translateY: isInView ? 0 : 30,
                translateX: isInView ? 0 : 10,
                opacity: isInView ? 1 : 0,
              }}
              transition={{
                duration: 1,
                type: 'spring',
                bounce: 0.6,
                delay: 0.05,
              }}>
              <TypeOut startTyping={isInView} typingSpeed={50}>
                <SyntaxHighlighter
                  wrapLines
                  showLineNumbers
                  language='javascript'
                  customStyle={{
                    background: 'transparent',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  style={highlightTheme}>
                  {codeString}
                </SyntaxHighlighter>
              </TypeOut>
            </motion.div>
          </div>
        </ScrollableText>
      </ScrollableImage>
    </section>
  )
})

export default View3
