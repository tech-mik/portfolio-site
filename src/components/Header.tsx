import Link from 'next/link'

const Header = () => {
  return (
    <header className='z-30 fixed flex justify-between items-center p-7 w-full'>
      <div className='font-semibold text-5xl text-white'>
        <Link href='#home' className='font-arima'>
          Mik.
        </Link>
      </div>
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
