/* 
 * File:   newmain.c
 * Author: akoushik(1806274), zuhdihus(1812585)
 *
 * Created on September 19, 2025, 12:49 PM
 *
 * Code was run successfully with expected design features
 */


#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <avr/io.h>




/*
 * 
 */
int main(int argc, char** argv) {
    
    //Configuring output GPIO Pins connected to the RGB LED
    DDRD |= (1<<PD1); //Assigning PD1 as the pin for the color RED
    DDRD |= (1<<PD3); //Assigning PD1 as the pin for the color GREEN
    DDRD |= (1<<PD5); //Assigning PD1 as the pin for the color BLUE
    
    //Setting the RGB LED to the color white by setting all the colors to high
    PORTD |= (1<<PD1); //Setting PD1 as high so that the LED gives off RED light
    PORTD |= (1<<PD3); //Setting PD1 as high so that the LED gives off GREEN light
    PORTD |= (1<<PD5); //Setting PD1 as high so that the LED gives off BLUE light
    //The combination of all three colors, RED, GREEN and BLUE give off WHITE
    
    //Configuring input GPIO Pins connected to the touch button
    PORTB &=~ (1<<PB4); //Disabling the internal pull-up resistor
    DDRB &=~ (1<<PB4); //Assigning PB4 as input. PB4 is only high when the button is touched
    
    //A random variable set to 0 initially. This variable is 1 only when the button is touched (PB4 = HIGH)
    int x=0;
    
    while(1)
    {
        if (!(PINB & (1<<PB4))) //If the button is not touched (PB4 = LOW), the random variable is set to 0
            x=0;
        
        //The random variable is set to 1 only when the button is touched (PB4 = HIGH)
        if ((PINB & (1<<PB4))&&(x==0))
        {
            x=1; //Setting the random variable to 1 here, blockes the rest of the code from cycling though until the button is released 
            
            //If PD1 = PD3 = PD5 = HIGH, proceed to the next state: PD1 = HIGH, PD3 = PD5 = LOW, i.e. if white → red
            if ((PIND & (1<<PD1))&&(PIND &(1<<PD3))&&(PIND &(1<<PD5))) 
            {
                PORTD |=(1<<PD1);
                PORTD &=~(1<<PD3);
                PORTD &=~ (1<<PD5);
                continue;
            }
            //If PD1 = HIGH and PD3 = PD5 = LOW, proceed to the next state: PD3 = HIGH, PD1 = PD5 = LOW, i.e. if red → green
            else if ((PIND & (1<<PD1))&&!(PIND &(1<<PD3))&&!(PIND &(1<<PD5)))
            {
                PORTD &=~(1<<PD1);
                PORTD |=(1<<PD3);
                PORTD &=~ (1<<PD5);
                continue;


            }
            //If PD3 = HIGH, PD1 = PD5 = LOW, proceed to the next state: PD1 = PD3 = HIGH, PD5 = LOW, i.e. if green → blue
            else if (!(PIND & (1<<PD1))&&(PIND &(1<<PD3))&&!(PIND &(1<<PD5)))
            {
                PORTD &=~(1<<PD1);
                PORTD &=~(1<<PD3);
                PORTD |=(1<<PD5);
                continue;
            }
            //If PD1 = PD3 = HIGH, PD5 = LOW, proceed to the next state: PD1 = PD3 = PD5 = HIGH, i.e. if red → white
            else if (!(PIND & (1<<PD1))&&!(PIND &(1<<PD3))&&(PIND &(1<<PD5)))
            {
                PORTD |=(1<<PD1);
                PORTD |=(1<<PD3);
                PORTD |=(1<<PD5);
                continue;
            }
            //After this, the output pins return back to the first condition, and the loop goes on 
        }   
        
        
    }
    


    
    return (EXIT_SUCCESS);
}