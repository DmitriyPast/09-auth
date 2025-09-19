// components/AuthProvider/AuthProvider.tsx
"use client";

import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // const setUser = useAuthStore((state) => state.setUser);
    // const clearIsAuthenticated = useAuthStore((state) => state.clearAuth);
    const { setUser, clearAuth } = useAuthStore()
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Перевіряємо сесію
                const isAuthenticated = await checkSession();
                if (isAuthenticated) {
                    // Якщо сесія валідна — отримуємо користувача
                    const user = await getUser();
                    if (user) setUser(user);
                } else {
                    // Якщо сесія невалідна — чистимо стан
                    clearAuth();
                    router.replace("/sign-in")
                }
            }
            catch (error) {
                console.error("Session check failed:", error);
                clearAuth();
                router.replace("/sign-in");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [setUser, clearAuth]);

    return loading ? <p>Loading...</p> : children;
};