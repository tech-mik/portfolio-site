'use client'

import { useApp } from '@/context/AppContext'
import { RefObject, useEffect } from 'react'

type useSetView = (
  ref: RefObject<HTMLDivElement | null>,
  sectionIndex: number,
) => void

const useSetView: useSetView = (ref, sectionIndex) => {
  const { setView, lock, unlock, isLocked, currentView } = useApp()

  // Set initial view on mount with scrolling settings
  useEffect(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setView(sectionIndex)
      if (ref.current.dataset.scrollLock === 'true' && !isLocked) {
        lock()
        console.log('test')
        console.log('lock')
      } else if (ref.current.dataset.scrollLock === 'false' && isLocked) {
        unlock()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  // Set view on scroll
  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        if (!isLocked) {
          if (
            sectionIndex !== currentView &&
            ((rect.bottom > 0 &&
              rect.bottom < window.innerHeight &&
              rect.top < rect.bottom) ||
              (rect.top < window.innerHeight &&
                rect.top > 0 &&
                rect.bottom > rect.top)) &&
            ref.current.dataset.scrollLock === 'true'
          ) {
            lock()
          }
        }
      }
    }

    function handleScrollEnd() {
      if (!ref.current) return

      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        if (isLocked) {
          if (rect.top === 0) {
            setView(sectionIndex)
            if (ref.current.dataset.scrollLock === 'false') {
              unlock()
            }
          }
        } else if (!isLocked && sectionIndex !== currentView) {
          if (rect.top === 0) {
            setView(sectionIndex)
          }
        }
      }
    }

    window.addEventListener('wheel', handleScroll, { signal })
    window.addEventListener('scrollend', handleScrollEnd, { signal })
    return () => abortController.abort()
  }, [ref, sectionIndex, setView, lock, unlock, isLocked, currentView])
}
export default useSetView
