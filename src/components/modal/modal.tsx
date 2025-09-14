import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.js';

import type { TModalProps } from '@/models/modal';

import styles from './modal.module.css';

export const Modal = ({ header, children, onClose }: TModalProps) => {
  const handleEscape = useCallback(
    (callback) => {
      if (callback.key === 'Escape') {
        onClose(callback);
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  const handleClose = () => {
    onClose();
  };

  const modalElement = document.getElementById('modal');
  const modalContent = (
    <div className={styles.modalWrapper}>
      <div className={styles.modalInner}>
        <div className={`${styles.headerContainer} mt-10 ml-10 mr-10`}>
          <div className={`${styles.header} text text_type_main-large`}>{header}</div>
          <div className={styles.closeIcon}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalElement);
};
