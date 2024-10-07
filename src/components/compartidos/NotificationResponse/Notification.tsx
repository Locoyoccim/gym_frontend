import "./notification.css";
import { NotificationTypes } from "../../../interfaces";
import { motion } from "framer-motion";

function Notification({ tittle, isOpen }: NotificationTypes) {
  const variants = {
    visible: { scale: 1, opacity: 1, y: 250 },
    hidden: { scale: 0, opacity: 0, y: 260},
  };

  return (
    <motion.div
      id="response_container"
      variants={variants}
      animate={isOpen ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2 className="action_response">{tittle}</h2>
    </motion.div>
  );
}

export default Notification;
