"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { SectionHeader } from "./about-section"
import {
  ExternalLink,
  X,
  Cpu,
  CircuitBoard,
  MemoryStick,
  Binary,
  Shield,
  Thermometer,
  Radio,
  Keyboard,
  Eye,
  Lock,
  AlertTriangle,
  Zap,
  type LucideIcon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Rich detail content type                                          */
/* ------------------------------------------------------------------ */
type ProjectDetail = {
  overview: string
  objectives?: string[]
  architecture?: { title: string; description: string }[]
  features?: { title: string; description: string }[]
  hardware?: string[]
  testing?: string[]
  discussion?: string
  license?: string
}

type Project = {
  title: string
  description: string
  tags: string[]
  category: string
  icon: LucideIcon
  github?: string
  detail?: ProjectDetail
}

/* ------------------------------------------------------------------ */
/*  Project data                                                      */
/* ------------------------------------------------------------------ */
const projects: Project[] = [
  {
    title: "PostureBot (SillyCon)",
    description:
      "Interactive game hub that uses webcam + MediaPipe head/pose tracking to drive two mini-games (Traffic Rush + Tilt Master) with a FastAPI orchestrator and a Next.js UI.",
    tags: ["Next.js", "FastAPI", "MediaPipe", "OpenCV", "Pygame", "pyautogui"],
    category: "Software / Computer Vision",
    icon: Eye,
    github: "https://github.com/sinisterchiller/PostureBot",
    detail: {
      overview:
        "PostureBot is a webcam-driven 'Game Hub' that uses MediaPipe pose/head tracking to control two interactive games. A Next.js frontend triggers a FastAPI orchestration backend that launches and stops game processes, supports a posture-monitoring 'Police Mode', and routes real-time tilt/posture signals to the games.",
      objectives: [
        "Build a simple web hub to launch/stop games and toggle Police Mode",
        "Use webcam pose/head tracking to control gameplay hands-free",
        "Orchestrate multiple Python processes safely from a single backend",
      ],
      architecture: [
        {
          title: "Frontend (Next.js)",
          description:
            "Game hub UI that calls the orchestrator endpoints (/game, /mode, /close).",
        },
        {
          title: "Orchestrator (FastAPI)",
          description:
            "Central service that starts/stops game processes and posture monitoring, and exposes control endpoints on port 2301.",
        },
        {
          title: "Game stacks",
          description:
            "Traffic Rush uses Pygame + pyautogui for steering via head tilt; Tilt Master uses OpenCV overlays + MediaPipe-based tilt detection to drive a quiz flow.",
        },
      ],
      features: [
        { title: "Hands-free controls", description: "Head tilt input via MediaPipe tracking" },
        { title: "Game orchestration", description: "One API to launch/stop games and monitoring" },
        { title: "Police Mode", description: "Detects sustained bad posture and triggers consequences" },
      ],
      testing: [
        "Verified orchestrator endpoints correctly start/stop game processes",
        "Validated head-tilt thresholds and smoothing for stable controls",
        "Tested Police Mode posture timing and trigger behavior",
      ],
      discussion:
        "This project combines real-time computer vision input with multi-process orchestration. The main engineering challenges were robust process lifecycle management, stabilizing noisy head-tilt signals, and keeping the UX responsive while games run independently.",
    },
  },
  {
    title: "Multi-MCU Home Security System",
    description:
      "A modular home security system built around multiple AVR microcontrollers communicating over UART, with temperature monitoring, intrusion detection, and keypad authentication.",
    tags: ["ATmega328P", "ATtiny2313A", "Embedded C", "UART", "Multi-MCU"],
    category: "Embedded Systems",
    icon: CircuitBoard,
    github: "https://github.com/sinisterchiller/Multi-MCU-Home-Security-System",
    detail: {
      overview:
        "This project implements a modular home security system built around multiple AVR microcontrollers communicating over UART. The system monitors temperature and unauthorized presence, provides keypad-based authentication, and delivers real-time feedback through LCDs, RGB LED indicators, and a buzzer. The design separates responsibilities across a master controller and two slave controllers, improving clarity, scalability, and fault isolation.",
      objectives: [
        "Detect unsafe temperature conditions and trigger alarms when thresholds are exceeded",
        "Detect nearby motion using an ultrasonic sensor",
        "Arm and disarm the system using keypad authentication with retry limits",
        "Provide clear visual and audible system feedback",
        "Demonstrate reliable multi-MCU UART communication",
      ],
      architecture: [
        {
          title: "Master Controller (ATmega328P)",
          description:
            "Handles keypad input forwarded from Slave A. Performs password authentication and retry tracking. Reads temperature via ADC and converts to \u00b0C. Triggers fire and intrusion alarms. Sends temperature data to Slave B for display.",
        },
        {
          title: "Slave A (ATmega328P)",
          description:
            "Scans a 4\u00d73 keypad with debounce. Manages ultrasonic distance measurement for motion detection. Arms/disarms intrusion detection via a dedicated switch. Sends event codes to the master over UART.",
        },
        {
          title: "Slave B (ATtiny2313A)",
          description:
            "Receives temperature data from the master. Displays live temperature on a dedicated LCD.",
        },
      ],
      features: [
        {
          title: "Temperature Monitoring",
          description: "Continuous ADC sampling with configurable alarm threshold",
        },
        {
          title: "Intrusion Detection",
          description: "Motion detection via distance change tolerance",
        },
        {
          title: "Authentication",
          description: "Keypad-based access with lockout after repeated failures",
        },
        {
          title: "User Feedback",
          description:
            "LCD status messages, RGB LED color states (armed, disarmed, alarm), and buzzer patterns for alerts",
        },
      ],
      hardware: [
        "ATmega328P \u00d72 (Master, Slave A)",
        "ATtiny2313A \u00d71 (Slave B)",
        "4\u00d73 matrix keypad",
        "Ultrasonic distance sensor",
        "LM35 temperature sensor",
        "2 \u00d7 16\u00d72 LCDs (4-bit mode)",
        "RGB LED with current-limiting resistors",
        "Piezo buzzer",
        "External crystal oscillators (14.7456 MHz)",
      ],
      testing: [
        "Verified correct UART communication between all MCUs",
        "Confirmed accurate temperature conversion and threshold detection",
        "Validated intrusion detection sensitivity and tolerance handling",
        "Tested lockout behavior after consecutive authentication failures",
        "Confirmed stable LCD updates and alarm signaling",
      ],
      discussion:
        "This project demonstrates practical distributed embedded design, combining sensing, communication, and user interaction. Separating tasks across multiple controllers simplified timing constraints and improved system robustness. Future improvements could include battery backup, network connectivity, or additional sensors such as smoke detection.",
      license:
        "Creative Commons Attribution\u2013NonCommercial\u2013ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "Joystick Interface with ADC & UART",
    description:
      "Implements a two-axis joystick interface using the ATmega328P microcontroller with ADC sampling, LCD display, and UART communication.",
    tags: ["ATmega328P", "Embedded C", "ADC", "UART", "LCD"],
    category: "Microcontrollers",
    icon: Cpu,
    github: "https://github.com/sinisterchiller/ATmega328P-Joystick-Interface-with-ADC-and-UART",
    detail: {
      overview:
        "This project implements a two-axis joystick interface using the ATmega328P microcontroller. The system samples analog joystick voltages using the on-chip ADC, displays the values on a 16\u00d72 LCD, and streams real-time position data to a PC via UART. The joystick outputs X-axis, Y-axis, and switch-press data, enabling it to function as a general-purpose input device for embedded or PC-side applications.",
      objectives: [
        "Sample analog joystick signals using the ATmega328P ADC",
        "Switch ADC channels dynamically using the internal multiplexer",
        "Display joystick coordinates locally on an LCD",
        "Transmit formatted joystick data to a PC using UART",
        "Detect and report joystick switch presses",
        "Improve timing and communication accuracy using an external crystal",
      ],
      architecture: [
        {
          title: "ADC Configuration",
          description:
            "Uses AVcc as reference voltage with 10-bit resolution (0\u20131023). Prescaler configured for accurate conversion timing.",
        },
        {
          title: "Channel Multiplexing",
          description:
            "Alternates between X-axis and Y-axis ADC inputs. Reads joystick switch as a digital input.",
        },
        {
          title: "LCD Output",
          description:
            "Displays X and Y values in real time. Updates continuously as joystick position changes.",
        },
        {
          title: "UART Communication",
          description:
            "Configured for 9600 baud, 8-N-1 format. Sends joystick coordinates and switch state to PC. Data displayed in real time using a serial terminal.",
        },
      ],
      hardware: [
        "ATmega328P microcontroller",
        "2-axis joystick with pushbutton",
        "16\u00d72 LCD (HD44780 compatible)",
        "UART via USB-TTL interface",
        "External crystal oscillator",
        "5 V DC power supply",
        "MPLAB X IDE",
        "KiCad / Microchip SNAP (ISP)",
      ],
      testing: [
        "Verified correct ADC readings for both joystick axes",
        "Confirmed stable LCD updates during continuous sampling",
        "Validated UART data transmission using a USB-TTL bridge",
        "Tested joystick switch detection and reporting",
        "Observed minor stick-drift near center position",
      ],
      discussion:
        "This project demonstrates practical integration of analog sensing, digital communication, and real-time data processing in embedded systems. Key challenges included ADC channel switching, UART formatting limitations, and joystick centering inaccuracies. Potential improvements include automatic joystick center calibration, scaled or filtered output for smoother readings, configurable baud-rate calculation for portability, and PC-side software for visualization or control.",
      license:
        "Creative Commons Attribution\u2013NonCommercial\u2013ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "Ultrasonic Digital Tape Measure",
    description:
      "Electronic tape measure using an ATmega328P microcontroller, an HC-SR04 ultrasonic sensor, and a 16×2 LCD, tracking current, minimum, and maximum distances in real time.",
    tags: ["ATmega328P", "Embedded C", "Ultrasonic Sensor", "LCD", "Timer1"],
    category: "Embedded Systems",
    icon: Cpu,
    github: "https://github.com/sinisterchiller/ATmega328P-Ultrasonic-Digital-Tape-Measure",
    detail: {
      overview:
        "This project demonstrates an electronic tape measure built around the ATmega328P, an HC-SR04 ultrasonic sensor, and a 16×2 LCD. It continuously measures distance, updates readings every second, and displays current, minimum, and maximum values. An “Out of Range” warning is shown when the measured distance falls outside the 2 cm to 200 cm range.",
      objectives: [
        "Implement non-contact distance measurement using an ultrasonic sensor",
        "Record and display current, minimum, and maximum distances",
        "Detect and display “Out of Range” conditions and “NaN” at startup",
        "Utilize Timer1 for precise echo pulse timing",
        "Use an external 14.7456 MHz crystal oscillator for improved accuracy",
        "Provide a reset function to clear measurement history",
      ],
      architecture: [
        {
          title: "Pulse Triggering",
          description:
            "Generates a 10 µs trigger pulse on the HC-SR04’s trigger pin to initiate each ultrasonic measurement cycle.",
        },
        {
          title: "Echo Timing with Timer1",
          description:
            "Uses Timer1 to measure the time between the rising and falling edges of the echo signal, giving precise round-trip flight time of the ultrasonic pulse.",
        },
        {
          title: "Distance Calculation",
          description:
            "Computes distance using distance = (speed_of_sound × time) / 2, converting timer counts to centimeters within the 2–200 cm operating range.",
        },
        {
          title: "LCD Display & History",
          description:
            "Displays the live distance on the first LCD line and shows Min/Max values on the second line, updating these values as new measurements arrive.",
        },
        {
          title: "Range Detection & Reset Logic",
          description:
            "Flags measurements outside 2–200 cm as “Out of Range” and exposes a reset button that clears stored Min/Max history and reinitializes display state.",
        },
      ],
      hardware: [
        "ATmega328P microcontroller",
        "HC-SR04 ultrasonic distance sensor",
        "16×2 LCD (HD44780 controller, 4-bit mode)",
        "External 14.7456 MHz crystal oscillator",
        "5 V DC power supply",
        "Reset pushbutton",
        "MPLAB X IDE, KiCad, Microchip SNAP (ISP mode)",
      ],
      testing: [
        "Verified operation and accuracy across the 2 cm–200 cm measurement range",
        "Confirmed stable LCD updates and correct current/Min/Max tracking",
        "Tested out-of-range detection and display behavior",
        "Validated reliable reset behavior for clearing measurement history",
        "Confirmed timing stability and measurement repeatability using the external crystal reference",
      ],
      discussion:
        "This project showcases practical use of timers, interrupts, and sensor integration on the ATmega328P. Key challenges included precise echo pulse timing, fuse configuration for the external oscillator, and minimizing environmental noise that affects ultrasonic readings. Future improvements include temperature-compensated speed-of-sound calibration, UART output for data logging, and auto-calibration or averaging for more stable measurements.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "Digital Combination Lock",
    description:
      "Implements a digital combination lock using pushbuttons, an RGB LED, and a piezo buzzer on the ATtiny2313A microcontroller, showcasing finite-state machine design and input debouncing.",
    tags: ["ATtiny2313A", "Embedded C", "Debouncing", "FSM", "RGB LED"],
    category: "Microcontrollers",
    icon: Cpu,
    github: "https://github.com/sinisterchiller/ATtiny2313A-Digital-Combination-Lock",
    detail: {
      overview:
        "This project demonstrates a digital combination lock built with an ATtiny2313A microcontroller. The system verifies a user-entered sequence through pushbuttons, provides visual feedback with an RGB LED, and emits audio tones using a piezo buzzer. It showcases finite-state machine logic, sequential input validation, and robust input debouncing in a resource-constrained embedded environment.",
      objectives: [
        "Design and implement a configurable digital lock using embedded C",
        "Validate a user-entered button sequence with programmable length (5–8 presses)",
        "Integrate LED and buzzer feedback for visual and auditory responses",
        "Implement software debouncing for reliable button input detection",
      ],
      architecture: [
        {
          title: "Finite-State Machine Core",
          description:
            "Implements the lock behavior as a finite-state machine, handling locked, input, success, and error/alarm states with clear transitions based on button events and timers.",
        },
        {
          title: "Button Input & Debouncing",
          description:
            "Monitors five pushbuttons and applies software debouncing to ensure each physical press is registered as a single logical event, even under rapid or noisy input conditions.",
        },
        {
          title: "Sequence Validation Logic",
          description:
            "Buffers the user-entered button sequence and compares it against a stored passcode of configurable length (5–8 presses), triggering success or failure paths accordingly.",
        },
        {
          title: "LED & Buzzer Feedback Engine",
          description:
            "Drives an RGB LED (red, white, green states) and a piezo buzzer to indicate lock status, button activity, and alarm conditions with distinct color and tone patterns.",
        },
        {
          title: "Lock / Unlock Timing Control",
          description:
            "Controls auto-lock timing after a successful unlock (e.g., 5 seconds of green), and manages manual reset back to the locked state when required.",
        },
      ],
      hardware: [
        "ATtiny2313A microcontroller",
        "RGB LED (common anode)",
        "Piezo buzzer",
        "Five pushbuttons",
        "330 Ω resistors",
        "5 V DC power supply",
        "Breadboard and jumper wires",
        "Microchip SNAP (ISP mode) and MPLAB X IDE",
        "KiCad for schematic and layout",
      ],
      testing: [
        "Verified correct recognition of valid and invalid button sequences across lengths 5–8",
        "Confirmed stable debouncing behavior under rapid button presses",
        "Validated LED color patterns and buzzer tones for each state (locked, input, success, alarm)",
        "Tested auto-lock behavior and manual reset transitions between states",
      ],
      discussion:
        "The project highlights embedded state-based control and real-time feedback design on a small AVR microcontroller. Key challenges included implementing reliable button debouncing, synchronizing LED and buzzer timing with the finite-state machine, and ensuring accurate state transitions under noisy input. Potential enhancements include user-configurable password entry directly via hardware, an LCD for richer user feedback, and adjustable unlock-timer settings.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "RGB LED via Touch Button",
    description:
      "Implements a four-state RGB LED controller using an ATtiny2313A microcontroller and a capacitive touch button, demonstrating finite-state logic and debounced input handling.",
    tags: ["ATtiny2313A", "Embedded C", "FSM", "KiCad", "RGB LED"],
    category: "Embedded Systems",
    icon: CircuitBoard,
    github: "https://github.com/sinisterchiller/ATtiny2313A-RGB-LED-Control-via-Touch-Button",
    detail: {
      overview:
        "This project demonstrates how to control an RGB LED using a touch button and an ATtiny2313A microcontroller. Each press cycles the LED through four predefined color states, looping back to white after the final state. The system functions as a simple finite-state machine with debounced input logic.",
      objectives: [
        "Implement multi-state RGB LED control using digital I/O pins",
        "Detect and debounce touch-button input to ensure one-press-one-change behavior",
        "Use structured C code for embedded state management",
        "Prototype the circuit in KiCad and program it via MPLAB X IDE with a Microchip SNAP programmer",
      ],
      architecture: [
        {
          title: "State Machine Logic",
          description:
            "Implements a four-state finite-state machine, with each state corresponding to a specific RGB color combination and cycling in a fixed order.",
        },
        {
          title: "Touch Input Debouncing",
          description:
            "Uses a software-based debounce strategy (delay/variable-based) to filter out spurious transitions and guarantee single state changes per press.",
        },
        {
          title: "Hardware Setup",
          description:
            "Connects RGB LED channels and the touch button to ATtiny2313A GPIO pins, configuring directions and pull-ups to support reliable input and output behavior.",
        },
        {
          title: "Software Flow",
          description:
            "Initializes ports, waits for a debounced button press, advances the state, updates the LED color, and wraps back to the first state after the fourth.",
        },
      ],
      hardware: [
        "ATtiny2313A microcontroller",
        "RGB LED (common cathode/anode, determined experimentally)",
        "330 Ω resistors × 3",
        "Capacitive touch button",
        "Breadboard and jumper wires",
        "5 V @ 0.3 A DC power supply",
        "MPLAB X IDE, KiCad, Microchip SNAP (ISP mode)",
      ],
      testing: [
        "Verified LED color transitions (white → red → green → blue → white)",
        "Implemented and validated variable-based software debounce to stabilize state changes",
        "Confirmed stable power delivery and proper resistor sizing to protect the LED",
      ],
      discussion:
        "The system illustrates core embedded control principles: GPIO configuration, software debouncing, and finite-state logic. Potential improvements include adding hardware debounce circuitry, PWM-based brightness control, and extra operating modes such as strobe and pattern cycling.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "Modular Bubble Sort (ARM Assembly)",
    description:
      "Implements a modular bubble-sort program in ARM assembly with user input, dynamic memory, and stack-based data passing on STM32 NUCLEO hardware.",
    tags: ["ARM Assembly", "STM32", "THUMB-2", "Embedded Systems", "UART"],
    category: "ARM Assembly",
    icon: Binary,
    github: "https://github.com/sinisterchiller/ARM-Assembly-Modular-Bubble-Sort-with-User-Interaction",
    detail: {
      overview:
        "This project demonstrates a modular ARM assembly program that performs a bubble sort on a list of user-entered numbers. The system is divided into three independent subroutines — WelcomePrompt, Sort, and Display — each responsible for a distinct task in the sorting workflow. All communication between routines occurs through stack memory and register passing.",
      objectives: [
        "Implement modular subroutines in ARMv7-M assembly",
        "Manage stack-based data passing and register preservation",
        "Validate user input ranges and limits dynamically",
        "Execute an in-place bubble sort on user-provided data",
        "Display sorted results via UART output",
      ],
      architecture: [
        {
          title: "WelcomePrompt Subroutine",
          description:
            "Prompts the user for the number of entries (3–10), minimum and maximum limits, and individual numbers within that range. Validates input and re-prompts on invalid entries, storing the count on the stack and the array values in dynamic memory pointed to by R0.",
        },
        {
          title: "Sort Subroutine",
          description:
            "Implements the bubble sort algorithm using nested loops. Accesses the array base address via R0 and retrieves the number of elements from the stack, performing in-place swaps using register-indirect addressing. Prints a 'Done sorting' message on completion.",
        },
        {
          title: "Display Subroutine",
          description:
            "Retrieves the array base address and entry count from the stack, prints the total number of entries, and then outputs the sorted list sequentially via UART helper routines. Displays a final completion message before restoring registers.",
        },
        {
          title: "Support Routines & Calling Convention",
          description:
            "Relies on provided routines such as printf, cr, value, and getstring. Carefully manages link registers and stack frames using PUSH/POP to preserve caller state and ensure safe returns between subroutines.",
        },
      ],
      hardware: [
        "STM32 NUCLEO-L432KC board (ARM Cortex-M4)",
        "ARMv7-M (THUMB-2) instruction set",
        "STM32CubeIDE 2024 toolchain",
        "UART connection for console I/O",
      ],
      testing: [
        "Verified in Keil uVision and on the STM32 NUCLEO-L432KC board",
        "Tested with valid and invalid inputs to confirm proper branching and error handling",
        "Debugged stack usage, offset addressing, and register preservation using PUSH/POP",
      ],
      discussion:
        "The program illustrates structured assembly design, efficient use of stack memory, and modular programming concepts. Proper management of link registers, stack frames, and offsets ensures reliable subroutine transitions and data integrity across modules.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "Addressing Modes & Trapezoidal Integration",
    description:
      "Explores ARM THUMB-2 addressing modes and numerical integration via the trapezoidal rule, performing all arithmetic with bit shifts instead of mul/div instructions.",
    tags: ["ARM Assembly", "STM32", "Numerical Methods", "THUMB-2", "Addressing Modes"],
    category: "ARM Assembly",
    icon: Binary,
    github: "https://github.com/sinisterchiller/ARM-Assembly-Addressing-Modes-and-Trapezoidal-Integration",
    detail: {
      overview:
        "This project explores ARM assembly programming focusing on data handling using different addressing modes and implementing numerical integration through the trapezoidal rule. All arithmetic operations are performed without direct multiplication or division, using only bit shifting instructions.",
      objectives: [
        "Demonstrate three ARM addressing modes: Register Indirect with Offset, Indexed Register Indirect, and Post-Increment Register Indirect",
        "Apply addressing-mode logic to add array elements stored in memory",
        "Implement trapezoidal-rule integration to approximate an area",
        "Perform arithmetic only through logical shift operations",
      ],
      architecture: [
        {
          title: "Part A – Array Summation via Addressing Modes",
          description:
            "Implements three independent routines that perform element-wise addition between two arrays and store the results, each using a different addressing mode: base + constant offset, indexed register indirect, and post-increment register indirect.",
        },
        {
          title: "Part B – Trapezoidal Rule Integration",
          description:
            "Computes the area under a curve from tabulated x and y data, calculating Δx and (y₁ + y₂) for each interval, handling Δx = 1, 2, or 4 via logical shifts, and accumulating the total area.",
        },
        {
          title: "Shift-Only Arithmetic",
          description:
            "Replaces multiplication and division with combinations of logical shift operations, demonstrating how to implement scaling and division under restricted-instruction constraints.",
        },
        {
          title: "Error Tracking & Rounding",
          description:
            "Tracks rounding errors introduced by truncated divisions and applies corrections at the end, rounding the final trapezoidal result appropriately.",
        },
      ],
      hardware: [
        "ARM Cortex-M4 (STM32 NUCLEO-L432KC)",
        "ARM THUMB-2 instruction set",
        "STM32CubeIDE 2024 toolchain",
      ],
      testing: [
        "Tested with multiple data sets to verify correct memory access for each addressing mode",
        "Verified accurate loop control and termination conditions",
        "Compared bit-shift-based arithmetic against true multiplication/division to confirm equivalent results",
        "Validated proper rounding and error correction in final outputs",
      ],
      discussion:
        "The project demonstrates practical use of ARM addressing modes to manipulate data directly in memory and simulate arithmetic under hardware constraints. Efficient use of registers and conditional branching was crucial to maintaining both accuracy and performance.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "ASCII Conversion & Case Transformation",
    description:
      "ARM assembly program on STM32 NUCLEO-L432KC that converts ASCII characters to hexadecimal and performs upper/lower case switching using THUMB2 instructions.",
    tags: ["ARM Assembly", "STM32", "ASCII", "THUMB-2", "Embedded Systems"],
    category: "ARM Assembly",
    icon: Binary,
    github: "https://github.com/sinisterchiller/ARM-Assembly-ASCII-Conversion-and-Case-Transformation",
    detail: {
      overview:
        "This project explores ARM assembly programming using the THUMB2 instruction set on an STM32 NUCLEO-L432KC board. It implements two programs: one to convert ASCII characters to their hexadecimal values, and another to switch between uppercase and lowercase letters.",
      objectives: [
        "Practice low-level ARM assembly with THUMB2 instructions",
        "Implement ASCII-to-hexadecimal conversion with error handling",
        "Perform case conversion between uppercase and lowercase",
        "Manage memory addressing and program flow control on embedded hardware",
      ],
      architecture: [
        {
          title: "Part A – ASCII to Hexadecimal",
          description:
            "Reads ASCII characters from memory, converts valid characters (0–9, A–F, a–f) to their hexadecimal values, and stores results at a new memory location. Invalid characters produce a -1 sentinel value to indicate errors.",
        },
        {
          title: "Part B – Case Conversion",
          description:
            "Reads ASCII letters (A–Z, a–z) from memory and converts uppercase to lowercase and vice versa by adding or subtracting 32. Non-letter characters are replaced with '*', and the program halts when Enter (0x0D) is encountered.",
        },
        {
          title: "Memory Layout & Addressing",
          description:
            "Uses fixed memory regions for inputs and outputs: input arrays at 0x20001000, Part A output at 0x20002000, and Part B output at 0x20003000. Demonstrates direct memory access and pointer-style addressing in ARM assembly.",
        },
        {
          title: "Control Flow & Validation",
          description:
            "Employs conditional branching and comparisons to validate characters, control loops, and manage termination conditions, reinforcing low-level flow control in embedded systems.",
        },
      ],
      hardware: [
        "STM32 NUCLEO-L432KC development board",
        "ARM THUMB2 instruction set",
        "STM32CubeIDE 2024",
      ],
      testing: [
        "Stored input data arrays at 0x20001000 and verified outputs at 0x20002000 (hex conversion) and 0x20003000 (case conversion)",
        "Tested with multiple datasets containing valid and invalid characters",
        "Confirmed correct hexadecimal conversion, case toggling, and error handling behavior",
      ],
      discussion:
        "This experiment illustrates direct manipulation of data in memory and conditional branching in ARM assembly. It reinforces understanding of ASCII encoding, address management, and flow-control mechanisms essential for embedded-systems programming.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "7-Segment LED Decoder & Counter",
    description:
      "Design and implementation of a 7-segment LED decoder and dual-digit counter in VHDL on a Zybo Z7 FPGA, displaying hexadecimal digits (0–F) and a two-digit count with multiplexing.",
    tags: ["VHDL", "FPGA", "7-Segment Display", "Multiplexing", "Digital Logic"],
    category: "FPGA / VHDL",
    icon: MemoryStick,
    github: "https://github.com/sinisterchiller/7-Segment-LED-Decoder-and-Counter",
    detail: {
      overview:
        "This project demonstrates the design and implementation of a 7-segment LED decoder and dual-digit counter using VHDL on an FPGA. It showcases multiple approaches to display hexadecimal values (0–F) and implements a two-digit counter with dynamic multiplexing.",
      objectives: [
        "Create a decoder that displays hexadecimal values on a 7-segment display",
        "Compare Boolean-equation and case-statement implementations",
        "Develop a two-digit counter that resets automatically at a defined limit",
        "Demonstrate efficient multiplexing between two 7-segment displays",
      ],
      architecture: [
        {
          title: "Decoder via Boolean Logic",
          description:
            "Derives Boolean expressions for each of the seven segments using Karnaugh maps and implements them with VHDL logical operators for a direct logic-based decoder.",
        },
        {
          title: "Decoder via Case Statements",
          description:
            "Implements the same hexadecimal decoding behavior using a case statement on the 4-bit input, providing an alternative, more readable style to map inputs 0–F to segment patterns.",
        },
        {
          title: "Two-Digit Counter with Multiplexing",
          description:
            "Implements a rising-edge counter that increments ones and tens digits, resets at a preset value, and uses a clock-derived toggle to multiplex between two 7-segment displays so both digits appear simultaneously.",
        },
      ],
      hardware: [
        "Zybo Z7 FPGA board",
        "7-segment LED display (dual-digit)",
        "Jumper wires and supporting lab hardware",
        "Xilinx Vivado Design Suite 2024",
        "Inputs: SW0–SW3 (4-bit binary)",
        "Outputs: out_7seg(0–6), CC (display select)",
      ],
      testing: [
        "Verified correct hexadecimal outputs for 0–F using both Boolean and case-statement decoders",
        "Confirmed counter behavior up to the defined limit followed by automatic reset",
        "Observed successful display multiplexing allowing both digits to appear stable to the human eye",
        "Matched simulation waveforms and on-board hardware behavior in Vivado",
      ],
      discussion:
        "This experiment highlights practical digital-logic coding approaches and hardware timing considerations. Boolean- and case-based methods yield identical functionality but differ in readability and synthesis style, while multiplexing demonstrates how rapid display switching can overcome limited I/O bandwidth on compact FPGA boards.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "MUX and DEMUX Logic Design",
    description:
      "Design and simulation of combinational logic circuits using multiplexers and demultiplexers in VHDL, with Boolean simplification, waveform simulation, and FPGA testing on the Zybo Z7.",
    tags: ["VHDL", "Multiplexers", "FPGA", "Boolean Logic", "Access Control"],
    category: "FPGA / VHDL",
    icon: MemoryStick,
    github: "https://github.com/sinisterchiller/Combinational-Logic-Design-MUX-and-DEMUX-Experiment",
    detail: {
      overview:
        "This project demonstrates the design of combinational logic circuits using Multiplexers (MUX) and Demultiplexers (DEMUX). It explores how data selection and distribution can be controlled through digital logic and implemented on an FPGA using VHDL, including a small access-control system on the Zybo Z7.",
      objectives: [
        "Construct functional MUX and DEMUX systems using digital logic",
        "Derive Boolean expressions and truth tables for all outputs",
        "Simulate and verify results in Vivado and WaveForms",
        "Implement a small access-control system on the Zybo Z7 FPGA",
      ],
      architecture: [
        {
          title: "Boolean Design and Truth Tables",
          description:
            "Develops Boolean equations from truth tables for MUX and DEMUX behavior, then encodes them in VHDL for synthesis and simulation.",
        },
        {
          title: "3-Input MUX and 1-Input DEMUX in VHDL",
          description:
            "Implements a 3-input multiplexer and a 1-input demultiplexer as VHDL modules, demonstrating signal routing and control logic for data selection and distribution.",
        },
        {
          title: "Simulation and FPGA Deployment",
          description:
            "Verifies designs with simulation test benches in Vivado and WaveForms, then synthesizes and deploys to the Zybo Z7 FPGA, with LED outputs reflecting valid and invalid input combinations.",
        },
        {
          title: "Access Control System Extension",
          description:
            "Extends the design into a simple access-control system that uses card and keypad codes: unlock when both valid card and keypad inputs are present, and trigger an alarm for invalid combinations.",
        },
      ],
      hardware: [
        "Zybo Z7 FPGA board",
        "Analog Discovery 2",
        "Breadboard and jumper wires",
        "Vivado Design Suite 2024",
        "WaveForms 2",
      ],
      testing: [
        "Simulations confirmed correct multiplexing and demultiplexing behavior",
        "FPGA tests matched expected output patterns for all input combinations",
        "Access Control System unlocked only when both valid card and keypad inputs were present",
        "Alarm triggered correctly for invalid combinations",
      ],
      discussion:
        "The experiment highlights how MUX and DEMUX simplify signal routing and logic control. VHDL implementation proved more flexible and faster to modify than discrete IC setups. Unstable states were observed when selector inputs were undefined, illustrating the need for proper initialization in digital systems.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)",
    },
  },
  {
    title: "AND-OR-NOT Logic Circuits",
    description:
      "Design and verification of AND, OR, and NOT logic circuits using K-Maps, WaveForms, and VHDL on the Zybo Z7 FPGA, from truth table to discrete ICs and FPGA implementation.",
    tags: ["VHDL", "FPGA", "K-Maps", "Zybo Z7", "Boolean Logic"],
    category: "FPGA / VHDL",
    icon: MemoryStick,
    github: "https://github.com/sinisterchiller/AND-OR-NOT-Logic-Circuits",
    detail: {
      overview:
        "This project demonstrates the design and verification of a basic digital logic circuit using AND, OR, and NOT gates. The circuit converts four binary inputs into two defined outputs based on simplified Boolean expressions derived from a truth table.",
      objectives: [
        "Simplify Boolean functions using Karnaugh Maps (K-Maps)",
        "Build and test the logic circuit using discrete ICs",
        "Simulate and verify results with WaveForms and Vivado",
        "Implement the design on an FPGA (Zybo Z7)",
      ],
      architecture: [
        {
          title: "Truth Table and K-Map Simplification",
          description:
            "Starts from a 4-input, 2-output truth table and uses K-Maps to derive simplified Boolean expressions for the two outputs before implementation.",
        },
        {
          title: "Breadboard Implementation with Discrete ICs",
          description:
            "Builds the circuit on a breadboard using logic ICs (e.g., SN74HC08N for AND, SN74HC04N for NOT) and pull-down resistors, then verifies operation with WaveForms pattern generation.",
        },
        {
          title: "VHDL Implementation and Simulation",
          description:
            "Implements the same logic in VHDL, simulates in Vivado, and deploys to the Zybo Z7 FPGA, with LED and switch I/O used to confirm correct behavior.",
        },
      ],
      hardware: [
        "Logic ICs: SN74HC08N (AND), SN74HC04N (NOT)",
        "10 kΩ pull-down resistors, breadboard, jumper wires",
        "Analog Discovery 2",
        "Zybo Z7 FPGA board",
        "WaveForms, Vivado Design Suite",
      ],
      testing: [
        "Circuit and VHDL simulation both produced correct outputs for all input combinations",
        "Identified and resolved timing limitations when reusing gates across phases",
        "Final 3-chip design eliminated timing issues and matched expected behavior",
      ],
      discussion:
        "This experiment illustrates how Boolean simplification improves efficiency in digital systems. It highlights the importance of timing synchronization when combining physical ICs and shows how FPGA simulation can validate discrete designs before hardware deployment.",
      license:
        "Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)",
    },
  },
]

const categories = ["All", "Embedded Systems", "Microcontrollers", "ARM Assembly", "FPGA / VHDL"]

/* ------------------------------------------------------------------ */
/*  Feature-icon mapper for the detail view                           */
/* ------------------------------------------------------------------ */
const featureIcons: Record<string, LucideIcon> = {
  "Temperature Monitoring": Thermometer,
  "Intrusion Detection": Eye,
  Authentication: Lock,
  "User Feedback": AlertTriangle,
  "ADC Configuration": Zap,
  "Channel Multiplexing": Radio,
  "LCD Output": Keyboard,
  "UART Communication": Cpu,
}

/* ------------------------------------------------------------------ */
/*  macOS-style modal component                                       */
/* ------------------------------------------------------------------ */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [animState, setAnimState] = useState<"entering" | "open" | "leaving">("entering")
  const contentRef = useRef<HTMLDivElement>(null)

  // Enter animation
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimState("open"))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // ESC key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = useCallback(() => {
    setAnimState("leaving")
    setTimeout(onClose, 280)
  }, [onClose])

  const detail = project.detail
  const Icon = project.icon

  const backdropClass =
    animState === "open"
      ? "opacity-100"
      : "opacity-0"

  const panelClass =
    animState === "open"
      ? "scale-100 opacity-100 translate-y-0"
      : animState === "entering"
        ? "scale-[0.5] opacity-0 translate-y-8"
        : "scale-95 opacity-0 translate-y-4"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${backdropClass}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Panel */}
      <div
        ref={contentRef}
        className={`relative z-10 flex max-h-[85vh] w-full max-w-6xl flex-col rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${panelClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar — macOS-inspired */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Traffic-light dots */}
            <button
              onClick={handleClose}
              className="group flex items-center gap-1.5"
              aria-label="Close modal"
            >
              <span className="inline-block h-3 w-3 rounded-full bg-red-500/80 transition-colors group-hover:bg-red-400" />
              <span className="inline-block h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="inline-block h-3 w-3 rounded-full bg-green-500/80" />
            </button>
            <span className="ml-2 font-mono text-xs tracking-wider text-muted-foreground">
              project://details
            </span>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs tracking-wider text-primary">
              <Icon className="h-3.5 w-3.5" />
              {project.category}
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
              {project.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground text-sm">
              {detail?.overview ?? project.description}
            </p>

            {/* View on GitHub button */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs font-medium tracking-wider text-primary transition-colors hover:bg-primary/20 hover:border-primary/50"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="mb-3 font-mono text-[11px] tracking-widest text-muted-foreground/70">
              TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- Rich detail sections ---------- */}
          {detail && (
            <div className="space-y-6">
              {/* Objectives */}
              {detail.objectives && (
                <DetailBlock title="OBJECTIVES" icon={Shield}>
                  <ul className="space-y-2">
                    {detail.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}

              {/* Architecture */}
              {detail.architecture && (
                <DetailBlock title="SYSTEM ARCHITECTURE" icon={Radio}>
                  <div className="space-y-3">
                    {detail.architecture.map((block) => (
                      <div
                        key={block.title}
                        className="rounded-lg border border-border/40 bg-secondary/20 p-4"
                      >
                        <h5 className="mb-1.5 font-mono text-xs font-semibold text-foreground">
                          {block.title}
                        </h5>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {block.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </DetailBlock>
              )}

              {/* Features */}
              {detail.features && (
                <DetailBlock title="FEATURES" icon={Cpu}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {detail.features.map((feat) => {
                      const FIcon = featureIcons[feat.title] ?? Zap
                      return (
                        <div
                          key={feat.title}
                          className="rounded-lg border border-border/40 bg-secondary/20 p-3"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <FIcon className="h-3.5 w-3.5 text-primary/70" />
                            <span className="font-mono text-xs font-semibold text-foreground">
                              {feat.title}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {feat.description}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </DetailBlock>
              )}

              {/* Hardware */}
              {detail.hardware && (
                <DetailBlock title="HARDWARE SUMMARY" icon={CircuitBoard}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {detail.hardware.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-md border border-border/30 bg-secondary/15 px-3 py-2 text-xs text-muted-foreground"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                </DetailBlock>
              )}

              {/* Testing */}
              {detail.testing && (
                <DetailBlock title="TESTING" icon={Keyboard}>
                  <ul className="space-y-2">
                    {detail.testing.map((test, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/60" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}

              {/* Discussion */}
              {detail.discussion && (
                <DetailBlock title="DISCUSSION" icon={ExternalLink}>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {detail.discussion}
                  </p>
                </DetailBlock>
              )}

              {/* License */}
              {detail.license && (
                <div className="rounded-lg border border-border/40 bg-secondary/20 px-4 py-3">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60">
                    LICENSE
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{detail.license}</p>
                </div>
              )}
            </div>
          )}

          {/* Fallback for projects without detail */}
          {!detail && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Project details available upon request
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Detail block helper                                                */
/* ------------------------------------------------------------------ */
function DetailBlock({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary/50" />
        <h4 className="font-mono text-[11px] tracking-widest text-muted-foreground/70">{title}</h4>
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            label="// PROJECTS"
            title="Engineering Portfolio"
            description="A selection of real-world projects spanning embedded systems, microcontroller programming, ARM assembly, and FPGA design."
          />

          {/* Filter bar */}
          <div
            className={`mb-10 flex flex-wrap justify-center gap-2 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                  filter === cat
                    ? "border border-primary/30 bg-primary/10 text-primary shadow-[0_0_10px_-3px] shadow-primary/20"
                    : "border border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/20 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => {
              const PIcon = project.icon
              return (
                <button
                  key={project.title}
                  onClick={() => setSelected(project)}
                  className={`group relative cursor-pointer rounded-xl border border-border/50 bg-card/30 p-6 text-left transition-all hover:border-primary/30 hover:bg-card/60 glow-border-hover ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDuration: "500ms",
                    transitionDelay: `${Math.min(index * 80, 500)}ms`,
                  }}
                >
                  {/* Category indicator */}
                  <div className="absolute right-4 top-4">
                    <PIcon className="h-5 w-5 text-muted-foreground/30 transition-colors group-hover:text-primary/50" />
                  </div>

                  <div className="mb-3 inline-flex items-center rounded-md border border-primary/15 bg-primary/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary">
                    {project.category}
                  </div>

                  <h3 className="mb-2 pr-6 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pb-8">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border/50 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className={`rounded border border-border/50 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground ${
                        project.tags.length > 3 ? "" : "hidden"
                      }`}
                    >
                      +{Math.max(project.tags.length - 3, 0)}
                    </span>
                  </div>

                  {/* View-details hint */}
                  <div
                    className={`absolute bottom-4 right-4 font-mono text-[9px] tracking-wider transition-colors ${
                      project.detail != null
                        ? "text-primary/40 group-hover:text-primary/70"
                        : "invisible"
                    }`}
                  >
                    VIEW DETAILS
                  </div>

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project modal with macOS-like animation */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
