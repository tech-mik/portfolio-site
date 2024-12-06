import { useApp } from '@/context/AppContext'
import { ViewHTMLDivElement } from '@/types/Views'
import { useEffect, useRef } from 'react'

const useTransition = () => {
  const { refs, visibleSection, isTransitioning, setIsTransitioning, setLog } =
    useApp()
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

      setLog(`scrollTop: ${scrollTop}, scrollBottom: ${scrollBottom}`)
      if (newSectionId > currentSectionId) {
        if (scrollBottom <= 0) {
          setIsTransitioning(true)
          section.scrollIntoView({
            behavior: 'smooth',
          })
        }
      } else if (newSectionId < currentSectionId) {
        // Scrolling up
        if (scrollTop <= 0) {
          setIsTransitioning(true)
          section.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    } else {
      setIsTransitioning(true)
      section.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return { transitionTo }
}

export default useTransition
