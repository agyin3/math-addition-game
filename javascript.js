var playing = false;
var counter = 60;
var myCounter;
var scorevalue;
var first;
var second;

/* ON CLICK ACTIONS */

//start the game
document.getElementById("startreset").onclick = 
function() {
    if(playing == true) {
       location.reload(); // reload page 
    }else {
        //change playing to true
        playing = true;
        
        //set score value
        scorevalue = 0;
        
        //hide game over box 
        hide("gameover");
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //show countdown box
        show("time");
        
        //start timer
       startCountdown();
        
        //generate questions and answers
        generateQA();
    }
};

//clicking answer boxes
for(i = 1; i < 5; i++) {
    document.getElementById("choice" + i).onclick = 
function() {
  if(playing == true) {
      if(this.innerHTML == answer){
          
          scorevalue+=1;
            document.getElementById("scorevalue").innerHTML = scorevalue;
          hide("wrong");
          show("correct");
          setTimeout(function(){
              hide("correct");
          },500)
          generateQA();
        
         }else{
             
             hide("correct");
             show("wrong");
             setTimeout(function(){
              hide("wrong");
          },500)
         }
  }  
};
}

/* FUNCTIONS */


//Start Timer
function startCountdown() {
    myCounter = setInterval(function(){
        counter--;
        document.getElementById("counter").innerHTML = counter;
        if(counter == 0) {
            clearInterval(myCounter);
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p>Your Score:  " + scorevalue + ".</p>";
            document.getElementById("startreset").innerHTML = "Start Game";
            hide("correct");
            hide("wrong");
            hide("timeremaining")
            playing = false; 
        }
    }, 1000);
}

//hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
    document.getElementById(Id).style.display = "initial";
}

//generate questions and multiple answers 
function generateQA(){
    first = 1 + Math.round(9 * Math.random());
    second = 1+ Math.round(9 * Math.random());
    answer = first * second;
    document.getElementById("question").innerHTML = second + " x " + first;
    
    //fill box with correct answer
    var correctPostion = 1 + Math.round(3 * Math.random());
    document.getElementById("choice"+correctPostion).innerHTML = answer;
    
    //fill other boxes with wrong answers
    
    var answers = [answer]
    
    for(var i = 1; i < 5; i++) {
        if(i != correctPostion) {
            var wrongAnswer;
            
            //generate different wrong answers
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }while(answers.indexOf(wrongAnswer) > -1)
            
               document.getElementById("choice" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
    
};

