const questions=[
    {
        question:"Which is the largest state in india area wise?",
        answers:[
            { text:"Rajasthan",correct:true},
            {text:"Maharashtra",correct:false},
            {text:"Bihar", correct:false},
            {text:"Uttar Pradesh",correct:false}

        ]
    },
    {
        question:"What is the capital of France??",
        answers:[
            { text:"London",correct:false},
            {text:"Berlin",correct:false},
            {text:"Paris", correct:true},
            {text:"Rome",correct:false}

        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            { text:"Jupiter",correct:false},
            {text:"Mars",correct:true},
            {text:"Venus", correct:false},
            {text:"Saturn",correct:false}

        ]
    },
    {
        question:"Which is the largest state in india population wise?",
        answers:[
            { text:"Rajasthan",correct:false},
            {text:"Maharashtra",correct:false},
            {text:"Bihar", correct:false},
            {text:"Uttar Pradesh",correct:true}

        ]
    },
    {
        question:"Who wrote the play `Romeo and Juliet`?",
        answers:[
            { text:"Charles Dickens",correct:false},
            {text:"William Wordsworth",correct:false},
            {text:"Jane Austen", correct:false},
            {text:"William Shakespeare",correct:true}

        ]
    }
]
let currecntQuestionIndex = 0;
let score =0;
let correct =0;

function startQuiz(){
currecntQuestionIndex=0;
score=0;
correct=0;
nextButton.innerHTML="Next";
showQuestion();
}
const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function showQuestion(){
    resetState();
    answerButtons.innerHTML="";
    let currecntQuestion= questions[currecntQuestionIndex];
    let questionNo = currecntQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " ." +currecntQuestion.question;
    currecntQuestion.answers.forEach(answer =>{

        const button  = document.createElement("button");
        button.innerHTML = answer.text;
        // button.classList.add("btn");
        button.className = "text-lg rounded-lg border-2 border-gray-800 p-2 bg-white text-black w-full p-3 mx-3 my-0 text-left cursor-pointer transition-all duration-300 hover:bg-violet-500 hover:text-white mb-4";
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.style.backgroundColor = "green";

        selectedButton.classList.add("correct"); // Set background color for correct answer
    score++;
    } else {
        selectedButton.classList.add("incorrect");
        selectedButton.style.backgroundColor = "red"; // Set 'background color for incorrect answer
        const correctButton = Array.from(answerButtons.children).find(button => button.dataset.correct === "true");
        if (correctButton) {
            correctButton.classList.add("correct");
            correctButton.style.backgroundColor = "green";
        }
    }
    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true") {
            button.classList.add("correct");
    }
    button.disabled = true;
});
// score=correct;
nextButton.style.display = "block";
}
function handleNextButton(){
    currecntQuestionIndex++; 
    if(currecntQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",()=>{
    if(currecntQuestionIndex<questions.length) {
    handleNextButton();
    }
    else{
        startQuiz();
    }
});
    
startQuiz();

