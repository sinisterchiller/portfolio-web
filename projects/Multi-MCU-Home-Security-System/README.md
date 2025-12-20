# Multi-MCU Home Security System

## 🔍 Overview
This project implements a **modular home security system** built around multiple AVR microcontrollers communicating over UART.  
The system monitors **temperature** and **unauthorized presence**, provides **keypad-based authentication**, and delivers real-time feedback through **LCDs, RGB LED indicators, and a buzzer**.

The design separates responsibilities across a **master controller** and two **slave controllers**, improving clarity, scalability, and fault isolation.

## 🎯 Objectives
- Detect unsafe temperature conditions and trigger alarms when thresholds are exceeded  
- Detect nearby motion using an ultrasonic sensor  
- Arm and disarm the system using keypad authentication with retry limits  
- Provide clear visual and audible system feedback  
- Demonstrate reliable multi-MCU UART communication  

## ⚙️ System Architecture

### Master Controller (ATmega328P)
- Handles keypad input forwarded from Slave A  
- Performs password authentication and retry tracking  
- Reads temperature via ADC and converts to °C  
- Triggers fire and intrusion alarms  
- Sends temperature data to Slave B for display  

### Slave A (ATmega328P)
- Scans a 4×3 keypad with debounce  
- Manages ultrasonic distance measurement for motion detection  
- Arms/disarms intrusion detection via a dedicated switch  
- Sends event codes to the master over UART  

### Slave B (ATtiny2313A)
- Receives temperature data from the master  
- Displays live temperature on a dedicated LCD  

## 🧩 Features
- **Temperature Monitoring:**  
  Continuous ADC sampling with configurable alarm threshold  
- **Intrusion Detection:**  
  Motion detection via distance change tolerance  
- **Authentication:**  
  Keypad-based access with lockout after repeated failures  
- **User Feedback:**  
  - LCD status messages  
  - RGB LED color states (armed, disarmed, alarm)  
  - Buzzer patterns for alerts  

## ⚙️ Hardware Summary
- ATmega328P ×2 (Master, Slave A)  
- ATtiny2313A ×1 (Slave B)  
- 4×3 matrix keypad  
- Ultrasonic distance sensor  
- LM35 temperature sensor  
- 2 × 16×2 LCDs (4-bit mode)  
- RGB LED with current-limiting resistors  
- Piezo buzzer  
- External crystal oscillators (14.7456 MHz)  

## 🧪 Testing
- Verified correct UART communication between all MCUs  
- Confirmed accurate temperature conversion and threshold detection  
- Validated intrusion detection sensitivity and tolerance handling  
- Tested lockout behavior after consecutive authentication failures  
- Confirmed stable LCD updates and alarm signaling  

## 💬 Discussion
This project demonstrates practical **distributed embedded design**, combining sensing, communication, and user interaction.  
Separating tasks across multiple controllers simplified timing constraints and improved system robustness.  
Future improvements could include battery backup, network connectivity, or additional sensors such as smoke detection.

## 📄 License
This project is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
See the [LICENSE](./LICENSE) file for full terms.
