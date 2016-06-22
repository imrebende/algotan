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

//Maximumot visszaad� f�ggv�ny
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
  //Elemek deklar�l�sa
  int t[MAXN];
  int n;

  //Elemek beolvas�sa
  beolvasas(n, t);

  //Maximum ki�r�sa
  cout << "�rt�k: " << t[maximum(n,t)] << ", hely: " << maximum(n,t) << endl;

  return 0;
}