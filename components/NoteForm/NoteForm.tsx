'use client'

import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteFormValues, NoteTag } from "../../types/note";
import { createNote } from "@/lib/api/clientApi";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// 1. Імпортуємо хук
import { useDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const Id = useId();
  const router = useRouter()

  // 2. Викликаємо хук і отримуємо значення
  const { draft, setDraft, clearDraft } = useDraftStore()

  // 3. Оголошуємо функцію для onChange щоб при зміні будь-якого елемента форми оновити чернетку нотатки в сторі
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 Chara-cters.")
      .max(50, "YOUR title IS TOO LONG!")
      .required("Title is required."),
    content: Yup.string().max(500, "YOUR content IS TOO LONG!"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Tag is required."),
  });

  const handleSubmit = async (formData: FormData) => {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag
    }
    try {
      await Schema.validate(values, { abortEarly: false });
      await request.mutateAsync(values);
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        toast.error(validationError.message)
      } else {
        toast.error('Failed to create note. Please try again.');
      }
    }
  };

  const client = useQueryClient();

  const request = useMutation({
    mutationFn: createNote,
    // 5. При успішному створенні нотатки очищуємо чернетку
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["notes"] });
      toast.success('successfully created note')
      clearDraft();
      router.back();
    },
  });

  // 6. До кожного елемента додаємо defaultValue та onChange
  // щоб задати початкове значення із чернетки 
  // та при зміні оновити чернетку в сторіоновити чернетку в сторі
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${Id}title`}>Title</label>
        <input
          id={`${Id}title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${Id}content`}>Content</label>
        <textarea
          id={`${Id}content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${Id}tag`}>Tag</label>
        <select
          id={`${Id}tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange} required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={router.back} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
