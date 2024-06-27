import { AnimatePresence, motion } from "framer-motion";
import { TransitionNames } from "../App";
import { NauticButton } from "../Components/NauticButton";
import TitleWithDesc from "../Components/TitleWithDesc";

export type UIProps = {
  currentScreen: TransitionNames;
  targetScreen: TransitionNames;
  onScreenChange: (value: TransitionNames) => void;
  isAnimating: boolean;
};

export const UI = ({
  currentScreen,
  targetScreen,
  onScreenChange,
  isAnimating,
}: UIProps) => {
  return (
    <main className="fixed inset-0 z-10">
      <motion.section
        className={`absolute inset-0 z-10 grid grid-cols-12 content-center ${
          isAnimating && "pointer-events-none"
        }`}
      >
        <AnimatePresence mode="sync">
          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Home
          ) && (
            <motion.div
              key={TransitionNames.Home}
              className="flex flex-col col-start-8 col-span-3"
              exit={{
                y: -1000,
                opacity: 0,
                transition: {
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <h1
                className="flex flex-col items-end uppercase font-bold text-[9rem] leading-tight font-['Raleway']"
                style={{
                  WebkitTextStroke: "2px #e5faff",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <motion.span
                  initial={{
                    y: -80,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 1.5,
                    },
                  }}
                >
                  save
                </motion.span>
                <motion.span
                  initial={{
                    y: -80,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 1.2,
                    },
                  }}
                >
                  the
                </motion.span>
                <motion.span
                  initial={{
                    x: 80,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.8,
                      duration: 0.4,
                    },
                  }}
                  className="tracking-wide"
                  style={{
                    WebkitTextFillColor: "#e5faff",
                  }}
                >
                  deep
                </motion.span>
              </h1>
              <div className="absolute bottom-10 left-0 w-full z-15 flex justify-center items-center">
                <NauticButton
                  text="Discover the impact"
                  onClick={() => onScreenChange(TransitionNames.Bleaching)}
                />
              </div>
            </motion.div>
          )}

          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Bleaching
          ) && (
            <motion.div
              key={TransitionNames.Bleaching}
              className="flex flex-col col-start-8 col-span-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-10"
              exit={{
                x: 1000,
                opacity: 0,
                transition: {
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <TitleWithDesc
                title={TransitionNames.Bleaching}
                text="Dive into the eerie beauty of coral reefs that have lost their
                vibrant colors. Coral bleaching occurs when corals, stressed by
                rising ocean temperatures and pollution, expel the algae that
                provide them with food and color. This phenomenon transforms the
                corals into ghostly white structures and disrupts entire marine
                ecosystems that depend on them."
                direction="y"
                value={500}
              />
              <NauticButton
                text="Go to Pollution"
                onClick={() => onScreenChange(TransitionNames.Pollution)}
              />
            </motion.div>
          )}
          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Pollution
          ) && (
            <motion.div
              key={TransitionNames.Pollution}
              className="flex flex-col col-start-2 col-span-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-10"
              exit={{
                x: -500,
                opacity: 0,
                transition: {
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <TitleWithDesc
                title={TransitionNames.Pollution}
                text="Explore the depths of our oceans and witness the pervasive
                impact of water pollution. From plastic waste to chemical
                runoff, human activities have introduced countless pollutants
                into marine environments. These pollutants harm wildlife,
                disrupt ecosystems, and create massive patches of floating
                debris, affecting marine creatures through entanglement and
                ingestion."
                direction="x"
                value={-500}
              />

              <NauticButton
                text="Go to Overfishing"
                onClick={() => onScreenChange(TransitionNames.Overfishing)}
              />
            </motion.div>
          )}
          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Overfishing
          ) && (
            <motion.div
              key={TransitionNames.Overfishing}
              className="flex flex-col col-start-2 col-span-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-10"
              exit={{
                x: 1000,
                opacity: 0,
                transition: {
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <TitleWithDesc
                title={TransitionNames.Overfishing}
                text="Navigate the stark reality of overfishing and its toll on marine
                biodiversity. Overfishing depletes fish populations faster than
                they can reproduce, leading to the collapse of entire fish
                stocks. This disruption affects not only the marine food web but
                also the millions of people who rely on fishing for their
                livelihoods."
                direction="y"
                value={500}
              />

              <NauticButton
                text="Go to Habitat Destruction"
                onClick={() => onScreenChange(TransitionNames.Habitat)}
              />
            </motion.div>
          )}
          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Habitat
          ) && (
            <motion.div
              key={TransitionNames.Habitat}
              className="flex flex-col col-start-2 col-span-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-10"
              exit={{
                x: 1000,
                opacity: 0,
                transition: {
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <TitleWithDesc
                title={TransitionNames.Habitat}
                text=" Observe the critical issue of marine habitat destruction and its
                far-reaching consequences. Human activities such as coastal
                development, pollution, and destructive fishing practices are
                eroding vital habitats like mangroves, seagrass meadows, and
                coral reefs. These habitats are essential for coastal
                protection, biodiversity, and carbon sequestration."
                direction="x"
                value={-500}
              />

              <NauticButton
                text="Make a Choice"
                onClick={() => onScreenChange(TransitionNames.Choice)}
              />
            </motion.div>
          )}
          {[currentScreen, targetScreen].every(
            (screen) => screen === TransitionNames.Choice
          ) && (
            <motion.div
              key={TransitionNames.Choice}
              className="flex flex-col col-span-full justify-between items-center h-screen py-10"
              initial={{
                x: -500,
              }}
              animate={{
                x: 0,
                transition: {
                  duration: 1.25,
                },
              }}
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                    duration: 1.2,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
                className="flex flex-col font-bold text-[6rem] leading-tight"
              >
                Which Reef Do You Choose?
              </motion.h2>

              <NauticButton
                text="Explore Again"
                onClick={() => onScreenChange(TransitionNames.Home)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
};
