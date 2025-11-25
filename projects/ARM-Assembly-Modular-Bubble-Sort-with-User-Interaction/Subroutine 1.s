/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik
(1806274) */
/* This subroutine prompts the user for a list of numbers to be sorted */
/* If a user entered something invalid, the program catches it and displays
the corresponding error message */

/* Preliminary setup */
.global Welcomeprompt
.global printf
.global cr
.extern value
.extern getstring
.syntax unified
.text

/* Start of the subroutine */
Welcomeprompt:

push {r0-r12, lr}           /* Pushing the registers to preserve them */

mov  r7,  #0                /* Initializing counter */
mov  r9,  #0                /* Initializing offset */
mov  r10, r0                /* Storing base address */

/* Printing the welcome text to the user */
ldr  r0, =welcometext
bl   printf
bl   cr

ask:
 ldr  r0, =range            /* Asking user for how many entries */
 bl   printf
 bl   cr
 bl   getstring

 mov  r4, r0                /* Storing how many entries in r4 */
 bl   value                 /* Printing value to the screen */
 bl   cr

 cmp  r4, #3                /* Checking if not enough numbers */
 blt  invalidlow

 cmp  r4, #10               /* Checking if too many numbers */
 bgt  invalidhigh

 str  r4, [sp, #56]         /* Storing amount of numbers on stack (at flag
                               location) */
 b    ask2                  /* Branching to the next prompt */

/* Printing error message and prompting user again */
invalidlow:
 ldr  r0, =toolow
 bl   printf
 bl   cr
 b    ask

/* Printing error message and prompting user again */
invalidhigh:
 ldr  r0, =toohigh
 bl   printf
 bl   cr
 b    ask

/* Loop for asking the user for min and max values */
ask2:
 ldr  r0, =asklowest        /* Asking for minimum value */
 bl   printf
 bl   cr
 bl   getstring

 mov  r5, r0                /* Storing minimum value */
 bl   value
 bl   cr

 ldr  r0, =askhighest       /* Asking for maxiumum value */
 bl   printf
 bl   cr
 bl   getstring

 mov  r6, r0                /* Storing maximum value */
 bl   value
 bl   cr

 /* Checking if max and min are valid, prompting error message if not */
 cmp  r6, r5
 blt  lowerthanlowest
 bgt  askarray

/* Error message if min is not less than max */
lowerthanlowest:
 ldr  r0, =error_lowerthanlowest
 bl   printf
 bl   cr
 b    ask2

/* Loop that asks user for input */
askarray:
 add  r7, r7, #1            /* Increase the counter for entries received */
 cmp  r7, r4                /* Checking if we are at the last entry */
 beq  lastnumber

 ldr  r0, =array            /* Asking user for entry */
 bl   printf
 bl   cr
 bl   getstring

 mov  r8, r0                /* Storing entry into r8 */
 bl   value
 bl   cr

 /* Checking if entry is out of range and prompting corresponding error
    message */
 cmp  r8, r5
 blt  error_range
 cmp  r8, r6
 bgt  error_range

store:
 str  r8, [r10, r9]         /* Store the value in memory */
 add  r9, r9, #4            /* Increase the offset */

 cmp  r7, r4                /* Checking if that was the last element */
 beq  done
 b    askarray

/* Prompt the user for the last number (same logic as before, just different
   text prompt) */
lastnumber:
 ldr  r0, =lastnumbermsg    /* Ask user for last number */
 bl   printf
 bl   cr
 bl   getstring

 mov  r8, r0                /* Store number into r8 */
 bl   value
 bl   cr

 /* Check if the number is valid and prompt error message if so */
 cmp  r8, r5
 blt  error_range
 cmp  r8, r6
 bgt  error_range

 /* Store the value */
 b    store

/* Prints the error message when the user input is out of range */
error_range:
 sub  r7, r7, #1            /* Decrease the counter by 1 (since we are going to ask
                               again) */
 ldr  r0, =errormsg_range   /* Print error message */
 bl   printf
 bl   cr
 b    askarray              /* Branch to main loop */

done:
pop {r0-r12, pc}            /* Restore registers */

/* End of code */

/* Different prompt strings in data section */

.data
welcometext:
 .string "Welcome to ECE 212 Bubble Sorting Program"
range:
 .string "Please enter the number (3min-10max) of entries: "
toolow:
 .string "Invalid the number entered is too low"
toohigh:
 .string "Invalid the number entered is too high"
asklowest:
 .string "Enter the minimum number"
askhighest:
 .string "Enter the maximum number"
error_lowerthanlowest:
 .string "Minimum number cannot be greater than maximum"
array:
 .string "Please enter a number"
errormsg_range:
 .string "Invalid!!! Number entered is not within the range"
lastnumbermsg:
 .string "Please enter the last number"
