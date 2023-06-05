let currentQuestion; // 현재 플레이어가 풀고 있는 문제
let allQuestions = [  // 문제들의 리스트. 각 문제는 텍스트, 코드, 정답, 그리고 선택 가능한 옵션들을 포함
{
  "language": "java",
  "text": "Java에서 Scanner를 사용하여 문장을 입력받고 출력하는 코드를 완성하세요.",
  "code": "{[import]} java.util.Scanner;\npublic class {[Main]} {\npublic static void {[main]}(String[] {[args]}) {\n{[Scanner]} sc = new Scanner({[System]}.in);\nSystem.out.print(\"문장을 입력하세요: \");\nString sentence = sc.nextLine();\nSystem.out.println(\"입력한 문장: \" + sentence);\nsc.{[close]}();\n}\n}",
  "answers": {
    "import": "import",
    "Main": "Main",
    "main": "main",
    "args": "args",
    "Scanner": "Scanner",
    "System": "System",
    "close": "close"
  },
  "options": ["import", "Main", "main", "args", "Scanner", "System", "close", "String", "nextInt", "nextLine", "void", "class", "add"]
},

{
  "language": "python",
  "text": "Python에서 문자열을 거꾸로 출력하는 코드를 완성하세요.",
  "code": "def reverse_string(input_string):\n    reversed_string = ''\n    {[for]} char {[in]} input_string:\n        reversed_string = char + reversed_string\n    {[print]}(reversed_string)\n\nreverse_string(\"Hello, World!\")",
  "answers": {
    "for": "for",
    "in": "in",
    "print": "print"
  },
  "options": ["for", "in", "print", "while", "if", "else", "True", "False", "reverse", "split", "join"]
},
{
  "language": "javascript",
  "text": "JavaScript에서 배열의 합을 계산하는 함수를 작성하세요.",
  "code": "function sumArray(array) {\n    var sum = 0;\n    {[for]} (var i = 0; i < array.length; i++) {\n        sum += array[i];\n    }\n    return sum;\n}\n\nvar numbers = [1, 2, 3, 4, 5];\nconsole.log(sumArray(numbers));",
  "answers": {
    "for": "for"
  },
  "options": ["for", "while", "if", "else", "function", "return", "var", "let", "const", "forEach", "reduce", "push"]
},
{
  "language": "java",
  "text": "Java에서 1부터 10까지의 숫자를 출력하는 코드를 작성하세요.",
  "code": "{[for]} ({[int]} i = 1; i <= 10; i++) {\n    System.out.println(i);\n}",
  "answers": {
    "for": "for",
    "int": "int"
  },
  "options": ["int", "float", "double", "String", "System", "out", "println", "for", "while", "if", "else", "true"]
},
{
  "language": "c#",
  "text": "C#에서 1부터 10까지의 숫자를 출력하는 코드를 작성하세요.",
  "code": "for ({[int]} i = 1; i <= 10; i++)\n{\n    {[Console]}.{[WriteLine]}(i);\n}",
  "answers": {
    "int": "int",
    "Console": "Console",
    "WriteLine": "WriteLine"
  },
  "options": ["int", "float", "double", "string", "Console", "WriteLine", "for", "while", "if", "else", "true"]
},
{
  "language": "javascript",
  "text": "JavaScript에서 문자열의 길이를 출력하는 코드를 작성하세요.",
  "code": "var {[str]} = 'Hello, World!';\nconsole.{[log]}(str.length);",
  "answers": {
    "str": "str",
    "log": "log"
  },
  "options": ["var", "str", "Hello", "World", "length", "console", "log", "if", "else", "function"]
},
{
  "language": "python",
  "text": "Python에서 입력한 두 숫자를 더하는 함수를 작성하세요.",
  "code": "{[def]} add_numbers(a, b):\n    {[return]} a + b\n\n{[print]}(add_numbers(5, 3))",
  "answers": {
    "def": "def",
    "return": "return",
    "print": "print"
  },
  "options": ["def", "return", "print", "if", "else", "for", "while", "True", "False", "input", "str", "int"]
},
{
  "language": "python",
  "text": "Python에서 사용자로부터 입력을 받아 출력하는 코드를 완성하세요.",
  "code": "{[input]} name = {[input]}(\"이름을 입력하세요: \")\n{[print]}(\"당신의 이름은: \" + name)",
  "answers": {
    "input": "input",
    "print": "print"
  },
  "options": ["input", "print", "name", "return", "next", "main", "open", "close"]
},
{
  "language": "python",
  "text": "Python에서 클래스를 정의하고, 해당 클래스에 'hello'라는 메소드를 추가하는 코드를 완성하세요.",
  "code": "{[class]} MyClass:\n    def {[hello]}(self):\n        print('Hello, world!')",
  "answers": {
    "class": "class",
    "hello": "hello"
  },
  "options": ["class", "hello", "self", "print", "def", "MyClass", "init", "return"]
},
{
  "language": "java",
  "text": "Java에서 상속을 사용하여 부모 클래스의 메소드를 오버라이드하는 코드를 완성하세요.",
  "code": "{[public]} class Animal {\n    {[public]} void sound() {\n        System.out.println(\"This is an animal\");\n    }\n}\n\n{[public]} class Dog extends Animal {\n    {[@Override]}\n    {[public]} void sound() {\n        System.out.println(\"Dog barks\");\n    }\n}",
  "answers": {
    "public": "public",
    "@Override": "@Override"
  },
  "options": ["public", "class", "void", "System", "println", "@Override", "extends", "new"]
},
{
  "language": "python",
  "text": "Python에서 생성자, 소멸자, 그리고 'say_hello'라는 메소드를 가진 클래스를 정의하는 코드를 완성하세요.",
  "code": "{[class]} MyClass:\n    def {[__init__]}(self, name):\n        self.name = name\n\n    def {[__del__]}(self):\n        print(\"Deleting \" + self.name)\n\n    def {[say_hello]}(self):\n        print('Hello, ' + self.name)",
  "answers": {
    "class": "class",
    "__init__": "__init__",
    "__del__": "__del__",
    "say_hello": "say_hello"
  },
  "options": ["class", "__init__", "__del__", "say_hello", "self", "name", "print", "def"]
},
{
  "language": "javascript",
  "text": "JavaScript에서 비동기 작업을 처리하기 위해 Promise를 사용하는 코드를 완성하세요.",
  "code": "let promise = new {[Promise]}((resolve, reject) => {\n    let success = true;\n    if (success) {\n        resolve('Success!');\n    } else {\n        reject('Failure!');\n    }\n});\n\npromise.then((message) => {\n    console.{[log]}(message);\n}).catch((message) => {\n    console.{[log]}(message);\n});",
  "answers": {
    "Promise": "Promise",
    "log": "log"
  },
  "options": ["let", "promise", "new", "Promise", "resolve", "reject", "success", "then", "catch", "console", "log"]
},
{
  "language": "java",
  "text": "Java에서 스레드를 생성하고 시작하는 코드를 완성하세요.",
  "code": "{[public]} class MyThread extends Thread {\n    {[public]} void run() {\n        System.out.println(\"Thread is running.\");\n    }\n}\n\n{[public]} class Main {\n    {[public]} static void main(String[] args) {\n        MyThread mt = new MyThread();\n        mt.{[start]}();\n    }\n}",
  "answers": {
    "public": "public",
    "start": "start"
  },
  "options": ["public", "class", "extends", "Thread", "void", "run", "System", "println", "start", "new", "static", "main", "String"]
},
{
  "language": "c#",
  "text": "C#에서 예외를 던지고, 그 예외를 잡아 처리하는 코드를 완성하세요.",
  "code": "{[public]} class MainClass {\n    {[public]} static void Main(string[] args) {\n        try {\n            throw new {[Exception]}(\"An error occurred.\");\n        } catch (Exception e) {\n            Console.WriteLine(e.Message);\n        }\n    }\n}",
  "answers": {
    "public": "public",
    "Exception": "Exception"
  },
  "options": ["public", "class", "MainClass", "static", "void", "Main", "string", "args", "try", "throw", "new", "Exception", "catch", "Console", "WriteLine", "e", "Message"]
},
{
  "language": "c++",
  "text": "C++에서 템플릿을 사용하여 제네릭 함수를 정의하는 코드를 완성하세요.",
  "code": "{[template]} &lt;typename T&gt;\nT add(T a, T b) {\n    return a + b;\n}",
  "answers": {
    "template": "template"
  },
  "options": ["template", "typename", "T", "add", "a", "b", "return", "class", "public", "private", "void", "int", "float", "double"]
},
{
  "language": "python",
  "text": "Python에서 데코레이터를 작성하고, 해당 데코레이터를 사용하여 함수 실행 시간을 측정하는 코드를 완성하세요.",
  "code": "import time\n\ndef {[timer]}(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f'Function {func.__name__} took {end - start} seconds.')\n        return result\n    return wrapper\n\n{[@timer]}\ndef my_function():\n    time.sleep(1)",
  "answers": {
    "timer": "timer",
    "@timer": "@timer"
  },
  "options": ["import", "time", "timer", "@timer", "def", "wrapper", "return", "print", "func", "time.sleep", "result", "start", "end"]
},
{
  "language": "javascript",
  "text": "JavaScript에서 클래스를 정의하고, 해당 클래스에 생성자와 'sayHello' 메소드를 추가하는 코드를 완성하세요.",
  "code": "{[class]} MyClass {\n    {[constructor]}(name) {\n        this.name = name;\n    }\n\n    {[sayHello]}() {\n        console.log('Hello, ' + this.name);\n    }\n}",
  "answers": {
    "class": "class",
    "constructor": "constructor",
    "sayHello": "sayHello"
  },
  "options": ["class", "MyClass", "constructor", "sayHello", "this", "name", "console", "log"]
},
{
  "language": "java",
  "text": "Java에서 자신을 반환하여 메소드 체이닝을 가능하게 하는 코드를 완성하세요.",
  "code": "{[public]} class MyClass {\n    private int number;\n\n    {[public]} MyClass setNumber(int number) {\n        {[this]}.number = number;\n        return this;\n    }\n\n    {[public]} void printNumber() {\n        System.out.println(this.number);\n    }\n}",
  "answers": {
    "public": "public",
    "this": "this"
  },
  "options": ["public", "class", "MyClass", "private", "int", "number", "setNumber", "printNumber", "this", "return", "System", "out", "println"]
},
{
  "language": "c",
  "text": "C에서 라이브러리를 가져오고, switch-case 문을 이용하여 값에 따라 문자를 출력하는 코드를 완성하세요.",
  "code": "#include {[&lt;stdio.h&gt;]}\nvoid main( ){\n\tint a = 1, b = 3; \n\t{[switch]}(++a + b){ \n\tcase 3: printf(\"A\"); \n\tcase 4: printf(\"B\");\n\t\tbreak; \n\tcase 5: printf(\"C\"); \n\tdefault: printf(\"E\");\n\t}\n}",
  "answers": {
    "<stdio.h>": "<stdio.h>",
    "switch": "switch"
  },
  "options": ["&lt;stdio.h&gt;", "void", "main", "int", "a", "b", "switch", "case", "printf", "break", "default", "return"]
},
{
  "language": "java",
  "text": "Java에서 클래스를 정의하고, do-while 문을 이용하여 누적 합계를 계산하고 출력하는 코드를 완성하세요.",
  "code": "public {[class]} Problem{\n    public static void main(String[] args){\n        int i = 0, hap = 0;\n        do{\n            ++i;\n            hap += i;\n        } {[while]}(i<5);\n        System.out.{[println]}(\"%d, %d\\n\", i, hap);\n    } \n}",
  "answers": {
    "class": "class",
    "while": "while",
    "println": "println"
  },
  "options": ["class", "public", "static", "void", "main", "String", "args", "int", "i", "hap", "do", "while", "System", "out", "println"]
},
{
  "language": "c",
  "text": "C에서 조건문을 이용하여 변수 'a'가 짝수인지 홀수인지 판단하는 코드를 완성하세요.",
  "code": "#include &lt;stdio.h&gt;\n\nvoid main() {\n  int a = 10;\n\n  if ( {[a % 2 == 0]} ) \n    printf(\"짝수\\n\");\n  else\n    printf(\"홀수\\n\");\n}",
  "answers": {
    "a % 2 == 0": "a % 2 == 0"
  },
  "options": ["#include", "&lt;stdio.h&gt;", "void", "main", "int", "a", "if", "printf", "else", "return", "%", "==", "0", "a % 2 == 0"]
},
{
  "language": "java",
  "text": "Java에서 인터페이스를 정의하고, 해당 인터페이스를 구현하는 클래스를 작성하는 코드를 완성하세요.",
  "code": "interface ICar { \n    void move(); \n}\n\nclass ConCar {[implements]} ICar { \n    public void move() { \n        System.out.println(\"이동합니다\"); \n    } \n}\n\nclass Main { \n    public {[static]} void main(String args[]) { \n        ICar car = new ConCar(); \n        car.move();\n    } \n}",
  "answers": {
    "implements": "implements",
    "static": "static"
  },
  "options": ["interface", "ICar", "void", "move", "class", "ConCar", "implements", "public", "System", "out", "println", "Main", "static", "void", "main", "String", "args", "ICar", "car", "new", "ConCar"]
},
{
  "language": "c++",
  "text": "C++에서 조건문을 이용하여 입력받은 변수 'a'가 짝수이며 10보다 큰지 판단하는 코드를 완성하세요.",
  "code": "#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n  \n  int a;\n  \n  scanf(\"%d\", &a);\n\n  if ({[a % 2 == 0 && a > 10]})\n    printf(\"Here\");\n}",
  "answers": {
    "a % 2 == 0 && a > 10": "a % 2 == 0 && a > 10"
  },
  "options": ["#include", "&lt;iostream&gt;", "using", "namespace", "std", "int", "main", "a", "scanf", "%d", "&a", "if", "printf", "Here", "%", "&&", ">", "10", "return", "a % 2 == 0 && a > 10"]
},
{
  "language": "sql",
  "text": "SQL에서 특정 조건에 맞는 학생의 학번을 조회하는 코드를 완성하세요.",
  "code": "SELECT 학번\nFORM 학생\n{[WHERE]} 이름 {[LIKE]} '이%';",
  "answers": {
    "WHERE": "WHERE",
    "LIKE": "LIKE"
  },
  "options": ["SELECT", "학번", "FROM", "학생", "WHERE", "이름", "LIKE", "AND", "OR", "NOT", "IN", "BETWEEN", "AS", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
},
{
  "language": "sql",
  "text": "SQL에서 특정 과목의 평균 학점을 학번별로 계산하는 코드를 완성하세요.",
  "code": "SELECT 학번, AVG(학점) as 평균\n{[FROM]} 성적\nWHERE 과목 {[IN]}('컴퓨터구조', '알고리즘')\nGROUP {[BY]} 학번;",
  "answers": {
    "FROM": "FROM",
    "IN": "IN",
    "BY": "BY"
  },
  "options": ["SELECT", "학번", "AVG", "학점", "as", "평균", "FROM", "성적", "WHERE", "과목", "IN", "GROUP", "BY", "AND", "OR", "NOT", "BETWEEN", "LIKE", "HAVING", "ORDER BY", "LIMIT"]
},
{
  "language": "sql",
  "text": "SQL에서 '컴퓨터 구조' 과목의 성적을 학점 순으로 정렬하는 코드를 완성하세요.",
  "code": "{[SELECT]} 학번, 학점\nFROM 성적\nWHERE 과목=\"컴퓨터 구조\"\n{[ORDER]} BY 학점 {[ASC]};",
  "answers": {
    "SELECT": "SELECT",
    "ORDER": "ORDER",
    "ASC": "ASC"
  },
  "options": ["SELECT", "학번", "학점", "FROM", "성적", "WHERE", "과목", "=", "컴퓨터 구조", "ORDER", "BY", "ASC", "DESC", "LIMIT", "GROUP BY", "HAVING", "IN", "LIKE", "BETWEEN", "AND", "OR"]
},
{
  "language": "sql",
  "text": "SQL에서 '성적' 테이블에서 중복 없이 과목을 조회하는 코드를 완성하세요.",
  "code": "SELECT {[DISTINCT]} 과목\nFROM 성적;",
  "answers": {
    "DISTINCT": "DISTINCT"
  },
  "options": ["SELECT", "DISTINCT", "과목", "FROM", "성적", "WHERE", "ORDER BY", "GROUP BY", "HAVING", "LIKE", "IN", "AND", "OR", "NOT", "BETWEEN", "LIMIT"]
},
{
  "language": "sql",
  "text": "SQL에서 '고객' 테이블에서 나이가 50세에서 59세 사이이며, 성별이 '남'인 고객의 이름을 조회하는 코드를 완성하세요.",
  "code": "SELECT 이름\nFROM 고객\nWHERE 나이 {[BETWEEN]} 50 AND 59\n{[AND]} 성별='남';",
  "answers": {
    "BETWEEN": "BETWEEN",
    "AND": "AND"
  },
  "options": ["SELECT", "이름", "FROM", "고객", "WHERE", "나이", "BETWEEN", "AND", "성별", "=", "남", "OR", "IN", "LIKE", "NOT", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
},
{
  "language": "sql",
  "text": "SQL에서 '학생' 테이블의 '학번' 칼럼에 인덱스를 생성하고, 그 인덱스를 삭제하는 코드를 완성하세요.",
  "code": "{[CREATE]} INDEX INDEX_STUDENT ON 학생(학번);\nDROP {[INDEX]} INDEX_STUDENT ON 학생;",
  "answers": {
    "CREATE": "CREATE",
    "INDEX": "INDEX"
  },
  "options": ["CREATE", "INDEX", "INDEX_STUDENT", "ON", "학생", "학번", "DROP", "TABLE", "VIEW", "DATABASE", "TRIGGER", "ALTER", "INSERT", "UPDATE", "DELETE"]
}
];

let questions = [];  // Will be populated when user chooses a language
let userLanguage;  // To store user's chosen language
let restartButton = document.getElementById("restartButton");
let checkButton = document.getElementById("checkButton");
let nextButton = document.getElementById("nextButton");
let blanks = document.getElementsByClassName("blank"); // 코드 내의 빈 칸들
let score = 0; // 점수를 저장할 변수
let timer = null; // 타이머를 저장할 변수
let startTime = null;
let countdown = null;
let answeredQuestions = []; // 플레이어가 풀었던 문제들을 저장하는 배열

let username;

// 문제와 그 선택 가능한 옵션들을 무작위로 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 문제를 화면에 표시하는 함수
function displayQuestion() {
  // 현재 문제의 텍스트를 "question" ID를 가진 HTML 요소에 표시
  document.getElementById("question").innerText = currentQuestion.text;

  // 문제 코드를 분해하고 빈칸 ID를 추출
  const codeParts = currentQuestion.code.split("{[");
  const blankIds = currentQuestion.code.match(/\{\[([^\]]+)\]\}/g).map((x) => x.slice(2, -2));

  // 빈칸을 HTML로 변환하고 코드를 다시 조립
  let codeHTML = codeParts[0];
  for (let i = 1; i < codeParts.length; i++) {
    const part = codeParts[i].split("]}");
    const blankId = blankIds[i - 1];
    codeHTML += `<span id="blank_${blankId}" class="blank" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`;
    codeHTML += part[1];
  }
  codeHTML = codeHTML.replace(/\n/g, "<br>");

  // 변환된 코드를 화면에 표시
  document.getElementById("dropzone").innerHTML = codeHTML;

  // 옵션을 섞어서 화면에 표시
  const shuffledOptions = [...currentQuestion.options];
  shuffleArray(shuffledOptions);
  const optionsHTML = shuffledOptions
    .map(
      (option) =>
        `<span class="option" draggable="true" ondragstart="drag(event)">${option}</span>`
    )
    .join(" ");
  document.getElementById("options").innerHTML = optionsHTML;

  // 결과를 초기화하고 버튼 상태를 설정
  document.getElementById("result").innerText = "";
  checkButton.disabled = false;
  nextButton.disabled = true;
  checkButton.style.display = "inline-block"; 

   // 빈칸을 드래그 가능하도록 설정
  for (let i = 0; i < blanks.length; i++) {
    blanks[i].setAttribute("draggable", "true");
    blanks[i].style.width = "100px"; // 너비 조절
  }
}

// 드래그 시작 시 호출되는 함수
function drag(event) {
  event.dataTransfer.setData("text", event.target.textContent);
}

// 드래그 중 드랍 가능한 영역 위에 있을 때 호출되는 함수
function allowDrop(event) {
  if (event.target.classList.contains("blank")) {
    event.preventDefault();
  }
}


// 드랍 발생 시 호출되는 함수
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  event.target.innerText = data;
  event.target.style.backgroundColor = "#4CAF50";
  event.target.setAttribute("draggable", "false");
}

