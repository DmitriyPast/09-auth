import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
// import NoteForm from "../NoteForm/NoteForm";

interface ModalProps {
  // movie: Movie;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onMouseDown={onBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {/* */}

        {children /* <NoteForm onClose={onClose} /> */}
      </div>
    </div>,
    document.body
  );
}
