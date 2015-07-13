#include <stdio.h>
#include <stdlib.h>  // for strtol

int factorial(int n)
{
	if (n == 1) 
		return 1;
	else
		return n*factorial(n-1);
}


int main(int argc, char *argv[]) {
    if ( argc != 2 ) {
    	printf("%d", factorial(1));
		exit (1);
    }else {
    	int num = strtol(argv[1], NULL, 10);
        printf("%d", factorial(num));
    }
    exit(0);
}