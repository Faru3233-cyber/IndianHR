

export type Job = {
    id: string;
    title: string;
    category: string;
    location: string;
    country: string;
    salary: string;
    description: string;
    experienceRequired: string;
    photoUrl?: string;
    isFeatured?: boolean;
    createdAt: any;
    updatedAt: any;
};

export type JobApplication = {
    id: string;
    jobId: string;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    experienceLevel: string;
    resumeUrl: string;
    country: string;
    message: string;
    createdAt: any;
    status: 'new' | 'viewed' | 'shortlisted' | 'hired' | 'rejected';
    notes?: string;
};

export type QuoteRequest = {
    id: string;
    clientName: string;
    company: string;
    country: string;
    manpowerType: string;
    quantityNeeded?: number;
    email: string;
    phone: string;
    message: string;
    createdAt: any;
    status: 'new' | 'responded' | 'closed';
};

