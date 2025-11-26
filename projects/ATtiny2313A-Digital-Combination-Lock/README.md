# ATtiny2313A – Digital Combination Lock

## 🔍 Overview
This project demonstrates a **digital combination lock** built with an **ATtiny2313A** microcontroller.  
The system verifies a user-entered sequence through **pushbuttons**, provides visual feedback with an **RGB LED**, and emits audio tones using a **piezo buzzer**.  
It showcases finite-state machine logic, sequential input validation, and input debouncing in an embedded environment.

## 🎯 Objectives
- Design and implement a configurable digital lock using embedded C.  
- Validate a user-entered button sequence with programmable length (5 – 8 presses).  
- Integrate LED and buzzer feedback for visual and auditory responses.  
- Implement software debouncing for reliable button input detection.  

## ⚙️ Hardware & Software
- **Microcontroller:** ATtiny2313A  
- **Programmer:** Microchip SNAP (ISP mode)  
- **IDE:** MPLAB X  
- **Design Tools:** KiCad for schematic and layout  
- **Power Supply:** 5 V DC  
- **Components:**  
  - RGB LED (common anode)  
  - Piezo buzzer  
  - Five pushbuttons  
  - 330 Ω resistors  
  - Breadboard + jumper wires  

## 🧩 System Operation
1. The system starts in the **locked** state (LED = red).  
2. Each button press triggers a short beep and turns the LED white while pressed.  
3. When the full input sequence is entered:  
   - If **incorrect**, LED flashes red with buzzer alarm and resets to locked.  
   - If **correct**, LED turns green for 5 seconds before auto-locking or manual reset.  
4. All timing and transitions are handled via a **finite-state machine**.  
5. Software debouncing ensures single-press recognition even under rapid input.

## 💬 Discussion
The project highlights embedded **state-based control** and real-time feedback design.  
Key challenges included button debouncing, synchronizing LED and buzzer timing, and ensuring accurate state transitions.  
Potential enhancements include:  
- User-configurable password entry directly via hardware.  
- LCD display for user feedback.  
- Adjustable unlock-timer settings.  

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
