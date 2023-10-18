const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
// 메뉴바 스크롤 애니메이션

let allQuestions = []; // 전체 문제 목록
let questions = []; // 선택된 언어의 문제 목록
let userLanguage; // 사용자가 선택한 프로그래밍 언어
let currentQuestionIndex = 0; // 현재 문제의 인덱스
let score = 0; // 사용자 점수
let userAnswers = []; // 사용자 답변 목록
let username; // 사용자 이름
let gameType = "output" // 게임 타입

// 퀴즈 시작 함수
function startQuiz() {
    // 사용자 입력 값 가져옴
    username = document.getElementById("username").value;
    userLanguage = document.getElementById("languageSelect").value;

    // 리더보드 숨김
    document.getElementById("leaderboard").style.display = "none";

    // 서버에서 문제 가져옴
    fetch('/api/get_outputgame_questions')
    .then(response => response.json())
    .then(data => {
        allQuestions = data;

        // 언어별로 문제 필터링
        if(userLanguage === "random") {
            questions = allQuestions;
        } else {
            questions = allQuestions.filter(q => q.language === userLanguage);
        }
        // 무작위로 5문제 선택
        questions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

        // 로그인 섹션 숨기고 퀴즈 섹션 표시
        document.getElementById("login-section").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
        loadQuestion();
    });
}

// 현재 문제 로드 함수
function loadQuestion() {
    // 모든 문제를 다 풀었을 경우 표시
    if (currentQuestionIndex >= questions.length) {
        sendGameResult(score, userLanguage);

        document.getElementById("restart-section").style.display = "block";
        document.getElementById("quiz-section").style.display = "none";
        let resultText = "문제를 모두 풀었습니다! Your score is: " + score + "<br/><br/>";
        for (let i = 0; i < questions.length; i++) {
            resultText += `<span class="highlight">Question: <br/>${questions[i].question}<br/><br/>Your answer: ${userAnswers[i].answer}<br/><br/><span class="correct-answer">Correct answer: ${questions[i].answer}</span><br/><br/>`;
        }
        document.getElementById("result").innerHTML = resultText;
        

        return;
    }

    // 현재 문제 내용을 표시 
    document.getElementById("question").innerHTML = '<pre>' + questions[currentQuestionIndex].question + '</pre>';
}

// 사용자의 답변을 제출하는 함수
function submitAnswer() {
    let userAnswer = document.getElementById("answer").value;
    // 정답 체크
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        score++; // 정답일 경우 점수 증가
    }
    userAnswers.push({ answer: userAnswer }); // 사용자 답변 목록 추가
    document.getElementById("answer").value = ""; // 입력 필드 초기화
    currentQuestionIndex++; // 문제 인덱스 증가
    // 다음 문제 로드
    loadQuestion();
}

// 게임 결과를 서버에 전송하는 함수
function sendGameResult(score, language) {
    fetch('/api/save_game_result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            language: language,
            gameType: gameType
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    });
}

// 리더보드를 가져와 화면에 표시하는 함수
function fetchLeaderboard() {
    fetch(`/get_leaderboard?game_type=outputgame`) // 리더보드 데이터 가져옴
    .then(response => response.json())
    .then(data => {
        let leaderboardHTML = '<div class="leaderboard-container">';

        for (let lang in data) { // 각 언어별 리더보드 생성
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
            
            data[lang].forEach((item, index) => { // 각 플레이어 데이터 추가
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

        document.getElementById("leaderboard").innerHTML = leaderboardHTML; // 리더보드 표시
    });
}

// 게임 재시작 함수
function restartGame() {
    currentQuestionIndex = 0; // 문제 인덱스 초기화
    score = 0; // 점수 초기화
    userAnswers = []; // 사용자 문제 목록 초기화

    document.getElementById("result").innerHTML = ""; // 결과 표시 초기화
    document.getElementById("restart-section").style.display = "none"; // 재시작 섹션 숨기기
    document.getElementById("login-section").style.display = "block"; // 로그인 섹션 표시
    document.getElementById("leaderboard").style.display = "block"; // 리더보드 표시
}