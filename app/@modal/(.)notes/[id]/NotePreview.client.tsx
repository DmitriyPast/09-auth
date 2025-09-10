"use client"

import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css'

export default function NotePreviewClient() {
    // const { id } = await params;
    // const note = await getSingleNote(id);

    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id),
        refetchOnMount: false,
    });
    if (isLoading) return <Modal><p>is Loading...</p></Modal>;
    if (error || !note) return <Modal><p>is error loading note</p></Modal>;
    const formattedDate = note.updatedAt !== note.createdAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;
    return (
        <Modal onClose={() => router.back()}>

            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                    <button onClick={() => router.back()} className={css.backBtn}>
                        Go back
                    </button>

                </div>
            </div>
        </Modal>
    );
};
