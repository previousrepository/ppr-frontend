import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);
  const notifyWarning = (msg) => toast.warning(msg);

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo, notifyWarning }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export default useToast;