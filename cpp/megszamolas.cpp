#include <iostream>

using namespace std;

const int MAXN = 100;

//Beolvasás eljárás
void beolvasas(int& n, int t[]){
	cout << "Adja meg a tömb elemszámát:" << endl;
	cin >> n;
	for (int i = 0; i < n; i++){
		cout << "Adja meg a(z) " << i + 1 << ". elemet!" << endl;
		cin >> t[i];
	}
}

//Megszámolás programozási tétel
int megszamolas(int n, int t[], int felt){
	int db = 0;
	for(int i = 0; i < n; i++){
		if(t[i] == felt){
			db++;
		}
	}
	return db;
}

int main(){
	int n, t[MAXN];
	
	beolvasas(n, t);
	
	cout << megszamolas(n, t, felt) << "db feltételnek megfelelő elem van a tömbben." << endl;
	
	return 0;
}