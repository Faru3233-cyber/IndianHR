'use client';
import { useState, useTransition, useRef } from "react";
import type { Job } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addJob, deleteJob } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore, useMemoFirebase, useUser } from "@/firebase";
import Image from "next/image";

const jobSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    category: z.string().min(2, 'Category is required.'),
    location: z.string().min(2, 'Location is required.'),
    country: z.string().min(2, 'Country is required.'),
    salary: z.string().optional(),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    experienceRequired: z.string().min(2, 'Experience is required.'),
    isFeatured: z.boolean().optional(),
    photoUrl: z.string().url().optional(),
});

function AddJobDialog({ onJobAdded }: { onJobAdded: () => void }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: { 
            title: "", 
            category: "",
            location: "", 
            country: "",
            salary: "",
            description: "",
            experienceRequired: "",
            isFeatured: false,
            photoUrl: "",
        },
    });

    async function onSubmit(values: z.infer<typeof jobSchema>) {
        startTransition(async () => {
            const result = await addJob(values);
            if (result.success) {
                toast({ title: "Job Added!", description: "The new job listing has been created." });
                form.reset();
                onJobAdded();
                setOpen(false);
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Job</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Job Listing</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new job opening.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl><Input placeholder="e.g., Certified Welder" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl><Input placeholder="e.g., Construction" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location (City)</FormLabel>
                                <FormControl><Input placeholder="e.g., Dubai" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl><Input placeholder="e.g., UAE" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Textarea placeholder="Describe the job requirements..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="experienceRequired" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Required</FormLabel>
                                <FormControl><Input placeholder="e.g., 5+ years" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField
                            control={form.control}
                            name="photoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Photo URL</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="text"
                                            placeholder="https://example.com/image.png"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : 'Add Job'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminJobsPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();

    const jobsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'jobs'), orderBy('createdAt', 'desc'));
    }, [firestore, user]);

    const { data: jobs, isLoading: isDataLoading, refetch } = useCollection<Job>(jobsQuery);
    const { toast } = useToast();
    const [isDeleting, startDeleteTransition] = useTransition();

    const isLoading = isAuthLoading || isDataLoading;

    const handleDelete = (jobId: string) => {
        startDeleteTransition(async () => {
            const result = await deleteJob(jobId);
            if (result.success) {
                toast({ title: "Job Deleted", description: "The job listing has been removed." });
                refetch();
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
        });
    };

    const addJobButton = <AddJobDialog onJobAdded={refetch} />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Jobs</h1>
                {addJobButton}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Current Job Listings</CardTitle>
                    <CardDescription>
                        Add, edit, or remove job listings that appear on the public website.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin" />
                        </div>
                    ) : jobs && jobs.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Photo</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium">{job.title}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>
                                            {job.photoUrl ? <Image src={job.photoUrl} alt={job.title} width={40} height={40} className="rounded-md object-cover" /> : 'No photo'}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" disabled>Edit</Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                                                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the job listing.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(job.id)}>
                                                            Yes, delete it
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center text-muted-foreground py-12 space-y-4">
                            <p>No jobs have been added yet.</p>
                            {addJobButton}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
