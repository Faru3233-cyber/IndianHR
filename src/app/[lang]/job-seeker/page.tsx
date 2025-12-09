'use client';
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { FirebaseClientProvider } from "@/firebase";
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function JobSeekerForm() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-12"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
      <JobApplicationForm />
    </Suspense>
  )
}

export default function JobSeekerPage() {
  return (
    <FirebaseClientProvider>
      <div>
        <section className="relative bg-secondary py-20 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
              Apply for a Job
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
              We are always looking for talented individuals. Fill out the form below to submit your application.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <JobSeekerForm />
          </div>
        </section>
      </div>
    </FirebaseClientProvider>
  );
}
