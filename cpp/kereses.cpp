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

//Keresés programozási tétel
int kereses(int n, int t[], int felt){
	int i = 0;
	while(!l && i < N){
		l = ()t[i] == felt);
		i++;
	}
	if(l){
		return i - 1;
	} else {
		return -1;
	}
}

int main(){
  int t[MAXN];
  int n;
  int felt = 5;

  beolvasas(n, t);

  if(kereses(n, t, felt) > -1){
	  cout << "A keresett elem: " << kereses(n, t, felt);
  } else {
	  cout << "Nincs találat.";
  }

  return 0;
}