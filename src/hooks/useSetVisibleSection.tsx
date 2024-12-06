'use client'

import { useApp } from '@/context/AppContext'
import { ViewHTMLDivElement } from '@/types/Views'
import { RefObject, useCallback, useEffect, useRef } from 'react'

type useSetVisibleSection = (
  ref: RefObject<HTMLDivElement | null>,
  sectionIndex: number,
) => void

/**
 * A hook that is responsible for setting the currently visible section and it's scrolling lock state.
 *
 * This hook will set the currently visible section on the initial load of the app and on scrolling to a new section.
 * It will also lock scrolling if the section is set to be locked and unlock the scrolling if the section is set to be unlocked.
 *
 * @param ref - The reference to the section element.
 * @param sectionIndex - The index of the section.
 *
 * @remarks
 * The hook uses the `useApp` context to manage the visible section and scrolling lock state.
 * It sets the initial visible section on mount and updates the visible section on scroll events.
 * The hook also handles scroll locking and unlocking based on the `data-scroll-lock` attribute of the section element.
 *
 * @example
 * const sectionRef = useRef<HTMLDivElement>(null);
 * useSetVisibleSection(sectionRef, 1);
 */
const useSetVisibleSection: useSetVisibleSection = (ref) => {
  const { setVisibleSection } = useApp()

  const handleScroll = useCallback(() => {
    const section = ref.current

    if (!section) return

    const { top, bottom } = section.getBoundingClientRect()
    const { innerHeight } = window

    if (top < innerHeight / 2 && bottom > innerHeight / 2) {
      setVisibleSection(section)
      console.log(section)
    }
  }, [ref, setVisibleSection])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
}

export default useSetVisibleSection
