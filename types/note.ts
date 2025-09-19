export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export const TAGS = [
  "All", "Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"] as const;
export type NoteTag = typeof TAGS[number];
// export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

const fucktag: NoteTag = "Work"

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

