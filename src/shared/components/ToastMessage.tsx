import { useEffect } from 'react';
import { motion } from "framer-motion";

interface ToastMessageProps {
  message: string;
  type: 'info';
  duration?: number;
  onClose: () => void;
}

const ToastMessage = ({message, duration = 3000, onClose}: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  return (
    <motion.div
      initial={{opacity: 0.5, y:-5}}
      animate={{opacity: 1, y:0}}
      exit={{opacity: 0, x:0}}
      transition={{ease: "easeOut", duration: 0.3}}
      className="
        fixed top-[90px] left-0 right-0 z-[9999] mx-3 rounded-8
        bg-gray-400/90 text-white 
        px-16 py-16 
        shadow-lg flex items-center justify-between
      "
    >
      <span className="font-medium text-15">{message}</span>
    </motion.div>
  );
};

export default ToastMessage;
