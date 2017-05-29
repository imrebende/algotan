#include <iostream>

using namespace std;

const int MAXN = 100;

//Beolvasás eljárás
void beolvasas(int& n, int t[]){
	cout << "Adja meg a tömb elemszámát: " << endl;
	cin >> n;
	for (int i = 0; i < n; i++){
		cout << "Adja meg a(z) " << i + 1 << ". elemet!" << endl;
		cin >> t[i];
	}
}

//Kiválogatás programozási tétel
void kivalogatas(int n, int& db, int a[], int b[]){
	db = 0;
	for(int i = 0; i < n; i++){
		if(a[i] == felt){
			b[db++] = a[i];
		}
	}
}

//Tömb kiírása
void tombKiirasDarabszammal(int db, int t[]){
    cout << "A tömb elemszáma: " << db << endl;
	cout << "A tömb elemei: ";
	for(int i = 0; i < db; i++){
		cout << t[i] << " ";
	}
	cout << endl;
}

int main(){
	int t[MAXN], b[MAXN], n, db;
	
	beolvasas(n, t);
	kivalogatas(n, db, t, b, felt);
    tombKiirasDarabszammal(db, b)
	
	return 0;
}