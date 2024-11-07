'use client'

import { VIEWS_CONFIG } from '@/config/viewsConfig'
import { useApp } from '@/context/AppContext'
import useScrollController from '@/hooks/useScrollController'

const Page = () => {
  const { refs } = useApp()

  useScrollController()

  return (
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
  )
}

export default Page
