import { Metadata } from "next";
// import { useAuthStore } from "@/lib/store/authStore";
import ProfilePageClient from "./ProfilePageClient";
import { getUserServer } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

// const baseURL = 

export default async function ProfilePage() {
    // const { user } = useAuthStore()
    try {
        const user = await getUserServer();
        if (!user) return redirect("/sign-in");

        return <ProfilePageClient user={user} />;
    } catch {
        return redirect("/sign-in");
    }
    // return (
    //     <ProfilePageClient />
    // )
};

export const metadata: Metadata = {
    title: "Profile: user",
    description: "View user Profile of user on NoteHub",
    openGraph: {
        title: "Profile user",
        description: "View user Profile of user on NoteHub",
        url: '/profile',
        images: [{
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Profile: user",
        }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Profile: user",
        description:
            "View user Profile of user on NoteHub",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Profile: user",
            },
        ]
    },
}