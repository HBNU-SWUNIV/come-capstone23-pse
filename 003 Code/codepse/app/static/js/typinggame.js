const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
// 메뉴바 스크롤 애니메이션

  // DOM 요소들 선택
  const languageTag = document.querySelector(".language span b"); // 언어 표시
  const descriptionTag = document.querySelector(".code-description"); // 코드 설명
  const typingText = document.querySelector(".typing-text p"), // 사용자가 타이핑할 텍스트
  inpField = document.querySelector(".wrapper .input-field"), // 사용자 입력 필드
  tryAgainBtn = document.querySelector(".content button"), // 다시 시도 버튼
  timeTag = document.querySelector(".timeLeft span b"); // 남은 시간 표시
  
  // 게임 관련 변수 초기화
  let timer, // 타이머 변수
    maxTime = 100, // 최대 시간 설정
    timeLeft = maxTime, // 남은 시간
    charIndex = 0; // 현재 문자의 인덱스
    errors = 0; // 사용자 오류 횟수
    isTyping = 0; // 사용자가 타이핑 중인지 여부
  
  // 서버에서 타이핑 게임에 사용될 문단 로드
  function loadParagraph() {
    fetch('/api/get_typinggame_questions') // 서버 API 호출
    .then(response => response.json()) // 응답을 JSON 형태로 변환
    .then(data => {
      const code = data.code.split("\n");  // 코드 줄바꿈 분할
      const language = data.language;  // 코드 언어 정보
      const description = data.description; // 코드 설명

      typingText.innerHTML = "";  // 이전 코드 삭제
      languageTag.innerText = language;  // 언어 표시
      descriptionTag.innerText = description;  // 코드 설명 표시

    // 코드의 각 줄을 처리
    code.forEach((line, lineIndex) => {
      // 각 줄의 문자를 처리
      line.split("").forEach((char) => {
        let span = `<span data-line="${lineIndex}">${char === ' ' ? '&nbsp;' : char}</span>`;
        typingText.innerHTML += span;
      });
      // 각 줄 끝에 줄바꿈 추가 (마지막 줄 제외)
      if(lineIndex < code.length-1) {
        typingText.innerHTML += '<span class="line-end" data-line="' + lineIndex + '">&#9166;</span><br>'; // add newline symbol after each line except the last one
      }
    });
  
    // 첫 번째 문자에 활성 클래스 추가
    typingText.querySelectorAll("span")[0].classList.add("active");
    // 키보드 누를 때와 텍스트 클릭 시 입력 필드에 포커스
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
  
      inpField.value = ""; // 새 문단이 로드될 때마다 입력 필드 초기화
  });
  }
  
  
  // 주 로직을 담당하는 함수
  function initTyping() {
    let characters = typingText.querySelectorAll("span"); // 현재 타이핑할 문자들
    let typedChar = inpField.value.split("")[charIndex]; // 사용자가 입력한 현재 문자
  
    // 새 줄로 이동했는지 확인
    if (typedChar === '\n') { 
      const currentLine = characters[charIndex].getAttribute('data-line');
      const nextChar = characters[charIndex + 1];
      const nextLine = nextChar ? nextChar.getAttribute('data-line') : null;
    
      // 다음 문자가 다음 둘의 것이면 허용
      if (nextLine !== currentLine) {
        // 줄의 시작의 공백 건너뜀
        while (characters[charIndex + 1] && characters[charIndex + 1].innerHTML == '&nbsp;') {
          charIndex++;
          characters[charIndex].classList.add("correct"); // 공백 문자를 올바르게 타이핑했다고 표시
        }
      } else {
        errors++;
        characters[charIndex].classList.add("incorrect");
        charIndex++;
        return;
      }
    }
    
    if (charIndex < characters.length) {
      // 시간 끝나면 게임 중지
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
  