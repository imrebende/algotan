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

//Maximumkiv�lszt�s programoz�si t�tel
int maximum(int n, int t[]){
	int maxHely = 0;
	for (int i = 1; i < n; i++){
		if(t[maxHely] < t[i]){
			maxHely = i;
		}
	}
	return maxHely;
}

int main(){
  int t[MAXN];
  int n;

  beolvasas(n, t);

  int maxh = maximum(n, t);
  cout << "�rt�k: " << t[maxh] << ", hely: " << m << endl;

  return 0;
}