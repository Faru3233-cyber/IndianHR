'use client';
import { useEffect, useState } from "react";
import type { JobApplication } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { useCollection, WithId } from "@/firebase/firestore/use-collection";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useMemoFirebase, useUser } from "@/firebase";


export default function AdminApplicationsPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();
    
    const applicationsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'applications'), orderBy('createdAt', 'desc'))
    }, [firestore, user]);

    const { data: applications, isLoading: isDataLoading } = useCollection<JobApplication>(applicationsQuery);
    const isLoading = isAuthLoading || isDataLoading;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Received Applications</CardTitle>
                    <CardDescription>
                        Here are all the job applications submitted by candidates.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin" />
                        </div>
                    ) : applications && applications.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Submitted At</TableHead>
                                    <TableHead>Resume</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell className="font-medium">{app.jobTitle}</TableCell>
                                        <TableCell>{app.name}</TableCell>
                                        <TableCell>{app.email}<br/>{app.phone}</TableCell>
                                        <TableCell>{app.createdAt ? format(app.createdAt.toDate(), "PPP p") : 'N/A'}</TableCell>
                                        <TableCell><a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Resume</a></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted-foreground py-12">No applications received yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
