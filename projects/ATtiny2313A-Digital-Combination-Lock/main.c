/* 
 * File:   newmain.c
 * Author: akoushik(1806274), zuhdihus(1812585)
 *
 * Created on October 03, 2025, 12:49 PM
 *
 * Code was run successfully with expected design features
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <avr/io.h>
#include <util/delay.h>
#define F_CPU 1000000
/*
 * 
 */


int main(int argc, char** argv) {
    
    //Configuring output GPIO Pins connected to the RGB LED
    DDRD |= (1<<PD2); //Assigning PD1 as the pin for the color RED
    DDRD |= (1<<PD3); //Assigning PD1 as the pin for the color GREEN
    DDRD |= (1<<PD4); //Assigning PD1 as the pin for the color BLUE
    
    DDRD |= (1<<PD5);
    
    //Setting the RGB LED to the color RED 
    PORTD |= (1<<PD2); 
    PORTD &=~ (1<<PD3); 
    PORTD &=~ (1<<PD4); 
    
    //Configuring input GPIO Pins connected to the button
    PORTB |= (1<<PB0); 
    DDRB &=~ (1<<PB0); 
    PORTB |= (1<<PB1); 
    DDRB &=~ (1<<PB1);
    PORTB |= (1<<PB2); 
    DDRB &=~ (1<<PB2);
    PORTB |= (1<<PB3); 
    DDRB &=~ (1<<PB3);
    PORTB |= (1<<PB4); 
    DDRB &=~ (1<<PB4);
    
    void white()
    {
        PORTD |= (1<<PD2); 
        PORTD |= (1<<PD3); 
        PORTD |= (1<<PD4);
    }
    
    void red()
    {
        PORTD |= (1<<PD2); 
        PORTD &=~ (1<<PD3); 
        PORTD &=~ (1<<PD4);
    }
    void green()
    {
        PORTD &=~ (1<<PD2); 
        PORTD |= (1<<PD3); 
        PORTD &=~ (1<<PD4);
    }
    
    void off()
    {
        PORTD &=~ (1<<PD2); 
        PORTD &=~ (1<<PD3); 
        PORTD &=~ (1<<PD4);
    }
    
    int t = 0;
    void beep()
    {
        while(t < 200)
        {
            PORTD |= (1<<PD5);
            _delay_ms(1); //This delay basically denotes the frequency at which the buzzer sounds
            PORTD &=~ (1<<PD5);
            break;
        }
    }
    
    void beepwrong()
    {
        while(t < 200)
        {
            PORTD |= (1<<PD5);
            _delay_ms(1);
            PORTD &=~ (1<<PD5);
            t += 1;
        }
        t = 0;
    }
    
    
   
    int max = 5; //Passcode length
    
    int set_pass[] = {1,1,1,1,1}; //Passcode array
    
    int user_pass[] = {0,0,0,0,0,0,0,0,0,0}; //Keypad entries, initially zero
    
    int position = 0; //Counter for the current number of press
    
    int x = 1; //Debouncing variable

    
    while(1)
    {
        if ((((PINB & (1<<PB0))) | ((PINB & (1<<PB1))) | ((PINB & (1<<PB2))) | ((PINB & (1<<PB3))) | ((PINB & (1<<PB4))))&&(x==1))
        {
            red(); //If no key is pressed, that is, at idle state the system is locked and the RGB stays on red
        }
       
        //Each button in the keypad is given an unique identifier in the array to match based on their position, such as button 1 is 1, button 2 is 2, and so on. 
        
        if ((!(PINB & (1<<PB0)))&&(x==1))
        {
            user_pass[position] = 1; //if the button is pressed, the unique identifier is inputted in the current position in the array
            position++; //After the input of the unique identifier, the program moves on to the next position
            while ((!(PINB & (1<<PB0))))
            {
                white(); //Visual indicator that the button is pressed by turning the LED white
                beep();  //Audio indication for the button pressed
            }
            _delay_ms(10); //Small delay to avoid accidental trigger
        }
        
        //Same for the rest of the buttons
        
        if ((!(PINB & (1<<PB1)))&&(x==1))
        {
            user_pass[position] = 2;
            position++;
            while ((!(PINB & (1<<PB1))))
            {
                white();
                beep();
            }
            _delay_ms(10);
        }
        
        if ((!(PINB & (1<<PB2)))&&(x==1))
        {
            user_pass[position] = 3;
            position++;
            while ((!(PINB & (1<<PB2))))
            {
                white();
                beep();
            }
            _delay_ms(10);
        }
        
        if ((!(PINB & (1<<PB3)))&&(x==1))
        {
            user_pass[position] = 4;
            position++;
            while ((!(PINB & (1<<PB3))))
            {
                white();
                beep();
            }
            _delay_ms(10);
        }
        
        if ((!(PINB & (1<<PB4)))&&(x==1))
        {
            user_pass[position] = 5;
            position++;
            while ((!(PINB & (1<<PB4))))
            {
                white();
                beep();
            }
            _delay_ms(10);
        }
        
        //If any button is pressed immediately after unlocking, that press is ignored and the counter is reset to 0
        if((!((PINB & (1<<PB0))) | !((PINB & (1<<PB1))) | !((PINB & (1<<PB2))) | !((PINB & (1<<PB3))) | !((PINB & (1<<PB4))))&&(x==0))
        {
            white();
            position = 0;
        }
            
        
        if (position == max) //When the position hits the passcode length, comparing all the inputs with the set passcode starts
        {
            int pass = 1;
            for (int i = 0; i < max; i++) //loop that compares each of the user entries with the set pass
            {
                if (user_pass[i] == set_pass[i])
                {
                    pass = 1;
                }
                else
                {
                    pass=0;
                    break;
                }
            }
          
            //If the user entered passcode is wrong, the LED blinks red and the buzzer beeps as well
            if (pass == 0 )
                {
                    red(); beepwrong(); _delay_ms(200);  off(); _delay_ms(200);
                    red(); beepwrong(); _delay_ms(200); off(); _delay_ms(200); 
                    red(); beepwrong(); _delay_ms(200);  off(); _delay_ms(200);
                    
                    red(); beepwrong();
                    position = 0; //After the beeping and letting the user know that the entered passcode is wrong, the position resets to zero and the system loops back again to the sequence of user entering the passcode
                    for (int i = 0; i < max; i++)
                    {
                        user_pass[i]=0;
                    }
                }
                else
                {
                    green(); //If user entered passcode is right, the system unlocks, indication through the LED
                    _delay_ms(1);
                    int k = 0;
                    x = 0;
                    while ((((PINB & (1<<PB0))) | ((PINB & (1<<PB1))) | ((PINB & (1<<PB2))) | ((PINB & (1<<PB3))) | ((PINB & (1<<PB4))))&&(k<5000)) //Immediately after the system unlocks, the system will reset after 5000ms, but if any button is pressed within this period, the system resets as well
                    {
                        _delay_ms(1);
                        k = k+1;
                        position = 0; //Resets automatically if no button is pressed
                        //If any button is pressed, the system resets
                        if((!((PINB & (1<<PB0))) | !((PINB & (1<<PB1))) | !((PINB & (1<<PB2))) | !((PINB & (1<<PB3))) | !((PINB & (1<<PB4)))))
                        {
                            x = 0;
                            while (x == 0)
                            {
                                red();
                                position = 0;
                                for (int i = 0; i < max; i++)
                                {
                                    user_pass[i]=0;
                                }
                                if((((PINB & (1<<PB0))) | ((PINB & (1<<PB1))) | ((PINB & (1<<PB2))) | ((PINB & (1<<PB3))) | ((PINB & (1<<PB4)))))
                                {
                                    x = 2;
                                    break;
                                }
                                
                            }
                            
                        }
                        if(x==2)
                        {
                            _delay_ms(200);
                            break;
                        }
                    }
                    
                    red();
                    position = 0;
                    for (int i = 0; i < max; i++)
                    {
                        user_pass[i]=0;
                    }
                    x = 1;
                }
        }
        
    }
    return (EXIT_SUCCESS);
}
