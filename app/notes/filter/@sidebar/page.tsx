// import { TAGS } from '@/components/TagsMenu/TagsMenu'
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
                    <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </a>
                </li>)}
        </ul>
    )
}