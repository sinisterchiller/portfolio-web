# 7-Segment LED Decoder and Counter 

## 🔍 Overview
This project demonstrates the design and implementation of a **7-segment LED decoder** and **dual-digit counter** using **VHDL** on an FPGA.  
It showcases multiple approaches to display hexadecimal values (0–F) and implements a two-digit counter with dynamic multiplexing.

## 🎯 Objective
- Create a decoder that displays hexadecimal values on a 7-segment display  
- Compare Boolean-equation and case-statement implementations  
- Develop a two-digit counter that resets automatically at a defined limit  
- Demonstrate efficient multiplexing between two 7-segment displays  

## ⚙️ Components & Tools
- **Hardware:** Zybo Z7 FPGA board, 7-segment LED display, jumper wires  
- **Software:** Xilinx Vivado Design Suite 2024  
- **Inputs:** SW0 – SW3 (4-bit binary)  
- **Outputs:** out_7seg(0–6), CC (display select)  

## 🧩 Method
1. **Decoder via Boolean Logic:**  
   Derive Boolean expressions for each segment using K-Maps and program with logical operators.  
2. **Decoder via Case Statements:**  
   Replace logic equations with case-based control for each 4-bit input.  
3. **Two-Digit Counter:**  
   Implement a rising-edge counter that increments ones and tens digits, resets at a preset value, and multiplexes displays using a clock toggle signal.

## 📈 Results
- Both decoding methods produced correct hexadecimal outputs.  
- Counter displayed values up to the set limit before resetting.  
- Display multiplexing enabled both digits to appear simultaneously despite single-channel output limitations.  
- Simulation and hardware outputs matched expectations.

## 💬 Discussion
This experiment highlights practical **digital-logic coding approaches** and **hardware timing considerations**.  
Boolean and case-based methods yield identical functionality but differ in readability and implementation speed.  
Multiplexing demonstrates how rapid display switching can overcome limited I/O bandwidth on compact FPGA boards.

## 🧾 References
- Xilinx Vivado Design Suite Documentation  
- 7-Segment Display Datasheets and Logic Decoder Guides  

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
