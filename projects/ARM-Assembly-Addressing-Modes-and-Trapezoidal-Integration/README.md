# ARM Assembly – Addressing Modes and Trapezoidal Integration

## 🔍 Overview
This project explores **ARM assembly programming** focusing on data handling using different **addressing modes** and implementing **numerical integration** through the trapezoidal rule.  
All arithmetic operations are performed without direct multiplication or division, using only **bit shifting** instructions.

## 🎯 Objectives
- Demonstrate three ARM addressing modes:  
  - Register Indirect with Offset  
  - Indexed Register Indirect  
  - Post-Increment Register Indirect  
- Apply addressing-mode logic to add array elements stored in memory  
- Implement trapezoidal-rule integration to approximate an area  
- Perform arithmetic only through **logical shift** operations  

## ⚙️ Tools & Hardware
- **Processor:** ARM Cortex-M4 (NUCLEO L432KC)  
- **Assembler/IDE:** STM32CubeIDE 2024  
- **Instruction Set:** ARM THUMB2  

## 🧩 Implementation

### Part A – Array Summation via Addressing Modes
Three independent implementations perform element-wise addition between two arrays and store results in memory:
1. **Register Indirect with Offset:** accesses data via a base address + constant offset.  
2. **Indexed Register Indirect:** uses a register offset for dynamic addressing.  
3. **Post-Increment Register Indirect:** automatically increments the base address after each access.

### Part B – Trapezoidal Rule Integration
Computes the area under a curve from tabulated x and y data:
- Calculates Δx and (y₁ + y₂) for each interval  
- Handles Δx = 1, 2, or 4 cases via logical shifts  
- Tracks rounding errors from truncated divisions and corrects them at the end  
- Rounds the final result up when necessary  

## 🧪 Testing and Validation
Programs were tested with multiple data sets to verify:
- Correct memory access for each addressing mode  
- Accurate looping and termination conditions  
- Bit-shift math yielding the same results as true multiplication/division  
- Proper rounding and error correction in final outputs  

## 💬 Discussion
The project demonstrates practical use of ARM addressing modes to manipulate data directly in memory and simulate arithmetic under hardware constraints.  
Efficient use of registers and conditional branching was key to maintaining accuracy and performance.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
