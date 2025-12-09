import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react';

const YouTubeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
    >
        <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
    </svg>
);


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
      className="h-6 w-6"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const TelegramIcon = () => (
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
        className="h-6 w-6"
    >
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="m22 2-11 11"/>
    </svg>
);

export function Footer({ dictionary, lang }: { dictionary: any, lang: string }) {
  const footerLinks = {
    company: dictionary.links.company.map((link: {href: string, label: string}) => ({...link, href: `/${lang}${link.href}`})),
    solutions: dictionary.links.solutions.map((link: {href: string, label: string}) => {
        if (link.href.startsWith('/#')) {
            return {...link, href: `/${lang}${link.href}`}
        }
        return {...link, href: `/${lang}${link.href}`}
    }),
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold font-headline">Indian HR Overseas</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {dictionary.tagline}
            </p>
            <p className="text-sm font-semibold mt-4">{dictionary.license}</p>
            <div className="flex space-x-4 mt-6">
                <Link href="https://www.facebook.com/profile.php?id=61563223356860" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook/></Link>
                <Link href="https://www.instagram.com/indiann_hr/?utm_source=qr&r=nametag" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram/></Link>
                <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><YouTubeIcon /></Link>
                <Link href="https://wa.me/918483862361" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><WhatsAppIcon/></Link>
                <Link href="https://t.me/indianhr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><TelegramIcon/></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold tracking-wider uppercase">{dictionary.company}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link: {href: string, label: string}) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold tracking-wider uppercase">{dictionary.solutions}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.solutions.map((link: {href: string, label: string}) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold tracking-wider uppercase">{dictionary.contactUs}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">{dictionary.address}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <a href="mailto:indianhroverseas@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">indianhroverseas@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <a href="tel:+918483862361" className="text-muted-foreground hover:text-primary transition-colors">+91 8483862361</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {dictionary.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
