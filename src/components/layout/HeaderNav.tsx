'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground/80">
            {children}
        </Link>
    )
}

export function HeaderNav({ lang, dictionary }: { lang: 'en' | 'ar', dictionary: any }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const recruitmentSectors = [
    { href: `/${lang}/manpower`, label: dictionary.sectors.all },
    { href: '#', label: dictionary.sectors.healthcare },
    { href: '#', label: dictionary.sectors.civil },
    { href: '#', label: dictionary.sectors.electro },
    { href: '#', label: dictionary.sectors.hospitality },
    { href: '#', label: dictionary.sectors.facility },
    { href: '#', label: dictionary.sectors.metro },
    { href: '#', label: dictionary.sectors.logistics },
    { href: '#', label: dictionary.sectors.retail },
    { href: '#', label: dictionary.sectors.ecommerce },
    { href: '#', label: dictionary.sectors.transportation },
    { href: '#', label: dictionary.sectors.airport },
  ]
  
  const navLinks = [
      { href: `/${lang}`, label: dictionary.home },
      { href: `/${lang}/about`, label: dictionary.about },
  ];
  
  const moreLinks = [
      { href: `/${lang}/job-seeker`, label: dictionary.jobSeeker },
      { href: redirectedPathName(lang === 'en' ? 'ar' : 'en'), label: dictionary.language },
      { href: `/${lang}/current-jobs`, label: dictionary.currentJobs },
      { href: `/${lang}/contact`, label: dictionary.contact },
  ]

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <div className="hidden md:flex flex-1 items-center justify-between space-x-4">
               <Link href={`/${lang}`} className="flex items-center space-x-2">
                 <Image
                    src="https://i.postimg.cc/dtV8WtPC/my-office-logo.png"
                    alt="Indian HR Overseas Logo"
                    width={180}
                    height={60}
                    priority
                  />
                </Link>
              <Image
                src="https://i.postimg.cc/brx3Qq5M/IMG-20251207-WA0010-removebg-preview.png"
                alt="Second Logo"
                width={180}
                height={60}
                priority
              />
              <Image
                src="https://i.postimg.cc/J02Mky6W/Screenshot-2025-12-07-185201-removebg-preview.png"
                alt="Third Logo"
                width={180}
                height={60}
                priority
              />
              <Image
                src="https://i.postimg.cc/50RMZSNz/Screenshot-2025-12-07-150056-removebg-preview.png"
                alt="Fourth Logo"
                width={180}
                height={60}
                priority
              />
            </div>
             <div className="md:hidden flex-1">
                 <Link href={`/${lang}`} className="flex items-center space-x-2">
                     <Image
                        src="https://i.postimg.cc/dtV8WtPC/my-office-logo.png"
                        alt="Indian HR Overseas Logo"
                        width={180}
                        height={60}
                        priority
                      />
                </Link>
            </div>
        </div>
      </div>
      <nav className="bg-primary hidden md:block">
        <div className="container mx-auto flex h-14 items-center justify-center px-4 space-x-6">
            <NavLink href={`/${lang}`}>{dictionary.home}</NavLink>
            <NavLink href={`/${lang}/about`}>{dictionary.about}</NavLink>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground/80 focus:outline-none">
                    {dictionary.recruitmentSectors} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {recruitmentSectors.map(link => (
                        <DropdownMenuItem key={link.label} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <NavLink href={`/${lang}/job-seeker`}>{dictionary.jobSeeker}</NavLink>
            <NavLink href={redirectedPathName(lang === 'en' ? 'ar' : 'en')}>{dictionary.language}</NavLink>
            <NavLink href={`/${lang}/current-jobs`}>{dictionary.currentJobs}</NavLink>
            <NavLink href={`/${lang}/contact`}>{dictionary.contact}</NavLink>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden absolute top-[130px] right-4 z-50">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <Link href={`/${lang}`} className="mb-8" onClick={() => setIsSheetOpen(false)}>
                    <Image
                      src="https://i.postimg.cc/dtV8WtPC/my-office-logo.png"
                      alt="Indian HR Overseas Logo"
                      width={180}
                      height={60}
                    />
                </Link>
                <div className="flex flex-col space-y-4">
                  {[...navLinks, ...recruitmentSectors, ...moreLinks].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
    </>
  );
}
