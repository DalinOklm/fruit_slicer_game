var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['apple', 'banana', 'cherries', 
'grapes', 'mango', 'orange', 'peach', 'pear',
'watermelon'];
$(function(){

//click on start reset button
$("#startreset").click(function(){

    //if we are already playing
    if(playing == true){
    	//reload page
    	location.reload();
    }else{

    	//we are not playing
    	playing = true; //game initiated

    	//set score to 0
    	score = 0; //set score
    	$("#scorevalue").html(score); 

    	//show trials left
    	$("#trialsLeft").show();
        trialsLeft = 3;
    	addHearts();

    	//hide game over 
    	$("#gameover").hide();

    	//change button text to reset game
    	$("#startreset").html("Reset Game");
    	startAction();
    }
});


$("#fruit1").mouseover(function(){
	score++;
	$("#scorevalue").html(score);
	$("#slicesound")[0].play(); //play sound

	//stop fruit and hide it
		clearInterval(action);

		//hide fruit
		$("#fruit1").hide("explode", 500);

	//Send new fruit
	setTimeout(startAction, 500);
});



function addHearts(){
	$("#trialsLeft").empty();
	for(i = 0; i<trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');   
    }                                                                                            
}

function startAction()
{
	$("#fruit1").show();
	chooseFruit(); //choose a random fruit
	$("#fruit1").css({'left': Math.round(500*Math.random()), 'top' : -40});

	//generate a random step
	step = 1+ Math.round(5*Math.random()); //step change

	// Move fruit down by one step every 10ms
	action = setInterval(function()
	{
			$("#fruit1").css('top',
				$("#fruit1").position().top + step);

	    //check if the fruit is too low
	    if($("#fruit1").position().top > 
	    	$("#fruitContainer").height())
	    {
	    	//check if we have trials left
	    if(trialsLeft > 1){
	    	//generate a fruit
	    	$("#fruit1").show();
		chooseFruit(); //choose a random fruit
		$("#fruit1").css({'left': Math.round(500*Math.random()), 'top' : -40});

		//generate a random step
		step = 1+ Math.round(5*Math.random()); //step change

		//reduce a random step
            trialsLeft --;

            //populate trialsleft box
            addHearts();
	    	
	    }else { // game over
            playing = false; //we are not playing anymore

            $("#startreset").html("Start Game"); // change button to start game
            $("#gameover").show();
            $("#gameover").html('<p>Game Over!</p><p>Your score is '
            	+ score +'</p>');
            $("#trialsLeft").hide();
            stopAction();
    	}

	}
    }, 10);
}

	//generate a random fruits
	function chooseFruit(){
		$("#fruit1").attr('src' , 'images/'+fruits[Math.round(8*Math.random())]+'.png')
	}

	//Stop dropping fruit
	function stopAction() {
		clearInterval(action);
		$("#fruit1").hide();
	}

	});