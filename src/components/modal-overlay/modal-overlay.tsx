import type { TModalOverlayProps } from '@/models/modal';

import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
