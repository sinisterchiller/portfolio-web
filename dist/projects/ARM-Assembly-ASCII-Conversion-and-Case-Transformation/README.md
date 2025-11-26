# ARM Assembly – ASCII Conversion and Case Transformation

## 🔍 Overview
This project explores **ARM assembly programming** using the **THUMB2 instruction set** on an STM32 NUCLEO-L432KC board.  
It implements two programs: one to convert ASCII characters to their **hexadecimal values**, and another to **switch between uppercase and lowercase** letters.

## 🎯 Objectives
- Practice low-level ARM assembly with THUMB2 instructions  
- Implement ASCII-to-hexadecimal conversion with error handling  
- Perform case conversion between uppercase and lowercase  
- Manage memory addressing and program flow control on embedded hardware  

## ⚙️ Tools & Hardware
- **Board:** STM32 NUCLEO-L432KC  
- **IDE:** STM32CubeIDE 2024  
- **Instruction Set:** ARM THUMB2  
- **Programming Language:** ARM Assembly  

## 🧩 Implementation
### Part A – ASCII to Hexadecimal
- Reads ASCII characters from memory  
- Converts valid characters (`0–9`, `A–F`, `a–f`) to hexadecimal  
- Stores results at a new memory address  
- Invalid characters return `–1`  

### Part B – Case Conversion
- Reads ASCII letters (`A–Z`, `a–z`)  
- Converts uppercase ↔ lowercase by adding or subtracting 32  
- Invalid characters are replaced with `*`  
- Program halts when **Enter (0x0D)** is detected  

## 🧪 Testing and Validation
- Input data arrays are stored in memory starting at `0x20001000`  
- Outputs for Part A and B are stored at `0x20002000` and `0x20003000` respectively  
- Verified using multiple test sets containing valid and invalid inputs  
- Results confirmed correct conversions and error handling  

## 💬 Discussion
This experiment illustrates direct manipulation of data in memory and conditional branching in assembly.  
It reinforces understanding of ASCII encoding, address management, and flow-control mechanisms essential for embedded-systems programming.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for details.
