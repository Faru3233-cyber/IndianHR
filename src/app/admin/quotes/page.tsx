'use client';
import type { QuoteRequest } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { Badge } from "@/components/ui/badge";

export default function AdminQuotesPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();
    
    const quotesQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'quote_requests'), orderBy('createdAt', 'desc'))
    }, [firestore, user]);
    
    const { data: quotes, isLoading: isDataLoading } = useCollection<QuoteRequest>(quotesQuery);
    const isLoading = isAuthLoading || isDataLoading;

    const getStatusVariant = (status: string) => {
        switch (status) {
          case 'new':
            return 'default';
          case 'responded':
            return 'secondary';
          case 'closed':
            return 'outline';
          default:
            return 'default';
        }
      };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">Manage Quote Requests</h1>
            <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Received Quote Requests</CardTitle>
                    <CardDescription className="text-gray-400">
                        Here are all the quote requests submitted by potential clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-accent" />
                        </div>
                    ) : quotes && quotes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-white/10">
                                        <TableHead className="text-white">Company</TableHead>
                                        <TableHead className="text-white">Client</TableHead>
                                        <TableHead className="text-white">Contact</TableHead>
                                        <TableHead className="text-white">Submitted</TableHead>
                                        <TableHead className="text-white">Status</TableHead>
                                        <TableHead className="text-white">Requirement</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quotes.map((quote) => (
                                        <TableRow key={quote.id} className="border-b-white/10">
                                            <TableCell className="font-medium">{quote.company}</TableCell>
                                            <TableCell>{quote.clientName}</TableCell>
                                            <TableCell>{quote.email}<br/>{quote.phone}</TableCell>
                                            <TableCell>{quote.createdAt ? format(quote.createdAt.toDate(), "PPP") : 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(quote.status)} className="capitalize">
                                                    {quote.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{quote.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 py-12">No quote requests received yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
