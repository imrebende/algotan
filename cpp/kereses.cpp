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

//Keresés programozási tétel
int kereses(int n, int t[], int felt){
	int i = 0;
	bool l = false;
	while(!l && i < N){
		l = t[i] == felt;
		i++;
	}
	if(l){
		return i - 1;
	} else {
		return -1;
	}
}

int main(){
  int t[MAXN], n, felt = 5;

  beolvasas(n, t);

  if(kereses(n, t, felt) > -1){
	  cout << "A keresett elem: " << kereses(n, t, felt) << endl;
  } else {
	  cout << "Nincs találat." << endl;
  }

  return 0;
}