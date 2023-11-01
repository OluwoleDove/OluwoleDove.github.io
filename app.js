/*Question*/
//Constructor function
function Question(text, choices, answer){
	//three attributes
	this.text = text;
	this.choices = choices;
	this.answer = answer;

	/*You can also add a function inside the constructor functioin but it's not reccomended*/
}

Question.prototype.correctAnswer = function(choice){
	return choice === this.answer;
}

/*Quiz Controller*/
function Quiz(questions){
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function(){
	return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
	return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer){
	if(this.getQuestionIndex().correctAnswer(answer)){
		this.score++;
	}
	this.questionIndex++;
}

function populate(){
	if(quiz.isEnded()){
		showScores();
	}
	else{
		//show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i < choices.length; i++){
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}
		showProgress();
	}
}

function guess(id, guess){
	var button = document.getElementById(id);
	button.onclick = function(){
		quiz.guess(guess);
		populate();
	}
}

function showProgress(){
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length;
}

function showScores(){
	var gameOverHtml = "<h1>Result</h1>";
	gameOverHtml += "<h2 id='score'>Your score: " + quiz.score + "</h2>";
	var element = document.getElementById("quiz");
	element.innerHTML = gameOverHtml;
}

var questions = [
	new Question("Which is not an object oriented programming language?", ["Java", "C#", "C++", "C"], "C"),
	new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
	new Question("There are _____ main components of object orinted programming.", ["1", "6", "2", "4"], "4"),
	new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
	new Question("MVC is a _____.", ["Language", "Library", "Framework", "All"], "Framework")
];

var quiz = new Quiz(questions);

populate();