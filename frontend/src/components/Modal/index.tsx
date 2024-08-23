'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { PropsWithChildren } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <XMarkIcon className="size-8" title="close" />
        </button>
        {children}
      </div>
    </div>
  );
}
