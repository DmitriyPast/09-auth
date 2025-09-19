// import { getSingleNote } from '@/lib/api/clientApi';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api/serverApi';


type Props = {
    params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
    const { id } = await params;

    const qc: QueryClient = new QueryClient()
    await qc.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotePreviewClient />
        </HydrationBoundary>
    )
}