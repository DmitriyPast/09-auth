import { Metadata } from "next";
// import { useAuthStore } from "@/lib/store/authStore";
import ProfilePageClient from "./ProfilePageClient";

// const baseURL = 

export default function ProfilePage() {
    // const { user } = useAuthStore()
    return (
        <ProfilePageClient />
    )
};

export const metadata: Metadata = {
    title: "Profile: user",
    description: "View user Profile of user on NoteHub",
    openGraph: {
        title: "Profile user",
        description: "View user Profile of user on NoteHub",
        url: process.env.NEXT_PUBLIC_API_URL + '/profile',
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