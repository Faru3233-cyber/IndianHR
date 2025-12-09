import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getDictionary } from '@/dictionaries';
import { type Locale } from '../../../i18n.config';

const servicesList = [
  {
    id: 'manpower-supply',
    imageId: 'manpower-supply',
  },
  {
    id: 'trade-testing',
    imageId: 'trade-test',
  },
  {
    id: 'visa-processing',
    imageId: 'visa-processing',
  },
  {
    id: 'travel-arrangements',
    imageId: 'travel',
  },
  {
    id: 'bulk-hiring',
    imageId: 'bulk-hiring',
  },
  {
    id: 'drivers',
    imageId: 'driver',
  },
  {
    id: 'electricians',
    imageId: 'electrician',
  },
  {
    id: 'chefs',
    imageId: 'chef',
  },
  {
    id: 'barbers',
    imageId: 'barber',
  },
  {
    id: 'truck-drivers',
    imageId: 'truck-driver',
  },
  {
    id: 'hotel-staff',
    imageId: 'hotel-staff',
  },
  {
    id: 'plumbers',
    imageId: 'plumber',
  },
];

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


export default async function ServicesPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.page.services;

  return (
    <div>
      <section className="relative bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            {t.title}
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => {
              const image = PlaceHolderImages.find((img) => img.id === service.imageId);
              const serviceText = t.items[service.id as keyof typeof t.items];
              return (
                <Card key={service.id} className="flex flex-col">
                  {image && (
                    <div className="aspect-video relative">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        data-ai-hint={image.imageHint}
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{serviceText.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{serviceText.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                      <Link href="https://wa.me/918483862361" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon /> {t.contactButton}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
