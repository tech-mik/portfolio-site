import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import { childViewProps } from '@/types/Views'
import { forwardRef } from 'react'

const View6 = forwardRef<HTMLDivElement, childViewProps>(function View6(
  { sectionIndex, scrollLock, anchor },
  ref,
) {
  const { internalRef } = useInternalRef(ref)
  useSetView(internalRef, sectionIndex)

  return (
    <section
      id={anchor}
      className='relative z-20 flex flex-col justify-center items-center bg-green-500 h-screen'
      ref={ref}
      data-scroll-lock={scrollLock}>
      hoi
    </section>
  )
})
export default View6
