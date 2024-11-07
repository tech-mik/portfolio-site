'use client'

import { useApp } from '@/context/AppContext'
import { Unlock } from 'next/font/google'
import { useState } from 'react'

const Developer = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { visibleSection, isScrolling, isTransitioning, log } = useApp()

  return (
    <div className='top-0 left-0 z-50 fixed flex flex-col justify-start items-start gap-1 bg-red-200 p-5'>
      <button
        className='border-gray-300 bg-white shadow-lg p-1 border rounded-full w-10 h-10'
        onClick={() => setCollapsed(!collapsed)}>
        X
      </button>
      {!collapsed && (
        <>
          <div>visibleSection: {String(visibleSection?.dataset.sectionId)}</div>
          <div>isTransitioning: {String(isTransitioning)}</div>
          <div>isScrolling: {String(isScrolling)}</div>
          <div>Log: {String(log)}</div>
        </>
      )}
    </div>
  )
}
export default Developer
