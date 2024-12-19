import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type BrowserMockupProps = {
  children: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  title?: string
} & ComponentProps<'div'>

/**
 * @param {object} props
 * @param {string} props.className - Class for wrapper div.
 * @param {string} props.contentClassName - Tailwind class for nested content div.
 */
const BrowserMockup = ({
  children,
  className,
  headerClassName,
  contentClassName,
  title,
  ...props
}: BrowserMockupProps) => {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col shadow-xl border rounded-lg w-full h-full overflow-hidden',
        className,
      )}>
      <div
        className={cn(
          'flex flex-row justify-between items-center border-gray-150 bg-gray-100 px-2 border-b h-6 text-muted-foreground text-xs',
          headerClassName,
        )}>
        <div className='flex flex-row justify-start items-center gap-1'>
          <div className='bg-red-500 rounded-full w-2 h-2'></div>
          <div className='bg-yellow-500 rounded-full w-2 h-2'></div>
          <div className='bg-green-500 rounded-full w-2 h-2'></div>
        </div>
        <div>{title}</div>
        <div></div>
      </div>
      <div className={cn('bg-white p-2', contentClassName)}>{children}</div>
    </div>
  )
}
export default BrowserMockup
