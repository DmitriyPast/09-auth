'use client'
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/app/api/api";
import { UserAuthRequest } from "@/types/user";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
        try {
            // Типізуємо дані форми
            console.log(formData);
            const formValues = Object.fromEntries(formData) as UserAuthRequest;
            console.log(formValues);
            // Виконуємо запит
            const res = await register(formValues);
            // Виконуємо редірект або відображаємо помилку
            if (res) {
                setUser(res);
                router.push("/profile");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            const error = (err as ApiError).response?.data
            setError(`${error?.error}${error?.response?.message ? `: ` : ''}${error?.response.message}`
                // :  ??
                //     (error?.response.message && error?.error) ?? `
            );
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form action={handleSubmit} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Register
                    </button>
                </div>

                <p className={css.error}>{error ?? "Oops... some error"}</p>
            </form>
        </main>

    )
};
