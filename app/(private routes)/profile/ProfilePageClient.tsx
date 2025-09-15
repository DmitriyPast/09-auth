import { User } from "@/lib/api/clientApi";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePageClient({ userData }: { userData: User }) {
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
            src={`${userData?.avatar}`}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {userData?.username}
          </p>
          <p>
            Email: {userData?.email}
          </p>
        </div>
      </div>
    </main>
  )
};
