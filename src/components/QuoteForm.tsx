'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const quoteSchema = z.object({
  clientName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().min(2, { message: 'Company name is required.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
  manpowerType: z.string().min(10, { message: 'Please describe your requirement in at least 10 characters.' }),
  quantityNeeded: z.coerce.number().optional(),
  email: z.string().email('A valid email is required.'),
  phone: z.string().min(5, { message: 'A valid phone number is required.' }),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export function QuoteForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      clientName: '',
      company: '',
      country: '',
      manpowerType: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    if (!firestore) return;
    try {
      addDocumentNonBlocking(collection(firestore, 'quote_requests'), {
        ...values,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      toast({
        title: 'Request Sent!',
        description: 'Your quote request has been sent successfully!',
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Global Constructions Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Operation</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UAE, Saudi Arabia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manpowerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manpower Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Construction, Hospitality" {...field} />
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
              <FormLabel>Message/Requirement</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 50 Masons, 20 Electricians for a 6-month project"
                  {...field}
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
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="name@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone</FormLabel>
              <FormControl>
                <Input placeholder="+91 12345 67890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Request Quote Now'}
        </Button>
      </form>
    </Form>
  );
}
