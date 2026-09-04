// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function ExcitementScreen({ onContinue }) {
//   const [dodge, setDodge] = useState({
//     x: 0,
//     y: 0,
//   });

//   const [teases, setTeases] = useState(0);

//   const teaseMessages = [
//     "Nice try 😏",
//     "You can't catch me!",
//     "Come on, say yes! ❤️",
//     "Hehe, missed me!",
//     "Nope! 😜",
//   ];

//   function handleNoAttempt(e) {
//     e?.preventDefault();

//     // Keep the button inside the phone screen
//     const x = Math.random() * 220 - 110;
//     const y = Math.random() * 360 - 180;

//     setDodge({
//       x,
//       y,
//     });

//     setTeases((t) => t + 1);
//   }

//   return (
//     <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
//       <motion.h1
//         initial={{
//           opacity: 0,
//           y: 12,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.5,
//         }}
//         className="text-2xl font-semibold text-plum-800 max-w-[280px]"
//       >
//         Are you excited for what's next?
//       </motion.h1>

//       <motion.div
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         transition={{
//           delay: 0.2,
//         }}
//         className="mt-10 flex items-center gap-5 relative h-16 w-full justify-center"
//       >
//         {/* YES */}
//         <motion.button
//           whileTap={{
//             scale: 0.94,
//           }}
//           onClick={onContinue}
//           className="rounded-full bg-blush-500 text-white font-display font-semibold text-lg px-8 py-3.5 shadow-soft"
//         >
//           Yes ❤️
//         </motion.button>

//         {/* NO */}
//         <motion.button
//           animate={{
//             x: dodge.x,
//             y: dodge.y,
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 500,
//             damping: 18,
//           }}
//           onPointerDown={handleNoAttempt}
//           onTouchStart={handleNoAttempt}
//           className="rounded-full bg-white text-plum-700 font-display font-semibold text-lg px-8 py-3.5 shadow-soft border border-blush-200"
//         >
//           No
//         </motion.button>
//       </motion.div>

//       {teases > 0 && (
//         <motion.p
//           key={teases}
//           initial={{
//             opacity: 0,
//             scale: 0.8,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           className="mt-8 text-sm text-plum-700/60"
//         >
//           {teaseMessages[(teases - 1) % teaseMessages.length]}
//         </motion.p>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";

export default function ExcitementScreen({ onContinue }) {
  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  const [yesPosition, setYesPosition] = useState({
    x: 0,
    y: 0,
  });

  const [yesClicked, setYesClicked] = useState(false);

  const [teases, setTeases] = useState(0);

  const teaseMessages = [
    "Nice try 😏",
    "You can't catch me!",
    "Hehe, missed me! 😂",
    "Come on, say YES! ❤️",
    "Why are you chasing buttons? 😂",
  ];

  function getRandomPosition() {
    // Keep buttons safely inside the phone screen.
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 280 - 140;

    return {
      x,
      y,
    };
  }

  function handleNoAttempt(event) {
    event?.preventDefault();

    setNoPosition(getRandomPosition());

    setTeases((current) => current + 1);
  }

  function handleYesAttempt(event) {
    event?.preventDefault();

    // FIRST YES CLICK:
    // Move the button somewhere else.
    if (!yesClicked) {
      setYesClicked(true);
      setYesPosition(getRandomPosition());
      setTeases((current) => current + 1);
      return;
    }

    // SECOND YES CLICK:
    // Finally continue to the next scene.
    onContinue();
  }

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Question */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="text-2xl font-semibold text-plum-800 max-w-[280px]"
      >
        Are you excited for what's next?
      </motion.h1>

      {/* Buttons */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
        className="mt-10 relative w-full h-[360px] flex items-center justify-center"
      >
        {/* YES BUTTON */}
        <motion.button
          animate={{
            x: yesPosition.x,
            y: yesPosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
          whileTap={{
            scale: 0.94,
          }}
          onPointerDown={handleYesAttempt}
          className="absolute rounded-full bg-blush-500 text-white font-display font-semibold text-lg px-8 py-3.5 shadow-soft z-20"
        >
          Yes ❤️
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          animate={{
            x: noPosition.x,
            y: noPosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
          onPointerDown={handleNoAttempt}
          className="absolute rounded-full bg-white text-plum-700 font-display font-semibold text-lg px-8 py-3.5 shadow-soft border border-blush-200 z-10"
        >
          No
        </motion.button>
      </motion.div>

      {/* Funny message */}
      {teases > 0 && (
        <motion.p
          key={teases}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 6,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="absolute bottom-10 text-sm text-plum-700/60 font-display"
        >
          {teaseMessages[(teases - 1) % teaseMessages.length]}
        </motion.p>
      )}
    </div>
  );
}
