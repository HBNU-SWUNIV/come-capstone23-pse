let allQuestions  = [
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int a = 5;<pre>
            printf("%d", a>0?a:-a);<pre>
            return 0;<pre>
        }
        `, 
        answer: "5" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            char str[] = "OpenAI";<pre>
            printf("%c", str[4]);<pre>
            return 0;<pre>
        }
        `, 
        answer: "A" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int a = 10, b = 20;<pre>
            a = a ^ b;<pre>
            b = a ^ b;<pre>
            a = a ^ b;<pre>
            printf("%d %d", a, b);<pre>
            return 0;<pre>
        }
        `, 
        answer: "20 10" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int num = 153, originalNum, remainder, result = 0;<pre>
            originalNum = num;<pre>
            while (originalNum != 0) {<pre>
                remainder = originalNum%10;<pre>
                result += remainder*remainder*remainder;<pre>
                originalNum /= 10;<pre>
            }<pre>
            if(result == num)<pre>
                printf("%d is an Armstrong number.", num);<pre>
            else<pre>
                printf("%d is not an Armstrong number.", num);<pre>
            return 0;<pre>
        }
        
        `, 
        answer: "153 is an Armstrong number" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int n1 = 0, n2 = 1, n3, i;<pre>
            printf("%d %d", n1, n2);<pre>
            for(i=2; i<10; ++i) {<pre>
                n3 = n1 + n2;<pre>
                printf(" %d", n3);<pre>
                n1 = n2;<pre>
                n2 = n3;<pre>
            }<pre>
            return 0;<pre>
        }
        `, 
        answer: "0 1 1 2 3 5 8 13 21 34" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int num = 10, fact = 1, i;<pre>
            for(i=1; i<=num; i++){<pre>
                fact *= i;<pre>
            }<pre>
            printf("Factorial of %d is %d", num, fact);<pre>
            return 0;<pre>
        }
        
        `, 
        answer: "Factorial of 10 is 3628800" 
    },

    { 
        language: "java",
        question: `언어: Java <pre><pre>

        public class HelloWorld {<pre>
            public static void main(String[] args) {<pre>
                int a = 5;<pre>
                int b = 10;<pre>
                System.out.println(a + b);<pre>
            }<pre>
        }
           
        `, 
        answer: "15" 
    },

    { 
        language: "java",
        question: `언어: Java <pre><pre>

        public class LoopExample {<pre>
            public static void main(String[] args) {<pre>
                for (int i = 0; i < 5; i++) {<pre>
                    System.out.print(i + " ");<pre>
                }<pre>
            }<pre>
        }    
        `, 
        answer: "0 1 2 3 4" 
    },

    { 
        language: "java",
        question: `언어: Java <pre><pre>

        public class IncrementExample {<pre>
            public static void main(String[] args) {<pre>
                int a = 10;<pre>
                int b = a++;<pre>
                System.out.println(a + " " + b);<pre>
            }<pre>
        } 
        `, 
        answer: "1110" 
    },

    { 
        language: "java",
        question: `언어: Java <pre><pre>

        public class ArmstrongNumber {<pre>
            public static void main(String[] args) {<pre>
                int num = 153, originalNum, remainder, result = 0;<pre>
                originalNum = num;<pre>
                while (originalNum != 0) {<pre>
                    remainder = originalNum % 10;<pre>
                    result += remainder * remainder * remainder;<pre>
                    originalNum /= 10;<pre>
                }<pre>
                if (result == num)<pre>
                    System.out.println(num + " is an Armstrong number.");<pre>
                else<pre>
                    System.out.println(num + " is not an Armstrong number.");<pre>
            }<pre>
        }    
        `, 
        answer: "153 is an Armstrong number" 
    },

    { 
        language: "java",
        question: `언어: Java <pre><pre>

        public class ArraySum {<pre>
            public static void main(String[] args) {<pre>
                int[] numbers = {5, 2, 9, 7, 3};<pre>
                int sum = 0;<pre>
        
                for (int number : numbers) {<pre>
                    sum += number;<pre>
                }<pre>
        
                System.out.println("배열 요소의 합: " + sum);<pre>
            }<pre>
        }<pre> 
        `, 
        answer: "배열 요소의 합: 26" 
    },
    
    { 
        language: "python",
        question: `언어: Python <pre><pre>

        def binary_search(arr, target):<pre>
        left = 0<pre>
        right = len(arr) - 1<pre>
    
        while left <= right:<pre>
            mid = (left + right) // 2<pre>
    
            if arr[mid] == target:<pre>
                return mid<pre>
    
            if arr[mid] < target:<pre>
                left = mid + 1<pre>
            else:<pre>
                right = mid - 1<pre>
    
        return -1<pre>
    
    numbers = [2, 5, 7, 11, 13, 17, 19]<pre>
    target = 13<pre>
    index = binary_search(numbers, target)<pre>
    
    if index != -1:<pre>
        print(target, "의 인덱스:", index)<pre>
    else:<pre>
        print(target, "을(를) 찾을 수 없습니다.") <pre>     
        `, 
        answer: "13 의 인덱스: 4" 
    },
    { 
        language: "python",
        question: `언어: Python <pre><pre>

        def multiply(a, b):<pre>
            return a * b<pre>

        result = multiply(4, 6)<pre>
        print(result)<pre>
        `, 
        answer: "24" 
    },

    { 
        language: "python",
        question: `언어: Python <pre><pre>

        num = 7<pre>
        if num % 2 == 0:<pre>
            print("jumin")<pre>
        else:<pre>
            print("jiyoon")<pre>
        `, 
        answer: "jiyoon" 
    },
    { 
        language: "python",
        question: `언어: Python <pre><pre>

            def factorial(n):<pre>
            if n == 0:<pre>
                return 1<pre>
            else:<pre>
                return n * factorial(n - 1)<pre>
        
        result = factorial(5)<pre>
        print(result)<pre>
        `, 
        answer: "120" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h> <pre>
        int main() {<pre>
            int a = 5;<pre>
            int b = 10;<pre>
            printf("%d", a+b);<pre>
            return 0;<pre>
        }
        `, 
        answer: "15" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int i;<pre>
            for(i=0; i<5; i++) {<pre>
                printf("%d ", i);<pre>
            }<pre>
            return 0;<pre>
        }<pre>
        }
        `, 
        answer: "01234" 
    },
    { 
        language: "c",
        question: `언어: C <pre><pre>

        #include<stdio.h><pre>
        int main() {<pre>
            int a = 10;<pre>
            int b = a++;<pre>
            printf("%d %d", a, b);<pre>
            return 0;<pre>
        }
        `, 
        answer: "11 10" 
    }
];

