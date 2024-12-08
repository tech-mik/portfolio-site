import useInternalRef from '@/hooks/useInternalRef'
import useSetVisibleSection from '@/hooks/useSetVisibleSection'
import { childViewProps, ViewHTMLDivElement } from '@/types/Views'
import { forwardRef } from 'react'

const View6 = forwardRef<ViewHTMLDivElement, childViewProps>(function View6(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetVisibleSection(internalRef, sectionIndex)

  return (
    <section
      id={anchor}
      className='relative z-20 flex flex-col justify-center items-center bg-green-500 h-screen'
      ref={ref}
      data-section-id={sectionIndex}
      data-scroll-lock={scrollLock}>
      hoi
    </section>
  )
})
export default View6
