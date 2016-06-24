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

int main(){
	
	int t[] = {5,4,6,3,2,1}, n = 6;
	
	minimumKivalasztasosRendezes(n, t);
	
	for(int i = 0; i < n; i++){
		cout << t[i] << " ";
	}
	
	return 0;
}