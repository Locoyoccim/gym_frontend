import { ComponentType } from "react";
import "./modalTemplate.css";
import { motion } from "framer-motion";

interface props {
    Element: ComponentType,
    isOpen: boolean
}

function ModalTemplate({Element, isOpen}: props) {
  const variants = {
    open: { scale: 1, opacity: 1, rotate: 0 },
    closed: { scale: 0, opacity: 0, rotate: 180 },
  };
  return (
    <motion.div
      id="modalTemplate"
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 1, ease: 'backInOut' }}
      initial="closed"
    >
      <Element />
    </motion.div>
  );
}

export default ModalTemplate;
