import clsx from 'clsx'
import { createElement } from 'react'

interface ScrollableTextProps {
  children: React.ReactNode
  elementType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  side?: 'left' | 'right'
  className?: string
}

const ScrollableText = ({
  children,
  elementType,
  className,
  side = 'left',
}: ScrollableTextProps) => {
  const props = {
    className: clsx(
      'top-10 lg:top-0 z-10 fixed flex flex-col justify-start lg:justify-center items-center space-y-2 w-full lg:w-1/2 h-lvh font-light text-6xl text-left text-white lg:text-6xl xl:text-7xl 2xl:text-8xl transition-opacity duration-700 ease-in-out',
      side === 'left' && 'left-0',
      side === 'right' && 'right-0',
      className,
    ),
  }

  return createElement(elementType, props, children)
}

export default ScrollableText
