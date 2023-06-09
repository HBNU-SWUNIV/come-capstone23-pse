CREATE DATABASE IF NOT EXISTS testdb
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE testdb;

CREATE TABLE IF NOT EXISTS q_list(
    q_level VARCHAR(255) NOT NULL,
    q_id INT AUTO_INCREMENT PRIMARY KEY,
    q_name VARCHAR(255) NOT NULL,
    q_content TEXT,
    ex_print TEXT,
    c_answer_code TEXT,
    p_answer_code TEXT,
    answer TEXT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 하 1
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '하',
  '간단한 출력',
  '다음과 같은 형태로 이름을 출력하는 프로그램을 작성하시오. (단, printf 함수는 1회만 호출)<br>
(c언어, python)',
  '한밭대학교<br>
  한밭 대학교<br>
  한 밭 대 학 교',
  '#include <stdio.h>
  int main(){
    printf("한밭대학교\\n한밭 대학교\\n한 밭 대 학 교\\n");
    return 0;
}',
'print("""한밭대학교
한밭 대학교
한 밭 대 학 교""")',
'한밭대학교
한밭 대학교
한 밭 대 학 교'
);

-- 하 2
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '하',
  '간단한 입출력, 변수, 연산자',
  '두 개의 정수를 입력 받아 두 수의 덧셈과 뺄셈, 곱셈, 나눗셈의 결과를 출력하는 프로그램을 작성하시오.<br>
입력 값: num1 = 6, num2 = 3<br>
(c언어, python)',
  '6 + 3 = 9<br>
  6 - 3 = 3<br>
  6 * 3 = 18<br>
  6 / 3 = 2',
  '#include <stdio.h>
int main(){
  int num1 = 6, num2 = 3;

  printf("%d + %d = %d\\n", num1, num2,num1+num2);
  printf("%d - %d = %d\\n", num1, num2,num1-num2);
  printf("%d * %d = %d\\n", num1, num2,num1*num2);
  printf("%d / %d = %d\\n", num1, num2,num1/num2);
      
  return 0;
}',
'num1=6
num2=3
print(num1, " + ", num2, " = ", num1+num2)
print(num1, " - ", num2, " = ", num1-num2)
print(num1, " * ", num2, " = ", num1*num2)
print(num1, " / ", num2, " = ", int(num1/num2))',
  '6 + 3 = 9
6 - 3 = 3
6 * 3 = 18
6 / 3 = 2'
);

-- 하 3
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '하',
  '간단한 반복문',
  '구구단 2단을 출력하는 프로그램을 작성하시오.<br>
입력 값: num1 = 6, num2 = 3<br>
(c언어, python)',
  '구구단 단 : 2<br>
  2 x 1 = 2<br>
  2 x 2 = 4<br>
  2 x 3 = 6<br>
  2 x 4 = 8<br>
  2 x 5 = 10<br>
  2 x 6 = 12<br>
  2 x 7 = 14<br>
  2 x 8 = 16<br>
  2 x 9 = 18',
  '#include <stdio.h>
int main(){
  int num=2;

  printf("구구단 단 : 2\\n");
  for(int i=0;i<9;i++){
    printf("%d x %d = %d\\n", num, (i+1), num*(i+1));
  }

  return 0;
}',
'num = 2

print("구구단 단 : 2")
for i in range(9):
    print(f"{num} x {i+1} = {num*(i+1)}")',
'구구단 단 : 2
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
2 x 6 = 12
2 x 7 = 14
2 x 8 = 16
2 x 9 = 18'
);

-- 하 4
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '하',
  '형 변환',
  '정수 125를 실수형으로 변환하여라.(단, 소수점 두 번째 자리까지 나타내시오)<br>
(c언어, python)',
  '125.00',
  '#include <stdio.h>
int main()
{
    int num = 125;
    printf("%.2f",(float)num);

    return 0;
}',
'num = 125
print("{:.2f}".format(float(num)))',
'125.00'
);

 -- 하 5
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '하',
  '아스키 코드',
  '알파벳 문자 A에 해당하는 아스키 코드값을 출력하는 프로그램을 작성하시오.<br>
(c언어, python)',
  '알파벳 : A<br>
  아스키 값 : 65',
  '#include <stdio.h>
int main() {
	int ch = "A";

	printf("알파벳 : A\\n");
	printf("아스키 값 : %d\\n", ch);

	return 0;
}',
'ch = "A"

print("알파벳 : " + ch)
print("아스키 값 : " + str(ord(ch)))',
'알파벳 : A
아스키 값 : 65'
);

-- 중 1
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '중',
  '비트연산',
  '비트 연산자를 사용하여 정수 3의 부호를 바꿔서 출력하는 프로그램을 작성하시오.<br>
(c언어, python)',
  '정수값 3의 부호를 바꾼 결과 : -3',
  '#include <stdio.h>
int main() {
    int num = 3;
    num = ~num;
    num = num + 1;
    printf("정수값 3의 부호를 바꾼 결과 : %d\\n", num);
    
    return 0;
}',
'num = 3
num = ~num
num = num + 1
print("정수값 3의 부호를 바꾼 결과:", num)',
  '정수값 3의 부호를 바꾼 결과 : -3'
);

-- 중 2
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '중',
  '배열',
  '정수형 배열 arr[10]에 대해 인덱스 홀수 번째 합과 짝수 번째 합을 출력하는 프로그램을 작성하시오.<br>
(c언어, python)',
  'arr[0]: 1<br>
arr[1]: 2<br>
arr[2]: 3<br>
arr[3]: 4<br>
arr[4]: 5<br>
arr[5]: 6<br>
arr[6]: 7<br>
arr[7]: 8<br>
arr[8]: 9<br>
arr[9]: 10<br>
홀수 번 째 인덱스 합 : 30<br>
짝수 번 째 인덱스 합 : 25',
  '#include <stdio.h>
int main() {
    int odd_sum = 0, even_sum = 0;
    int arr[10] = { 1,2,3,4,5,6,7,8,9,10 };

    for (int i = 0; i < 10; i++) {
        printf("arr[%d]: %d \\n", i, arr[i]);
        if (i % 2 == 1) {
            odd_sum += arr[i];
        }
        else {
            even_sum += arr[i];
        }
    }

    printf("홀수 번 째 인덱스 합 : %d\\n", odd_sum);
    printf("짝수 번 째 인덱스 합 : %d\\n", even_sum);

    return 0;
}',
'odd_sum = 0
even_sum = 0
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for i in range(len(arr)):
    print(f"arr[{i}]: {arr[i]}")
    if i % 2 == 1:
        odd_sum += arr[i]
    else:
        even_sum += arr[i]

print("홀수 번 째 인덱스 합:", odd_sum)
print("짝수 번 째 인덱스 합:", even_sum)',
'arr[0]: 1 
arr[1]: 2 
arr[2]: 3 
arr[3]: 4 
arr[4]: 5 
arr[5]: 6 
arr[6]: 7 
arr[7]: 8 
arr[8]: 9 
arr[9]: 10 
홀수 번 째 인덱스 합 : 30
짝수 번 째 인덱스 합 : 25'
);

-- 중 3
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '중',
  '반복문 별찍기',
  '반복문(for)을 이용하여 다음과 같은 피라미드를 출력하는 프로그램을 작성하시오.<br>
(c언어, python)',
  '  *<br>
 ***<br>
*****',
  '#include <stdio.h>
int main() {
    int i, j, k;

    for (i = 0; i < 3; i++) {
        for (j = 3 - i - 1; j > 0; j--) {
            printf(" ");
        }

        for (k = 0; k < 2 * i + 1; k++) {
            printf("*");
        }

        printf("\\n");
    }

    return 0;
}',
'for i in range(3):
    for j in range(3 - i - 1, 0, -1):
        print(" ", end="")
    
    for k in range(2 * i + 1):
        print("*", end="")
    
    print()',
'  *
 ***
*****
'
);

-- 중 4
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '중',
  '함수 정의',
  '정수 두 개의 합을 반환하는 함수 AddFunc 프로그램을 작성하시오<br>
(c언어, python)',
  '125',
  '#include <stdio.h>
int AddFunc(int num1, int num2) {
    return num1 + num2;
}

int main() {
    int num1 = 75, num2 = 50;
    int sum;
    sum = AddFunc(num1, num2);
    printf("%d\\n", sum);

    return 0;
}',
'def AddFunc(num1, num2):
    return num1 + num2

num1 = 75
num2 = 50
sum = AddFunc(num1, num2)
print(sum)',
  '125'
);

-- 중 5
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '중',
  '재귀함수',
  '간단한 재귀함수를 이용해 5!를 구하는 프로그램을 작성하시오<br>
(c언어, python)',
  '5! = 120',
  '#include <stdio.h>
int factorial(int n) {
    if (n <= 1)
        return 1;
  
    else
        return n * factorial(n - 1);
}

int main() {
    int n = 5;
    int result = factorial(n);
    printf("%d! = %d\\n", n, result);
    return 0;
}',
'def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

n = 5
result = factorial(n)
print(f"{n}! = {result}")',
'5! = 120'
);

-- 상 1
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '상',
  '소수 구하기',
  '1부터 소수 10개를 구하는 프로그램을 작성하시오.<br>
  (참고로, 정수 num이 1과 num으로 밖에 나누어지지 않는다면 이는 소수에 해당한다.)<br>
(c언어, python)',
  '소수 10개 출력 : 2 3 5 7 11 13 17 19 23 29',
  '#include <stdio.h>
int main() {
    int primes[10] = { 0 };
    int count = 0;
    int num = 2;

    while (count < 10) {
        int is_prime = 1;
        for (int i = 0; i < count; i++) {
            if (num % primes[i] == 0) {
                is_prime = 0;
                break;
            }
        }
        if (is_prime) {
            primes[count++] = num;
        }
        num++;
    }

    printf("소수 10개 출력 : ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", primes[i]);
    }

    return 0;

}',
'primes = []
count = 0
num = 2

while count < 10:
    is_prime = True
    for i in range(count):
        if num % primes[i] == 0:
            is_prime = False
            break
            if is_prime:
                primes.append(num)
                count += 1
                num += 1

print("소수 10개 출력:", end=" ")
for prime in primes:
    print(prime, end=" ")',
'소수 10개 출력 : 2 3 5 7 11 13 17 19 23 29'
);

-- 상 2
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '상',
  '조건문, 회문 판단',
  '희문을 판별하는 함수를 작성하시오.<br>
(희문Palindrome이란, 앞으로 읽으나 뒤로읽으나 차이가 없는 단어이다.)<br>
(단, 대소문자까지 일치해야 함)<br>
(c언어, python)',
  '문자열 : Hanbat<br>
희문이 아닙니다.',
  '#include <stdio.h>
#include <string.h>

void pdFunc(char a[], int b) {
    int count = 0;
    for (int i = 0; i < b / 2; i++) {
        if (a[i] != a[b - i - 1])
            count++;
    }

    if (count == 0)
        printf("회문입니다.");
    else
        printf("회문이 아닙니다.");
}

int main(void) {
    char a[7];
    strcpy(a, "Hanbat");
    printf("문자열 : %s\\n", a);
    pdFunc(a, strlen(a));
    return 0;
}',
'def is_palindrome(word):
    word = word.lower()
    reversed_word = word[::-1]
    return word == reversed_word

input_word = "Hanbat"
if is_palindrome(input_word):
    print("회문입니다.")
else:
    print("회문이 아닙니다.")',
'문자열 : Hanbat
회문이 아닙니다.'
);

-- 상 3
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '상',
  '버블정렬',
  '내림차순에 대한 버블정렬 함수를 작성하시오.<br>
(c언어, python)',
  '내림차순 버블 정렬 : 90 64 34 25 22 12 11',
  '#include <stdio.h>

void bubbleSort(int arr[], int n){ 
	int i, j, temp;
	for (i = 0; i < n-1; i++){
	for (j = 0; j < n-i-1; j++){
		if (arr[j] < arr[j+1]){
			temp = arr[j];
			arr[j] = arr[j+1];
			arr[j+1] = temp;
			}
		}
	}
}
int main(){
	int arr[] = {64, 34, 25, 12, 22, 11, 90};
	int n = sizeof(arr)/sizeof(arr[0]);
	
	bubbleSort(arr, n);
	
	printf("내림차순 버블 정렬 : ");
	for (int i=0; i<n; i++){
		printf("%d ", arr[i]);
	}printf("\n");
	
	return 0;
}',
'primes = []
count = 0
num = 2

while count < 10:
    is_prime = True
    for i in range(count):
        if num % primes[i] == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)
        count += 1
    num += 1

print("소수 10개 출력:", end=" ")
for prime in primes:
    print(prime, end=" ")',
'내림차순 버블 정렬 : 90 64 34 25 22 12 11'
);

-- 상 4
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '상',
  '달팽이 배열',
  '4x4 달팽이배열을 만들어 이를 출력하는 프로그램을 작성하시오.<br>
(c언어, python)',
  '  1  2  3  4<br>
 12 13 14  5<br>
 11 16 15  6<br>
 10  9  8  7<br>',
  '#include <stdio.h>

int main() {
	int n = 4;
	int arr[n][n];
	int num = 1;
	int row_start = 0, row_end = n-1, col_start = 0, col_end = n-1;
	
	while (row_start <= row_end && col_start <= col_end) {
		for (int i = col_start; i <= col_end; i++) {
			arr[row_start][i] = num++;
		}
		row_start++;
	
		for (int i = row_start; i <= row_end; i++) {
			arr[i][col_end] = num++;
		}
		col_end--;

		for (int i = col_end; i >= col_start; i--) {
			arr[row_end][i] = num++;
		}
		row_end--;
 
		for (int i = row_end; i >= row_start; i--) {
			arr[i][col_start] = num++;
		}
		col_start++;
	}
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			printf("%3d", arr[i][j]);
		}
		printf("\n");
	}
	
	
	return 0;
}',
'def generate_spiral_array(n):
    spiral = [[0] * n for _ in range(n)]

    x, y = 0, 0
    dx, dy = 0, 1

    for num in range(1, n*n+1):
        spiral[x][y] = num
        nx, ny = x + dx, y + dy
        if nx < 0 or nx >= n or ny < 0 or ny >= n or spiral[nx][ny] != 0:
            dx, dy = dy, -dx
            nx, ny = x + dx, y + dy
        x, y = nx, ny
    return spiral

def print_spiral_array(spiral):
    for row in spiral:
        for num in row:
            print(f"{num:3}", end=" ")
        print()

n = 4
spiral = generate_spiral_array(n)

print_spiral_array(spiral)',
'  1  2  3  4
 12 13 14  5
 11 16 15  6
 10  9  8  7
'
);

-- 상 5
INSERT INTO q_list(q_level, q_name, q_content, ex_print, c_answer_code, p_answer_code, answer) VALUES 
(
  '상',
  '반복문 점찍기',
  '반복문을 이용하여 다음과 같은 다이아몬드를 출력하는 프로그램을 출력하시오.<br>
(c언어, python)',
  '   *<br>
  ***<br>
 *****<br>
 *****<br>
  ***<br>
   *',
  '#include <stdio.h>
int main() {
	int i, j, k;
	int n = 3;
	
	for(i = 0; i < n; i++) {
		for(j = 0; j < n-i; j++) {
			printf(" ");
		}
		for(k = 0; k < 2*i+1; k++) {
			printf("*");
		}
		printf("\n");
	}
	
	for(i = n-1; i >= 0; i--) {
		for(j = n-i; j > 0; j--) {
			printf(" ");
		}
		for(k = 2*i+1; k > 0; k--) {
			printf("*");
		}
		printf("\n");
	}
	return 0;
}',
'n = 3

for i in range(n):
    for j in range(n-i):
        print(" ", end="")
    for k in range(2*i+1):
        print("*", end="")
    print()

for i in range(n-1, -1, -1):
    for j in range(n-i):
        print(" ", end="")
    for k in range(2*i+1):
        print("*", end="")
    print()',
'   *
  ***
 *****
 *****
  ***
   *
'
);