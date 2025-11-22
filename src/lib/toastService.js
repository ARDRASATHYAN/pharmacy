// toastService.js
import { toast } from "react-toastify";

const defaultOptions = {
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
  closeOnClick: true,
};

export const showSuccessToast = (message, options = {}) =>
  toast.success(message, { ...defaultOptions, ...options });

export const showErrorToast = (message, options = {}) =>
  toast.error(message, { ...defaultOptions, ...options });

export const showInfoToast = (message, options = {}) =>
  toast.info(message, { ...defaultOptions, ...options });

export const showWarningToast = (message, options = {}) =>
  toast.warn(message, { ...defaultOptions, ...options });

// generic if you want custom type, icon, etc.
export const showToast = (message, options = {}) =>
  toast(message, { ...defaultOptions, ...options });
