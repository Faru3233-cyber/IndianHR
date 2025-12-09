import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, MapPin, Target, Zap, Shield, Eye } from 'lucide-react';
import { getDictionary } from '@/dictionaries';
import { type Locale } from '../../../i18n.config';

const values = [
    { name: 'Speed', icon: <Zap className="h-8 w-8 text-primary" />, description: 'We ensure rapid mobilization and deployment to meet your project timelines.' },
    { name: 'Reliability', icon: <Shield className="h-8 w-8 text-primary" />, description: 'Our rigorous screening process guarantees dependable and qualified personnel.' },
    { name: 'Transparency', icon: <Eye className="h-8 w-8 text-primary" />, description: 'We maintain clear communication and processes from start to finish.' },
]

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <div>
      <section className="relative bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            About Indian HR Overseas
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
            Connecting Gulf businesses with India's finest workforce through a streamlined, reliable, and efficient process.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-4">
                Our Company Profile
              </h2>
              <p className="text-muted-foreground space-y-4">
                Indian HR Overseas is a premier manpower recruitment agency based in India, officially licensed by the Government of India. We specialize in sourcing and deploying a high-caliber workforce to meet the diverse needs of industries across the Gulf Cooperation Council (GCC) countries.
                <br/><br/>
                Our expertise lies in understanding the unique demands of the Gulf market and matching them with the exceptional talent available in the Indian subcontinent. We handle the entire recruitment lifecycle, from initial sourcing and rigorous trade testing to visa processing and travel arrangements, ensuring a seamless experience for our clients.
              </p>
            </div>
            <div>
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={1200}
                  height={600}
                  data-ai-hint={aboutImage.imageHint}
                  className="rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 text-center md:text-left">
                <Card className="p-6">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Target className="w-12 h-12 text-primary"/>
                        <CardTitle className="text-2xl font-headline">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">To be the most trusted and efficient bridge for supplying a responsible and skilled workforce from India to the Gulf, fostering growth for both businesses and individuals.</p>
                    </CardContent>
                </Card>
                <Card className="p-6">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Briefcase className="w-12 h-12 text-primary"/>
                        <CardTitle className="text-2xl font-headline">License Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">We are a government-recognized manpower agency, operating with full compliance and ethical standards.</p>
                        <p className="font-bold text-lg mt-2 text-foreground">Lic. No: B-1234/MUM/PER/1000+/5/9876/2023</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline text-center mb-12">Our Core Values</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map(value => (
                        <div key={value.name} className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{value.name}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Our Office
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Visit us at our head office in Mumbai.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                <p className="text-muted-foreground">Google Maps Embed Placeholder</p>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center text-lg mb-4">
                    <MapPin className="h-6 w-6 mr-4 text-primary"/>
                    <span>123 Business Bay, Mumbai, Maharashtra 400001, India</span>
                </div>
                <div className="flex items-center text-lg">
                    <Building className="h-6 w-6 mr-4 text-primary"/>
                    <span>Corporate Office & Recruitment Center</span>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
