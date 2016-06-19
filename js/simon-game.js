$(document).ready(function(){
	// VARIABLES
	var game = {
		toPress: [],
		userInput: [],
		counter: 1,
		slicer: 0,
		strict: false,
		pressedStatus: false,
		started: false,
	};

	// RANDOMIZER
	function randomizer(){
		game.userInput = [];
		randomNumber = Math.floor(Math.random() * 4);
		game.toPress.push(randomNumber);
		console.log(game.toPress); //DEBUG CHEAT
		highlighter(game.toPress);
	};

	// HIGHLIGHTER
	function highlighter(listOfButtons){
		var counterText = game.counter < 10 ? '0' + game.counter : game.counter;
		game.slicer = 0;
		$('#counter').text(counterText);
		for (var i = 0; i < listOfButtons.length; i++) {
			var button = $(".button:eq("+listOfButtons[i]+")");
			counter(button, i, listOfButtons[i]);
		}
	};

	// TIMER
	function counter(id, order, index, timeSeq = 1500, timeInit = 1500){
		setTimeout(function(){
			playAudio(index);
			id.addClass("highlight");
			setTimeout(function(){
				id.removeClass("highlight");
			},1000)
			if(order + 1 == game.toPress.length){$('.button').removeClass('cantClick').addClass('canClick');};
		},timeSeq * order + timeInit);

	};

	// AUDIO
	function playAudio(number){
		var audio = new Audio('sounds/simonSound' + number + '.mp3');
		audio.play();
	};

	// USER INPUT
	function userInput(){
		
		$(".button").mousedown(function(){
			game.pressedStatus = true;
			game.slicer += 1;
			var index = $(".button").index(this);
			game.userInput.push(index);

			var button = $(".button:eq("+index+")");
			playAudio(index);
			button.addClass("highlight");
			
		});
		$(".button").mouseup(function(){
			
			var index = $(".button").index(this);
			var button = $(".button:eq("+index+")");
			button.removeClass("highlight");
			game.pressedStatus = false;
			compare();

		});
	};
	// COMPARE USER INPUT VS EXPECTED INPUT
	function compare(){
		var pressedSliced = game.userInput.slice(0, game.slicer).join(" ");
		var toPressSliced = game.toPress.slice(0, game.slicer).join(" ");
		console.log(pressedSliced, toPressSliced, game.userInput, game.toPress, game.slicer); //DEBUG CHEAT
		if(pressedSliced == toPressSliced){
			if(game.userInput.length == game.toPress.length){
				console.log('Correct!');
				game.userInput = [];			
				game.counter += 1;
				if(game.counter == 20){
					winMsg();
				}
				else if(!game.pressedSliced){
					$('.button').removeClass('canClick').addClass('cantClick');
					randomizer();
				}				
			}
		}
		else{
			game.userInput = [];
			console.log("Wrong!");
			errorMsg();
		}

	};

	// ERRORMSG
	function errorMsg(){
		$('#counter').text('XX');
		$('.button').removeClass('canClick').addClass('cantClick');
		$(".button").addClass("highlight");
		setTimeout(function(){
			$(".button").removeClass("highlight");
			if(!game.strict){
				highlighter(game.toPress);
			}
			else{
				game.counter = 1;
				game.toPress = [];
				randomizer();
			}
		}, 1500);

	};
	
	// WINMSG
	function winMsg(){
		$('#counter').text('!!');
		var victoryMusic = [3, 2, 1, 0]
		for (var i = 0; i < victoryMusic.length; i++) {
			var button = $(".button:eq("+victoryMusic[i]+")");
			counter(button, i, victoryMusic[i], 250, 300);
		}
		setTimeout(restart, 2000);
	};

	// RESTART
	function restart(){
		game.toPress = [];
		game.userInput = [];
		game.counter = 1;
		randomizer();
	};
		// INIT
	$("#start").on("click", function(){
		if(!game.started){
			game.started = true;
			randomizer();
			userInput();
		}
		else{
			restart();
		}

		// STRICT BUTTON FUNCTION
		$("#strict").on("click", function(){
			if(!game.strict){
				$(".led").addClass("on");
				game.strict = true;
			}
			else{
				$(".led").removeClass("on");
				game.strict = false;
			}
		});
	});
});

	