# ATmega328P – Ultrasonic Digital Tape Measure

## 🔍 Overview
This project demonstrates an **electronic tape measure** built using the **ATmega328P** microcontroller, an **HC-SR04 ultrasonic sensor**, and a **16×2 LCD** display.  
It continuously measures distance, updates readings every second, and displays the current, minimum, and maximum distances on the LCD.  
An “Out of Range” warning appears when the measured value exceeds the valid range of 2 cm to 200 cm.

## 🎯 Objectives
- Implement non-contact distance measurement using an ultrasonic sensor.  
- Record and display current, minimum, and maximum distances.  
- Detect and display “Out of Range” conditions and “NaN” at startup.  
- Utilize **Timer1** for precise echo pulse timing.  
- Use an external **14.7456 MHz crystal oscillator** for improved accuracy.  
- Provide a reset function to clear measurement history.

## ⚙️ Hardware & Software
- **Microcontroller:** ATmega328P  
- **Sensor:** HC-SR04 Ultrasonic Distance Sensor  
- **Display:** 16×2 LCD (HD44780 Controller)  
- **Crystal:** 14.7456 MHz  
- **Power:** 5 V DC  
- **Software Tools:** MPLAB X IDE, KiCad, Microchip SNAP (ISP mode)  

**Connections Summary:**
- Trigger → Digital Output (PB1)  
- Echo → Digital Input (PB0)  
- LCD Data Pins → PC0–PC3 (4-bit mode)  
- LCD Control Pins → PD2–PD3  
- Reset Button → PD4  

## 🧩 System Design
1. **Pulse Triggering:**  
   Sends a 10 µs pulse through the ultrasonic sensor’s trigger pin.  
2. **Echo Timing:**  
   Measures the time between rising and falling edges on the echo pin using **Timer1**.  
3. **Distance Calculation:**  
   Uses the equation `distance = (speed_of_sound × time) / 2` for accurate measurement.  
4. **LCD Display:**  
   Shows real-time distance on the first line and `Min:` / `Max:` values on the second line.  
5. **Range Detection:**  
   Displays *“Out of Range”* when distance < 2 cm or > 200 cm.  
6. **Reset Logic:**  
   Resets min/max values and clears display memory when the reset button is pressed.

## 🧪 Testing
- Verified operation across the 2 cm–200 cm range.  
- Confirmed accurate distance readings and stable LCD updates.  
- Tested out-of-range detection and reset button reliability.  
- Validated minimum and maximum tracking over continuous operation.  
- Confirmed timing stability with external crystal reference.  

## 💬 Discussion
This project showcases practical use of **timers**, **interrupts**, and **sensor integration** in embedded systems.  
Key challenges included echo pulse timing precision, fuse bit configuration for oscillator control, and minimizing environmental noise affecting sensor accuracy.  
Future improvements include:
- Implementing temperature-compensated speed of sound calibration.  
- Adding UART serial output for data logging.  
- Integrating auto-calibration or averaging for more stable readings.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
