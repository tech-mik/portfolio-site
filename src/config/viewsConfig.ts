// viewsConfig.js
import * as Views from '@/components/views'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

// If using TypeScript, define types for views
type ViewConfig = {
  element: ForwardRefExoticComponent<
    childViewProps & RefAttributes<ViewHTMLDivElement>
  >
  scrollLock: boolean
  anchor: string
}

export const VIEWS_CONFIG: ViewConfig[] = [
  { element: Views.View1, scrollLock: true, anchor: 'home' },
  { element: Views.View2, scrollLock: true, anchor: 'view2' },
  { element: Views.View3, scrollLock: true, anchor: 'view3' },
  { element: Views.View4, scrollLock: true, anchor: 'view4' },
  { element: Views.View5, scrollLock: false, anchor: 'projects' },
  { element: Views.View6, scrollLock: true, anchor: 'skills' },
  { element: Views.View7, scrollLock: false, anchor: 'contact' },
]
