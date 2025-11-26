/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik (1806274) */  
/* This code converts ASCII characters from their current case to their opposite- */  
/* case (upper to lower and vice versa) */  

/* Preliminary setup*/  
.global TestAsmCall  
.global printf  
.global cr  
.syntax unified  

.text  
TestAsmCall:  
PUSH {lr}  
/*--------------------------------------*/  

ldr r0, =0x20001000      /* Loading the address we get values from */  
ldr r1, =0x20003000      /* Loading the address we store values to*/  
ldr r3, =0x2A            /* Loading the error value '*' */  

/* Creating the main loop*/  
loop:  

    /* Checking if the value at the address is “Enter”*/  
    ldr r2, [r0]  
    cmp r2, #13  
    beq done             /* Exiting program if “Enter” is detected*/  

    /* Checking if the character is out of bounds, prompting invalid store if so*/  
    cmp r2, #65  
    blt invalid  

    /* Checking if the character is uppercase, prompting uppercase conversion if so*/  
    cmp r2, #91  
    blo uppercase  

    /* Checking if the character is out of bounds, prompting invalid store if so*/  
    cmp r2, #97  
    blt invalid  

    /* Checking if the character is lowercase, prompting lowercase conversion if so*/  
    cmp r2, #123  
    blo lowercase  

/* Branch for storing invalid characters using the error code*/  
invalid:  
    str r3, [r1]  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r1, #4  
    b loop  

/* Branch for converting uppercase to lowercase*/  
uppercase:  
    add r2, r2, #32  
    str r2, [r1]         /* Storing the value after conversion*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r1, #4  
    b loop  

/* Branch for converting lowercase to uppercase*/  
lowercase:  
    sub r2, r2, #32  
    str r2, [r1]         /* Storing the value after conversion*/  

    /* Incrementing the memory addresses for the next value*/  
    add r0, #4  
    add r1, #4  
    b loop  

done:  
    /* Exiting the program*/  
    POP {PC}  

.data  
