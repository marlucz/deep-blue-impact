import { motion } from "framer-motion";

export type UIProps = {
  currentScreen: string;
  onScreenChange: (value: string) => void;
  isAnimating: boolean;
};

export const UI = ({ currentScreen, onScreenChange, isAnimating }: UIProps) => {
  return (
    <motion.main
      className="fixed inset-0 z-10"
      animate={isAnimating ? "" : currentScreen}
    >
      <section
        className={`absolute inset-0 grid grid-cols-4 transition-opacity duration-1000 content-center ${
          currentScreen === "Intro" && !isAnimating
            ? ""
            : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.h1
          initial={{
            y: -80,
            opacity: 0,
          }}
          variants={{
            Intro: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 1.2,
              },
            },
          }}
          className="flex flex-col items-end uppercase font-bold text-[9rem] leading-tight col-start-3"
          style={{
            WebkitTextStroke: "2px #e5faff",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span>save</span>
          <span>the</span>
          <span
            className="tracking-wide"
            style={{
              WebkitTextFillColor: "#e5faff",
            }}
          >
            deep
          </span>
        </motion.h1>
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            Home: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 1.2,
              },
            },
          }}
        >
          <button
            onClick={() => onScreenChange("Castle")}
            className="bg-gray-400 bg-opacity-50 p-3 rounded-full text-white font-medium"
          >
            Discover the impact
          </button>
        </motion.div>
      </section>
      {/* <section
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
          currentScreen === "Bleaching" && !isAnimating
            ? ""
            : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.img
          src="/vite.svg"
          alt="Medieval Town"
          className="w-32"
          initial={{
            y: -80,
            opacity: 0,
          }}
          variants={{
            Home: {
              y: 0,
              opacity: 0.9,
              transition: {
                delay: 1,
                duration: 1.2,
              },
            },
          }}
        />
        <h1 className="text-7xl text-white opacity-90 font-extrabold">
          Medieval Town
        </h1>
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            Home: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 1.2,
              },
            },
          }}
        >
          <button
            onClick={() => onScreenChange("Castle")}
            className="bg-gray-400 bg-opacity-50 p-3 rounded-full text-white font-medium"
          >
            Visit the historic castle
          </button>
          <button
            onClick={() => onScreenChange("Windmill")}
            className="bg-gray-400 bg-opacity-50 p-3 rounded-full text-white font-medium"
          >
            Discover the town windmill
          </button>
        </motion.div>
      </section> */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`absolute inset-0 flex flex-col items-start justify-center p-10 transition-opacity duration-1000 ${
          currentScreen === "Castle" && !isAnimating
            ? ""
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 1.2,
                },
              },
            }}
          >
            Castle
          </motion.h1>
          <motion.p
            className="text-white mt-2"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 1.2,
                },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem. Quisquam quae voluptatum, quia,
            quibusdam, voluptates voluptate quos quod voluptatibus quas
            doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Home")}
            className="bg-gray-400 bg-opacity-50  p-3 mt-3 rounded-full text-white font-medium"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 1.2,
                },
              },
            }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </motion.section>
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`absolute inset-0 flex flex-col items-end justify-center p-10 transition-opacity duration-1000 ${
          currentScreen === "Windmill" && !isAnimating
            ? ""
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 1.2,
                },
              },
            }}
          >
            Windmill
          </motion.h1>
          <motion.p
            className="text-white mt-2"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 1.2,
                },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem. Quisquam quae voluptatum, quia,
            quibusdam, voluptates voluptate quos quod voluptatibus quas
            doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Home")}
            className="bg-gray-400 bg-opacity-50  p-3 mt-3 rounded-full text-white font-medium"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 1.2,
                },
              },
            }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </motion.section>
    </motion.main>

    // <div className="absolute inset-0 grid grid-cols-4 transition-opacity duration-1000 content-center pointer-events-none">
    //   <h1
    //     className="flex flex-col items-end uppercase font-bold text-[9rem] leading-tight col-start-3"
    //     style={{
    //       WebkitTextStroke: "2px #e5faff",
    //       WebkitTextFillColor: "transparent",
    //     }}
    //   >
    //     <span>save</span>
    //     <span>the</span>
    //     <span
    //       className="tracking-wide"
    //       style={{
    //         WebkitTextFillColor: "#e5faff",
    //       }}
    //     >
    //       deep
    //     </span>
    //   </h1>
    // </div>
  );
};
