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
