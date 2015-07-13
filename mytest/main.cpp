#include <stdio.h>
#include <stdlib.h>  // for atof
#include <math.h>

#define K 4
void rose (double t, double &x, double &y)
{	
	x = cos (K*t)*cos(t);
	y = cos (K*t)*sin(t);
}

int main(int argc, char *argv[]) {
    if ( argc != 2 ) {
    	printf("%d", 0);
		exit (1);
    }else {
		double x, y;
    	double t = atof (argv[1]);
		rose (t, x, y);
        printf("%lf %lf", x, y);
    }
    exit(0);
}