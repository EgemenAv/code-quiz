localStorage.clear();
const questions  = [
    {
        question: "Commonly used data type Do Not include:---",
        choices: ["strings","booleance","alerts", "numbers"],
        answer : "btn-3"    
    },
    {
        question: "The condition in an if/else statement is enclosed within:---",
        choices: ["quotes","Curly brackets","parentheses", "square brackets"],
        answer : "btn-3"    
    },
    {
        question: "Arrays in JavaScript can be used to store:---",
        choices: ["numbers and strings","others Arrays","booleances", "all of the above"],
        answer : "btn-4"    
    },
    {
        question: "String values must be enclosed within --- when being assigned to variables ",
        choices: ["commas","curly brackets","quotes","parentheses"],
        answer : "btn-3"    
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        choices: ["JavaScript","terminal/bash","alerts", "console.log"],
        answer : "btn-4"    
    },
  ]

  var count = 60;
  var questionCount = 0;

  var counter = document.getElementById("counter");

  var startbtn = document.getElementById("startbtn");
  var scoreSubmit = document.getElementById("score-submit");
  var restart = document.getElementById("restart");
  var options = document.getElementsByClassName("option");
  var clear = document.getElementById("clear");

  var initials = document.getElementById("username");

  
  var start = document.getElementById("start");
  var content = document.getElementById("content");
  var result = document.getElementById("result"); 
  var main = document.getElementById("main");
  

  startbtn.addEventListener("click", startQuiz);
  options[0].addEventListener("click", checkAnswer);
  options[1].addEventListener("click", checkAnswer);
  options[2].addEventListener("click", checkAnswer);
  options[3].addEventListener("click", checkAnswer);
  restart.addEventListener("click", restartQuiz);
  scoreSubmit.addEventListener("click", getHighScores);
  clear.addEventListener("click", clearScores => {
    localStorage.removeItem("scoreStorage");
  });


  function startQuiz(e){
// set timer
    timer = setInterval(function(){
        if(count>0 ){           
            count--;
            counter.textContent = count;}
            else{
                endQuiz();
            };
        }, 1000);
// change display and get questions
    start.style.display = "none";

    getQuestion(questionCount);

    document.getElementById("choices").style.display = "block";
  }

 function getQuestion(count){
     // get nth question where n is questionCount
    content.innerHTML = questions[count].question;

    for(var i = 0; i < questions[count].choices.length; i++){
        options[i].innerHTML = questions[count].choices[i];
    }
  }

  function checkAnswer(e){
    // check answer and update result/reduce timer if wrong
    if(e.target.id === questions[questionCount].answer){
        result.innerText = "Correct!";
    }else{
        result.innerText = "Wrong!";
        if(count > 12){
            count = count - 12;
        }else{
            count = 0;
        }       
        counter.textContent = count;
    }
    // display next question or end the quiz
    if(questionCount + 1 < questions.length){
        questionCount++;
        getQuestion(questionCount);
    }else{      
        endQuiz();
    }
  }
 
  function endQuiz(){
    // display score window
    clearInterval(timer);
    document.getElementById("choices").style.display = "none";
    content.innerHTML = "ALL DONE!";
    document.getElementById("score").innerText = count;
    document.getElementById("scoreboard").style.display = "block";
  }

  function getHighScores(){
    const scoreStorage = JSON.parse(localStorage.getItem("scoreStorage")) || [];
    const newScore = {
        "name": initials.value,
        "score": count
    };

    var index = scoreStorage.findIndex(function (otherScore) {
        return (newScore.name === otherScore.name);
    });

    if ((index + 1)) {
        if ((newScore.score > scoreStorage[index].score)) {
            scoreStorage[index].score = newScore.score;
        }
    }else{
        scoreStorage.push(newScore);
    }
    
    scoreStorage.sort(function(a,b){
        return b.score - a.score;
    });

    scoreStorage.splice(10);

    for (let i = 0; i < scoreStorage.length; i++) {
        document.getElementById("h-list").innerHTML += "<li>" + '<span class= "num">' + (i + 1)  + "</span>" + ". " + scoreStorage[i].name + " - " + scoreStorage[i].score + "</li>";        
    }

    localStorage.setItem("scoreStorage", JSON.stringify(scoreStorage));

    document.getElementById("scoreboard").style.display = "none"; 
    content.innerHTML = "HIGH SCORES";
    document.getElementById("highscores").style.display = "block";
  }

  function restartQuiz(){
    result.innerText = "";
    initials.value = "";
    document.getElementById("h-list").innerHTML = "";
    content.innerHTML = "Code Quiz Challenge";
    count = 60;
    questionCount = 0;

    counter.textContent = count;
    document.getElementById("highscores").style.display = "none";
    start.style.display = "block";
    
  }

  