// import { useMemo, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { getSurprise } from "../lib/birthdayService.js";
// import PhoneShell from "../components/PhoneShell.jsx";
// import FloatingHearts from "../components/FloatingHearts.jsx";
// import ProgressIndicator from "../components/ProgressIndicator.jsx";
// import BirthdayIntro from "../components/BirthdayIntro.jsx";
// import ExcitementScreen from "../components/ExcitementScreen.jsx";
// import BalloonGame from "../components/BalloonGame.jsx";
// import CandleBlow from "../components/CandleBlow.jsx";
// import RoseBouquet from "../components/RoseBouquet.jsx";
// import Envelope from "../components/Envelope.jsx";
// import BirthdayLetter from "../components/BirthdayLetter.jsx";
// import NotFoundBirthday from "./NotFoundBirthday.jsx";

// const STAGES = [
//   "intro",
//   "excitement",
//   "balloons",
//   "candle",
//   "bouquet",
//   "envelope",
//   "letter",
// ];

// export default function BirthdayPage() {
//   const { id } = useParams();
//   const surprise = useMemo(() => getSurprise(id), [id]);
//   const [stage, setStage] = useState("intro");
//   const audioRef = useRef(null);

//   if (!surprise) return <NotFoundBirthday />;

//   const { name, message } = surprise;

//   function startMusic() {
//     if (!audioRef.current) {
//       audioRef.current = new Audio("/happy-birthday.mp3");
//       audioRef.current.loop = true;
//       audioRef.current.volume = 0.5;
//     }

//     audioRef.current.play().catch(() => {});
//   }

//   function next() {
//     startMusic();

//     const idx = STAGES.indexOf(stage);

//     if (idx < STAGES.length - 1) {
//       setStage(STAGES[idx + 1]);
//     }
//   }

//   return (
//     <PhoneShell>
//       {stage !== "letter" && (
//         <FloatingHearts count={stage === "intro" ? 10 : 6} />
//       )}

//       <ProgressIndicator stage={stage} />

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={stage}
//           initial={{ opacity: 0, x: 24 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -24 }}
//           transition={{ duration: 0.35 }}
//           className="relative flex-1 flex flex-col"
//         >
//           {stage === "intro" && <BirthdayIntro name={name} onContinue={next} />}

//           {stage === "excitement" && <ExcitementScreen onContinue={next} />}

//           {stage === "balloons" && <BalloonGame onComplete={next} />}

//           {stage === "candle" && <CandleBlow onComplete={next} />}

//           {stage === "bouquet" && <RoseBouquet name={name} onContinue={next} />}

//           {stage === "envelope" && <Envelope onOpened={next} />}

//           {stage === "letter" && (
//             <BirthdayLetter name={name} message={message} />
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </PhoneShell>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { getSurprise } from "../lib/birthdayService.js";

import PhoneShell from "../components/PhoneShell.jsx";
import FloatingHearts from "../components/FloatingHearts.jsx";
import ProgressIndicator from "../components/ProgressIndicator.jsx";

import BirthdayIntro from "../components/BirthdayIntro.jsx";
import ExcitementScreen from "../components/ExcitementScreen.jsx";
import BalloonGame from "../components/BalloonGame.jsx";
import CandleBlow from "../components/CandleBlow.jsx";
import RoseBouquet from "../components/RoseBouquet.jsx";
import Envelope from "../components/Envelope.jsx";
import BirthdayLetter from "../components/BirthdayLetter.jsx";

import NotFoundBirthday from "./NotFoundBirthday.jsx";

const STAGES = [
  "intro",
  "excitement",
  "balloons",
  "candle",
  "bouquet",
  "envelope",
  "letter",
];

export default function BirthdayPage() {
  const { id } = useParams();

  const surprise = useMemo(() => getSurprise(id), [id]);

  const [stage, setStage] = useState("intro");

  /*
   * Music reference.
   */

  const audioRef = useRef(null);

  /*
   * Clean music when leaving the birthday page.
   */

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();

        audioRef.current.currentTime = 0;

        audioRef.current = null;
      }
    };
  }, []);

  if (!surprise) {
    return <NotFoundBirthday />;
  }

  const { name, message, photo } = surprise;

  /*
   * Start birthday music.
   *
   * It starts after the user presses the first
   * Continue button, which satisfies mobile browser
   * autoplay restrictions.
   */

  function startMusic() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/happy-birthday.mp3");

      audioRef.current.loop = true;

      audioRef.current.volume = 0.5;
    }

    audioRef.current.play().catch(() => {
      // Browser blocked playback.
      // It can be attempted again after another tap.
    });
  }

  function next() {
    /*
     * Every user interaction can safely try to
     * resume the music.
     */

    startMusic();

    const index = STAGES.indexOf(stage);

    if (index < STAGES.length - 1) {
      setStage(STAGES[index + 1]);
    }
  }

  return (
    <PhoneShell>
      {stage !== "letter" && (
        <FloatingHearts count={stage === "intro" ? 10 : 6} />
      )}

      <ProgressIndicator stage={stage} />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{
            opacity: 0,
            x: 24,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -24,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative flex-1 flex flex-col"
        >
          {/* INTRO */}

          {stage === "intro" && <BirthdayIntro name={name} onContinue={next} />}

          {/* EXCITEMENT */}

          {stage === "excitement" && <ExcitementScreen onContinue={next} />}

          {/* BALLOONS */}

          {stage === "balloons" && <BalloonGame onComplete={next} />}

          {/* CANDLE */}

          {stage === "candle" && <CandleBlow photo={photo} onComplete={next} />}

          {/* BOUQUET */}

          {stage === "bouquet" && <RoseBouquet name={name} onContinue={next} />}

          {/* ENVELOPE */}

          {stage === "envelope" && <Envelope onOpened={next} />}

          {/* LETTER */}

          {stage === "letter" && (
            <BirthdayLetter name={name} message={message} />
          )}
        </motion.div>
      </AnimatePresence>
    </PhoneShell>
  );
}
