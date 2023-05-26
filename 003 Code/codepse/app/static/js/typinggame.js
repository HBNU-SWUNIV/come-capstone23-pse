const paragraphs = [
    {
      code: '#include <stdio.h>\nint main() {\nint num = 10;\nprintf("%d", num);\nreturn 0; }',
      language: 'C',
      description: '코드 설명: C언어에서 num 변수를 선언하고 10으로 초기화한 후, 이를 출력한다.'
    },
  
    {
      code: 'int arr[5] = {1, 2, 3, 4, 5};\nprintf("%d", arr[2]);',
      language: 'C',
      description: '코드 설명: 정수 배열을 선언하고 초기화한 후, 인덱스 2의 값을 출력한다.'
    },
  
    {
      code: 'String str1 = "Hello";\n String str2 = "World";\n boolean isEqual = str1.equals(str2);',
      language: 'Java',
      description: '코드 설명: str1과 str2라는 두 문자열을 비교하여 동일한지 확인. 동일하면 true를 반환하고, 그렇지 않으면 false를 반환한다.'
    },
  
    {
      code: 'for (int i = 0; i < 5; i++) {\nSystem.out.println(i);}',
      language: 'Java',
      description: '코드 설명: 0부터 4까지의 숫자를 출력. for 반복문은 초기화식, 조건식, 증감식을 지정하여 반복 작업을 수행한다.'
    },
  
    {
      code: 'int result = addNumbers(3, 5);\nSystem.out.println("덧셈 결과: " + result);',
      language: 'Java',
      description: '코드 설명: addNumbers()라는 이름의 메서드를 호출하고, 인수로 3과 5를 전달, 전달된 두 개의 숫자를 더한 결과를 반환하며, 이를 result 변수에 저장하여 출력한다.'
    },
  
    {
      code: 'String str1 = "def multiply(a, b):\nreturn a * b\nresult = multiply(3, 5)',
      language: 'python',
      description: '코드 설명: multiply()라는 이름의 함수를 정의하고, 인수로 받은 두 개의 숫자를 곱한 결과를 반환, 이후 result 변수에 함수 호출 결과를 저장한다.'
    },
  
    {
      code: 'student = {"name": "yujeong", "age": 25, "grade": "A"}\nprint(student["name"])',
      language: 'python',
      description: '코드 설명: student라는 딕셔너리에서 "name" 키에 해당하는 값을 출력. 딕셔너리는 키-값 쌍을 저장하며, 특정 키를 사용하여 해당 값에 접근할 수 있다.'
    },
  
    {
      code: 'String str1 = "with open("codepse.txt", "r") as file:\n contents = file.read()',
      language: 'python',
      description: '코드 설명: codepse.txt" 파일을 읽어서 contents 변수에 저장. open() 함수를 사용하여 파일을 열고, read() 메서드를 사용하여 파일 내용을 읽을 수 있다.'
    },
  
    {
      code: 'x = 10\nvalue = "Even" if x % 2 == 0 else "Odd"',
      language: 'python',
      description: '코드 설명: x가 짝수인지 홀수인지를 확인하여 value 변수에 "Even" 또는 "Odd" 값을 저장. 조건부 표현식을 사용하면 간결한 코드를 작성할 수 있다.'
    },
  
    {
      code: 'if (x > y) {\n  printf("x is greater than y\\n");\n}',
      language: 'C',
      description: '코드 설명: if문 예제: x가 y보다 큰 경우 메시지 출력'
    },
    {
      code: 'for (i = 0; i < 10; i++) {\n  printf("%d ", i);\n}',
      language: 'C',
      description: '코드 설명: for문 예제: 0부터 9까지 출력'
    },
  
    {
      code: 'let name = "John";\nconsole.log("Hello, " + name + "!");',
      language: 'JavaScript',
      description: '코드 설명: 변수 name 선언 및 출력'
    },
  
    {
      code: 'let name = "let numbers = [1, 2, 3, 4, 5];\nfor (let number of numbers) {\nconsole.log(number);}',
      language: 'JavaScript',
      description: '배열 numbers의 모든 요소를 순회하면서 각 요소를 콘솔에 출력한다.'
    },
  
    {
      code: 'let text = "Hello, World!";\nlet length = text.length;\nconsole.log("문자열 길이:", length);',
      language: 'JavaScript',
      description: '배열 numbers를 정렬하여 결과를 콘솔에 출력. sort() 메서드를 사용하여 배열을 정렬할 수 있다.'
    },
  
    {
      code: 'let numbers = [3, 1, 4, 2, 5];\nnumbers.sort();\nconsole.log(numbers);',
      language: 'JavaScript',
      description: '문자열 text의 길이를 확인하여 값을 출력한다.'
    },
  
    {
      code: 'let x: number = 5;\nlet y: number = 3;\nlet sum: number = x + y;\nconsole.log("두 수의 합:", sum);',
      language: 'TypeScript',
      description: '변수 x와 y의 값을 더하여 sum 변수에 저장하고, 결과를 콘솔에 출력한다.'
    },
  
    {
      code: 'for (let i: number = 0; i < 5; i++) {\nconsole.log(i);}',
      language: 'TypeScript',
      description: ' 0부터 4까지의 숫자를 출력. for 반복문을 사용하여 반복 작업을 수행한다.'
    },
  
  
  
  
  
  
  ];
  
  const languageTag = document.querySelector(".language span b");
  const descriptionTag = document.querySelector(".code-description");
  const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  timeTag = document.querySelector(".timeLeft span b");
  
  
  let timer,
    maxTime = 100,
    timeLeft = maxTime,
    charIndex = errors = isTyping = 0;
  
  function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const code = paragraphs[ranIndex].code.split("\n");  // split with '\n' to handle each line
    const language = paragraphs[ranIndex].language;  // Get the language of the code
    const description = paragraphs[ranIndex].description;
  
    typingText.innerHTML = "";  // Clear previous code
    languageTag.innerText = language;  // Set language
    descriptionTag.innerText = description;  // Set description
    
    // Handle each line
    code.forEach((line, lineIndex) => {
      line.split("").forEach((char) => {
        let span = `<span data-line="${lineIndex}">${char === ' ' ? '&nbsp;' : char}</span>`;
        typingText.innerHTML += span;
      });
      if(lineIndex < code.length-1) {
        typingText.innerHTML += '<span class="line-end" data-line="' + lineIndex + '">&#9166;</span><br>'; // add newline symbol after each line except the last one
      }
    });
  
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
  
      inpField.value = ""; // 새 문단이 로드될 때마다 입력 필드를 초기화합니다.
  }
  
  
  // Remove the handling of '\n' to '<br/>', it's unnecessary
  function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
  
    if (typedChar === '\n') { // if user typed newline
      const currentLine = characters[charIndex].getAttribute('data-line');
      const nextChar = characters[charIndex + 1];
      const nextLine = nextChar ? nextChar.getAttribute('data-line') : null;
    
      // If the next character is from the next line, allow to proceed.
      // Otherwise, ignore the newline.
      if (nextLine !== currentLine) {
        // Jump over indentation (spaces) at the beginning of the line
        while (characters[charIndex + 1] && characters[charIndex + 1].innerHTML == '&nbsp;') {
          charIndex++;
          characters[charIndex].classList.add("correct"); // 공백 문자를 '올바르게' 타이핑했다고 표시합니다.
        }
      } else {
        errors++;
        characters[charIndex].classList.add("incorrect");
        charIndex++;
        return;
      }
    }
    
    if (charIndex < characters.length) {
      if (timeLeft <= 0) {
        clearInterval(timer);
        isTyping = false;
        showRestartMessage();
        return;
      }
      if (!isTyping) {
          timer = setInterval(initTimer, 1000);
          isTyping = true;
      }
        if (typedChar == null) {
            // 백스페이스나 딜리트 키를 눌렀을 때 처리
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    errors--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
          } else {
            if (characters[charIndex].innerText == typedChar || 
              (characters[charIndex].innerHTML == '&nbsp;' && typedChar == ' ')) {
              // 정확히 타이핑한 경우 처리
              characters[charIndex].classList.add("correct");
            } else {
              // 오타가 있는 경우 처리
              errors++;
              if (characters[charIndex].classList.contains("line-end")) {
                characters[charIndex].classList.remove("active-line-end");
                characters[charIndex].classList.add("incorrect-line-end");
              } else {
                characters[charIndex].classList.add("incorrect");
              }
            }
            charIndex++;
            if (charIndex >= characters.length) {
              // 현재 문장의 마지막 문자까지 타이핑한 경우 다음 문장으로 전환
              loadParagraph();
              charIndex = 0;  // Add this line to reset the character index after loading a new paragraph
              characters = typingText.querySelectorAll("span"); // Add this line
              characters[charIndex].classList.add("active");
            }
  
          if (charIndex < characters.length - 1 && characters[charIndex + 1].classList.contains("line-end")) {
            characters[charIndex + 1].classList.add("active-line-end");
          }
          
        }
        characters.forEach(span => {
          span.classList.remove("active", "active-line-end", "invisible");
          if (span.classList.contains("line-end")) {
            span.classList.add("invisible");
          }
        });
        
        if (characters[charIndex].classList.contains("line-end")) {
          characters[charIndex].classList.add("active-line-end", "invisible");
        } else {
          characters[charIndex].classList.add("active");
        }
  
      } else {
        if (timeLeft <= 0) {
          clearInterval(timer);
          isTyping = false;
          showRestartMessage();
        }
      }
    }
  
  function showRestartMessage() {
    clearInterval(timer);
    let restart = confirm("타이머가 종료되었습니다! 다시 시작하시겠습니까?");
    if (restart) {
      resetTest();
    }
    else {
      window.location.href = "."; // 여기에 메인페이지 연결해두기
    }
  
  }
  
  
  function initTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeTag.innerText = timeLeft;
  
      // initTyping() 함수에서 타이머 만료 메시지를 처리하므로 여기서는 처리하지 않음
    }
  }
  
  function resetTest() {
    loadParagraph();
    clearInterval(timer);
    charIndex = errors = isTyping = 0;
    inpField.value = "";
    timeLeft = maxTime;
    timeTag.innerText = timeLeft;
    isTyping = false; // Add this line to indicate that typing has not started yet
  }
  
  loadParagraph();
  inpField.addEventListener("input", () => {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    initTyping();
  });
  tryAgainBtn.addEventListener("click", resetTest);
  
  
  