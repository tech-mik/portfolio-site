import { VIEWS_CONFIG } from '@/config/viewsConfig'
import { useApp } from '@/context/AppContext'
import { RefObject, useCallback, useEffect, useRef } from 'react'

interface useScrollControllerProps {
  refs: RefObject<RefObject<HTMLDivElement | null>[]>
}

const useScrollController = ({ refs }: useScrollControllerProps) => {
  const scrollingThreshold = 50
  const lastWheelEventTime = useRef<number>(0)

  const lastTouch = useRef<Touch | null>(null)

  const {
    isTransitioning,
    setIsTransitioning,
    isScrolling,
    setIsScrolling,
    scrollingDirection,
    setScrollingDirection,
    isLocked,
    currentView,
    setView,
    lock,
    unlock,
  } = useApp()

  const timer = useRef<NodeJS.Timeout | null>(null)

  const scrollDown = useCallback(() => {
    if (currentView < VIEWS_CONFIG.length - 1) {
      setIsTransitioning(true)
      setIsScrolling(true)

      const newInView = currentView + 1
      refs.current[newInView]?.current?.scrollIntoView({ behavior: 'smooth' })
      setView(newInView)
    }
  }, [currentView, setView, refs, setIsTransitioning, setIsScrolling])

  const scrollUp = useCallback(() => {
    if (currentView > 0) {
      setIsTransitioning(true)
      setIsScrolling(true)

      const newInView = currentView - 1
      refs.current[newInView]?.current?.scrollIntoView({ behavior: 'smooth' })
      setView(newInView)
    }
  }, [currentView, setView, refs, setIsTransitioning, setIsScrolling])

  useEffect(() => {
    const scrollController = new AbortController()
    const { signal } = scrollController

    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? 'down' : 'up'
      const previousDirection = scrollingDirection
      setScrollingDirection(direction)

      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        timer.current = null
        setIsScrolling(false)
        setScrollingDirection(null)
      }, 500)

      if (isScrolling) {
        const timeSinceLastWheel = Date.now() - lastWheelEventTime.current

        // If scrolling is still active, check if it's a new instance
        if (timeSinceLastWheel > scrollingThreshold) {
          clearTimeout(timer.current)
          setIsScrolling(false)
          setScrollingDirection(null)
        }
      }

      if (
        (!isTransitioning && !isScrolling && isLocked) ||
        (isScrolling && scrollingDirection !== previousDirection)
      ) {
        if (e.deltaY > 0) {
          lock()
          scrollDown()
        } else if (e.deltaY < 0) {
          scrollUp()
        }
      }

      lastWheelEventTime.current = Date.now()
    }

    const handleKeyboard = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if (e.key === 'ArrowDown') {
        lock()
        scrollDown()
      } else if (e.key === 'ArrowUp') {
        lock()
        scrollUp()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouch.current = e.touches[0]
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const differenceY =
        e.changedTouches[0].clientY - lastTouch.current!.clientY

      const differenceX =
        e.changedTouches[0].clientX - lastTouch.current!.clientX

      // Swiping Y
      if (Math.abs(differenceY) > Math.abs(differenceX)) {
        if (isLocked) {
          if (differenceY > 0) {
            scrollUp()
          } else {
            scrollDown()
          }
        }
      }
    }

    const handleScrollEnd = () => {
      console.log('scrollend')
      setIsTransitioning(false)
    }

    window.addEventListener('wheel', handleWheel, { signal })
    window.addEventListener('touchstart', handleTouchStart, { signal })
    window.addEventListener('touchend', handleTouchEnd, { signal })
    window.addEventListener('keydown', handleKeyboard, { signal })
    window.addEventListener('scrollend', handleScrollEnd, { signal })

    return () => {
      scrollController.abort()
    }
  }, [
    isTransitioning,
    isLocked,
    scrollUp,
    scrollDown,
    setIsTransitioning,
    isScrolling,
    setIsScrolling,
    scrollingDirection,
    setScrollingDirection,
    lock,
  ])
}

export default useScrollController
