import Link from 'next/link'

const Header = () => {
  return (
    <header className='top-0 z-30 sticky flex justify-between items-center p-7 w-full'>
      <div className='font-semibold text-5xl text-white'>
        <Link href='#home' className='font-arima'>
          Mik.
        </Link>
      </div>
      <nav className='!text-lg text-white'>
        <ul className='sm:flex gap-8 hidden pr-5 font-arima'>
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
