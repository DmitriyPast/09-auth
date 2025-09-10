"use client"

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import Modal from "@/components/Modal/Modal";
import { useDebounce } from "use-debounce";
// import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import css from "./page.module.css";

interface NotesClientProps {
    searchParams: {
        name: string,
        search: string,
        initPage: number,
        perPage?: number,
        tag?: string
    },
}

export default function NotesClient({ searchParams: { name, search, initPage, perPage, tag } }: NotesClientProps) {
    const [page, setPage] = useState<number>(initPage);
    const [query, setQuery] = useState<string>(search);
    // const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [queryDebounced] = useDebounce(query, 1000);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [name, queryDebounced, page, tag],
        queryFn: () => fetchNotes(queryDebounced, page, perPage, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    });
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (!firstUpdate.current && isSuccess && !data?.notes.length)
            toast("No notes found for your request.")
        else firstUpdate.current = false;
    }, [data, isSuccess]);

    useEffect(() => setPage(1), [queryDebounced])
    // const handleClose = () => setModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {/* Компонент SearchBox */}
                {<SearchBox onChange={(query) => setQuery(query)} />}
                {/* Пагінація */}
                {data && data.totalPages > 0 && (
                    <Pagination
                        page={page}
                        totalPages={data.totalPages}
                        setPage={(selected) => setPage(selected)}
                    />
                )}
                {/* Кнопка створення нотатки */}
                {/* { */}
                <Link href={"/notes/action/create"} className={css.button}>
                    Create note +
                </Link>
            </header>
            {query && isLoading && !data && <>Loading notes...</>}
            {query && isError && <>Error occured</>}
            {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
            {/* <Toaster /> */}
        </div>
    );
}