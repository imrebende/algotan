#include <iostream>

using namespace std;

const int MAXN = 100;

//Beolvas�s elj�r�s
void beolvasas(int& n, int t[]){
	cout << "Adja meg a t�mb elemsz�m�t: ";
	cin >> n;
	for (int i = 0; i < n; i++){
		cout << "Adja meg a(z) " << i + 1 << ". elemet!";
		cin >> t[i];
	}
}

//Megsz�mol�s programoz�si t�tel
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
	int N;
	int t[MAXN];
	
	beolvasas(n, t);
	
	cout << megszamolas(n, t, felt) << endl;
	
	return 0;
}