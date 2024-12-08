'use client'
import { contactFormSchema } from '@/config/contactFormSchema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext, useFormState } from 'react-hook-form'
import { isValid, z } from 'zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { HiPaperAirplane } from 'react-icons/hi'
import { RiEraserFill } from 'react-icons/ri'
import { PiPencilFill, PiSpinnerFill } from 'react-icons/pi'
import { useState } from 'react'
import { sendForm } from '@/actions/contact'

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      organization: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = form.handleSubmit(async function (
    values: z.infer<typeof contactFormSchema>,
  ) {
    setIsLoading(true)

    const { success, error } = await sendForm(values)

    if (success) {
      form.reset()
      alert('Form submitted successfully')
    } else if (error) {
      alert('Something went wrong')
    }
    setIsLoading(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='relative space-y-2'>
        <div className='top-0 right-0 bottom-0 left-0 z-10 absolute flex justify-center items-center bg-white w-full h-full'>
          Hello
        </div>
        <div className='z-0 gap-10 grid grid-cols-2 w-full'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-arima text-xl'>
                    What is your name? *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      'text-xs',
                      form.formState.errors.name ? 'opacity-100' : 'opacity-0',
                    )}>
                    placeholder
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='organization'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-arima text-xl'>
                    From what organization are you?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='ACME Inc.' {...field} />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      'text-xs',
                      form.formState.errors.organization
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}>
                    placeholder
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-arima text-xl'>
                    Where can I reach you on? *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='john.doe@acme.com' {...field} />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      'text-xs',
                      form.formState.errors.email ? 'opacity-100' : 'opacity-0',
                    )}>
                    placeholder
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
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
                onClick={() => form.reset()}>
                <RiEraserFill />
                Clear Fields
              </Button>
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex flex-col h-full'>
                  <FormLabel className='font-arima text-xl'>
                    What is on your mind? *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='What do you have in your coffee?'
                      {...field}
                      className='h-full'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
export default ContactForm
