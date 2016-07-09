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

//Keres�s programoz�si t�tel
int logKereses(int n, int t[], int felt){
	int u = 0;
	int v = n - 1;
	int i;
	bool l = false;
	while(!l && u <= v){
		i = (u + v) / 2;
		if(t[i] == felt){
			l = true;
		} else if (t[i] < felt){
			u = i + 1;
		} else {
			v = i - 1;
		}
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

  if(logKereses(n, t, felt) > -1){
	  cout << "A keresett elem: " << logKereses(n, t, felt);
  } else {
	  cout << "Nincs tal�lat.";
  }

  return 0;
}