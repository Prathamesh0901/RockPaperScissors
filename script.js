let result='';
        
let score=JSON.parse(localStorage.getItem('score'));

if(!score){
    score={
        wins: 0,
        losses: 0,
        ties: 0
    };
}

let intervalId;
let isAutoplay = false;

updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

let reset = document.querySelector('.js-reset-score-button');
let confirmation = document.querySelector('.confirmation');
reset.addEventListener('click', () => {
    resetScore();
});

function resetScore() {
    confirmation.classList.add('visible');
    confirmation.querySelector('.yes').addEventListener('click', () => {
        yes();
    });
    confirmation.querySelector('.no').addEventListener('click', () => {
        confirmation.classList.remove('visible');
    });
    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'y' || event.key === 'Y'){
            yes();
        }
        else if(event.key === 'n' || event.key === 'N'){
            no();
        }
    });
}

function yes() {
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
    confirmation.classList.remove('visible');
}

function no(){
    confirmation.classList.remove('visible');
}

document.body.addEventListener('keydown', (event) => {
    if(event.key == 'r' || event.key === 'R'){
        playGame('rock');
    }
    else if(event.key === 'p' || event.key === 'P'){
        playGame('paper');
    }
    else if(event.key === 's' || event.key === 'S'){
        playGame('scissors');
    }
    else if(event.key === 'a' || event.key === 'A'){
        autoPlay();
    }
    else if(event.key === 'Backspace'){
        resetScore();
    }
});

let autoPlayVar = document.querySelector('.js-autoplay-button')
autoPlayVar.addEventListener('click', () => {
    autoPlay();
});

function autoPlay(){
    if(!isAutoplay){
        autoPlayVar.innerText = `Stop`;
        isAutoplay = true;
        intervalId = setInterval(() => {
            playerMove = generateComputerMove();
            playGame(playerMove);
        },1000);
    }
    else{
        clearInterval(intervalId);
        autoPlayVar.innerText = 'AutoPlay';
        isAutoplay = false;
    }
}

function playGame(playerMove){
    const computerMove=generateComputerMove();
    if(playerMove==='rock'){
        if(computerMove==='rock'){
            result='Tie.';
        }
        else if(computerMove==='paper'){
            result='You lose!';
        }
        else{
            result='You won!';
        }
    }
    else if(playerMove==='paper'){
        if(computerMove==='paper'){
            result='Tie.';
        }
        else if(computerMove==='scissors'){
            result='You lose!';
        }
        else{
            result='You won!';
        }
    }
    else if(playerMove==='scissors'){
        if(computerMove==='scissors'){
            result='Tie.';
        }
        else if(computerMove==='rock'){
            result='You lose!';
        }
        else{
            result='You won!';
        }
    }

    if(result==='You won!'){
        score.wins+=1;
    } 
    else if(result==='You lose!'){
        score.losses+=1;
    }
    else if(result==='Tie.'){
        score.ties+=1;
    }
    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer
    `;
}

function generateComputerMove(){
    const randomNumber=Math.random();
    let computerMove='';
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove='rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='paper';
    }
    else if(randomNumber>=2/3 && randomNumber<1){
        computerMove='scissors';
    }

    return computerMove;
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}