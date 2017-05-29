#include <iostream>

using namespace std;

void minimumKivalasztasosRendezes(int n, int t[]){
	for(int i = 0; i < n; i++){
		int minI = i;
		for(int j = i + 1; j < n; j++){
			if(t[minI] < t[j]){
				minI = j;
			}
		}
		tmp = t[i];
		t[i] = t[minI];
		t[minI] = tmp;
	}
}

void tombKiiras(int n, int t[]){
    for(int i = 0; i < n; i++){
        cout << t[i] << " ";
    }
    cout << endl;
}

int main(){
	
	int t[] = {5,4,6,3,2,1}, n = 6;

	cout << "Tömb elemei rendezés elött: ";
    tombKiiras(n, t);

	minimumKivalasztasosRendezes(n, t);
	
	cout << "Tömb elemei rendezés után: ";
    tombKiiras(n, t);
	
	return 0;
}