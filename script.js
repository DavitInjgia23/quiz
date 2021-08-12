
const submitBtn = document.getElementById("submitBtn");
const next_question = document.getElementById("next-question");
const leaderboardBtn = document.getElementById("leaderboard-button");
const backResultsBtn = document.getElementById("back-results");
const replayBtn = document.getElementById("replay-button");




let questions_choosen = [];
let score_counter = 0;
let score_diff = 0;
let count = 0;
let current_question = 0;
let current_question_text = 1;
let correct_answers = 0;
let question_step = 1;
let random_Array = [];
const timerTime = document.getElementById("timer-time");
const timerText = document.getElementById("timer-text");
const question_option = document.getElementById("quiz-options");
let timer_Time = 0;
let minus_Score = 0;

let counter;
submitBtn.addEventListener('click',function(){
    let fnameForm = document.getElementById("fname");
    let lnameForm = document.getElementById("lname");
    let quantityForm = document.getElementById("quantity");
    let difficultyForm = document.getElementById("difficulty");

    fnameForm = fnameForm.value;
    lnameForm = lnameForm.value;
    quantityForm = quantityForm.value;
    difficultyForm = difficultyForm.value;

    localStorage.setItem('fname', fnameForm);
    localStorage.setItem('lname', lnameForm);
    localStorage.setItem('quantity', quantityForm);
    localStorage.setItem('difficulty', difficultyForm);
})

const start_page = document.getElementById("start_page");
const quiz_questions = document.getElementById("quiz");
const results = document.getElementById("result");
const leaderboard = document.getElementById("leaderboard");

function checkForm(){
    let fnameForm = document.getElementById("fname");
    let lnameForm = document.getElementById("lname");
    let quantityForm = document.getElementById("quantity");
    let difficultyForm = document.getElementById("difficulty");
    if(fnameForm.value =="" || lnameForm.value =="" || quantityForm.value =="" || difficultyForm.value ==""){
        return false;
    }
    return true;
}
function showQuestion(index){
    const quiz_question = document.getElementById("quiz-question");
    let question_text = '<span>'  + questions_choosen[index].question +'</span>';
    quiz_question.innerHTML = question_text;
    const question_option = document.getElementById("quiz-options");
    let option_text =  '<div class="quiz-option"><span>'+questions_choosen[index].options[0]+'</span></div>'
                    +'<div class="quiz-option"><span>'+questions_choosen[index].options[1]+'</span></div>'
                    +'<div class="quiz-option"><span>'+questions_choosen[index].options[2]+'</span></div>'
                    +'<div class="quiz-option"><span>'+questions_choosen[index].options[3]+'</span></div>';
    question_option.innerHTML = option_text;  
    const cur_question = document.getElementById("current_question");
    let cur_question_text ='<span><p>' + current_question_text
    +'</p>of<p>'+questions_choosen.length+'</p>questions</span>';
    cur_question.innerHTML = cur_question_text;  
    for(let i = 0; i < question_option.children.length;i++){
        question_option.children[i].setAttribute("onClick","selectedOpt(this)");
    } 
}

function selectedOpt(correctAnswer){
    clearInterval(counter);
    let correct_tic = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    let wrong_tic = '<div class="icon cross"><i class="fas fa-times"></i></div>';
    if(correctAnswer.textContent === questions_choosen[current_question].correctOption){
        correctAnswer.classList.add("correct-answer");
        correctAnswer.insertAdjacentHTML('beforeend',correct_tic);
        score_counter+=score_diff;
        correct_answers++;
    }else{
        correctAnswer.classList.add("wrong-answer");
        correctAnswer.insertAdjacentHTML('beforeend',wrong_tic);
        score_counter+=minus_Score;
    }
    for(let i = 0;i < question_option.children.length;i++){
        question_option.children[i].classList.add("disable-options");
        if(questions_choosen[current_question].options[i] === questions_choosen[current_question].correctOption ){       
            if(!question_option.children[i].classList.contains("correct-answer")){
                question_option.children[i].classList.add("correct-answer");
                question_option.children[i].insertAdjacentHTML('beforeend',correct_tic);
            }
        }
    }
    next_question.classList.add('next-question-on');
}

