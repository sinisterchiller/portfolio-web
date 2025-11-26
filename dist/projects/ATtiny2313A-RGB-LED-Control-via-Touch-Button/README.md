# ATtiny2313A – RGB LED Control via Touch Button

## 🔍 Overview
This project demonstrates how to control an **RGB LED** using a **touch button** and an **ATtiny2313A** microcontroller.  
Each press cycles the LED through four predefined color states, looping back to white after the final state.  
The system functions as a simple finite-state machine with debounced input logic.

## 🎯 Objectives
- Implement multi-state RGB LED control using digital I/O pins.  
- Detect and debounce touch-button input to ensure one-press-one-change behavior.  
- Use structured C code for embedded state management.  
- Prototype the circuit in **KiCad** and program it via **MPLAB X IDE** with a **Microchip SNAP** programmer.

## ⚙️ Hardware & Software
- **Microcontroller:** ATtiny2313A  
- **Programmer:** Microchip SNAP (ISP mode)  
- **Software Tools:** MPLAB X IDE, KiCad  
- **Power Supply:** 5 V @ 0.3 A DC  
- **Components:**  
  - RGB LED (common cathode/anode, determined experimentally)  
  - 330 Ω resistors × 3  
  - Touch button  
  - Breadboard + jumper wires  

## 🧩 System Design
1. **State Machine Logic** – Four states representing RGB combinations.  
2. **Touch Input Debouncing** – Software delay variable prevents rapid cycling.  
3. **Hardware Setup** – LED and button connected to ATtiny2313A GPIO pins.  
4. **Software Flow:**  
   - Initialize ports  
   - Wait for button press  
   - Advance state and update LED color  
   - Reset after four states  

## 💡 Prototype Testing
- Verified LED color transitions (white → red → green → blue → white).  
- Implemented variable-based software debounce to stabilize transitions.  
- Confirmed stable power and proper resistor sizing to protect LED.  

## 💬 Discussion
The system illustrates fundamental **embedded control principles**: GPIO configuration, software debouncing, and finite-state logic.  
Possible improvements include hardware debounce circuitry, brightness control via PWM, or additional operating modes such as strobe and pattern cycling.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for full terms.
