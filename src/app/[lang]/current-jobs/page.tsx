'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useMemoFirebase } from "@/firebase";
import type { Job } from '@/lib/types';


const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export default function CurrentJobsPage() {
    const firestore = useFirestore();
    const jobsQuery = useMemoFirebase(() => query(collection(firestore, "jobs"), orderBy("createdAt", "desc")), [firestore]);
    const { data: jobs, isLoading } = useCollection<Job>(jobsQuery);


  return (
    <div>
      <section className="relative bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            Current Job Openings
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
            Explore the latest career opportunities with our clients in the Gulf region. Your next big break could be here.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs && jobs.map((job) => (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center pt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                      <Link href="https://wa.me/918483862361" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon /> Contact on WhatsApp
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          {!isLoading && (!jobs || jobs.length === 0) && (
             <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">There are no current job openings at the moment. Please check back later.</p>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}
