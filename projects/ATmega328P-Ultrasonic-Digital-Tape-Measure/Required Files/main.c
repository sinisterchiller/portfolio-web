/* 
 * File:   main.c
 * Author: akoushik, zuhdihus
 *
 * Created on November 3, 2025, 12:33 PM
 */

#include <stdio.h>
#include <stdlib.h>
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#include "lcd.h"

#define SpeedOfSound 343

FILE lcd_str = FDEV_SETUP_STREAM ( lcd_putchar , NULL , _FDEV_SETUP_WRITE ) ;

volatile uint16_t echo_ticks = 0;                   //number of cpu ticks
volatile uint8_t  measurement_ready = 0;            //flag
volatile uint8_t  echo_high = 0;                    //flag for echo pin

void timer1_start(){
    //control register
    TCCR1A = 0;
    TCCR1B = 0;             // stop the timer first
    TCNT1  = 0;             // start the timer from 0
    TCCR1B = (1<<CS10);     // timer starts with prescaler /1
                            // fuse bits configured to be prescaled by 8
}

void timer1_stop(void){
    TCCR1B = 0;             // stop timer
}

void echo_pcint_init(void){
    DDRB &= ~(1<<PB0);     //set PB0 as input

    PCICR  |= (1<<PCIE0);       //enable interrupt for PORT B
 
    PCMSK0 |= (1<<PCINT0);      //masks all other ports except PB0

    sei(); // enable global interrupts
}

//interrupt 
ISR(PCINT0_vect){               
    if (PINB & (1<<PB0)){               //if rising edge detected
        echo_high = 1;                 //echo at high
        measurement_ready = 0;            //flag to see if measurement of pulse width is complete
        TCNT1 = 0;                        //timer set to 0 when rising edge occurs
        TCCR1B = (1<<CS10);   
    } else {                            //falling edge
        if (echo_high){
            echo_ticks = TCNT1;        // echo_ticks stores number of ticks in pulse width
            timer1_stop();             //stops timer
            echo_high = 0;
            measurement_ready = 1;          //pulse width measurement complete
        }
    }
}


void initialization(void){              //startup routine
    int start = 0;
    while (start == 0){
      if ((PIND & (1<<PD2)) != 0){      //if button is pressed, the program starts
          start = 1;//startup count to start while loop
          break;
      }
    }
}


int main(int argc, char** argv) {
    lcd_init();
    fprintf(&lcd_str, "Press The Button");              //startup message
    fprintf(&lcd_str, "\x1b\xc0");
    fprintf(&lcd_str, "NaN        NaN    ");
    
    char minp[24];             //minimum measurement print array
    char maxp[24];                //maximum measurement print array

    int time = 0;               

    float min = 0;              //initialize minimum measurement 
    float max = 0;              //initialize maximum measurement
        
    DDRB |= (1<<PB1);       //trigger
    DDRB &=~ (1<<PB0);      //echo on PB0 (PCINT0)
    DDRD &=~ (1<<PD2);      

    echo_pcint_init();          //sets the interrupt

    int start;
    void initialization(void){
        start = 0;
        while (start == 0){
            if ((PIND & (1<<PD2)) != 0){
                start = 1;
                break;
            }
        }
    }
    int k = 0;
    
    initialization();
    
    

    while(start){
        
        if ((PIND & (1<<PD2)) == 0)
            k = 1;
                
        if (((PIND & (1<<PD2))!= 0)&&(k==1)){
            initialization();
        }
        PORTB |= (1<<PB1);                      //sends out the pulse
        _delay_us(10);                          //waits 10 microseconds
        PORTB &=~ (1<<PB1);                     //stop the pulse

        // Clear flags before waiting for the new measurement
        measurement_ready = 0;
        echo_high = 0;          // ensure fresh cycle

        
        while (!measurement_ready){                     //pause while measurement 
        
        }

        time = echo_ticks;                              //timer is stopped in the interrupt, and the time is stored

        int maxtick = 200 / ((8.0 / 14745600.0) * SpeedOfSound * 100 /2);       //maximum range
        int mintick = 2/ ((8.0 / 14745600.0) * SpeedOfSound * 100 /2);          //minimum range

        if (time >= maxtick){                                       //out of range display conditions
            fprintf(&lcd_str, "\x1b\x80");
            fprintf(&lcd_str, "Out Of Range            ");
            fprintf(&lcd_str, "\x1b\xc0");
            dtostrf(min, 0, 1, minp);
            fprintf(&lcd_str, "%scm", minp);
            dtostrf(max, 0, 1, maxp);
            fprintf(&lcd_str, "   %scm   ", maxp);
            while (time >= maxtick){
                if ((PIND & (1<<PD2))){
                    break;
                }
            }
        }
        
        if (time <= mintick){                                       //out of range display conditions
            fprintf(&lcd_str, "\x1b\x80");
            fprintf(&lcd_str, "Out Of Range            ");
            fprintf(&lcd_str, "\x1b\xc0");
            dtostrf(min, 0, 1, minp);
            fprintf(&lcd_str, "%scm", minp);
            dtostrf(max, 0, 1, maxp);
            fprintf(&lcd_str, "   %scm   ", maxp);
            while (time <= mintick){
                if ((PIND & (1<<PD2))){
                    break;
                }
            }
        }
        

        double range = (time * 8.0 / 14745600.0) * SpeedOfSound * 100 / 2; // cm        //calculate the distance
        char rangep[24];
        dtostrf(range, 0, 1, rangep);                       ///display the distance in real time
        fprintf(&lcd_str, "\x1b\x80");
        fprintf(&lcd_str, "     %s cm       ", rangep);
        fprintf(&lcd_str, "\x1b\xc0");
        
        if (min == 0){              //initial minimum value condition
            min = range;
        }
        if (min > range){           //continuous minimum value condition
            min = range;
        }
        if (max < range){           //maximum display condition
            max = range;
        }
        
        dtostrf(min, 0, 1, minp);                       //continuous update of the minimum and maximum value
        fprintf(&lcd_str, "%scm", minp);
        dtostrf(max, 0, 1, maxp);
        fprintf(&lcd_str, "   %scm   ", maxp);
        
        
        if ((PIND & (1<<PD2)) != 0){                    //reset button behavious during normal operations 
            min = 0;
            max = 0;
            char minp[24];
            char maxp[24];
            fprintf(&lcd_str, "\x1b\x80");
            fprintf(&lcd_str, "\x1b\xc0");
            dtostrf(min, 0, 1, minp);
            fprintf(&lcd_str, "%scm", minp);
            dtostrf(max, 0, 1, maxp);
            fprintf(&lcd_str, "   %scm   ", maxp);
            _delay_ms(3000);
        }
        //fprintf(&lcd_str, " t-%d", time);

        _delay_ms(1000);
    }

    return (EXIT_SUCCESS);
}



