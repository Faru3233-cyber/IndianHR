'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, FileText, MessageSquareQuote, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useMemoFirebase, useUser } from "@/firebase";

export default function AdminDashboardPage() {
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();

    const jobsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'jobs')) : null, [firestore, user]);
    const { data: jobs, isLoading: jobsLoading } = useCollection(jobsQuery);

    const appsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'applications')) : null, [firestore, user]);
    const { data: applications, isLoading: appsLoading } = useCollection(appsQuery);
    
    const pendingAppsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'applications'), where('status', '==', 'new')) : null, [firestore, user]);
    const { data: pendingApplications, isLoading: pendingAppsLoading } = useCollection(pendingAppsQuery);

    const quotesQuery = useMemoFirebase(() => user ? query(collection(firestore, 'quote_requests')) : null, [firestore, user]);
    const { data: quotes, isLoading: quotesLoading } = useCollection(quotesQuery);

    const isLoading = isUserLoading || jobsLoading || appsLoading || pendingAppsLoading || quotesLoading;

    const renderStat = (value: number | undefined) => {
        if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;
        return <div className="text-2xl font-bold">{value !== undefined ? value : 0}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        {renderStat(jobs?.length)}
                        <p className="text-xs text-gray-400">Current active job listings</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <FileText className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        {renderStat(applications?.length)}
                        <p className="text-xs text-gray-400">Total applications received</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                        <Clock className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        {renderStat(pendingApplications?.length)}
                         <p className="text-xs text-gray-400">Needs review</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Quote Requests</CardTitle>
                        <MessageSquareQuote className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        {renderStat(quotes?.length)}
                        <p className="text-xs text-gray-400">Total client quote requests</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8">
                 <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Welcome to the Admin Panel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300">
                            Use the navigation on the left to manage job listings, view applications, and handle quote requests.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
