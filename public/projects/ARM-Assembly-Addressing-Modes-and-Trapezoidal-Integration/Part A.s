/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik (1806274) */  
/* This program adds the elements of 2 arrays and stores the value in another array location */  
/* 3 different methods were used to load and increment the array values and addresses */  

/* Preliminary setup */  
.global TestAsmCall  
.global printf  
.global cr  
.syntax unified  

.text  
TestAsmCall:  
    PUSH {lr}  
/*--------------------------------------*/  

    ldr r0, =0x20001000        /* Loading the address we get the data from */  
    ldr r1, [r0]               /* Loading the size of the arrays */  
    ldr r2, [r0, #4]           /* Loading the address of the first array */  
    ldr r3, [r0, #8]           /* Loading the address of the second array */  
    ldr r4, [r0, #12]          /* Loading the address where to store Part 1 */  
    ldr r5, [r0, #16]          /* Loading the address where to store Part 2 */  
    ldr r6, [r0, #20]          /* Loading the address where to store Part 3 */  

/* Part 1 – Register Indirect with Offset */  
    ldr r8, [r2]               /* Load first value of first array */  
    ldr r9, [r3]               /* Load first value of second array */  
    add r10, r8, r9            /* Add and store in R10 */  
    str r10, [r4]              /* Store sum into Part 1 sum address */  

    ldr r8, [r2, #4]           /* Load second value of first array */  
    ldr r9, [r3, #4]           /* Load second value of second array */  
    add r10, r8, r9            /* Add and store in R10 */  
    str r10, [r4, #4]          /* Store sum into incremented Part 1 sum address */  

    ldr r8, [r2, #8]           /* Load third value of first array */  
    ldr r9, [r3, #8]           /* Load third value of second array */  
    add r10, r8, r9            /* Add and store in R10 */  
    str r10, [r4, #8]          /* Store sum into incremented Part 1 sum address */  

/* Part 2 – Indexed Register Indirect */  
    mov r7, #0                 /* Counter = 0 */  
    mov r4, #0                 /* Register offset = 0 */  

loop1:                         /* Main loop start */  
    cmp r7, r1                 /* Check if counter > array size */  
    bge done1                  /* Exit to Part 3 if done */  

    ldr r8, [r2, r4]           /* Load first array element with register offset */  
    ldr r9, [r3, r4]           /* Load second array element with register offset */  
    add r10, r8, r9            /* Add and store in R10 */  
    str r10, [r5, r4]          /* Store sum into output address + offset */  

    add r4, #4                 /* Increment offset by 4 bytes */  
    add r7, #1                 /* Increment counter */  
    b loop1                    /* Repeat loop */  

done1:  

/* Part 3 – Post-Increment Register Indirect */  
    mov r7, #0                 /* Reset counter */  

loop2:  
    cmp r7, r1                 /* Check if counter > array size */  
    bge done2                  /* Exit if done */  

    ldr r8, [r2], #4           /* Load first array element, then increment address */  
    ldr r9, [r3], #4           /* Load second array element, then increment address */  
    add r10, r8, r9            /* Add and store in R10 */  
    str r10, [r6], #4          /* Store sum, then increment output address */  

    add r7, #1                 /* Increment counter */  
    b loop2                    /* Repeat loop */  

done2:  
    POP {PC}                   /* Return */  

.data  
