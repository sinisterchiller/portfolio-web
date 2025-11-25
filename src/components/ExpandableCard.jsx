import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/use-outside-click.js";
import { marked } from "marked";
import DOMPurify from "dompurify";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [readmeContent, setReadmeContent] = useState(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState(null);
  const id = useId();
  const ref = useRef(null);

  // Configure marked
  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      // Hide the navbar with fade out
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        navbar.style.opacity = '0';
        navbar.style.visibility = 'hidden';
      }
    } else {
      document.body.style.overflow = "auto";
      // Show the navbar with fade in
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Ensure navbar is shown when component unmounts
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
      }
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // Fetch README when card is expanded
  useEffect(() => {
    if (active && typeof active === "object" && active.readmePath) {
      setReadmeLoading(true);
      setReadmeError(null);
      setReadmeContent(null);

      // Fetch the README file directly
      const readmePath = active.readmePath;
      console.log('Attempting to fetch README from:', readmePath);
      
      fetch(readmePath, {
        headers: {
          'Accept': 'text/plain, text/markdown, */*'
        }
      })
        .then(response => {
          console.log('Response status:', response.status, 'Content-Type:', response.headers.get('content-type'));
          if (!response.ok) {
            throw new Error(`Failed to load README: ${response.status} ${response.statusText}`);
          }
          // Check content type
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('text/html')) {
            throw new Error('Received HTML instead of markdown - file not found');
          }
          // Check if response is actually markdown, not HTML
          return response.text().then(text => {
            console.log('Fetched content preview:', text.substring(0, 100));
            // If it looks like HTML (starts with <!DOCTYPE or <html), it's probably wrong
            const trimmed = text.trim();
            if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<meta')) {
              throw new Error('Received HTML page instead of markdown - check file path');
            }
            return text;
          });
        })
        .then(text => {
          console.log('README loaded successfully, length:', text.length);
          setReadmeContent(text);
          setReadmeLoading(false);
        })
        .catch(error => {
          console.error('Error loading README:', error);
          setReadmeError(error.message);
          setReadmeLoading(false);
        });
    } else {
      setReadmeContent(null);
      setReadmeError(null);
      setReadmeLoading(false);
    }
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-black border border-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] h-full md:max-h-[90vh] flex flex-col bg-black sm:rounded-3xl overflow-hidden"
            >
              <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
                <motion.div layoutId={`image-${active.title}-${id}`} className="w-full">
                  <img
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-auto sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </motion.div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-start p-4">
                    <div className="">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-medium text-white text-base"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-300 text-base"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white flex-shrink-0"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  <div className="pt-4 relative px-4 pb-10">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-300 text-xs md:text-sm lg:text-base"
                    >
                    {readmeLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-neutral-400">Loading README...</div>
                      </div>
                    ) : readmeError ? (
                      <div className="flex flex-col items-start gap-4">
                        <div className="text-red-400">Error: {readmeError}</div>
                        <div className="flex flex-col items-start gap-4">
                          {typeof active.content === "function"
                            ? active.content()
                            : active.content}
                        </div>
                      </div>
                    ) : readmeContent ? (
                      <div
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(marked.parse(readmeContent), {
                            ADD_TAGS: ['iframe'],
                            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
                            ALLOW_DATA_ATTR: true
                          })
                        }}
                        style={{
                          color: '#d4d4d8',
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-start gap-4">
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-900 rounded-xl cursor-pointer bg-black shadow-md opacity-100"
            style={{ minHeight: '480px', height: '480px' }}
          >
            <div className="flex gap-4 flex-col w-full h-full">
              <motion.div layoutId={`image-${card.title}-${id}`} className="w-full">
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex justify-start items-start flex-col flex-grow">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-white text-left text-base mb-2"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-300 text-left text-sm"
                >
                  {card.description}
                </motion.p>
                <div className="mt-3 flex flex-wrap gap-2 justify-start">
                  {card.tech && card.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-neutral-800 rounded-full text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Implements a digital tape measure using an ATmega328P microcontroller, an HC-SR04 ultrasonic sensor, and a 16×2 LCD.",
    title: "ATmega328P Ultrasonic Digital Tape Measure",
    src: "images/Project-9.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ATmega328P-Ultrasonic-Digital-Tape-Measure",
    readmePath: "/projects/ATmega328P-Ultrasonic-Digital-Tape-Measure/README.MD",
    tech: ["ATmega328P", "Embedded C", "Ultrasonic Sensor", "LCD"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implements a digital tape measure using an ATmega328P microcontroller, an HC-SR04 ultrasonic sensor, and a 16×2 LCD. Measures distances from 2 cm–200 cm in real time with Timer1-based echo timing, displaying current, minimum, and maximum readings with reset and range detection.
          </p>
          <p className="mb-4">
            The project demonstrates real-time distance measurement capabilities with precision timing, LCD interfacing, and sensor data processing in embedded systems.
          </p>
        </div>
      );
    },
  },
  {
    description: "Implements a digital combination lock using pushbuttons, an RGB LED, and a piezo buzzer on the ATtiny2313A microcontroller.",
    title: "ATtiny2313A Digital Combination Lock",
    src: "images/Project-8.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ATtiny2313A-Digital-Combination-Lock",
    readmePath: "/projects/ATtiny2313A-Digital-Combination-Lock/README.MD",
    tech: ["ATtiny2313A", "Embedded C", "Debouncing", "RGB LED"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implements a digital combination lock using pushbuttons, an RGB LED, and a piezo buzzer on the ATtiny2313A microcontroller. Demonstrates finite-state machine design, input debouncing, and real-time feedback control for user-entered unlock sequences.
          </p>
          <p className="mb-4">
            The project showcases state machine implementation, hardware-software interaction, and user interface design in embedded systems.
          </p>
        </div>
      );
    },
  },
  {
    description: "Implements a four-state RGB LED controller using an ATtiny2313A microcontroller and a capacitive touch button.",
    title: "ATtiny2313A RGB LED via Touch Button",
    src: "images/Project-7.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ATtiny2313A-RGB-LED-Control-via-Touch-Button",
    readmePath: "/projects/ATtiny2313A-RGB-LED-Control-via-Touch-Button/README.MD",
    tech: ["ATtiny2313A", "Embedded C", "FSM", "KiCad"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implements a four-state RGB LED controller using an ATtiny2313A microcontroller and a capacitive touch button. Demonstrates finite-state logic, digital I/O control, and hardware–software interaction in embedded systems using MPLAB X and KiCad.
          </p>
          <p className="mb-4">
            The project includes PCB design in KiCad and demonstrates state-based control systems for user interaction.
          </p>
        </div>
      );
    },
  },
  {
    description: "Implements a modular bubble-sort program in ARM assembly with user input, dynamic memory, and stack-based data passing.",
    title: "ARM Assembly Modular Bubble Sort",
    src: "images/Project-6.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ARM-Assembly-Modular-Bubble-Sort-with-User-Interaction",
    readmePath: "/projects/ARM-Assembly-Modular-Bubble-Sort-with-User-Interaction/README.MD",
    tech: ["ARM Assembly", "STM32", "THUMB-2", "Embedded Systems"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implements a modular bubble-sort program in ARM assembly with user input, dynamic memory, and stack-based data passing. Includes three subroutines: WelcomePrompt, Sort, and Display—each handling input validation, sorting, and output display on STM32 NUCLEO hardware.
          </p>
          <p className="mb-4">
            The project demonstrates low-level programming, memory management, and modular code design in ARM assembly language.
          </p>
        </div>
      );
    },
  },
  {
    description: "Implements and tests ARM THUMB2 addressing modes and numerical integration via the trapezoidal rule.",
    title: "ARM Assembly Addressing Modes & Trapezoidal Integration",
    src: "images/Project-5.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ARM-Assembly-Addressing-Modes-and-Trapezoidal-Integration",
    readmePath: "/projects/ARM-Assembly-Addressing-Modes-and-Trapezoidal-Integration/README.MD",
    tech: ["ARM Assembly", "STM32", "Numerical Methods", "THUMB-2"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implements and tests ARM THUMB2 addressing modes and numerical integration via the trapezoidal rule. Demonstrates register indirect, indexed, and post-increment addressing modes, bit-shift math for division and multiplication, and area estimation without using mul/div instructions.
          </p>
          <p className="mb-4">
            The project showcases advanced ARM assembly techniques and numerical computation without hardware multipliers.
          </p>
        </div>
      );
    },
  },
  {
    description: "ARM assembly program for ASCII conversion and case transformation on the STM32 NUCLEO-L432KC.",
    title: "ARM Assembly ASCII Conversion & Case Transformation",
    src: "images/Project-4.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/ARM-Assembly-ASCII-Conversion-and-Case-Transformation",
    readmePath: "/projects/ARM-Assembly-ASCII-Conversion-and-Case-Transformation/README.MD",
    tech: ["ARM Assembly", "STM32", "ASCII", "THUMB-2"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            ARM assembly program for ASCII conversion and case transformation on the STM32 NUCLEO-L432KC. Implements hexadecimal conversion and upper/lower case switching using THUMB2 instructions, memory operations, and data validation in STM32CubeIDE.
          </p>
          <p className="mb-4">
            The project demonstrates character manipulation and data conversion in low-level assembly programming.
          </p>
        </div>
      );
    },
  },
  {
    description: "Design and implementation of a 7-segment LED decoder and counter using VHDL.",
    title: "7-Segment LED Decoder and Counter",
    src: "images/Project-3.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/7-Segment-LED-Decoder-and-Counter-",
    readmePath: "/projects/7-Segment-LED-Decoder-and-Counter/README.MD",
    tech: ["VHDL", "FPGA", "7-Segment Display", "Multiplexing"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Design and implementation of a 7-segment LED decoder and counter using VHDL. Displays hexadecimal digits (0–F) and a two-digit counter on an FPGA. Demonstrates Boolean logic, case-based control, and multiplexing for dual-display output.
          </p>
          <p className="mb-4">
            The project showcases digital logic design, FPGA programming, and display driver implementation.
          </p>
        </div>
      );
    },
  },
  {
    description: "Design and simulation of combinational logic circuits using multiplexers and demultiplexers.",
    title: "Combinational Logic Design: MUX and DEMUX",
    src: "images/Project-2.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/Combinational-Logic-Design-MUX-and-DEMUX-Experiment",
    readmePath: "/projects/Combinational-Logic-Design-MUX-and-DEMUX-Experiment/README.MD",
    tech: ["VHDL", "Multiplexers", "FPGA", "Boolean Logic"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Design and simulation of combinational logic circuits using multiplexers and demultiplexers. Includes Boolean simplification, VHDL code, waveform simulation, and FPGA testing. Demonstrates signal routing, control logic, and hardware implementation principles.
          </p>
          <p className="mb-4">
            The project demonstrates fundamental digital logic concepts and FPGA-based circuit implementation.
          </p>
        </div>
      );
    },
  },
  {
    description: "Implementation and testing of AND, OR, and NOT logic circuits using K-Maps, WaveForms, and VHDL on the Zybo Z7 FPGA.",
    title: "AND-OR-NOT Logic Circuits",
    src: "images/fpga-logic-circuits.png",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/sinisterchiller/AND-OR-NOT-Logic-Circuits",
    readmePath: "/projects/AND-OR-NOT-Logic-Circuits/README.MD",
    tech: ["VHDL", "FPGA", "K-Maps", "Zybo Z7"],
    content: () => {
      return (
        <div>
          <p className="mb-4">
            Implementation and testing of AND, OR, and NOT logic circuits using K-Maps, WaveForms, and VHDL on the Zybo Z7 FPGA. Includes design, simulation, and verification results.
          </p>
          <p className="mb-4">
            The project demonstrates basic logic gate implementation, Karnaugh map optimization, and FPGA verification techniques.
          </p>
        </div>
      );
    },
  },
];
