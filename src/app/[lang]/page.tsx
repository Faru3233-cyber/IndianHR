
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Building,
  ChefHat,
  Construction,
  Ship,
  Wrench,
  CheckCircle2,
  HardHat,
  Truck,
  Shield,
  Briefcase,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QuoteForm } from '@/components/QuoteForm';
import { getDictionary } from '@/dictionaries';
import { type Locale } from '../../../i18n.config';
import { FirebaseClientProvider } from '@/firebase';
import { ClientOnly } from '@/components/ui/client-only';

const industries = [
  {
    name: 'construction',
    icon: <Construction className="h-10 w-10" />,
  },
  {
    name: 'facilityManagement',
    icon: <Building className="h-10 w-10" />,
  },
  {
    name: 'hospitality',
    icon: <ChefHat className="h-10 w-10" />,
  },
  {
    name: 'security',
    icon: <Shield className="h-10 w-10" />,
  },
  {
    name: 'transport',
    icon: <Truck className="h-10 w-10" />,
  },
  {
    name: 'oilGas',
    icon: <Ship className="h-10 w-10" />,
  },
];

const workerCategories = [
  { name: 'skilled', icon: <Wrench className="h-6 w-6 mr-2 text-primary" />, examples: 'skilledExamples' },
  { name: 'semiSkilled', icon: <HardHat className="h-6 w-6 mr-2 text-primary" />, examples: 'semiSkilledExamples' },
  { name: 'unskilled', icon: <Briefcase className="h-6 w-6 mr-2 text-primary" />, examples: 'unskilledExamples' },
];

const whyUsPoints = [
  'fastMobilization',
  'tradeTestSupport',
  'licensedAgency',
  'endToEndProcessing',
];

const countries = [
  { name: 'saudiArabia', flag: '🇸🇦' },
  { name: 'uae', flag: '🇦🇪' },
  { name: 'qatar', flag: '🇶🇦' },
  { name: 'oman', flag: '🇴🇲' },
  { name: 'bahrain', flag: '🇧🇭' },
  { name: 'kuwait', flag: '🇰🇼' },
];

export default async function Home({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.page.home;
  const heroImage = {
    id: "hero-main",
    description: "Your reliable partner for sourcing qualified manpower from India.",
    imageUrl: "https://i.postimg.cc/6QsmD1XB/IMG-20251207-153512-(1).jpg",
    imageHint: "workforce banner"
  };

  return (
    <div className="flex flex-col">
       <section className="relative w-full aspect-[16/9]">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-end text-center text-white p-4">
          <div className="pb-20 flex gap-4">
            <Button asChild size="lg">
              <Link href={`/${lang}/#request-quote`}>{t.requestQuote}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href={`/${lang}/services`}>{t.ourServices}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="industries" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              {t.industries.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.industries.subtitle}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <a href={`/${lang}/#request-quote`} key={industry.name}>
                <Card className="text-center transition-transform hover:scale-105 hover:shadow-lg h-full">
                  <CardHeader>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {industry.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="font-headline">{t.industries.items[industry.name]}</CardTitle>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                {t.workers.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t.workers.subtitle}
              </p>
              <div className="mt-8 space-y-6">
                {workerCategories.map(category => (
                  <div key={category.name} className="flex items-start">
                    {category.icon}
                    <div>
                      <h3 className="text-lg font-semibold">{t.workers.categories[category.name]}</h3>
                      <p className="text-muted-foreground">{t.workers.examples[category.examples]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
               <Image
                  src={PlaceHolderImages.find(i => i.id === 'construction')?.imageUrl!}
                  alt="Construction workers"
                  width={600}
                  height={400}
                  data-ai-hint="construction workers"
                  className="rounded-lg shadow-xl"
                />
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              {t.whyUs.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.whyUs.subtitle}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUsPoints.map((point) => (
              <div key={point} className="flex items-start space-x-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-500" />
                <p className="text-lg font-medium">{t.whyUs.points[point]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="countries" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            {t.countries.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.countries.subtitle}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-12">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center text-xl font-semibold">
                <span className="mr-2 text-3xl">{country.flag}</span>
                {t.countries.items[country.name]}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request-quote" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              {t.quote.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.quote.subtitle}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-xl">
            <Card>
              <CardContent className="p-6">
                <ClientOnly>
                    <FirebaseClientProvider>
                        <QuoteForm />
                    </FirebaseClientProvider>
                </ClientOnly>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
