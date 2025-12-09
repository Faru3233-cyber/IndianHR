import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"

const countriesData = [
  {
    value: "saudi",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    process: [
      "Visa sponsorship (Iqama) processed through the employer.",
      "Attestation of documents from the Saudi Embassy in India.",
      "Mandatory medical examination at GAMCA-approved centers."
    ],
    advantages: [
      "Access to a massive market for large-scale infrastructure projects.",
      "Strong government focus on Vision 2030 creating diverse job opportunities.",
      "Well-defined labor laws providing clarity for employers."
    ]
  },
  {
    value: "uae",
    name: "UAE",
    flag: "🇦🇪",
    process: [
      "Employment visa and Emirates ID processed by the employer.",
      "Certificate attestation required for skilled and professional categories.",
      "Medical fitness test conducted upon arrival in the UAE."
    ],
    advantages: [
      "A global business hub with a diverse, multicultural environment.",
      "Streamlined visa process and business-friendly regulations.",
      "High demand for skilled workers in hospitality, construction, and tech."
    ]
  },
  {
    value: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    process: [
      "Work visa and Qatar ID (QID) arranged by the sponsoring company.",
      "Police Clearance Certificate (PCC) required from India.",
      "Medical check-up is part of the residency permit process."
    ],
    advantages: [
      "Significant investment in infrastructure and projects post-World Cup.",
      "Growing opportunities in logistics, LNG sector, and facility management.",
      "Improving labor laws focused on worker welfare."
    ]
  },
  {
    value: "oman",
    name: "Oman",
    flag: "🇴🇲",
    process: [
      "Employer-sponsored employment visa.",
      "Medical tests and background checks are standard procedure.",
      "Visa processing times are generally efficient."
    ],
    advantages: [
      "Focus on economic diversification (Oman Vision 2040).",
      "Stable and welcoming environment for foreign workers.",
      "Demand in tourism, logistics, and manufacturing sectors."
    ]
  },
  {
    value: "bahrain",
    name: "Bahrain",
    flag: "🇧🇭",
    process: [
      "Work permit and residency visa managed by the employer.",
      "Pre-employment medical screening is mandatory.",
      "Flexible pathways for different skill levels."
    ],
    advantages: [
      "Strategic location with excellent connectivity in the Gulf.",
      "Strong financial and banking sector.",
      "Business-friendly environment with low operating costs."
    ]
  },
  {
    value: "kuwait",
    name: "Kuwait",
    flag: "🇰🇼",
    process: [
      "Work visa sponsorship required from a Kuwaiti employer.",
      "Mandatory Police Clearance Certificate and medical examination.",
      "Document attestation process is strictly followed."
    ],
    advantages: [
      "Oil-rich economy with continuous projects in the energy sector.",
      "High demand for skilled technical and construction workers.",
      "Competitive salaries and benefits for qualified personnel."
    ]
  }
];

export default function CountriesPage() {
  return (
    <div>
      <section className="relative bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            Countries We Serve
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
            We possess in-depth knowledge of the legal and recruitment nuances for every major country in the Gulf region.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
                <Tabs defaultValue="uae" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 h-auto">
                        {countriesData.map((country) => (
                        <TabsTrigger key={country.value} value={country.value} className="py-2">
                            <span className="mr-2 text-xl">{country.flag}</span> {country.name}
                        </TabsTrigger>
                        ))}
                    </TabsList>

                    {countriesData.map((country) => (
                        <TabsContent key={country.value} value={country.value} className="mt-8">
                            <div className="grid md:grid-cols-2 gap-8 p-6 border rounded-lg">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Legal Process (Brief)</h3>
                                    <ul className="space-y-3">
                                        {country.process.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Advantage of Hiring from India</h3>
                                    <ul className="space-y-3">
                                        {country.advantages.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
      </section>
    </div>
  );
}
