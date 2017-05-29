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

//Maximumkiválsztás programozási tétel
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
  int t[MAXN], n;

  beolvasas(n, t);

  int maxh = maximum(n, t);
  cout << "Legnagyobb érték: " << t[maxh] << ", helye (ha több van, akkor az első): " << maxh << endl;

  return 0;
}