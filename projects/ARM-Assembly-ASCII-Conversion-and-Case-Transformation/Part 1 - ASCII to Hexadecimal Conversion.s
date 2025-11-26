/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik (1806274) */  
/* This code converts ASCII characters into their hexadecimal equivalent */  

/* Preliminary setup*/  
.global TestAsmCall  
.global printf  
.global cr  
.syntax unified  

.text  
TestAsmCall:  
PUSH {lr}  
/*--------------------------------------*/  

ldr r0, = 0x20001000     /* Loading the address we get values from */  
ldr r2, = 0x20002000     /* Loading the address we store values to*/  

/* Creating the main loop*/  
loop:  

    /* Checking if the value at the address is “Enter”*/  
    ldr r1, [r0]  
    cmp r1, #13  
    beq done             /* Exiting program if “Enter” is detected*/  

    /* Checking if the character is out of bounds, prompting invalid store if so*/  
    cmp r1, #48  
    blo invalid  

    /* Checking if the character is a number between 0 and 9, prompting number conversion if so*/  
    cmp r1, #58  
    blo number_conversion  

    /* Checking if the character is out of bounds, prompting invalid store if so*/  
    cmp r1, #65  
    blo invalid  

    /* Checking if the character is uppercase, prompting uppercase conversion if so*/  
    cmp r1, #71  
    blo upper_letter_conversion  

    /* Checking if the character is out of bounds, prompting invalid store if so*/  
    cmp r1, #97  
    blo invalid  

    /* Checking if the character is lowercase, prompting lowercase conversion if so*/  
    cmp r1, #103  
    blo lower_letter_conversion  

/* Branch for storing invalid characters using the error code (-1) */  
invalid:  
    mov r1, #-1  
    str r1, [r2]         /* Setting the character to the error code*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r2, #4  
    b loop  

/* Branch for converting ASCII number to hexadecimal number*/  
number_conversion:  
    sub r1, #48  
    str r1, [r2]         /* Storing the value after conversion*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r2, #4  
    b loop  

/* Branch for converting ASCII uppercase letter to hexadecimal number*/  
upper_letter_conversion:  
    sub r1, #55  
    str r1, [r2]         /* Storing the value after conversion*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r2, #4  
    b loop  

/* Branch for converting ASCII lowercase letter to hexadecimal number*/  
lower_letter_conversion:  
    sub r1, #87  
    str r1, [r2]         /* Storing the value after conversion*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r2, #4  
    b loop  

done:  
    /* Exiting the program*/  
    POP {PC}  

.data  
