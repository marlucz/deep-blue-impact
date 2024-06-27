import { motion } from "framer-motion";

type TitleWithDescProps = {
  direction: "x" | "y";
  value: number;
  title: string;
  text: string;
};

const TitleWithDesc: React.FC<TitleWithDescProps> = ({
  direction,
  value,
  title,
  text,
}) => {
  const initial = {
    [direction]: value,
    opacity: 0,
  };

  return (
    <>
      <motion.h2
        initial={initial}
        animate={{
          [direction]: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
          },
        }}
        className="flex flex-col uppercase font-semibold text-[6rem] leading-tight"
      >
        {title}
      </motion.h2>
      <motion.span
        initial={initial}
        animate={{
          [direction]: 0,
          opacity: 1,
          transition: {
            delay: 0.4,
            duration: 0.4,
          },
        }}
        className="mt-8 text-[#e5faff] font-bold"
      >
        {text}
      </motion.span>
    </>
  );
};

export default TitleWithDesc;
