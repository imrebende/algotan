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

//Maximumot visszaadó függvény
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
  //Elemek deklarálása
  int t[MAXN];
  int n;

  //Elemek beolvasása
  beolvasas(n, t);

  //Maximum kiírása
  cout << "Érték: " << t[maximum(n,t)] << ", hely: " << maximum(n,t) << endl;

  return 0;
}