'use client'

import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import { forwardRef } from 'react'

const View7 = forwardRef<ViewHTMLDivElement, childViewProps>(function View7(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetVisibleSection(internalRef, sectionIndex)

  return (
    <section
      id={anchor}
      className='relative z-20 bg-pink-500 h-screen'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}></section>
  )
})
export default View7
