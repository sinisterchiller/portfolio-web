# ATmega328P – Joystick Interface with ADC and UART

## 🔍 Overview
This project implements a **two-axis joystick interface** using the **ATmega328P** microcontroller.  
The system samples analog joystick voltages using the on-chip **ADC**, displays the values on a **16×2 LCD**, and streams real-time position data to a PC via **UART**.

The joystick outputs X-axis, Y-axis, and switch-press data, enabling it to function as a general-purpose input device for embedded or PC-side applications.

## 🎯 Objectives
- Sample analog joystick signals using the ATmega328P ADC  
- Switch ADC channels dynamically using the internal multiplexer  
- Display joystick coordinates locally on an LCD  
- Transmit formatted joystick data to a PC using UART  
- Detect and report joystick switch presses  
- Improve timing and communication accuracy using an external crystal  

## ⚙️ Hardware & Software
- **Microcontroller:** ATmega328P  
- **Input Device:** 2-axis joystick with pushbutton  
- **Display:** 16×2 LCD (HD44780 compatible)  
- **Communication:** UART via USB-TTL interface  
- **Clock Source:** External crystal oscillator  
- **Power:** 5 V DC  
- **Tools:** MPLAB X IDE, KiCad, Microchip SNAP (ISP mode), Tera Term  

## 🧩 System Design
1. **ADC Configuration**
   - Uses AVcc as reference voltage  
   - 10-bit resolution (0–1023)  
   - Prescaler configured for accurate conversion timing  

2. **Channel Multiplexing**
   - Alternates between X-axis and Y-axis ADC inputs  
   - Reads joystick switch as a digital input  

3. **LCD Output**
   - Displays X and Y values in real time  
   - Updates continuously as joystick position changes  

4. **UART Communication**
   - Configured for 9600 baud, 8-N-1 format  
   - Sends joystick coordinates and switch state to PC  
   - Data displayed in real time using a serial terminal  

## 🧪 Testing
- Verified correct ADC readings for both joystick axes  
- Confirmed stable LCD updates during continuous sampling  
- Validated UART data transmission using a USB-TTL bridge  
- Tested joystick switch detection and reporting  
- Observed minor stick-drift near center position  

## 💬 Discussion
This project demonstrates practical integration of **analog sensing**, **digital communication**, and **real-time data processing** in embedded systems.  
Key challenges included ADC channel switching, UART formatting limitations, and joystick centering inaccuracies.  

Potential improvements include:
- Automatic joystick center calibration  
- Scaled or filtered output for smoother readings  
- Configurable baud-rate calculation for portability  
- PC-side software for visualization or control  

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
