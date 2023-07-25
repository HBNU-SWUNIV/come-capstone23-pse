
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
    fetch('/api/get_typinggame_questions')
    .then(response => response.json())
    .then(data => {
      const code = data.code.split("\n");  // split with '\n' to handle each line
      const language = data.language;  // Get the language of the code
      const description = data.description;

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
  });
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
  
  
  