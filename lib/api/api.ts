import axios from "axios";

export const nextServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    withCredentials: true, // дозволяє axios працювати з cookie
})

// import type { Note, NoteFormValues, NoteTag } from "../../types/note";

// const ApiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// export interface FetchNotesResponse {
//     notes: Note[];
//     totalPages: number;
// }

// // axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes/";
// axios.defaults.headers.common["Authorization"] = `Bearer ${ApiKey}`;
// const url = "https://notehub-public.goit.study/api/notes/";

// export async function fetchNotes(
//     search: string,
//     page: number,
//     perPage?: number,
//     tag?: string// = "Todo"
// ): Promise<FetchNotesResponse> {
//     return (await axios.get<FetchNotesResponse>(url, {
//         params: {
//             search,
//             page,
//             perPage,
//             tag,
//         },
//     })).data;
// }

// export async function createNote(formData: NoteFormValues): Promise<Note> {
//     return (await axios.post<Note>(url, formData)).data;
// }

// export async function deleteNote(noteId: string): Promise<Note> {
//     return (await axios.delete<Note>(`${url}${noteId}`)).data;
// }

// export async function getSingleNote(noteId: string): Promise<Note> {
//     return (await axios.get<Note>(`${url}${noteId}`)).data;
// }