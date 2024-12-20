'use client'

import { VIEWS_CONFIG } from '@/config/viewsConfig'
import { useApp } from '@/context/AppContext'
import useScrollController from '@/hooks/useScrollController'
import { Toaster } from 'sonner'

const Page = () => {
  useScrollController()
  const { refs } = useApp()

  return (
    <>
      <Toaster duration={10000} closeButton pauseWhenPageIsHidden />
      <div className='relative bg-black'>
        {VIEWS_CONFIG.map(({ element: View }, i) => {
          return (
            <View
              key={i}
              sectionIndex={i}
              ref={refs.current[i]}
              scrollLock={VIEWS_CONFIG[i].scrollLock}
              anchor={VIEWS_CONFIG[i].anchor}
            />
          )
        })}
      </div>
    </>
  )
}

export default Page
