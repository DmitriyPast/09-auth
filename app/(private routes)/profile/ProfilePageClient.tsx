"use client"

// import { User } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";
// import { User } from "@/types/user";

export default function ProfilePageClient({ user }: { user: User }) {
  // const { setUser, user: storeUser  } = useAuthStore()
  // console.log(user);
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
          {user?.avatar && <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />}
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
