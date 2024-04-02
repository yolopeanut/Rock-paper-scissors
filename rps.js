let userChoice =-1;
let randomChoice = -1;
let intervalID = null

const score = JSON.parse(localStorage.getItem('score')) || {
        Win:0,
        Losses:0,
        Ties:0
    };

console.log(score);




function setRandomChoice(userOrComp){

    
    ran = Math.round(Math.random() * 100);


    if(userOrComp === 'Comp'){
        if (ran <= 30 && ran>=0){randomChoice = 0;}
        else if (ran <= 60 && ran>30){randomChoice = 1;}
        else if (ran >60){randomChoice = 2;}
    }
    else if(userOrComp === 'User'){
        if (ran <= 30 && ran>=0){userChoice = 0;}
        else if (ran <= 60 && ran>30){userChoice = 1;}
        else if (ran >60){userChoice = 2;}
    };
};


document.querySelector('.js-rock-button').addEventListener('click',()=>{
    setRandomChoice('Comp');
    userChoice = 0;
    changeResult();
})

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
    setRandomChoice('Comp');
    userChoice = 1;
    changeResult();
})

document.querySelector('.js-scissor-button').addEventListener('click', ()=>{
    setRandomChoice('Comp');
    userChoice = 2;
    changeResult();
})

document.querySelector('.js-reset-btn').addEventListener('click',()=>{
    resetScore()
})

document.querySelector('.js-auto-play-btn').addEventListener('click',()=>{
    autoPlay();
})

document.body.addEventListener('keydown',(event)=>{
    
    if(event.key === '1'){
        setRandomChoice('Comp');
        userChoice = 0;
        changeResult();
    }
    else if (event.key === '2'){
        setRandomChoice('Comp');
        userChoice = 1;
        changeResult();
    }
    else if (event.key === '3'){
        setRandomChoice('Comp');
        userChoice = 2;
        changeResult();
    }
})


function returnAlertString(playerOrCompChoice){
    if (playerOrCompChoice === 0){
        return 'Rock';
    }

    else if (playerOrCompChoice === 1){
        return 'Paper';
    }

    else if (playerOrCompChoice === 2){
        return 'Scissorss';
    };
    
};

function checkWin(){


    if (userChoice ===0 && randomChoice === 0){score.Ties+=1; return 'Draw';}
    else if(userChoice === 1 && randomChoice === 1){score.Ties+=1; return 'Draw';}
    else if(userChoice === 2 && randomChoice === 2){score.Ties+=1; return 'Draw';}


    else if(userChoice === 0 && randomChoice === 1){score.Losses+=1; return 'Computer Wins!';}
    else if(userChoice === 0 && randomChoice === 2){score.Win+=1; return 'You Win!';}

    else if(userChoice === 1 && randomChoice === 2){score.Win+=1; return 'You Win!';}
    else if(userChoice === 1 && randomChoice === 3){score.Losses+=1; return 'Computer Wins!';}

    else if(userChoice === 2 && randomChoice === 1){score.Win+=1; return 'You Win!';}
    else if(userChoice === 2 && randomChoice === 3){score.Losses+=1; return 'Computer Wins!';}

    else if(userChoice === 1 && randomChoice === 0){score.Win+=1; return 'You Win!';}
    else if(userChoice === 2 && randomChoice === 0){score.Losses+=1; return 'Computer Wins!';}

    
};

function initResult(){
    document.querySelector('.win-loss-ties').innerHTML = `Wins: ${score.Win}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

};

function changeResult(){
    document.querySelector('.p-win-lose').innerHTML = checkWin();

    document.querySelector('.p-choices').innerHTML = `You: ${returnAlertString(userChoice)} <br></br> Computer: ${returnAlertString(randomChoice)}`;
    
    document.querySelector('.win-loss-ties').innerHTML = `Wins: ${score.Win}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

    localStorage.setItem('score', JSON.stringify(score));

    

}

function resetScore(){
    score.Win = 0;
    score.Losses = 0;
    score.Ties = 0;
    
    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.win-loss-ties').innerHTML = `Wins: ${score.Win}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
    console.log(score);

}



function autoPlay(){

    autoPlayBtn = document.querySelector('.auto-play-btn')
    if(!autoPlayBtn.classList.contains('is-auto-play')){
        intervalID = setInterval(()=>{
                    setRandomChoice('User');
                    setRandomChoice('Comp');
                    changeResult();
                },1000);
        console.log(intervalID)
        autoPlayBtn = document.querySelector('.auto-play-btn');
        autoPlayBtn.innerHTML = 'Stop Playing';
        autoPlayBtn.classList.add('is-auto-play');
    }
    else {
        clearInterval(intervalID);

        autoPlayBtn = document.querySelector('.auto-play-btn');
        autoPlayBtn.innerHTML = 'Start Playing';
        autoPlayBtn.classList.remove('is-auto-play');
    }
}

initResult()
alert("Rock: Press '1' \nPaper: Press '2' \nScissors: Press '3'")

