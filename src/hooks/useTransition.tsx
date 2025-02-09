import { useApp } from '@/context/AppContext'
import { ViewHTMLDivElement } from '@/types/Views'
import { useEffect, useRef } from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'

/**
 * This hook is specifically responsible for transitioning between sections.
 * It returns an object with a method that can be called to transition to a specific section.
 */
const useTransition = () => {
  const { visibleSection, setIsTransitioning, setLog } = useApp()
  const scrollTimer = useRef<NodeJS.Timeout | null>(null)

  // With this effect, we set the isTransitioning to false after the view stops scrolling.
  useEffect(() => {
    const scrollController = new AbortController()
    const { signal } = scrollController

    function handleScroll() {
      if (scrollTimer.current) clearTimeout(scrollTimer.current)

      scrollTimer.current = setTimeout(() => {
        setIsTransitioning(false)
      }, Number(process.env.NEXT_PUBLIC_EVENT_TIMEOUT))
    }

    addEventListener('scroll', handleScroll, { signal })

    return () => scrollController.abort()
  }, [setIsTransitioning])

  function transitionTo(section: ViewHTMLDivElement | null, force = false) {
    if (section === null || visibleSection === null) return
    const currentSectionId = Number(visibleSection.dataset.sectionId)
    const newSectionId = Number(section.dataset.sectionId)

    if (visibleSection.dataset.scrollLock === 'false' && !force) {
      const scrollTop = visibleSection.scrollTop
      const scrollBottom =
        visibleSection.scrollHeight - visibleSection.clientHeight - scrollTop
      setLog(`${scrollBottom}, ${scrollTop}`)

      if (newSectionId > currentSectionId) {
        // scrolling down
        if (scrollBottom <= 2) {
          setIsTransitioning(true)
          scrollIntoView(section, {
            behavior: 'smooth',
            scrollMode: 'if-needed',
          })
        }
      } else if (newSectionId < currentSectionId) {
        // Scrolling up

        if (scrollTop <= 2) {
          setIsTransitioning(true)
          scrollIntoView(section, {
            behavior: 'smooth',
            scrollMode: 'if-needed',
          })
        }
      }
    } else {
      setIsTransitioning(true)
      scrollIntoView(section, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
      })
    }
  }

  return { transitionTo }
}

export default useTransition
