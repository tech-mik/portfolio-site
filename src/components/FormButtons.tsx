import { HiPaperAirplane } from 'react-icons/hi'
import { PiSpinnerFill, PiPencilFill } from 'react-icons/pi'
import { RiEraserFill } from 'react-icons/ri'
import { Button } from './ui/button'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { test } from '@/actions/test'

interface FormButtonProps {
  isLoading: boolean
  form: UseFormReturn<{
    name: string
    organization: string
    email: string
    message: string
  }>
  className?: string
}

const FormButtons = ({ isLoading, form, className }: FormButtonProps) => {
  const testFunction = async () => {
    const result = await test()
    console.log(result)
  }

  return (
    <div className={cn('gap-2', className)}>
      <Button
        className='w-full'
        variant='default'
        disabled={isLoading || !form.formState.isValid}>
        {form.formState.isValid ? (
          <>
            {isLoading ? (
              <PiSpinnerFill className='animate-spin' />
            ) : (
              <HiPaperAirplane />
            )}
            Paper Plane!
          </>
        ) : (
          <>
            <PiPencilFill /> Fill in the form
          </>
        )}
      </Button>
      <Button
        type='reset'
        className='w-full'
        variant='outline'
        disabled={isLoading}
        // onClick={() => form.reset()}>
        onClick={testFunction}>
        <RiEraserFill />
        Clear Fields
      </Button>
    </div>
  )
}
export default FormButtons
