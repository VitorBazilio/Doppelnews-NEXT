import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
  return (
    <section className="modal-surface" role="dialog" aria-modal="true">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
