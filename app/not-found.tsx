import { Metadata } from 'next'
import css from './page.module.css'

export const metadata: Metadata = {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    openGraph: {
        title: "404 - Page not found",
        description: "Sorry, the page you are looking for does not exist.",
        images: [{
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: '404 - Page Not Found',
        description:
            'The page you are looking for does not exist. Return to NoteHub to continue organizing your notes and ideas',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub - Page Not Found',
            },
        ],
    },
}

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>

        </>
    )
}