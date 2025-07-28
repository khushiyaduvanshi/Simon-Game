let gameSeq=[];
let userSeq = [];

let btns = ["red","yellow","green","blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("high-score").textContent = `High Score: ${highScore}`;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});



document.addEventListener("keypress", function(){
    //console.log("game started");
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp (){
   level++;
   h2.innerText = `Level ${level}`; 
   let randIdx = Math.floor(Math.random() * 4);
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);
   //console.log(randIdx);
   //console.log(randColor);
   //console.log(randBtn);
   gameSeq.push(randColor);
   console.log(gameSeq);
   gameFlash(randBtn);
  

}

function checkAns(){
    console.log("curr level:",level);
    let idx = level-1;
    if(userSeq[idx] === gameSeq[idx]){
        playCorrectSound();
        //console.log("same value");
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp, 1000) ;
        }
    }else{
        playWrongSound();
        h2.innerHTML = `Game Over !  Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        
        
        reset();
    }
}
function playCorrectSound() {
    let audio = new Audio("correct tune.mp3");
    audio.play();
}

function playWrongSound() {
    let audio = new Audio("wrong tune.wav");
    audio.play();
}

function btnPress() {
    //console.log(this);
    let btn = this;
    userFlash(btn);
    //console.log("btn was pressed");
    userColor = btn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
    }

    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("high-score").textContent = `High Score: ${highScore}`;
        }
    }
    

    function reset(){
        started = false;
        gameSeq = [];
        userSeq = [];
        level = 0;
    }




