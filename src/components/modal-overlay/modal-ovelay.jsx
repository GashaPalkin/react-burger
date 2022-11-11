import PropTypes from "prop-types";
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
ModalOverlay.propTypes = {
  onClose: PropTypes.func,    
}

export default ModalOverlay;
