//This is the classic Hangman game
//You have to guess the word in a limited number of turns


//Words to solve
var words = ['code', 'develop', 'lidia']
//Randomize them
var decomMaxIndex = words.length-1;
var decomRandomIndex = Math.floor(Math.random() * (decomMaxIndex + 1));
var word = words[decomRandomIndex].split("");
var wordHidden = [];
var usedLetters = [];
var fails = usedLetters.length + 1;

//Get word
$(document).ready(newWord());

//Surrender
$('.surrender').click(function (event) {
	event.preventDefault()
	lose();
});

//Submit by ENTER
$('input').keypress( function (event){

	if (event.which == '13') {
		event.preventDefault()
		submit();
	};	
});

// Submit by CLICK
$('.submit').click( function (event){
	event.preventDefault()
	submit();
});

// Get new word
function newWord () {
	for (var i = 0; i < word.length; i++) {
		wordHidden.push("-");
	}
	$('#word').html(wordHidden);
}
// Submit AND check if it's correct 
function submit (){
	var used = $('input').val();
		usedLetters.push(used);
		$('.used').html('<p>' + usedLetters + '</p>');
		$('.failsNumber').html(fails++);
		$('input').val("");
		$('img').attr('src','hangman_smilie/smilie_hangman-0' + fails +'.png');

	for (var i = 0; i < word.length; i++) {
		//if letter exists within the word
		if (word[i] === used) {
			console.log ('cool');
			wordHidden[i] = used;
			console.log(wordHidden);
			$('#word').html(wordHidden);
			win();

		} else {
		//if letter DOES NOT exist within the word
			console.log ('caca');
		}
	};
	// No lives left
	if (usedLetters.length >= 8) {
		lose();
	}		
}

// Victory
function win () {
	var compareOriginal = word.toString();
	var compareGuess = wordHidden.toString();

	if (compareOriginal === compareGuess) {	
	$('img').attr('src','hangman_smilie/smilie_hangman-00.png');
	$('.hangman').prepend('<h2>You win!!!</h2>');
	}
}

// Defeat
function lose (){
	$('img').attr('src','hangman_smilie/smilie_hangman-09.png');
	$('.hangman').prepend('<h2>YOU LOSE!!!</h2>');
	$('#word').html(word);
}