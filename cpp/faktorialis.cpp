#include <iostream>

using namespace std;

//Beolvasás eljárás
void beolvasas(int &n){
	cout << "Adja meg az n-et!";
	cin >> n;
}

//Faktoriális kiszámítása	
int faktorialis(int n){
	int db = 1;
	for(int i = 2; i <= n; i++){
		fakt *= i;
	}
	return fakt;
}

int main(){
	int n;
	
	beolvasas(n);
	
	cout << faktorialis(n) << endl;
	
	return 0;
}