// 플레이어의 답을 확인하는 함수, 사용자가 선택한 답과 정답을 비교
function checkAnswer() {
  let correct = true;
  const playerAnswers = {};

  // 각각의 빈칸을 반복하며 사용자의 답과 실제 답을 비교
  for (let i = 0; i < blanks.length; i++) {
    const playerAnswer = blanks[i].innerText;
    playerAnswers[blanks[i].id.slice(6)] = playerAnswer;

    // 사용자의 답이 맞는지 확인
    if (playerAnswer !== currentQuestion.answers[blanks[i].id.slice(6)]) {
      blanks[i].style.backgroundColor = "#e74f4f"; // 틀린 경우, 빈칸의 배경색을 빨간색으로 변경
      correct = false;
    } else {
      blanks[i].style.backgroundColor = "#4ec460"; // 맞는 경우, 빈칸의 배경색을 초록색으로 변경
    }
  }

  // 모든 답을 확인한 후 결과를 표시
  if (correct) {
    document.getElementById("result").innerText = "맞았습니다!"; // 모든 답이 정확한 경우, "맞았습니다!"를 출력
    score++;
  } else {
    document.getElementById("result").innerText = "틀렸습니다."; // 하나라도 틀린 경우, "틀렸습니다."를 출력
  }

  // 답을 확인한 후에는 더 이상 답을 변경할 수 없도록 함
  for (let i = 0; i < blanks.length; i++) {
    blanks[i].ondrop = null;
    blanks[i].ondragover = null;
  }

  // 답을 확인한 후에 현재 문제와 사용자의 답을 저장
  answeredQuestions.push({ 
    question: currentQuestion,
    playerAnswers: playerAnswers,
  });

  checkButton.disabled = true;
  nextButton.disabled = false;
}

