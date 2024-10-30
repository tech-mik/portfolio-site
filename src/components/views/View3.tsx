'use client'

import ScrollableImageSection from '@/components/scrollableSections/ScrollableImageSection'
import { childViewProps } from '@/types/Views'
import clsx from 'clsx'
import { forwardRef } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope as highlightTheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import TypeOut from '@/components/TypeOut'
import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { removeIndentation } from '@/utils'
import { motion, useInView } from 'framer-motion'

const View3 = forwardRef<HTMLDivElement, childViewProps>(function View3(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)

  const isInViewImg = useInView(internalRef, { amount: 0.5 })
  const isInViewText = useInView(internalRef, { amount: 0.9 })

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
      <ScrollableImageSection
        alt='Mik ten Holt'
        isInView={isInViewImg}
        src='/bg-mik-3.webp'>
        <div
          className={clsx(
            'top-0 left-0 z-10 fixed flex flex-col justify-center items-end space-y-2 pr-[150px] w-1/2 h-[100vh] font-light text-6xl text-left text-white transition-all duration-700 ease-in-out',
            isInViewText ? 'opacity-100 translate-y-px ' : 'opacity-0',
          )}>
          <div className='flex flex-col items-center gap-5'>
            <motion.span
              className='green-gradient-border font-bold font-dancingscript text-7xl animated'
              data-text='Ready to'
              initial={{ translateY: 30, opacity: 0 }}
              animate={{
                translateY: isInViewText ? 0 : 30,
                opacity: isInViewText ? 1 : 0,
              }}
              transition={{ duration: 1, type: 'spring', bounce: 0.6 }}>
              Ready to
            </motion.span>
            <motion.div
              className='code-block flex flex-row gap-5 border-slate-900 bg-black drop-shadow-2xl p-7 border rounded-xl w-[500px] text-base text-white'
              initial={{ translateY: 30, translateX: 10, opacity: 0 }}
              animate={{
                translateY: isInViewText ? 0 : 30,
                translateX: isInViewText ? 0 : 10,
                opacity: isInViewText ? 1 : 0,
              }}
              transition={{
                duration: 1,
                type: 'spring',
                bounce: 0.6,
                delay: 0.05,
              }}>
              <TypeOut startTyping={isInViewText} typingSpeed={50}>
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
        </div>
      </ScrollableImageSection>
    </section>
  )
})

export default View3
