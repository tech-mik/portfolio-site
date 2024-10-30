'use client'

import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { childViewProps } from '@/types/Views'
import { forwardRef } from 'react'

const View7 = forwardRef<HTMLDivElement, childViewProps>(function View7(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)

  return (
    <section
      id={anchor}
      className='relative z-20 bg-pink-500 h-screen'
      ref={ref}
      data-scroll-lock={scrollLock}></section>
  )
})
export default View7
