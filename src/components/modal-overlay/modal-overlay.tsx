import type { TModalOverlayProps } from '@/models/modal';
import type { FC } from 'react';

import styles from './modal-overlay.module.css';

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
