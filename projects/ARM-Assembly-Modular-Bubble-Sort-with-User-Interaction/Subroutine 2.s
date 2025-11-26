/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik
(1806274) */
/* This subroutine uses bubble sort to sort the elements of a list in
ascending order */

/* Preliminary setup */
.global Sort
.global printf
.global cr
.extern value
.extern getstring
.syntax unified
.text

/* Start of the subroutine */
Sort:

push {r4-r12, lr}           /* Preserving the registers */

ldr  r10, [sp, #40]o  0     /* Loading the number of values from the stack
                               (using calculated offset) */
subs r10, r10, #1           /* Decreasing by 1 to act as our upper threshold */

/* Start of the first loop */
loop1:
    /* Reset the inner loop counter and base address */
    mov  r5, #0
    mov  r6, r0

/* Start of the second loop */
loop2:
    cmp  r5, r10            /* Check if inner loop counter has reached threshold */
    bge  next               /* Branch to in between steps before going back to
                               loop 1 */

    ldr  r7, [r6]           /* Load current number into r7 */
    ldr  r8, [r6, #4]       /* Load next number into r8 */

    cmp  r7, r8             /* Compare current number to next number */
    ble  noswap             /* Don't swap if already in order */

    str  r8, [r6]           /* Swap if not in order */
    str  r7, [r6, #4]

noswap:
    add  r6, r6, #4         /* Increase element index by "1" (4 bytes = 1
                               element) */
    add  r5, r5, #1         /* Increase loop counter */
    b    loop2              /* Loop again */

next:
    subs r10, r10, #1       /* Decrease upper threshold (outer loop counter) */
    cmp  r10, #0            /* Check if finished the list sort */
    bge  loop1              /* Branch back to loop 1 if not finished */

/* Naturally branch to exit if the loop is finished */
exit:
    /* Print the sort finished message */
    ldr  r0, =done
    bl   printf
    bl   cr
    pop  {r4-r12, pc}       /* Restore saved registers and return to caller
                               (main) */

/* End of code */

/* Prompt string in data section */
.data
done:
     .string "Done sorting"
