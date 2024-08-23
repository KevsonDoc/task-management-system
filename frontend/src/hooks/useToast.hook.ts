'use client';
import { toast as reactToast } from 'react-toastify';
export default function useToast() {
  const toast = (httpCode: number, message: string | string[]) => {
    if (httpCode >= 200 && httpCode <= 299) {
      reactToast(Array.isArray(message) ? message[0] : message, {
        type: 'success',
      });
    } else {
      reactToast(Array.isArray(message) ? message[0] : message, {
        type: 'error',
      });
    }
  };

  return {
    toast,
  };
}
