'use client'

import { createContext, useContext, useState } from 'react'
import { useScrollLock } from 'usehooks-ts'

interface AppContextType {
  isScrolling: boolean
  setIsScrolling: (isScrolling: boolean) => void
  lock: () => void
  unlock: () => void
  isLocked: boolean
  currentView: number
  previousView: number | null
  setView: (view: number) => void
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

  const [isScrolling, setIsScrolling] = useState(false)
  const [currentView, setCurrentView] = useState(0)
  const [previousView, setPreviousView] = useState<number | null>(null)

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
        isScrolling,
        setIsScrolling,
        lock,
        unlock,
        isLocked,
        currentView,
        setView,
        previousView,
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