// 다음 문제를 불러오는 함수
function nextQuestion() {
  if (questions.length === 0) {
    // 모든 문제를 다 풀었을 경우의 처리
    document.getElementById("question").innerText = "모든 문제를 완료했습니다!";
    document.getElementById("dropzone").innerHTML = "";
    document.getElementById("result").innerText = "";
    document.getElementById("options").innerHTML = "";
    checkButton.style.display = "none";
    nextButton.style.display = "none";
    return;
    }
    
    // 남은 문제들 중에서 무작위로 하나를 선택
    const index = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[index];
    questions.splice(index, 1);
    
    // 선택한 문제를 화면에 표시
    displayQuestion();
    }
    
    // 각 버튼에 이벤트 리스너를 설정
    nextButton.addEventListener("click", nextQuestion);
    checkButton.addEventListener("click", checkAnswer);

    // 게임을 시작하는 함수
    function startGame() {
      console.log("startGame() called"); 
      // Remove previous end state elements
      const endStateElements = document.querySelectorAll("#endStateElement");
      for (let i = 0; i < endStateElements.length; i++) {
        endStateElements[i].remove();
      }
      nextQuestion();
      
      // 점수와 답안을 초기화
      score = 0;
      answeredQuestions = [];  // Reset the answeredQuestions array

      // 시작 버튼과 점수 표시를 숨기고, 다음 문제 버튼을 표시
      document.getElementById("restartButton").style.display = "none";
      document.getElementById("scoreDisplay").style.display = "none";
      nextButton.style.display = "inline-block";  // Make the 'Next Question' button visible
      
      // 타이머를 설정
      let timeLeft = 6; // 게임 시간을 저장할 변수를 추가합니다.
      countdown = setInterval(function() {
        document.getElementById("timer").innerText = `Timer : ${timeLeft} `;
        timeLeft--; // 시간 감소
        if (timeLeft < 0) {
          clearInterval(countdown); // 타이머 멈춤
          showEndState(); // 게임이 종료되면 showEndState() 함수를 호출합니다.
        }
      }, 1000); 
    }
    
    // 다시 시작 버튼을 눌렀을 때 페이지를 새로고침
    document.getElementById("restartButton").addEventListener("click", function() {
      location.reload();
      document.getElementById("result-section").style.display = "none";
      document.getElementById("quiz-section").style.display = "none";
      document.getElementById("login-section").style.display = "block"; // 로그인 섹션을 다시 보여줍니다.
    });

    // 게임이 종료된 후의 상태를 보여주는 함수
    function showEndState() {
      clearInterval(timer); // 타이머를 중지
      // 중복된 답변을 제거
      answeredQuestions = Array.from(new Set(answeredQuestions.map(JSON.stringify))).map(JSON.parse);
      // 화면의 요소들을 초기화하고 결과
      document.getElementById("timer").innerText = ""; // 타이머 텍스트 삭제
      document.getElementById("question").innerText = "게임이 끝났습니다!";
      document.getElementById("dropzone").innerHTML = ""
      document.getElementById("result").innerText = "";
      document.getElementById("options").innerHTML = "";
      document.getElementById("checkButton").style.display = "none";
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("restartButton").style.display = "inline-block";
      document.getElementById("result-section").style.display = "block";
      document.getElementById("scoreDisplay").innerHTML =  `|￣￣￣￣￣￣￣￣￣￣￣￣￣￣|<br>'당신은 ${score/2}문제를 맞췄습니다!'<br>|＿＿＿＿＿＿＿＿＿＿＿＿＿＿|<br>\\ (•◡•) /<br>\\       /`;
      document.getElementById("result1").style.display = "inline-block";
      document.getElementById("scoreDisplay").style.display = "block";
      
      
      
       // 모든 답변과 해당 질문들을 보여줌
       let questionNumber = 1;
       for (const answeredQuestion of answeredQuestions) {
        //이 부분은 각 질문과 답변을 화면에 표시하는 코드
        const separator = document.createElement("hr");
        separator.id = "endStateElement";
        separator.style.marginBottom = "20px";  // Add a bottom margin
        document.body.appendChild(separator);
        
        const questionElement = document.createElement("p");
        questionElement.id = "endStateElement";
        questionElement.style.marginBottom = "20px";  // Add a bottom margin
        questionElement.innerText = `${questionNumber}. ${answeredQuestion.question.text}`;
        document.body.appendChild(questionElement);
    
         const codeParts = answeredQuestion.question.code.split("{[");
         const blankIds = answeredQuestion.question.code.match(/\{\[([^\]]+)\]\}/g).map((x) => x.slice(2, -2));
    
         let codeHTML = codeParts[0];
         for (let i = 1; i < codeParts.length; i++) {
           const part = codeParts[i].split("]}");
           const blankId = blankIds[i - 1];
           
           let playerAnswer = answeredQuestion.playerAnswers[blankId];
           let correctAnswer = answeredQuestion.question.answers[blankId];
           let color = (playerAnswer === correctAnswer) ? '#4ec460' : '#e74f4f';
           if (playerAnswer !== correctAnswer) {
              playerAnswer = correctAnswer; // If answer is wrong, display correct answer
           }
           codeHTML += `<span class="blank" style="background-color: ${color}; width: 100px;">${playerAnswer}</span>`;
           codeHTML += part[1];
         }
    
         codeHTML = codeHTML.replace(/\n/g, "<br>");
    
         const codeElement = document.createElement("div");
         codeElement.id = "endStateElement";
         codeElement.style.marginBottom = "20px";  // Add a bottom margin
         codeElement.innerHTML = codeHTML;
         document.body.appendChild(codeElement);
    
         questionNumber++; // 질문 번호를 증가시킵니다.
       }
       // 닉네임 표시
  //document.getElementById("userRank").innerText = `내 닉네임: ${username}`;


  let leaderboard = JSON.parse(localStorage.getItem(userLanguage + "Leaderboard") || "[]");
  leaderboard.push({ username: username, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem(userLanguage + "Leaderboard", JSON.stringify(leaderboard));

  let leaderboardText = "<h2>Leaderboard for " + userLanguage + "</h2><br/><br/>";
  for (let i = 0; i < leaderboard.length; i++) {
      leaderboardText += `${i + 1}. ${leaderboard[i].username}: ${leaderboard[i].score}<br/><br/>`;  
  }
  document.getElementById("leaderboard").innerHTML = leaderboardText;

  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";
}
    // 퀴즈를 시작하는 함수
    function startQuiz() {
        document.getElementById("result-section").style.display = "none";
        username = document.getElementById("username").value;
        userLanguage = document.getElementById("languageSelect").value;  // Get user's language choice
        document.getElementById("login-section").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
      // 사용자가 "Random"을 선택한 경우 모든 언어의 질문을 포함, 아니라면 선택한 언어의 질문만 포함
      if(userLanguage === "random") {
      questions = allQuestions;
      } else {
        questions = allQuestions.filter(q => q.language === userLanguage);
      }
      
        startGame(); // '퀴즈 시작' 버튼을 누르면 startGame 함수를 호출합니다.
    }
    
    // 퀴즈 시작 버튼에 이벤트 리스너를 추가합니다.
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);