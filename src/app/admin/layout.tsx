'use client';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { Briefcase, FileText, LayoutDashboard, MessageSquareQuote } from "lucide-react";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { usePathname } from "next/navigation";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            // Since we removed the login page, we are not redirecting.
            // In a real app with login, you would uncomment this:
            // router.push('/login');
        }
    }, [user, isUserLoading, router]);

    const menuItems = [
        { href: "/admin", label: "Dashboard", icon: <LayoutDashboard />, exact: true },
        { href: "/admin/jobs", label: "Jobs", icon: <Briefcase /> },
        { href: "/admin/applications", label: "Applications", icon: <FileText /> },
        { href: "/admin/quotes", label: "Quote Requests", icon: <MessageSquareQuote /> },
    ];

    if (isUserLoading) {
        // You can render a loading skeleton here
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
                Loading...
            </div>
        );
    }
    
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background text-foreground">
                <Sidebar collapsible="icon" className="flex-shrink-0" variant="sidebar">
                    <SidebarContent className="flex-1 overflow-y-auto">
                        <div className="flex items-center justify-center p-4 border-b border-sidebar-border">
                            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                        </div>
                        <SidebarMenu className="p-2">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild
                                        isActive={item.exact ? pathname === item.href : pathname.startsWith(item.href)}
                                        tooltip={{children: item.label}}
                                    >
                                        <Link href={item.href}>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark bg-background flex-1">
            <FirebaseClientProvider>
                <AdminLayoutContent>{children}</AdminLayoutContent>
            </FirebaseClientProvider>
        </div>
    );
}
