const gameScreen= document.querySelector('.game-screen');
let hitNumber;
let randomPosition;

//generate bubbles
function makeBubble(){
    const screenWidth = window.innerWidth;
    let bubbleCount;

    function totalBubbles(){
        if (screenWidth <= 375) {
            bubbleCount = 42; 
        }
        else if (screenWidth <=430 && screenWidth >= 375) {
            bubbleCount = 54;
        }
         else if (screenWidth <= 1023) {
            bubbleCount = 90; 
        }
        else{
            bubbleCount=90;
        }
        return bubbleCount;
    }
    let numberOfBubbles= totalBubbles();

    hitNumber=Math.floor(Math.random() * numberOfBubbles);
    randomPosition=Math.floor(Math.random() * numberOfBubbles);
    let bubbleHTML='';
    for(var i=0; i<numberOfBubbles; i++){
        if (i!= randomPosition) {
            bubbleHTML += `<div class="bubble">${Math.floor(Math.random() * 98)}</div>`;
            console.log(bubbleHTML);
        } else {
            bubbleHTML += `<div class="bubble">${hitNumber}</div>`;
        }
    }
    gameScreen.innerHTML=bubbleHTML;
    hit();
    const bubble = document.querySelectorAll('.bubble');
    calculateScore(bubble);
}

//start game
const startgame= document.querySelector('.start-game');
startgame.addEventListener('click', ()=>{
    gameScreen.innerHTML="";
    makeBubble();
    timer();
});


//generate hit value
const hitButton= document.querySelector('.hit');
function hit(){
    hitButton.innerHTML=hitNumber;
}

var score= document.querySelector('.score');
var scoreCount=0;


//bubble event-listener and calculate score
function calculateScore(bubble) {
    bubble.forEach(function(bubbleElement, index) {
        bubbleElement.addEventListener('click', () => {
            if (index !== randomPosition) {
                scoreCount = scoreCount - 1;
            } else {
                scoreCount = scoreCount + 1;
            }
            score.innerHTML = scoreCount;
            makeBubble();
        });
    });
}


//timer
var timerID;
var time= document.querySelector('.timer');
function timer(){
    timerID= setInterval(() => {
        time.innerHTML=time.innerHTML-1;
        if(time.innerHTML<=0){
            clearInterval(timerID);
            gameOver();
        }
        
    }, 1000);
}

//game-over
function gameOver(){
    gameScreen.innerHTML=`<div class="play-again">
    <div class="play-again-text">PLAY AGAIN</div>
    <img src="icons8-reset-64.png" class="play-again-icon">
</div>`
PlayAgain();
}

//play again 
function PlayAgain(){
    const playAgain= document.querySelector('.play-again');
    playAgain.addEventListener('click', ()=>{
        gameScreen.innerHTML="";
        time.innerHTML=60;
        score.innerHTML=0;
        hitButton.innerHTML=0;
        makeBubble();
        timer();
    })
}
