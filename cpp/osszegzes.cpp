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

int osszegzes(int n, int t[]){
	int s = 0;
	for (int i = 0; i < n; i++){
		s += t[i];
	}
	return s;
}

int main(){
	int N;
	int t[MAXN];
	
	beolvasas(n, t);
	
	cout << osszegzes(n, t) << endl;
	
	return 0;
}