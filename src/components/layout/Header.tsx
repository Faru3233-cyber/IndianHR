
'use client';

import Link from 'next/link';
import { Mail, Facebook } from 'lucide-react';

const YouTubeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
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
      className="h-5 w-5"
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
        className="h-5 w-5"
    >
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="m22 2-11 11"/>
    </svg>
);

const InstagramIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-5 w-5"
    >
       <path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07,3.252,0.148,4.771,1.691,4.919,4.919,0.058,1.265,0.069,1.645,0.069,4.85s-0.012,3.584-0.07,4.85c-0.148,3.227-1.669,4.771-4.919,4.919-1.266,0.058-1.644,0.07-4.85,0.07-3.204,0-3.584-0.012-4.85-0.07-3.252-0.148-4.771-1.691-4.919-4.919-0.058-1.265-0.069-1.645-0.069-4.85s0.012-3.584,0.07-4.85c0.148-3.227,1.669-4.771,4.919-4.919,1.266-0.057,1.645-0.069,4.85-0.069z M12,0 C8.74,0,8.333,0.014,7.053,0.072 2.695,0.272,0.273,2.69,0.073,7.052 0.014,8.333,0,8.74,0,12s0.014,3.667,0.072,4.947c0.2,4.358,2.618,6.78,6.98,6.98,1.267,0.058,1.667,0.072,4.947,0.072s3.68-0.014,4.947-0.072c4.358-0.2,6.782-2.618,6.979-6.98,0.058-1.28,0.072-1.667,0.072-4.947s-0.014-3.667-0.072-4.947c-0.2-4.358-2.618-6.78-6.979-6.98C15.667,0.014,15.26,0,12,0z M12,5.838c-3.403,0-6.162,2.759-6.162,6.162s2.759,6.162,6.162,6.162,6.162-2.759,6.162-6.162S15.403,5.838,12,5.838z M12,16.2c-2.31,0-4.188-1.878-4.188-4.188s1.878-4.188,4.188-4.188,4.188,1.878,4.188,4.188S14.31,16.2,12,16.2z M16.965,5.595c-0.66,0-1.196,0.536-1.196,1.196s0.536,1.196,1.196,1.196,1.196-0.536,1.196-1.196S17.625,5.595,16.965,5.595z"></path>
    </svg>
);


export function Header({ dictionary }: { dictionary: { email: string } }) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold font-headline">
            Indian HR Overseas
        </Link>
        <div className="flex-1 flex justify-center items-center gap-6">
             <a
              href={`mailto:${dictionary.email}`}
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary-foreground/80"
            >
              <Mail className="h-5 w-5" />
              <span className='hidden md:inline'>{dictionary.email}</span>
            </a>
            <div className="flex items-center space-x-3">
                <Link href="https://www.facebook.com/profile.php?id=61563223356860" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80"><Facebook/></Link>
                <Link href="https://www.instagram.com/indiann_hr/?utm_source=qr&r=nametag" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80">
                    <InstagramIcon />
                </Link>
                <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80"><YouTubeIcon /></Link>
                <Link href="https://wa.me/918483862361" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80"><WhatsAppIcon/></Link>
                <Link href="https://t.me/indianhr" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80"><TelegramIcon/></Link>
            </div>
        </div>
        <div className="flex-1 flex justify-end">
        </div>
      </div>
    </div>
  );
}
