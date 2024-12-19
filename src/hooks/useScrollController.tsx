'use client'

import { useApp } from '@/context/AppContext'
import { useEffect, useRef, useState } from 'react'
import useTransition from './useTransition'

/**
 * This hook is responsible for controlling the scrolling behavior of the app, based on certain events.
 *
 * Controller 1: Wheel Event
 *
 * Controller 2: Touch Event
 *
 * Controller 3: Key Event
 */
const useScrollerController = () => {
  const {
    refs,
    isScrolling,
    setIsScrolling,
    isTransitioning,
    setIsTransitioning,
    visibleSection,
    setLog,
  } = useApp()

  const { transitionTo } = useTransition()

  const scrollingInstanceTreshold = 60
  const lastWheelEventTimestamp = useRef<number>(0)
  const lastTouchEventTimestamp = useRef<Touch | null>(null)
  const wheelTimer = useRef<NodeJS.Timeout | null>(null)
  const resizeTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const scrollerController = new AbortController()
    const { signal } = scrollerController

    /**
     * WHEEL EVENT
     */
    function handleWheelEvent(event: WheelEvent) {
      if (visibleSection === null) return
      setIsScrolling(true)

      const currentTime = Date.now()
      const timeSinceLastScroll = currentTime - lastWheelEventTimestamp.current

      const isNewScroll = timeSinceLastScroll > scrollingInstanceTreshold

      if (isNewScroll) {
        setIsScrolling(false)
      }

      // Update the last scroll time
      lastWheelEventTimestamp.current = currentTime

      // The actual scrolling logic
      if (!isTransitioning && !isScrolling) {
        const visibleSectionId = Number(visibleSection.dataset.sectionId)

        if (event.deltaY < 0 && visibleSectionId > 0) {
          // Scrolling up
          const newSection = refs.current[visibleSectionId - 1].current
          transitionTo(newSection)
        } else if (
          event.deltaY > 0 &&
          visibleSectionId < refs.current.length - 1
        ) {
          // Scrolling down
          const newSection = refs.current[visibleSectionId + 1].current
          transitionTo(newSection)
        }
      }

      // Reset the `isScrolling` flag after the defined timeout
      // So the user can scroll again
      if (wheelTimer.current) clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => {
        setIsScrolling(false)
      }, Number(process.env.NEXT_PUBLIC_EVENT_TIMEOUT))
    }

    /**
     * TOUCH START EVENT
     */
    function handleTouchStartEvent(event: TouchEvent) {
      lastTouchEventTimestamp.current = event.touches[0]
    }

    /**
     * TOUCH END EVENT
     */
    function handleTouchEndEvent(event: TouchEvent) {
      // Checking if user is swiping up or down
      const differenceY =
        event.changedTouches[0].clientY -
        lastTouchEventTimestamp.current!.clientY

      const differenceX =
        event.changedTouches[0].clientX -
        lastTouchEventTimestamp.current!.clientX

      // Swiping up or down
      if (Math.abs(differenceY) > Math.abs(differenceX)) {
        const visibleSectionId = Number(visibleSection?.dataset.sectionId)
        if (differenceY > 0 && visibleSectionId > 0) {
          const newSection = refs.current[visibleSectionId - 1].current
          transitionTo(newSection)
        } else if (
          differenceY < 0 &&
          visibleSectionId < refs.current.length - 1
        ) {
          const newSection = refs.current[visibleSectionId + 1].current
          transitionTo(newSection)
        }
      }
    }

    /**
     * Key EVENT
     */
    function handleKeyEvent(event: KeyboardEvent) {
      if (isTransitioning || !visibleSection) return

      if (event.key === 'ArrowDown') {
        const visibleSectionId = Number(visibleSection.dataset.sectionId)
        if (visibleSectionId < refs.current.length - 1) {
          const newSection = refs.current[visibleSectionId + 1].current
          transitionTo(newSection, true)
        }
      } else if (event.key === 'ArrowUp') {
        const visibleSectionId = Number(visibleSection.dataset.sectionId)
        if (visibleSectionId > 0) {
          const newSection = refs.current[visibleSectionId - 1].current
          transitionTo(newSection, true)
        }
      }
    }

    function handleResizeEvent() {
      if (resizeTimer.current) clearTimeout(resizeTimer.current)
      resizeTimer.current = setTimeout(() => {
        if (visibleSection) {
          visibleSection.scrollIntoView({ behavior: 'instant' })
        }
      }, 100)
    }

    // Registering the events
    addEventListener('wheel', handleWheelEvent, { signal })
    addEventListener('touchstart', handleTouchStartEvent, { signal })
    addEventListener('touchend', handleTouchEndEvent, { signal })
    addEventListener('keydown', handleKeyEvent, { signal })
    addEventListener('resize', handleResizeEvent, { signal })

    return () => scrollerController.abort()
  }, [
    isTransitioning,
    refs,
    transitionTo,
    visibleSection,
    setIsScrolling,
    setIsTransitioning,
    isScrolling,
  ])
}

export default useScrollerController
