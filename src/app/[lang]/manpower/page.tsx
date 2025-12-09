import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
const categories = [
    {
      category: "Skilled",
      examples: "Electricians, Masons, Plumbers, Certified Welders (6G, TIG, MIG), Carpenters (Shuttering & Finishing), Steel Fixers, Heavy & Light Duty Drivers, Crane Operators."
    },
    {
      category: "Semi-Skilled",
      examples: "Mason Helpers, Electrician Helpers, Warehouse Loaders, Assistant Cooks, Assembly Line Workers, Forklift Operators."
    },
    {
      category: "Unskilled",
      examples: "General Laborers, Cleaners, Packing Labor, Construction Site Helpers, Agricultural Workers."
    },
    {
      category: "Hospitality",
      examples: "Chefs (Continental, Indian, Arabic), Waiters, Housekeeping Staff, Front Office Executives, Bellboys."
    },
    {
      category: "Security",
      examples: "Security Guards (PSBD & Non-PSBD), CCTV Operators, Bouncers, Patrolling Guards."
    },
    {
      category: "Facility Management",
      examples: "HVAC Technicians, BMS Operators, MEP Technicians, Gardeners, Office Support Staff."
    }
]
  
export default function ManpowerPage() {
    return (
        <div>
            <section className="relative bg-secondary py-20 md:py-32 text-center">
                <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                    Manpower Categories
                </h1>
                <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
                    We supply a comprehensive range of personnel to meet the specific demands of your industry.
                </p>
                </div>
            </section>
    
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-center text-muted-foreground mb-12">
                            Below is a representative list of the job categories we specialize in. If you have a specific requirement not listed here, please contact us for a customized solution.
                        </p>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px] text-lg">Category</TableHead>
                                    <TableHead className="text-lg">Example Job Roles</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {categories.map((cat) => (
                                    <TableRow key={cat.category}>
                                    <TableCell className="font-semibold text-md">{cat.category}</TableCell>
                                    <TableCell className="text-muted-foreground">{cat.examples}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
