import { FC, ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-ovelay";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: ReactElement;
}

const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;

  const stopPropagation = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      {/* stopPropagation чтобы не закрывалось при нажатии на сам modal */}
      <div
        className={`${modalStyles.modal} pt-15 pb-15 pl-10 pr-10 `}
        onClick={stopPropagation}
      >
        <div className={`${modalStyles.modalTitle}`}>
          <h3 className="text text_type_main-large">{title}</h3>
          <CloseIcon onClick={onClose} type={"primary"} />
        </div>
        <div className={`${modalStyles.modalContent} `}>{children}</div>
      </div>
    </ModalOverlay>,
    // указываем куда рендерить (в файле index.html)
    modalRoot
  );
};

export default Modal;
