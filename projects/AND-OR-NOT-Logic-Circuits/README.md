# AND-OR-NOT Logic Circuit Experiment

## 🔍 Overview
This project demonstrates the design and verification of a basic digital logic circuit using **AND**, **OR**, and **NOT** gates.  
The circuit converts four binary inputs into two defined outputs based on simplified Boolean expressions derived from a truth table.

## 🎯 Objective
- Simplify Boolean functions using **Karnaugh Maps (K-Maps)**
- Build and test the logic circuit using discrete ICs
- Simulate and verify results with **WaveForms** and **Vivado**
- Implement the design on an **FPGA (Zybo Z7)**

## ⚙️ Components & Tools
- **Logic ICs:** SN74HC08N (AND), SN74HC04N (NOT)
- **Additional Parts:** 10 kΩ pull-down resistors, breadboard, jumper wires
- **Equipment & Software:** Analog Discovery 2, WaveForms, Vivado Design Suite

## 🧩 Method
1. Start from a 4-input, 2-output truth table  
2. Simplify logic equations using **K-Maps**  
3. Create the schematic and build on a breadboard  
4. Verify operation using WaveForms pattern generation  
5. Implement and simulate the same logic in VHDL on the Zybo Z7  
6. Test LED and switch outputs to confirm correctness

## 📈 Results
- Circuit and VHDL simulation both produced correct outputs  
- Observed timing limitations when reusing gates across phases  
- Final 3-chip design eliminated timing issues and matched expectations

## 💬 Discussion
This experiment illustrates how Boolean simplification improves efficiency in digital systems.  
It highlights the importance of timing synchronization when combining physical ICs and shows how FPGA simulation can validate discrete designs before hardware deployment.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.  
You may share and adapt this work for non-commercial use with proper attribution.  
See the [LICENSE](./LICENSE) file for details.
