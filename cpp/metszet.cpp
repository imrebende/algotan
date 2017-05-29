#include <iostream>

using namespace std;

void metszet(int a[], int n, int b[], int m, int c[], int& db){
	db = 0;
	for(int i = 0; i < m; i++){
		bool l = false;
		int j = 0;
		while(j < N && !l){
			l = b[i] == a[j];
			j++;
		}
		if(l){
			c[db] = b[i];
			db++;
		}
	}
}

int main(){
	
	int a[] = {1,2,3,4,5,6}, b[] = {2,4,6}, int c[100], db;
	
	metszet(a, 6, b, 3, c, db);
	
	for(int i = 0; i < db; i++){
		cout << c[i] << " ";
	}
	cout << endl;
	
	return 0;
}