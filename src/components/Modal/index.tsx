import React from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-default px-4 py-3 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-heading dark:text-slate-100">
            {title ?? "Детали записи"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-body hover:text-heading text-xs dark:text-slate-300 dark:hover:text-slate-100"
          >
            Закрыть
          </button>
        </div>
        <div className="px-4 py-3 text-sm text-body dark:text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;


