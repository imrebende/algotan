#include <iostream>

using namespace std;

const int MAXN = 100;

//Beolvasás eljárás
void beolvasas(int& n, int t[]){
	cout << "Adja meg a tömb elemszámát: ";
	cin >> n;
	for (int i = 0; i < n; i++){
		cout << "Adja meg a(z) " << i + 1 << ". elemet!";
		cin >> t[i];
	}
}

//Megszámolás programozási tétel
void masolas(int n, int a[], int b[]){
	for(int i = 0; i < n; i++){
		b[i] = a[i];
	}
}

int main(){
	int a[MAXN], b[MAXN], n;
	
	beolvasas(n, a);
	masolas(n, a, b);
	
	for(int i = 0; i < n; i++){
		cout << b[i] << " ";
	}
	
	return 0;
}