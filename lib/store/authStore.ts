import { User } from "@/types/user";
import { create } from "zustand";
// import { User } from "../api/clientApi";
import { persist } from "zustand/middleware";


type AuthStore = {
    isAuth: boolean,
    user: User | null,
    setUser: (user: User) => void,
    clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            setUser: (user: User) => set({ user, isAuth: true }),
            clearAuth: () => set({ isAuth: false, user: null })
        })
        ,
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                isAuth: state.isAuth,
            }),
        }
    )
)