let questions = [];  // Will be populated when user chooses a language
let userLanguage;  // To store user's chosen language

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let username;

function startQuiz() {
    username = document.getElementById("username").value;
    userLanguage = document.getElementById("languageSelect").value;  // Get user's language choice

     // 사용자가 "Random"을 선택한 경우 모든 언어의 질문을 포함, 아니라면 선택한 언어의 질문만 포함
  if(userLanguage === "random") {
    questions = allQuestions;
  } else {
    questions = allQuestions.filter(q => q.language === userLanguage);
  }
  questions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

    document.getElementById("login-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById("question").innerHTML = '<pre>' + questions[currentQuestionIndex].question + '</pre>';
    } else {
        document.getElementById("quiz-section").style.display = "none";
        let resultText = "문제를 모두 풀었습니다! Your score is: " + score + "<br/><br/>";
        for (let i = 0; i < questions.length; i++) {
            resultText += `<span class="highlight">Question: <br/>${questions[i].question}<br/><br/>Your answer: ${userAnswers[i].answer}<br/><br/><span class="correct-answer">Correct answer: ${questions[i].answer}</span><br/><br/>`;

        }
        document.getElementById("result").innerHTML = resultText;

        let leaderboard = JSON.parse(localStorage.getItem(userLanguage + "Leaderboard") || "[]");
        leaderboard.push({ username: username, score: score });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem(userLanguage + "Leaderboard", JSON.stringify(leaderboard));
            
        let leaderboardText = " ハ____ハ ｡ﾟﾟ･｡･ﾟﾟ｡<br> ꒰ ⬩ ω ⬩ ꒱  ˚｡.............｡˚ <br>| つ ~ good　ﾟ ･｡･ﾟ</br><h2>Leaderboard for " + userLanguage + "★</h2><br/><br/>";
        for (let i = 0; i < leaderboard.length; i++) {
            leaderboardText += `${i + 1}. ${leaderboard[i].username}: ${leaderboard[i].score}<br/><br/>`;  
        }
        document.getElementById("leaderboard").innerHTML = leaderboardText;

    }
}

function submitAnswer() {
    let userAnswer = document.getElementById("answer").value;
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        score++;
    }
    userAnswers.push({ answer: userAnswer });
    document.getElementById("answer").value = "";
    currentQuestionIndex++;
    loadQuestion();
}
