'use client'

import { useApp } from '@/context/AppContext'

const Navigation = () => {
  const { refs } = useApp()

  const menuItems = [
    { name: 'Home', ref: refs.current[0] },
    { name: 'Projects', ref: refs.current[4] },
    { name: 'Skills', ref: refs.current[5] },
    { name: 'Contact', ref: refs.current[6] },
  ]

  return (
    <nav className='!text-lg'>
      <ul className='flex gap-8 font-arima'>
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() =>
                item.ref.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className='underline-offset-4 hover:underline decoration-green-300'>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
