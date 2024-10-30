import useInternalRef from '@/hooks/useInternalRef'
import useSetView from '@/hooks/useSetView'
import clsx from 'clsx'
import Image from 'next/image'
import { forwardRef } from 'react'

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
          'object-bottom z-10 !fixed !h-[100vh] transition-opacity duration-500 ease-in-out object-cover',
          isInView ? 'opacity-100' : 'opacity-0',
        )}
      />
      {children}
    </>
  )
}

export default ImageSection
