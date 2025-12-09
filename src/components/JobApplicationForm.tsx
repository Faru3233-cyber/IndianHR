'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const applicationSchema = z.object({
  jobId: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required."),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(5, "Phone is required."),
  experienceLevel: z.string().min(1, "Experience level is required."),
  country: z.string().min(2, "Country is required."),
  message: z.string().optional(),
  resume: z.any()
    .refine((files) => files?.length === 1, 'Resume is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`),
});

export function JobApplicationForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const jobTitleQueryParam = searchParams.get('title');
  const jobIdQueryParam = searchParams.get('id');

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobId: jobIdQueryParam || 'general',
      jobTitle: jobTitleQueryParam || '',
      name: '',
      email: '',
      phone: '',
      experienceLevel: '',
      country: '',
      message: '',
    },
  });

  useEffect(() => {
    if (jobTitleQueryParam) {
      form.setValue('jobTitle', jobTitleQueryParam);
    }
    if (jobIdQueryParam) {
      form.setValue('jobId', jobIdQueryParam);
    }
  }, [jobTitleQueryParam, jobIdQueryParam, form]);

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    if (!firestore) return;
    
    // In a real app, you'd upload the file to Firebase Storage here and get the URL
    const resumeFile = values.resume[0];
    const resumeUrl = "https://fake-resume.example.com/" + resumeFile.name; // Placeholder

    try {
      addDocumentNonBlocking(collection(firestore, 'applications'), {
        jobId: values.jobId,
        jobTitle: values.jobTitle,
        name: values.name,
        email: values.email,
        phone: values.phone,
        experienceLevel: values.experienceLevel,
        country: values.country,
        message: values.message,
        resumeUrl: resumeUrl, // Use actual URL from storage in a real app
        createdAt: serverTimestamp(),
        status: 'new',
      });

      toast({
        title: 'Application Sent!',
        description: 'Your application has been submitted successfully!',
      });
      form.reset();
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error submitting your application.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Applying For</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Electrician, Project Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
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
                    <FormLabel>Contact No</FormLabel>
                    <FormControl>
                    <Input placeholder="+91 12345 67890" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 5+ years" {...field} />
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
                    <FormLabel>Country of Residence</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., India" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
         <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Upload Your Resume</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    {...form.register('resume')}
                    ref={fileInputRef}
                  />
                </FormControl>
                <FormDescription>PDF or Word documents only, 5MB max.</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit Your Application'}
        </Button>
      </form>
    </Form>
  );
}
