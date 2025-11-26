/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik
(1806274) */
/* This subroutine prints the number of values, as well as all of the sorted
numbers in the list */

/* Preliminary setup */
.global Display
.global printf
.global cr
.extern value
.extern getstring
.syntax unified
.text

/* Start of the subroutine */
Display:

push {r4-r12, lr}           /* Preserving the registers */

ldr  r4, [sp, #40]          /* Loading the number of values into r4 */
ldr  r5, [sp, #44]          /* Loading the base address into r5 */

complete:
 /* Print that the numbers are sorted */
 ldr  r0, =completemsg
 bl   printf
 bl   cr

 /* Print out the number of entries */
 ldr  r0, =entries
 bl   printf
 mov  r0, r4
 bl   value
 bl   cr

 /* Print out the first part of the sorted prompt */
 ldr  r0, =order
 bl   printf
 bl   cr

loop:
 /* Load the current value into r0, then increment index */
 ldr  r0, [r5], #4
 bl   value                 /* Print the value */
 bl   cr

 /* Decrease the counter and branch to the loop if not finished */
 subs r4, r4, #1
 bne  loop

pop {r4-r12, pc}            /* Restore registers */

/* End of code */

/* Different prompt strings in data section */
.data
completemsg:
 .string "The numbers are sorted with bubblesort algorithm"
entries:
 .string "The number of entries are "
order:
 .string "Sorted from smallest to biggest, the numbers are"
