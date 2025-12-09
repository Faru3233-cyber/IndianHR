'use client';
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Briefcase } from "lucide-react";
import Link from 'next/link';
import { FirebaseClientProvider } from '@/firebase';

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
      className="h-6 w-6 mr-2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M16.24 7.76A6 6 0 0 0 9.5 6.5" />
    </svg>
  );

export default function ContactPage() {
    return (
        <FirebaseClientProvider>
            <div>
                <section className="relative bg-secondary py-20 md:py-32 text-center">
                    <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                        Contact Us
                    </h1>
                    <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
                        Get in touch with our team to discuss your manpower needs or for any inquiries. We're here to help.
                    </p>
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold font-headline">Indian HR Overseas</h2>
                                    <p className="mt-2 text-muted-foreground">Your partner in building a stronger workforce.</p>
                                </div>
                                <div className="space-y-4 text-lg">
                                    <div className="flex items-start">
                                        <MapPin className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
                                        <span className="text-muted-foreground">123 Business Bay, Mumbai, Maharashtra 400001, India</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-6 w-6 mr-4 text-primary" />
                                        <a href="mailto:indianhroverseas@gmail.com" className="text-muted-foreground hover:text-primary">indianhroverseas@gmail.com</a>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-6 w-6 mr-4 text-primary" />
                                        <a href="tel:+918483862361" className="text-muted-foreground hover:text-primary">+91 8483862361</a>
                                    </div>
                                    <div className="flex items-center">
                                        <Briefcase className="h-6 w-6 mr-4 text-primary" />
                                        <span className="font-semibold text-foreground">License: B-1234/MUM/PER/1000+/5/9876/2023</span>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                                        <Link href="https://wa.me/918483862361" target="_blank" rel="noopener noreferrer">
                                            <WhatsAppIcon />
                                            Chat on WhatsApp
                                        </Link>
                                    </Button>
                                </div>
                                <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mt-8">
                                    <p className="text-muted-foreground">Google Maps Embed Placeholder</p>
                                </div>
                            </div>

                            <div id="request-quote">
                                <Card>
                                    <CardContent className="p-8">
                                        <h3 className="text-2xl font-bold font-headline mb-4">Send us a Message</h3>
                                        <p className="text-muted-foreground mb-8">Fill out the form below to request a quote.</p>
                                        <QuoteForm />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </FirebaseClientProvider>
    );
}
