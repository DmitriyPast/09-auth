"use client"

import Link from 'next/link'
import css from './AuthNavigation.module.css'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {

    const router = useRouter();
    const { isAuth, user, clearAuth } = useAuthStore()
    console.log(isAuth);
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            clearAuth();
            router.push("/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        // isAuth ? 
        <>
            <li className={css.navigationItem}>
                <Link href="/profile" prefetch={false} className={css.navigationLink}>
                    Profile
                </Link>
            </li>

            <li className={css.navigationItem}>
                <p className={css.userEmail}>{user?.email}</p>
                <button className={css.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </li>
            {/* // </> : */}
            {/* // <> */}
            <li className={css.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                    Login
                </Link>
            </li>

            <li className={css.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                    Sign up
                </Link>
            </li>
        </>
    )
};
