'use client'

import { useApp } from '@/context/AppContext'

const Developer = () => {
  const {
    currentView,
    previousView,
    isLocked,
    isTransitioning,
    unlock,
    lock,
    isScrolling,
    scrollingDirection,
    log,
  } = useApp()

  return (
    <div className='top-20 left-0 z-50 fixed flex flex-col bg-red-200 w-[200px]'>
      <div>Current View: {currentView}</div>
      <div>Previous View: {previousView}</div>
      <div>isLocked: {String(isLocked)}</div>
      <div>isTransitioning: {String(isTransitioning)}</div>
      <div>isScrolling: {String(isScrolling)}</div>
      <div>scrollingDirection: {String(scrollingDirection)}</div>
      <button onClick={unlock}>Unlock</button>
      <button onClick={lock}>Lock</button>
      <div>log: {log}</div>
    </div>
  )
}
export default Developer
