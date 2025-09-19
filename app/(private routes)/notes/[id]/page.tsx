import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/serverApi";
import { Metadata } from "next";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
};
export default async function NoteDetails({ params }: NoteDetailsProps) {

    const { id } = await params;
    const qc = new QueryClient();

    await qc.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);
    // const message = tag !== "All" ? `with tag: ${tag}` : '';
    return {
        title: note.title,
        description: note.content.slice(0, 30),
        openGraph: {
            title: note.title,
            description: note.content.slice(0, 30),
            url: `http://localhost:3000/notes/${id}`,
            images: [{
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: note.title,
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: note.title,
            description: note.content.slice(0, 30),
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: note.title,
                },
            ],
        },
    }
}