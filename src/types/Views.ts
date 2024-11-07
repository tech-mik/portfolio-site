import { StaticImageData } from 'next/image'
import { IconType } from 'react-icons'

export interface parentViewProps {
  sectionIndex: number
}

export interface childViewProps {
  sectionIndex: number
  scrollLock: boolean
  anchor: string
}

export interface Project {
  title: string
  github: string
  description: string
  image: StaticImageData
  type: string
  icons: { title: string; icon: IconType }[]
}

export interface ViewHTMLDivElement extends HTMLDivElement {
  dataset: {
    sectionId: string
    scrollLock: string
  }
}
