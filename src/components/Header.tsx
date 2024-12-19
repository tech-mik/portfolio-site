'use client'

import { useApp } from '@/context/AppContext'
import Logo from './Logo'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const Header = () => {
  const { visibleSection } = useApp()
  const floatingMenuIds = [4, 6]
  const sectionId = Number(visibleSection?.dataset?.sectionId) ?? 0
  const floatingMenu = floatingMenuIds.includes(sectionId)

  const animation = {
    transition: {
      duration: 0.7,
      type: 'spring',
      bounce: 0.5,
      // delay: 0.15,
    },
  }
  return (
    <header className='top-0 z-30 sticky flex justify-center p-4'>
      <motion.div
        className={cn(
          `lg:flex justify-between items-center hidden p-7 py-4 w-full bg-gray-50/80 text-black drop-shadow-xl rounded-xl backdrop-blur-md`,
        )}
        {...animation}
        initial={{ translateY: -100 }}
        animate={{
          translateY: floatingMenu ? 0 : -100,
        }}>
        <Logo />
        <Navigation />
      </motion.div>

      <motion.div
        className={cn(
          `top-0 absolute lg:flex justify-between items-center hidden m-auto p-5 w-full text-white`,
        )}
        {...animation}
        initial={{ translateY: -200 }}
        animate={{
          translateY: !floatingMenu ? 0 : -200,
        }}>
        <Logo />
        <Navigation />
      </motion.div>
    </header>
  )
}
export default Header
