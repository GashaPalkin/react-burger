import { FC, ReactElement } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
  children?: ReactElement;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose, children }) => {
  return (   
    <div className={modalOverlayStyles.fixedOverlay} onClick={onClose}>
      {children}
    </div>   
  );
}

export default ModalOverlay;
