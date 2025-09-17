'use client'

import { User, UserAuthRequest } from "@/types/user";
// import axios from "axios";
import type { Note, NoteFormValues, NoteTag } from "../../types/note";
import { nextServer } from "./api";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// export type UserAuthRequest = {
//     email: string;
//     password: string;
//     userName?: string;
// }

// export type User = {
//     // id: string;
//     email: string;
//     username?: string;
//     avatar?: string;
//     // createdAt: Date;
//     // updatedAt: Date;
// }

export type CheckSessionRequest = {
    success: boolean;
}

export async function register(data: UserAuthRequest) {
    return (await nextServer.post<User>('/auth/register', data)).data
}

export async function login(data: UserAuthRequest) {
    return (await nextServer.post<User>('/auth/login', data)).data
}

export async function logout() {
    return (await nextServer.post<User>('/auth/logout')).data
}

export async function refresh() {
    return (await nextServer.get('/auth/refresh')).data
}

export async function checkSession() {
    return (await nextServer.post<CheckSessionRequest>('/auth/session')).data.success
}

export async function getUser(): Promise<User> {
    return (await nextServer.get('/users/me')).data;
}

export async function editUser(user: { username: string }): Promise<User> {
    return (await nextServer.patch('/users/me', user)).data;
}

export async function fetchNotes(
    search: string,
    page: number,
    perPage?: number,
    tag?: string// = "Todo"
) {
    return (await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage,
            tag,
        },
    })).data;
}

export async function createNote(formData: NoteFormValues) {
    return (await nextServer.post<Note>("/notes", formData)).data;
}

export async function deleteNote(noteId: string) {
    return (await nextServer.delete<Note>(`/notes/${noteId}`)).data;
}

export async function getSingleNote(noteId: string) {
    return (await nextServer.get<Note>(`/notes/${noteId}`)).data;
}

// export async function getNoteById(noteId: string) {
//     return (await nextServer.get<Note>(`/notes/${noteId}`)).data;
// }