import Caret from '@/components/Caret'
import { useState } from 'react'

interface TerminalActionProps {
  action: () => void
  ref: React.RefObject<HTMLInputElement | null>
  actionText: string
  disabled?: boolean
}

const TerminalAction = ({
  action,
  ref,
  actionText,
  disabled,
}: TerminalActionProps) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [actionFired, setActionFired] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    const allowedChars = ['y', 'n', '']
    if (allowedChars.includes(value)) {
      setValue(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const input = form.elements.namedItem('input') as HTMLInputElement

    if (input.value.toLowerCase() === 'y') {
      input.blur()
      setActionFired(true)
      action()
    } else {
      input.value = ''
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-row gap-2 whitespace-nowrap'>
      <label htmlFor='frontend-input' className='inline grow-1'>
        {actionText}
      </label>
      <span>
        {value}
        {isFocused && <Caret />}
      </span>
      <input
        disabled={disabled || actionFired}
        id='input'
        data-type='frontend'
        type='text'
        className='absolute opacity-0'
        ref={ref}
        onChange={handleChange}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </form>
  )
}
export default TerminalAction
