"use client"

import { useAuthStore } from "@/lib/store/authStore"
import css from "./EditProfilePage.module.css"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { editUser } from "@/lib/api/clientApi"
import { ApiError } from "@/app/api/api"
import { useState } from "react"
import { User, UserAuthRequest } from "@/types/user"


export default function EditProfilePage() {
    const { isAuth, user, setUser } = useAuthStore()
    const [error, setError] = useState("");
    const router = useRouter()

    async function submitEdit(formData: FormData) {

        try {
            console.log(formData);
            // Типізуємо дані форми
            const formValues = Object.fromEntries(formData) as { username: string };
            console.log(formValues);
            // Виконуємо запит
            const res = await editUser(formValues);
            // Виконуємо редірект або відображаємо помилку
            if (res) {
                setUser(res);
                // router.push("/profile");
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                "Oops... some error"
            );
        }
    }

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                {user && <Image src={`${user?.avatar}`}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />}

                <form action={submitEdit} className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            name="username"
                            type="text"
                            className={css.input}
                            defaultValue={user?.username}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button onClick={() => router.push("/profile")} type="button" className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
};
