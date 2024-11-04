import Link from 'next/link'
import { RiMenu5Line, RiMenuLine } from 'react-icons/ri'

const Header = () => {
  return (
    <header className='top-0 z-30 sticky lg:flex justify-between items-center hidden p-7 w-full'>
      <Link
        href='#home'
        className='font-arima font-semibold text-4xl text-white'>
        Mik.
      </Link>
      <nav className='!text-lg text-white'>
        <ul className='flex gap-8 pr-5 font-arima'>
          <li>Start</li>
          <li>Skills</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
