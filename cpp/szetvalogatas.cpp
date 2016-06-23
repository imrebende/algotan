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
void szetvalogatas(int n, int& dbb, int& dbc, int a[], int b[], int c[], int felt){
	dbb = 0; dbc = 0;
	for(int i = 0; i < n; i++){
		if(a[i] == felt){
			b[dbb] = a[i];
			dbb++;
		} else {
			c[dbc] = a[i];
			dbc++;
		}
	}
}

int main(){
	int a[MAXN], b[MAXN], n, dbb, dbc;
	
	beolvasas(n, a);
	szetvalogatas(n, dbb, dbc, a, b, felt);
	
	cout << "b[]: ";
	for(int i = 0; i < dbb; i++){
		cout << b[i] << " ";
	}
	cout << endl;
	
	cout << "c[]: ";
	for(int i = 0; i < dbc; i++){
		cout << c[i] << " ";
	}
	
	return 0;
}