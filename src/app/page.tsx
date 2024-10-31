'use client'

import * as Views from '@/components/views'
import { useApp } from '@/context/AppContext'
import { createRef, useEffect, useRef, useState } from 'react'

const views = [
  { element: Views.View1, scrollLock: true, anchor: 'view1' },
  { element: Views.View2, scrollLock: true, anchor: 'view2' },
  { element: Views.View3, scrollLock: true, anchor: 'view3' },
  { element: Views.View4, scrollLock: true, anchor: 'view4' },
  { element: Views.View5, scrollLock: false, anchor: 'view5' },
  { element: Views.View6, scrollLock: true, anchor: 'view6' },
  { element: Views.View7, scrollLock: true, anchor: 'view7' },
]

const Page = () => {
  const {
    isScrolling,
    setIsScrolling,
    isLocked,
    currentView,
    setView,
    lock,
    unlock,
  } = useApp()

  const refs = useRef(views.map(() => createRef<HTMLDivElement>()))

  useEffect(() => {
    // INSTANTIATING SCROLL CONTROLLER FOR ABORTING IN CLEANUP
    const scrollController = new AbortController()
    const { signal } = scrollController

    const sections = views.length

    const scrollEventHandler = (e: WheelEvent | TouchEvent | KeyboardEvent) => {
      if (isScrolling || !isLocked) return

      // WHEN SCROLLING WITH MOUSEWHEEL
      if (e instanceof WheelEvent) {
        if (e.deltaY > 0 || e.deltaY < 0) {
          if (e.deltaY > 0) {
            // SCROLLING DOWN
            scrollDown()
            console.log('Scroll down')
          } else {
            // SCROLLING UP
            scrollUp()
          }
        }
      } else if (e instanceof TouchEvent) {
        // SCROLLING WITH SWIPING
        console.log('Touch event')
      } else if (e instanceof KeyboardEvent) {
        // SCROLLING WITH KEYBOARD
        if (e.key === 'ArrowDown') {
          // SCROLLING DOWN
          scrollDown()
        } else if (e.key === 'ArrowUp') {
          // SCROLLING UP
          scrollUp()
        }
      }
    }

    addEventListener(
      'wheel',
      () => {
        console.log('Wheel event')
      },
      { signal },
    )

    addEventListener('wheel', scrollEventHandler, { signal })
    addEventListener('touchmove', scrollEventHandler, { signal })
    addEventListener('keydown', scrollEventHandler, { signal })

    // IF DYNAMIC SCROLLING IS FINISHED
    // USER CAN KEEP SCROLLING TO GO TO NEXT SECTION
    addEventListener(
      'scrollend',
      (e) => {
        console.log('End scroll')
        setIsScrolling(false)
      },
      { signal },
    )

    function scrollDown() {
      if (currentView < sections - 1) {
        setIsScrolling(true)

        const newInView = currentView + 1

        refs.current[newInView].current?.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }

    function scrollUp() {
      if (currentView > 0) {
        setIsScrolling(true)

        const newInView = currentView - 1

        refs.current[newInView].current?.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }

    return () => {
      scrollController.abort()
    }
  }, [currentView, isLocked, setView, isScrolling, setIsScrolling])

  return (
    <div className='relative bg-black'>
      {views.map(({ element: View }, i) => {
        return (
          <View
            key={i}
            sectionIndex={i}
            ref={refs.current[i]}
            scrollLock={views[i].scrollLock}
            anchor={views[i].anchor}
          />
        )
      })}
    </div>
  )
}

export default Page
