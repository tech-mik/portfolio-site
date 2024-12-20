'use client'
import { sendForm } from '@/actions/contact'
import { contactFormSchema } from '@/config/contactFormSchema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { toast } from 'sonner'
import { z } from 'zod'
import FormButtons from './FormButtons'
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

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
      setIsSuccess(true)
    } else if (error) {
      if (error.type === 'RateLimitException') {
        toast.error('Rate limit exceeded', {
          description: 'Wait 5 minutes before sending a new email',
        })
      } else if (error.type === 'ValidationError') {
        if (error instanceof z.ZodError) {
          toast.error('Validation error', {
            description: error.message,
          })
        }
      } else {
        toast.error('Error', {
          description:
            'An error occurred while sending the email, please try again',
        })
      }
    }
    setIsLoading(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='relative space-y-2'>
        {isSuccess && (
          <div className='top-0 right-0 bottom-0 left-0 z-10 absolute flex lg:flex-row flex-col justify-center items-center gap-10 bg-white w-full h-full'>
            <BsFillPatchCheckFill className='text-[200px] text-green-300' />{' '}
            <span className='font-bold font-dancingscript text-6xl text-center'>
              Thanks for reaching out!
            </span>
          </div>
        )}
        <div className='z-0 flex flex-col gap-3 lg:gap-10 lg:grid lg:grid-cols-2 grid-rows-1 w-full'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How may I call you? *</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
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
                  <FormLabel>From what organization are you?</FormLabel>
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
                  <FormLabel>Your inbox location? *</FormLabel>
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
            <FormButtons
              form={form}
              isLoading={isLoading}
              className='lg:flex hidden'
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex flex-col h-full'>
                  <FormLabel>What is on your mind? *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='How do you drink your coffee? I am a cappuccino guy, no sugar.'
                      {...field}
                      className='lg:h-full'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormButtons
            form={form}
            isLoading={isLoading}
            className='flex lg:flex-row flex-col lg:hidden mt-5'
          />
        </div>
      </form>
    </Form>
  )
}
export default ContactForm
