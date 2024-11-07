'use client'

import { VIEWS_CONFIG } from '@/config/viewsConfig'
import { ViewHTMLDivElement } from '@/types/Views'
import {
  createContext,
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'

interface AppContextType {
  refs: RefObject<RefObject<ViewHTMLDivElement | null>[]>
  visibleSection: HTMLDivElement | null
  setVisibleSection: Dispatch<SetStateAction<HTMLDivElement | null>>
  isScrolling: boolean
  setIsScrolling: Dispatch<SetStateAction<boolean>>
  isTransitioning: boolean
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
  log: string
  setLog: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const refs = useRef(VIEWS_CONFIG.map(() => createRef<ViewHTMLDivElement>()))

  const [visibleSection, setVisibleSection] = useState<HTMLDivElement | null>(
    null,
  )
  const [isScrolling, setIsScrolling] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [log, setLog] = useState('')

  return (
    <AppContext.Provider
      value={{
        refs,
        visibleSection,
        setVisibleSection,
        isScrolling,
        setIsScrolling,
        isTransitioning,
        setIsTransitioning,
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
