import modalOverlayStyles from "./modal-overlay.module.css";
import { modalTypes } from "../../utils/types";

function ModalOverlay({ onClose, children }) {
  return (   
    <div className={modalOverlayStyles.fixedOverlay} onClick={onClose}>
      {children}
    </div>   
  );
}

// Типизация компонентов
export const overlayPropTypes = modalTypes
export default ModalOverlay;
