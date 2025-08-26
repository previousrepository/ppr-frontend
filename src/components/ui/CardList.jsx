import clsx from 'clsx';
import { motion } from 'framer-motion';

const CardList = ({ index, className, children }) => {
  return (
    <>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={clsx("shadow-md hover:shadow-lg dark:shadow-slate-800/20 hover:dark:shadow-slate-800/50 transition-all ",className)}
      >
        {children}
      </motion.div>
    </>
  );
};

export default CardList;
