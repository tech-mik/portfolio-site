'use client'

import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { TbArrowBigDownLinesFilled } from 'react-icons/tb'

const color = {
  0: 'text-white',
  1: 'text-white',
  2: 'text-white',
  3: 'text-white',
  4: 'text-black',
  5: 'text-white',
  6: 'text-black',
}

const INDICATOR_DELAY = 1000

const ScrollIndicator = () => {
  const { visibleSection, refs } = useApp()
  const sectionIndex = Number(
    visibleSection?.dataset.sectionId,
  ) as keyof typeof color

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setShowIndicator(true)
    }, INDICATOR_DELAY)
  }, [])

  useEffect(() => {
    const eventController = new AbortController()
    const { signal } = eventController

    const eventHandler = () => {
      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        setShowIndicator(true)
      }, INDICATOR_DELAY)

      setShowIndicator(false)
    }

    addEventListener('scroll', eventHandler, { signal })
    addEventListener('wheel', eventHandler, { signal })
    addEventListener('keydown', eventHandler, { signal })
    addEventListener('mousedown', eventHandler, { signal })
    addEventListener('touchstart', eventHandler, { signal })

    return () => eventController.abort()
  }, [showIndicator])

  return (
    <div className='bottom-0 z-50 sticky flex justify-center items-end w-screen'>
      {showIndicator && sectionIndex < refs.current.length - 1 && (
        <div
          className={cn('drop-shadow-lg pb-5 text-6xl', color[sectionIndex])}>
          <TbArrowBigDownLinesFilled className='animate-bounce' />
        </div>
      )}
    </div>
  )
}
export default ScrollIndicator
