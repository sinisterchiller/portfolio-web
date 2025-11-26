# Combinational Logic Design – MUX and DEMUX Experiment

## 🔍 Overview
This project demonstrates the design of combinational logic circuits using **Multiplexers (MUX)** and **Demultiplexers (DEMUX)**.  
It explores how data selection and distribution can be controlled through digital logic and implemented on an **FPGA** using **VHDL**.

## 🎯 Objective
- Construct functional MUX and DEMUX systems using digital logic  
- Derive Boolean expressions and truth tables for all outputs  
- Simulate and verify results in **Vivado** and **WaveForms**  
- Implement a small access-control system on the **Zybo Z7 FPGA**

## ⚙️ Components & Tools
- **Hardware:** Zybo Z7 FPGA board, Analog Discovery 2, breadboard, jumper wires  
- **Logic Devices:** MUX and DEMUX modules coded in VHDL  
- **Software:** Vivado Design Suite 2024, WaveForms 2  

## 🧩 Method
1. Develop Boolean equations from truth tables  
2. Implement a 3-input MUX and 1-input DEMUX in VHDL  
3. Verify through simulation test benches  
4. Synthesize and deploy to the Zybo Z7 FPGA  
5. Observe LED outputs corresponding to valid/invalid input combinations  
6. Extend the design into a simple **Access Control System** using card and keypad codes

## 📈 Results
- Simulations confirmed correct multiplexing and demultiplexing behavior  
- FPGA tests matched expected output patterns  
- Access Control System unlocked when both valid card and keypad inputs were present  
- Alarm triggered correctly for invalid combinations  

## 💬 Discussion
The experiment highlights how MUX and DEMUX simplify signal routing and logic control.  
VHDL implementation proved more flexible and faster to modify than discrete IC setups.  
Unstable states were noted when selector inputs were undefined, showing the need for proper initialization in digital systems.

## 🧾 References
- Texas Instruments Datasheets  
- Xilinx Vivado Documentation  
- WaveForms User Guide  

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for full terms.
