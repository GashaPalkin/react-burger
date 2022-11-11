import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-ovelay";
const Modal = ({ title, onClose, children }) => {
  const modalRoot = document.getElementById("modal");
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  // Для клавиши Escape
  const closeOnEscapeKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return createPortal(
    <React.Fragment>
           
        <ModalOverlay onClose={onClose}>       
          {/* Здесь onClick={stopPropagation} - чтобы не закрывалось при нажатии на сам modal */}
          <div
            className={`${modalStyles.modal} pt-10 pb-15 pl-10 pr-10 `}
            onClick={stopPropagation}
          >
            <div className={`${modalStyles.modalTitle}`}>
              <h3 className="text text_type_main-large">{title}</h3>
              <CloseIcon onClick={onClose} />
            </div>
            <div className={`${modalStyles.modalContent} `}>{children}</div>
          </div>        
        </ModalOverlay>
     
    </React.Fragment>,
    // Указываем куда рендерить (в файле index.html)
    modalRoot
  );
};

// Типизация компонентов
Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string, 
}
export default Modal;
