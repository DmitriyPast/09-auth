import NoteForm from "@/components/NoteForm/NoteForm";
import css from './CreateNote.module.css'
import { Metadata } from "next";

export default function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {/* NoteForm component */}
                <NoteForm />
            </div>
        </main>
    )
}

export const metadata: Metadata = {
    title: "NoteHub - Create note",
    description: "Create new note in NoteHub",
    openGraph: {
        title: "NoteHub - Create note",
        description: "Create new note in NoteHub",
        url: "https://notehub.com/notes/action/create",
        images: [{
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub - Create note",
        }]
    },
    twitter: {
        card: "summary_large_image",
        title: "NoteHub - Create note",
        description:
            "Create new note in NoteHub",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub - Create note",
            },
        ]
    },
}