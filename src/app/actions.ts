
'use server';

import { z } from 'zod';
import { addDoc, collection, doc, serverTimestamp, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAdminFirestore } from '@/firebase/admin';

// Job management actions remain for admin use
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


export async function addJob(values: z.infer<typeof jobSchema>) {
    try {
        const db = getAdminFirestore();
        await addDoc(collection(db, 'jobs'), {
            ...values,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error adding job:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function updateJob(jobId: string, values: z.infer<typeof jobSchema>) {
    try {
        const db = getAdminFirestore();
        await updateDoc(doc(db, 'jobs', jobId), {
            ...values,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating job:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

export async function deleteJob(jobId: string) {
    try {
        const db = getAdminFirestore();
        await deleteDoc(doc(db, 'jobs', jobId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting job:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}
