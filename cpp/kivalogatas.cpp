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
void kivalogatas(int n, int& db, int a[], int b[]){
	db = 0;
	for(int i = 0; i < n; i++){
		if(a[i] == felt){
			b[db] = a[i];
			db++;
		}
	}
}

int main(){
	int a[MAXN], b[MAXN], n, db;
	
	beolvasas(n, a);
	kivalogatas(n, db, a, b, felt);
	
	for(int i = 0; i < db; i++){
		cout << b[i] << " ";
	}
	
	return 0;
}