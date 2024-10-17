import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (response.ok) {
            setSubmitStatus('success')
            form.reset()
        } else {
            setSubmitStatus('error')
        }
    } catch (error) {
        setSubmitStatus('error')
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-white">
      <style jsx global>{`
        .disable-autofill-styles input:-webkit-autofill,
        .disable-autofill-styles input:-webkit-autofill:hover,
        .disable-autofill-styles input:-webkit-autofill:focus,
        .disable-autofill-styles input:-webkit-autofill:active,
        .disable-autofill-styles textarea:-webkit-autofill,
        .disable-autofill-styles textarea:-webkit-autofill:hover,
        .disable-autofill-styles textarea:-webkit-autofill:focus,
        .disable-autofill-styles textarea:-webkit-autofill:active {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #212121 inset !important;
          transition: background-color 5000s ease-in-out 0s;
          background-color: #212121 !important;
          border: 1px solid white !important;
        }
      `}</style>
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-entourage-black to-entourage-orange dark:bg-gradient-to-r dark:from-entourage-blue dark:to-entourage-orange">
            Contact Us
        </span>
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 disable-autofill-styles">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    {...field} 
                    className="bg-entourage-black/50 text-white border-white rounded-[15px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your email" 
                    {...field} 
                    className="bg-entourage-black/50 text-white border-white rounded-[15px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Your message" 
                    {...field} 
                    className="bg-entourage-black/50 text-white border-white rounded-[15px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className='bg-entourage-black text-white border-[1px] rounded-[15px] border-entourage-blue hover:bg-entourage-blue/20'>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          {submitStatus === 'success' && (
            <p className="text-green-500">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500">An error occurred. Please try again.</p>
          )}
        </form>
      </Form>
    </div>
  )
}
