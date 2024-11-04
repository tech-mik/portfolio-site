'use client'

import { VIEWS_CONFIG } from '@/config/viewsConfig'
import useScrollController from '@/hooks/useScrollController'
import { createRef, useMemo, useRef } from 'react'

const Page = () => {
  const views = useMemo(() => VIEWS_CONFIG, [])
  const refs = useRef(views.map(() => createRef<HTMLDivElement>()))

  useScrollController({ refs })

  return (
    <div className='relative bg-black'>
      {views.map(({ element: View }, i) => {
        return (
          <View
            key={i}
            sectionIndex={i}
            ref={refs.current[i]}
            scrollLock={views[i].scrollLock}
            anchor={views[i].anchor}
          />
        )
      })}
    </div>
  )
}

export default Page
