// export default function SidebarDefault() {
//     null
//     return (
//         <>fuck you</>)
// }
// import { TAGS } from '@/components/TagsMenu/TagsMenu'
import Link from 'next/link'
import css from './page.module.css'

export const TAGS = [
    "All",
    "Work",
    "Personal",
    "Todo",
    "Meeting",
    "Shopping",
]

export default function Sidebar() {
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            {TAGS.map((tag) =>
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>)}
        </ul>
    )
}