#include <iostream>

using namespace std;

void buborekosRendezes(int n, int t[]){
	for(int i = n - 1; i > 0; i--){
		for(int j = 0; j <= i - 1; j++){
			if(t[j] > t[j + 1]){
				int tmp = t[j];
				t[j] = t[j + 1],
				t[j + 1] = tmp;
			}
		}
	}
}

int main(){
	
	int t[] = {5,4,6,3,2,1}, n = 6;
	
	buborekosRendezes(n, t);
	
	for(int i = 0; i < n; i++){
		cout << t[i] << " ";
	}
	
	return 0;
}