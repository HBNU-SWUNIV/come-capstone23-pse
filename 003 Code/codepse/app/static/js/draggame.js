let currentQuestion; // 현재 플레이어가 풀고 있는 문제
let allQuestions = [];
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

// 사용자의 답과 실제 답을 비교하는 함수
function compareAnswer(playerAnswer, actualAnswer, blankElement) {
  if (playerAnswer !== actualAnswer) {
    blankElement.style.backgroundColor = "#e74f4f"; // 틀린 경우, 빈칸의 배경색을 빨간색으로 변경
    return false;
  } else {
    blankElement.style.backgroundColor = "#4ec460"; // 맞는 경우, 빈칸의 배경색을 초록색으로 변경
    return true;
  }
}

// 플레이어의 답을 확인하는 함수, 사용자가 선택한 답과 정답을 비교
function checkAnswer() {
  let correctAnswersCount = 0;  // 올바른 답을 세기 위한 카운터
  const playerAnswers = {};

  // 각각의 빈칸을 반복하며 사용자의 답과 실제 답을 비교
  for (let i = 0; i < blanks.length; i++) {
    const playerAnswer = blanks[i].innerText;
    playerAnswers[blanks[i].id.slice(6)] = playerAnswer;

    // 사용자의 답이 맞는지 확인
    if (playerAnswer === currentQuestion.answers[blanks[i].id.slice(6)]) {
      blanks[i].style.backgroundColor = "#4ec460"; // 맞는 경우, 빈칸의 배경색을 초록색으로 변경
      correctAnswersCount++; // 올바른 답의 개수를 증가
    } else {
      blanks[i].style.backgroundColor = "#e74f4f"; // 틀린 경우, 빈칸의 배경색을 빨간색으로 변경
    }
  }

  // 모든 답을 확인한 후 결과를 표시
  if (correctAnswersCount === blanks.length) {
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
    showEndState(); // 결과창 표시
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
      let timeLeft = 60; // 게임 시간을 저장할 변수를 추가합니다.
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
  leaderboard.push({ username: username, score: score/2 });
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
    userLanguage = document.getElementById("languageSelect").value; 
    document.getElementById("login-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    fetch('/api/get_draggame_questions')
    .then(response => response.json())
    .then(data => {
      allQuestions = data;
      // 사용자가 "Random"을 선택한 경우 모든 언어의 질문을 포함, 아니라면 선택한 언어의 질문만 포함
      if(userLanguage === "random") {
        questions = allQuestions;
      } else {
        questions = allQuestions.filter(q => q.language === userLanguage);
      }
      
      startGame(); // '퀴즈 시작' 버튼을 누르면 startGame 함수를 호출합니다.
    });
} 
    
    // 퀴즈 시작 버튼에 이벤트 리스너를 추가합니다.
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);