submitBtn.onclick =()=>{
    let startPageForm =  document.getElementById("start_page_forms");
    if(checkForm()){
        questions_choosen = [];

        score_counter = 0;
        score_diff = 0;
        correct_answers = 0;
        current_question = 0;
        current_question_text = 1;

        minus_Score = 0;

        let difficultyLevel = localStorage.getItem('difficulty');
        
        if(difficultyLevel === 'Easy'){
            questions_choosen = questions_easy;
            score_diff = 1;
            timer_Time = 3;
            random_Array = [0,1,2,3,4];
        }else if(difficultyLevel === 'Medium'){
            questions_choosen = questions_medium;
            score_diff = 2;
            timer_Time = 3;
            random_Array = [0,1,2,3,4,5,6,7];
        }else{
            questions_choosen = questions_hard;
            score_diff = 3;
            timer_Time = 3;
            minus_Score = -1;
            random_Array = [0,1,2,3,4,5,6,7,8,9];
        }
        timerTime.classList.add("timer-time-activate");
        let timer_textt = '<div class="timer-time" id="timer-time">'+timer_Time+'</div>';
        timerTime.innerHTML = timer_textt;

        count = timer_Time;
        start_page.classList.remove("activate");
        quiz_questions.classList.add("activate");
        startPageForm.reset();
        
        current_question = chooseRandomly(random_Array);
        showQuestion(current_question);
        startTimer(timer_Time);
    }
   
}
function chooseRandomly(arr){
    let random = Math.floor(Math.random() * arr.length);
    return arr.splice(random, 1);
}

next_question.onclick =()=>{
    if(random_Array.length != 0){
        current_question = chooseRandomly(random_Array);
        current_question_text++;
        showQuestion(current_question);
        clearInterval(counter);
        startTimer(timer_Time);
    }else{
        quiz_questions.classList.remove("activate");
        results.classList.add("activate");
        let result_text_in = "";
        let question_len = questions_choosen.length;
        if(correct_answers <= Math.floor(question_len / 2)){
            result_text_in = "Sorry you got only ";
        }else if(correct_answers > Math.floor(question_len / 2) && correct_answers <= question_len-1){
            result_text_in = "Good result ";
        }else{
            result_text_in = "Congratulations, excelent work ";
        }
        const result_text = document.getElementById("result-text");
        let result_textt = '<span>'+result_text_in+'<p>'+correct_answers+'</p>from<p>'+question_len+'</p></span>';
        result_text.innerHTML = result_textt;
        const leaderboard_table = document.getElementById("leaderboard-table");
        let leaderboard_text =  '<tr><td>'+localStorage.getItem('fname')+' '+localStorage.getItem('lname') + '</td>'
                        +'<td>'+localStorage.getItem('quantity')+'</td>'
                        +'<td>'+localStorage.getItem('difficulty')+'</td>'
                        +'<td>'+score_counter+'</td></tr>';
        leaderboard_table.insertAdjacentHTML('beforeend', leaderboard_text);
    }
    next_question.classList.remove('next-question-on');
}
let time_counter = 0;
const timer_time = document.getElementById("timer-time");

function startTimer(time){
    counter = setInterval(timer,1000);
    
    function timer(){
        timerTime.textContent = time;
        let correct_tic = '<div class="icon tick"><i class="fas fa-check"></i></div>';
        time--;
        if(time < 0){
            clearInterval(counter);
            timerText.textContent = "Time Off";
            for(let i = 0;i < question_option.children.length;i++){
                question_option.children[i].classList.add("disable-options");
                if(questions_choosen[current_question].options[i] === questions_choosen[current_question].correctOption ){       
                    if(!question_option.children[i].classList.contains("correct-answer")){
                        question_option.children[i].classList.add("correct-answer");
                        question_option.children[i].insertAdjacentHTML('beforeend',correct_tic);
                    }
                }
            }
            next_question.classList.add('next-question-on');
        }
    }
}


leaderboardBtn.onclick =()=>{
    results.classList.remove("activate");
    leaderboard.classList.add("activate");
}

backResultsBtn.onclick =()=>{
    leaderboard.classList.remove("activate");
    results.classList.add("activate"); 
}
replayBtn.onclick =()=>{
    results.classList.remove("activate");
    start_page.classList.add("activate"); 
    
}







