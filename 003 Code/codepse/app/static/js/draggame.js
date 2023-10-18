let currentQuestion; // 현재 문제
let allQuestions = [];
let questions = []; // 전체 문제
let userLanguage; // 사용자 언어
let restartButton = document.getElementById("restartButton"); // 재시작 버튼
let checkButton = document.getElementById("checkButton"); // 답 확인 버튼
let nextButton = document.getElementById("nextButton"); // 다음 문제 버튼
let blanks = document.getElementsByClassName("blank"); // 빈칸 요소
let score = 0; // 점수를 저장할 변수
let timer = null; // 타이머를 저장할 변수
let startTime = null;
let countdown = null; // 카운트다운 타이머
let answeredQuestions = []; // 플레이어의 답 저장 배열
let username;
let gameType = "drag";
let endStateShown = false;


// 문제와 선택 가능한 옵션들을 무작위로 섞는 함수
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

  const nextButton = document.getElementById("nextButton");
  nextButton.disabled = true;     // '다음 문제' 버튼 비활성화
  nextButton.style.backgroundColor = "gray";

  // 문제 코드를 분해하고 빈칸 ID를 추출
  const codeParts = currentQuestion.code.split("{[");
  const matchResult = currentQuestion.code.match(/\{\[([^\]]+)\]\}/g);
  const blankIds = matchResult ? matchResult.map((x) => x.slice(2, -2)) : [];

  // 빈칸을 HTML로 변환하고 코드를 다시 조립
  let codeHTML = codeParts[0];
  for (let i = 1; i < codeParts.length; i++) {
    const part = codeParts[i].split("]}");
    const blankId = blankIds[i - 1];
    codeHTML += `<span id="blank_${blankId}" class="blank" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`;
    codeHTML += part[1];
  }
  codeHTML = codeHTML.replace(/\n/g, "<br>");

  // 변환된 코드 화면에 표시
  document.getElementById("dropzone").innerHTML = codeHTML;

  // 옵션을 섞어 화면에 표시
  const shuffledOptions = [...currentQuestion.options];
  shuffleArray(shuffledOptions);
  const optionsHTML = shuffledOptions
    .map(
      (option) =>
        `<span class="option" draggable="true" ondragstart="drag(event)">${option}</span>`
    )
    .join(" ");
  document.getElementById("options").innerHTML = optionsHTML;

  // 결과 초기화 후 버튼 상태 설정
  document.getElementById("result").innerText = "";
  checkButton.disabled = false;
  nextButton.disabled = true;
  checkButton.style.display = "inline-block"; 

   // 빈칸 드래그 가능하도록 설정
  for (let i = 0; i < blanks.length; i++) {
    blanks[i].setAttribute("draggable", "true");
    blanks[i].style.width = "100px";
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

// 사용자의 답과 실제 답을 비교하는 함수
function compareAnswer(playerAnswer, actualAnswer, blankElement) {
  if (playerAnswer !== actualAnswer) {
    blankElement.style.backgroundColor = "#e74f4f"; // 틀린 경우 빈칸의 배경색을 빨간색으로 변경
    return false;
  } else {
    blankElement.style.backgroundColor = "#4ec460"; // 맞는 경우 빈칸의 배경색을 초록색으로 변경
    return true;
  }
}

// 플레이어의 답을 확인하는 함수, 사용자가 선택한 답과 정답을 비교
function checkAnswer() {
  console.log("Checking Answer...");
  let correctAnswersCount = 0;  // 올바른 답을 세기 위한 카운터
  const playerAnswers = {};

  // 각각의 빈칸을 반복하며 사용자의 답과 실제 답을 비교
  for (let i = 0; i < blanks.length; i++) {
    const playerAnswer = blanks[i].innerText;
    playerAnswers[blanks[i].id.slice(6)] = playerAnswer;

    // 사용자의 답이 맞는지 확인
    if (playerAnswer === currentQuestion.answers[blanks[i].id.slice(6)]) {
      blanks[i].style.backgroundColor = "#4ec460"; // 맞는 경우 빈칸의 배경색을 초록색으로 변경
      correctAnswersCount++; // 올바른 답의 개수를 증가
    } else {
      blanks[i].style.backgroundColor = "#e74f4f"; // 틀린 경우 빈칸의 배경색을 빨간색으로 변경
    }
  }

  // 모든 답을 확인한 후 결과를 표시
  if (correctAnswersCount === blanks.length) {
    document.getElementById("result").innerText = "맞았습니다!"; // 모든 답이 정확한 경우 "맞았습니다!" 출력
    score++;
  } else {
    document.getElementById("result").innerText = "틀렸습니다."; // 하나라도 틀린 경우 "틀렸습니다." 출력
  }

  // 답을 확인한 후에는 더 이상 답을 변경할 수 없음
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

  const nextButton = document.getElementById("nextButton");
  nextButton.disabled = false;
  nextButton.style.backgroundColor = "#9e88eb";
}

// 다음 문제를 불러오는 함수
function nextQuestion() {
  if (questions.length === 0) {
    // 모든 문제를 다 풀었을 경우 처리
    showEndState(); // 결과창 표시
    return;
    }
    
    // 남은 문제들 중에서 무작위로 하나 선택
    const index = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[index];
    questions.splice(index, 1);
    
    // 선택한 문제를 화면에 표시
    displayQuestion();
    }
    
    // 각 버튼에 이벤트 리스너를 설정
    nextButton.addEventListener("click", nextQuestion);

    // 게임 시작 함수
    function startGame() {
      endStateShown = false;
      console.log("startGame() called"); 

      // 이전 종료 상태의 요소들 제거
      const endStateElements = document.querySelectorAll("#endStateElement");
      for (let i = 0; i < endStateElements.length; i++) {
        endStateElements[i].remove();
      }
      nextQuestion();
      
      // 점수와 답안을 초기화
      score = 0;
      answeredQuestions = [];  // answeredQuestions 배열 초기화

      // 시작 버튼과 점수 표시 숨긴 후 다음 문제 버튼 표시
      document.getElementById("restartButton").style.display = "none";
      document.getElementById("scoreDisplay").style.display = "none";
      nextButton.style.display = "inline-block";  // 다음 버튼 표시
      
      // 게임 타이머 설정
      let timeLeft = 180;
      countdown = setInterval(function() {
        document.getElementById("timer").innerText = `Timer : ${timeLeft} `;
        timeLeft--; // 시간 감소
        if (timeLeft < 0) {
          clearInterval(countdown); // 타이머 멈춤
          showEndState(); // 게임 종료 시 상태 표시 함수 호출
        }
      }, 1000); 
    }
    
    // 다시 시작 버튼 클릭 시 페이지 새로고침
    document.getElementById("restartButton").addEventListener("click", function() {
      location.reload();
      document.getElementById("result-section").style.display = "none";
      document.getElementById("quiz-section").style.display = "none";
      document.getElementById("login-section").style.display = "block"; // 로그인 섹션을 다시 표시
    });

    // 게임 종료 상태 표시 함수
    function showEndState() {
      if (endStateShown) return;
      endStateShown = true;
      clearInterval(timer); // 타이머 중지
      // 중복된 답변 제거
      answeredQuestions = Array.from(new Set(answeredQuestions.map(JSON.stringify))).map(JSON.parse);
      // 화면의 요소들을 초기화하고 결과 표시
      document.getElementById("timer").innerText = ""; // 타이머 텍스트 삭제
      document.getElementById("question").innerText = "게임이 끝났습니다!";
      document.getElementById("dropzone").innerHTML = ""
      document.getElementById("result").innerText = "";
      document.getElementById("options").innerHTML = "";
      document.getElementById("checkButton").style.display = "none";
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("restartButton").style.display = "inline-block";
      document.getElementById("result-section").style.display = "block";
      document.getElementById("scoreDisplay").innerHTML =  `|￣￣￣￣￣￣￣￣￣￣￣￣￣￣|<br>'당신은 ${score}문제를 맞췄습니다!'<br>|＿＿＿＿＿＿＿＿＿＿＿＿＿＿|<br>\\ (•◡•) /<br>\\       /`;
      document.getElementById("result1").style.display = "inline-block";
      document.getElementById("scoreDisplay").style.display = "block";
      
       // 모든 답변과 해당 문제들을 보여줌
       let questionNumber = 1;
       for (const answeredQuestion of answeredQuestions) {
        // 각 문제와 답변을 화면에 표시
        const separator = document.createElement("hr");
        separator.id = "endStateElement";
        separator.style.marginBottom = "20px"; 
        document.body.appendChild(separator);
        
        // 문제 요소 생성
        const questionElement = document.createElement("p");
        questionElement.id = "endStateElement";
        questionElement.style.marginBottom = "20px";  
        questionElement.innerText = `${questionNumber}. ${answeredQuestion.question.text}`;
        document.body.appendChild(questionElement);
    
        // 코드의 빈 칸 분석
         const codeParts = answeredQuestion.question.code.split("{[");
         const blankIds = answeredQuestion.question.code.match(/\{\[([^\]]+)\]\}/g).map((x) => x.slice(2, -2));
    
         let codeHTML = codeParts[0];
         for (let i = 1; i < codeParts.length; i++) {
           const part = codeParts[i].split("]}");
           const blankId = blankIds[i - 1];
           
           // 플레이어의 답과 정답 비교
           let playerAnswer = answeredQuestion.playerAnswers[blankId];
           let correctAnswer = answeredQuestion.question.answers[blankId];
           let color = (playerAnswer === correctAnswer) ? '#4ec460' : '#e74f4f';
           if (playerAnswer !== correctAnswer) {
              playerAnswer = correctAnswer; 
           }
           codeHTML += `<span class="blank" style="background-color: ${color}; width: 100px;">${playerAnswer}</span>`;
           codeHTML += part[1];
           
         }
    
         codeHTML = codeHTML.replace(/\n/g, "<br>");
    
         // 코드 요소 생성 및 삽입
         const codeElement = document.createElement("div");
         codeElement.id = "endStateElement";
         codeElement.style.marginBottom = "20px";  
         codeElement.innerHTML = codeHTML;
         document.body.appendChild(codeElement);
    
         questionNumber++; // 문제 번호를 증가

       }

       // 게임 결과를 서버에 저장
       fetch("/api/save_game_result", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            language: userLanguage,
            gameType: gameType
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); 
    });

  // 리더보드 업데이트
  let leaderboard = JSON.parse(localStorage.getItem(userLanguage + "Leaderboard") || "[]");
  leaderboard.push({ username: username, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem(userLanguage + "Leaderboard", JSON.stringify(leaderboard));

  // 리더보드 텍스트 생성
  let leaderboardText = "<h2>Leaderboard for " + userLanguage + "</h2><br/><br/>";
  for (let i = 0; i < leaderboard.length; i++) {
      leaderboardText += `${i + 1}. ${leaderboard[i].username}: ${leaderboard[i].score}<br/><br/>`;  
  }
  document.getElementById("leaderboard").innerHTML = leaderboardText;

  // 퀴즈 섹션 숨기기 및 결과 섹션 표시
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";
}


// 퀴즈 시작 함수
function startQuiz() {
    // 초기 화면 설정
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("result-section").style.display = "none";
    username = document.getElementById("username").value;
    userLanguage = document.getElementById("languageSelect").value; 
    document.getElementById("login-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    // 문제 데이터 가져오기
    fetch('/api/get_draggame_questions')
    .then(response => response.json())
    .then(data => {
      allQuestions = data;
      // 사용자 선택에 따른 문제 필터링
      if(userLanguage === "random") {
        questions = allQuestions;
      } else {
        questions = allQuestions.filter(q => q.language === userLanguage);
      }
      
      startGame(); // '퀴즈 시작' 버튼을 누르면 startGame 함수 호출
    });
} 
    
    // 퀴즈 시작 버튼에 이벤트 리스너 추가
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);

    // 리더보드 정보를 가져와 표시하는 함수
    function fetchLeaderboard() {
      fetch(`/get_leaderboard?game_type=draggame`)
      .then(response => response.json())
      .then(data => {
          let leaderboardHTML = '<div class="leaderboard-container">';
  
          for (let lang in data) {
              leaderboardHTML += `
              <div class="language-leaderboard">
                  <h2>${lang} Top 5 Rankings</h2>
                  <table class="leaderboard-table">
                      <thead>
                          <tr>
                              <th>등수</th>
                              <th>이름</th>
                              <th>점수</th>
                              <th>날짜</th>
                          </tr>
                      </thead>
                      <tbody>`;
              
              data[lang].forEach((item, index) => {
                  leaderboardHTML += `
                  <tr>
                      <td>${index + 1}등</td>
                      <td>${item.username}</td>
                      <td>${item.score}점</td>
                      <td>${item.played_at}</td>
                  </tr>`;
              });
  
              leaderboardHTML += `
                      </tbody>
                  </table>
              </div>`;
          }
  
          leaderboardHTML += '</div>';
  
          document.getElementById("leaderboard").innerHTML = leaderboardHTML;
      });
  }

  const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 200)
});
// 메뉴바 스크롤 애니메이션