'use client'

import { createContext, useContext, useState } from 'react'
import { useScrollLock } from 'usehooks-ts'

interface AppContextType {
  isTransitioning: boolean
  setIsTransitioning: (isTransitioning: boolean) => void
  isScrolling: boolean
  setIsScrolling: (isTransitioning: boolean) => void
  scrollingDirection: 'up' | 'down' | null
  setScrollingDirection: (direction: 'up' | 'down' | null) => void
  lock: () => void
  unlock: () => void
  isLocked: boolean
  currentView: number
  previousView: number | null
  setView: (view: number) => void
  log: string | null
  setLog: (log: string) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    lock: lockScroll,
    unlock: unlockScroll,
    isLocked,
  } = useScrollLock({
    autoLock: false,
    widthReflow: true,
  })

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentView, setCurrentView] = useState(0)
  const [previousView, setPreviousView] = useState<number | null>(null)
  const [scrollingDirection, setScrollingDirection] = useState<
    'up' | 'down' | null
  >(null)
  const [log, setLog] = useState<string | null>(null)

  function setView(view: number) {
    if (view !== currentView) {
      setPreviousView(currentView)
      setCurrentView(view)
    }
  }

  function lock() {
    if (document.body.style.overflow !== 'hidden') {
      lockScroll()
    }
  }

  function unlock() {
    if (document.body.style.overflow === 'hidden') {
      unlockScroll()
    }
  }

  return (
    <AppContext.Provider
      value={{
        isTransitioning,
        setIsTransitioning,
        isScrolling,
        setIsScrolling,
        scrollingDirection,
        setScrollingDirection,
        lock,
        unlock,
        isLocked,
        currentView,
        setView,
        previousView,
        log,
        setLog,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppContextProvider')
  }
  return context
}
