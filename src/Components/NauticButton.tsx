import { motion } from "framer-motion";

type NauticButtonProps = {
  text: string;
  onClick: () => void;
};

export const NauticButton = ({ text, onClick }: NauticButtonProps) => {
  return (
    <motion.div
      className="gap-3 mt-12"
      initial={{
        y: 80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.2,
          duration: 1.2,
        },
      }}
      exit={{
        y: 80,
        opacity: 0,
      }}
    >
      <button
        onClick={onClick}
        className="px-4 py-2 uppercase text-white font-medium text-xs relative group"
      >
        {text}
        <div className="absolute left-[1px] top-[1px] w-3 h-[1px] bg-blue-200 transition-all duration-300 group-hover:w-full origin-left" />
        <div className="absolute left-[1px] top-[1px] w-[1px] h-3 bg-blue-200 transition-all duration-300 group-hover:scale-y-[2] origin-top" />
        <div className="absolute right-[1px] bottom-[1px] w-3 h-[1px] bg-blue-200 transition-all duration-300 group-hover:w-full origin-right" />
        <div className="absolute right-[1px] bottom-[1px] w-[1px] h-3 bg-blue-200 transition-all duration-300 group-hover:scale-y-[2] origin-bottom" />
      </button>
    </motion.div>
  );
};
