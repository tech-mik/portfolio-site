import clsx from 'clsx'
import Image from 'next/image'

interface ImageSectionProps {
  src: string
  alt: string
  isInView: boolean
  children?: React.ReactNode
}

const ImageSection = ({ src, alt, isInView, children }: ImageSectionProps) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        quality={90}
        priority
        fill
        className={clsx(
          '!top-auto object-bottom z-10 !fixed !h-[100vh] max-lg:max-h-[70%] transition-opacity duration-300 ease-in-out object-cover',
          isInView ? 'opacity-100' : 'opacity-0',
        )}
      />
      {children}
    </>
  )
}

export default ImageSection
