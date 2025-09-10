import { NoteTag } from "@/types/note";
import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraft = {
    title: string,
    content: string,
    tag: NoteTag
}

type DraftStore = {
    draft: NoteDraft;
    setDraft: (newDraft: NoteDraft) => void;
    clearDraft: () => void;
}

const initialDraft: NoteDraft = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useDraftStore = create<DraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (newDraft) => set({ draft: newDraft }),
            clearDraft: () => set({ draft: initialDraft })
        }),
        {
            name: "app-note-draft",
            partialize: (state) => ({
                draft: state.draft,
            })
        }
    )
);

// export const [draft, setDraft] = useState<NoteDraft>(initialDraft)

// export const clearDraft = () => setDraft(initialDraft)