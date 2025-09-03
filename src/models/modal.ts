import type React from 'react';

export type TModalProps = {
  children: React.ReactNode;
  header?: string;
  onClose: (callback?: unknown) => void;
};

export type TModalOverlayProps = Pick<TModalProps, 'onClose'>;
