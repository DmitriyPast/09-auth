import { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

// const baseURL = 

export default function ProfilePage() {
    const { user } = useAuthStore()
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={`${user?.avatar}`}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username}
                    </p>
                    <p>
                        Email: {user?.email}
                    </p>
                </div>
            </div>
        </main>
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