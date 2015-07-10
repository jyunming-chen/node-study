#include <stdio.h>
#include <stdlib.h>  // for strtol

int factorial(int n)
{
    int i;
    int result = 1;
    for (i = 1; i <= n; i++)
        result *= i;
    return result;
}


int main(int argc, char *argv[]) {
    if ( argc != 2 ) {
    	printf("%d", factorial(1));
    }else {
    	int num = strtol(argv[1], NULL, 10);
        printf("%d", factorial(num) );
    }
    return 0;
}