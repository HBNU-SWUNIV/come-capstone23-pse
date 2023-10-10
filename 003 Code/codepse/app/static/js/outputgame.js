const header = document.querySelector("header")

window.addEventListener ("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 80)
});
//이거는 뭐시냐면은 그 메인페이지 스크롤 내릴때 메뉴는 안없어지고 그대로 유지되는 고것 근데 쫌 간지나게 유지돼..

let allQuestions = [];
let questions = [];
let userLanguage;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let username;
let gameType = "output"


function startQuiz() {
    username = document.getElementById("username").value;
    userLanguage = document.getElementById("languageSelect").value;

    document.getElementById("leaderboard").style.display = "none";

    fetch('/api/get_outputgame_questions')
    .then(response => response.json())
    .then(data => {
        allQuestions = data;

        if(userLanguage === "random") {
            questions = allQuestions;
        } else {
            questions = allQuestions.filter(q => q.language === userLanguage);
        }
        questions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

        document.getElementById("login-section").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
        loadQuestion();
    });
}

function loadQuestion() {
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

    document.getElementById("question").innerHTML = '<pre>' + questions[currentQuestionIndex].question + '</pre>';
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

function fetchLeaderboard() {
    fetch(`/get_leaderboard?game_type=outputgame`)
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

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    document.getElementById("result").innerHTML = "";
    document.getElementById("restart-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("leaderboard").style.display = "block";
}