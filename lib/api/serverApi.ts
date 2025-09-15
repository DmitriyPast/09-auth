import axios from "axios";
import type { Note, NoteFormValues, NoteTag } from "../../types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// const url = "https://notehub-api.goit.study/api/notes/";

const cookie = {
    headers: {
    }
}

export async function fetchNotes(
    search: string,
    page: number,
    perPage?: number,
    tag?: string// = "Todo"
) {
    return await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage,
            tag,
        },

    });
}

export async function createNote(formData: NoteFormValues) {
    return await nextServer.post<Note>("/notes", formData, {
        headers: {
            Cookie: (await cookies()).toString()
        }
    });
}

export async function deleteNote(noteId: string) {
    return await nextServer.delete<Note>(`/notes/${noteId}`, {
        headers: {
            Cookie: (await cookies()).toString()
        }
    });
}

export async function getSingleNote(noteId: string) {
    return await nextServer.get<Note>(`/notes/${noteId}`, {
        headers: {
            Cookie: (await cookies()).toString()
        }
    });
}

export async function checkServerSession() {
    return await nextServer.get("/auth/session", {
        headers: {
            Cookie: (await cookies()).toString()
        }
    });
    // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
};