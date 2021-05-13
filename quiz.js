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
  var count = 30;
  var questionCount = 0;

  var start = document.getElementById("start");
  var options = document.getElementsByClassName("option");
  var content = document.getElementById("content");
  var result = document.getElementById("result");
  var restart = document.getElementById("restart");
  var main = document.getElementById("main");
  var counter = document.getElementById("counter");

  start.addEventListener("click", startQuiz);
  options[0].addEventListener("click", checkAnswer);
  options[1].addEventListener("click", checkAnswer);
  options[2].addEventListener("click", checkAnswer);
  options[3].addEventListener("click", checkAnswer);
  restart.addEventListener("click", restartQuiz);


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


  function endQuiz(){
    // display score window
    document.getElementById("choices").style.display = "none";
    content.innerHTML = "SCOREBOARD";
    document.getElementById("score").innerText = count;
    document.getElementById("scoreboard").style.display = "block";


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
        if(count > 6){
            count = count - 6;
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
        clearInterval(timer);
        endQuiz();
    }
  }

  function restartQuiz(){
    content.innerHTML = "Code Quiz Challenge";
    count = 30;
    questionCount = 0;

    counter.textContent = count;
    document.getElementById("scoreboard").style.display = "none";
    start.style.display = "block";
    
  }

  