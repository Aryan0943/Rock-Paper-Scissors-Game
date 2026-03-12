let score=JSON.parse(localStorage.getItem('score')) || {
                    wins:0,
                    losses:0,
                    ties:0
                    

                };
    updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('Scissors');
});
document.querySelector('.js-reset-button').addEventListener('click',()=>{
    score.wins=0;
    score.losses=0;
    score.ties=0;
    updateScoreElement();
    localStorage.removeItem('score');
});
document.querySelector('.js-autoplay-button').addEventListener('click',()=>{
    autoPlay();
});


let isAutoPlaying=false;
let intervalId=null;
function autoPlay(){
    
     
    if(!isAutoPlaying){
        intervalId=setInterval(()=>{
            const playerMove1=pickComputerMove();
            playGame(playerMove1);},1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
       
        isAutoPlaying=false;
        

    }

    
}

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }
    else if(event.key==='p'){
        playGame('Paper');
    }
    else if(event.key==='s'){
        playGame('Scissors');
        
    }
});


function playGame(playerMove){
    const computerMove=pickComputerMove();
    

    let result='';
    if(playerMove==='Scissors'){
        if(computerMove==='Rock'){
            result='You lose';
        }
        else if(computerMove==='Paper'){
            result='You win';
        }
        else if(computerMove==='Scissors'){
            result='Tie';
        }
    }
    else if(playerMove==='Paper'){
        
        
        if(computerMove==='Rock'){
            result='You win';
        }
        else if(computerMove==='Paper'){
            result='Tie';
        }
        else if(computerMove==='Scissors'){
            result='You lose';
        }

    }
    else if(playerMove==='Rock'){
        

        
        if(computerMove==='Rock'){
            result='Tie';
        }
        else if(computerMove==='Paper'){
            result='You lose';
        }
        else if(computerMove==='Scissors'){
            result='You win';
        }
    }

    document.querySelector('.js-result').innerHTML=`${result}`;

    document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon"> - <img src="images/${computerMove}-emoji.png" class="move-icon"> computer`;

    if(result=='You win'){
        score.wins=score.wins+1;
    }
    else if(result==='You lose'){
        score.losses=score.losses+1;
    }
    else{
        score.ties+=1;
    }

    
    
    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElement();
    

}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`
Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`
}

function pickComputerMove(){
    let computerMove='';
    const randomNumber=Math.random();
    
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove='Rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='Paper';
    }
    else{
        computerMove='Scissors';
    }
    return computerMove;
}