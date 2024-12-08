import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href='#home'
      className='items-center font-arima font-semibold text-4xl'>
      Mik<span className='text-green-300'>.</span>
    </Link>
  )
}
export default Logo
