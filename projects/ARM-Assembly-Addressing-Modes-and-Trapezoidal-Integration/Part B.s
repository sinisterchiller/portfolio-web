/* Code created by Ryan O’Handley (1883463) and Anurag Biswas Koushik (1806274) */  
/* This program calculates the area under a function by using the trapezoid rule approximation */ 
ldr r0, =0x20001000 //number of data points// 
ldr r1, [r0] //n// 
ldr r2, [r0, #4] //x points// 
ldr r3, [r0, #8] //y points// 
ldr r4, [r0, #16] //store address// 
mov r5, #0 //initialize the counter// 
mov r9, #0 //initialize the sum of areas// 
 
mov r10, #0 //initialize the counter for round error// 
 
sub r1, r1, #1 //convert to n-1 since we process the last point automatically// 
 
loop: 
cmp r1, #0 //checking if there are no data points// 
beq done 
 
ldr r6, [r2] //x1 value// 
add r2, r2, #4 //x2 address// 
ldr r7, [r2] //x2 value// 
sub r7, r7, r6 //getting the difference and storing// 
 
ldr r6, [r3] //y1 value// 
add r3, r3, #4 //y2 address// 
ldr r8, [r3] //y2 value// 
add r8, r8, r6 //getting the sum and storing// 
 
 
 
//comparing the delta x to determine which form of equation to use// 
cmp r7, #1 
beq divide2 
cmp r7, #2 
beq sum 
cmp r7, #4 
beq multiply2 
 
 
 
divide2: 
and r11, r8, #1 //getting the LSB (to check if sum is even or odd) 

lsr r8, r8, #1 //divide the sum by 2// 
add r10, r10, r11 //add to the counter// 
add r9, r9, r8 //add to the total// 
sub r1, r1, #1 //decrease the counter// 
b loop 
 
sum: 
add r9, r9, r8 //add to the total// 
sub r1, r1, #1 //decrease the counter// 
b loop 
 
multiply2: 
lsl r8, r8, #1 //multiply the sum by 2// 
add r9, r9, r8 //add to the total// 
sub r1, r1, #1 //decrease the counter// 
b loop 
 
done: 
and r11, r10, #1 //getting the LSB (to check if error is even or odd) 
lsr r10, r10, #1 //divide the counter by 2// 
add r9, r9, r10 //update the counter by adding the error 
add r9, r9, r11 //rounding up the counter// 
str r9, [r4] //storing the final result// 
