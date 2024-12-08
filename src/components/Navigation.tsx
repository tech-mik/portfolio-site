import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className='!text-lg'>
      <ul className='flex gap-8 font-arima'>
        <li>
          <Link
            href='#home'
            className='underline-offset-4 hover:underline decoration-green-300'>
            Home
          </Link>
        </li>
        <li>
          <Link
            href='#projects'
            className='underline-offset-4 hover:underline decoration-green-300'>
            Projects
          </Link>
        </li>
        <li>
          <Link
            href='#skills'
            className='underline-offset-4 hover:underline decoration-green-300'>
            Skills
          </Link>
        </li>
        <li>
          <Link
            href='#contact'
            className='underline-offset-4 hover:underline decoration-green-300'>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
