import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
    const { slug } = await params;
    // console.log(slug);
    const qc: QueryClient = new QueryClient()
    const qp = {
        name: "notes",
        search: "",
        initPage: 1,
        perPage: 12,
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { name, search, initPage, perPage, tag } = qp

    await qc.prefetchQuery({
        queryKey: [name, search, initPage, tag],
        queryFn: () => fetchNotes(search, initPage, perPage, tag)
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotesClient searchParams={qp} />
        </HydrationBoundary>
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug: [tag] } = await params;
    const message = tag !== "All" ? `with tag: ${tag}` : '';
    return {
        title: `Notes by tag: ${tag}`,
        description: `Show all notes ${message}`,
        openGraph: {
            title: `Notes by tag: ${tag}`,
            description: `Show all notes ${message}`,
            url: `http://localhost:3000/notes/filter/${tag}`,
            images: [{
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub",
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: `Notes by tag: ${tag}`,
            description:
                `Show all notes ${message}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Notes by tag: ${tag}`,
                },
            ],
        },
    }
}