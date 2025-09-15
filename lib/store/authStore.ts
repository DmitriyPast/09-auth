import { create } from "zustand";
import { User } from "../api/clientApi";


type AuthStore = {
    isAuth: boolean,
    user: User | null,
    setUser: (user: User) => void,
    clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuth: false,
    user: null,
    setUser: (user: User) => set({ user, isAuth: true }),
    clearAuth: () => set({ isAuth: false, user: null })
}))