# ARM Assembly – Modular Bubble Sort with User Interaction

## 🔍 Overview
This project demonstrates a **modular ARM assembly** program that performs a **bubble sort** on a list of user-entered numbers.  
The system is divided into three independent subroutines — `WelcomePrompt`, `Sort`, and `Display` — each responsible for a distinct task in the sorting workflow.  
All communication between routines occurs through **stack memory** and **register passing**.

## 🎯 Objectives
- Implement modular subroutines in ARMv7-M assembly.  
- Manage stack-based data passing and register preservation.  
- Validate user input ranges and limits dynamically.  
- Execute an in-place bubble sort on user-provided data.  
- Display sorted results via UART output.

## ⚙️ Hardware & Tools
- **Processor:** ARM Cortex-M4 (STM32 NUCLEO-L432KC)  
- **Assembler/IDE:** STM32CubeIDE 2024  
- **Instruction Set:** THUMB-2  
- **Key Routines Provided:**  
  - `printf` – prints a string in R0  
  - `cr` – newline/carriage return  
  - `value` – prints decimal value in R0  
  - `getstring` – reads numeric input from keyboard

## 🧩 Subroutines

### 🟢 WelcomePrompt
- Prompts the user for:
  - Number of entries (3 to 10)  
  - Minimum and maximum limits  
  - Individual numbers within that range  
- Validates input and re-prompts on invalid entries.  
- Stores number count on the stack and array values in dynamic memory pointed to by `R0`.

### 🔵 Sort
- Implements the **bubble sort algorithm** using nested loops.  
- Accesses array base address through `R0` and retrieves the number of elements from the stack.  
- Performs in-place swapping using register indirect addressing.  
- Prints *“Done sorting”* once complete.

### 🟣 Display
- Retrieves array base address and entry count from the stack.  
- Prints the total number of entries and the sorted list sequentially.  
- Displays a final completion message before restoring registers.

## 🧪 Testing
- Verified in **Keil uVision** and on the **STM32 NUCLEO-L432KC** board.  
- Tested with valid and invalid inputs to confirm proper branching and error detection.  
- Debugging confirmed correct stack handling, offset addressing, and register restoration using `PUSH`/`POP`.

## 💬 Discussion
The program illustrates structured assembly design, efficient use of stack memory, and modular programming concepts.  
Proper management of link registers and offsets ensures reliable subroutine transitions and data integrity across modules.

## 📄 License
This work is licensed under the **Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International** license (CC BY-NC-SA 4.0).  
You may share and adapt this project for non-commercial use with proper credit.  
See the [LICENSE](./LICENSE) file for full terms.
