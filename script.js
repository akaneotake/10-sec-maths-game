$(document).ready(function() {

  // [function] Play again
  var playAgain = function() {
    $('#equation').html('');
    document.getElementById('answer').disabled = true;
    $('#judgement').html('');
    $('#playAgainBtn').toggleClass('hidden');
  };

  // [function] Countdown timer
  var time = 10;
  $('#count').html(time);

  var countdownTimer = function() {
    if (time > 0) {
      $('#count').empty();
      time--;
      setTimeout(countdownTimer, 1000);
      $('#count').html(time);
    } else {
      playAgain();
    };
  };

  // [function] Detect the checked arithmetic operators (Push them to the 'operators' array)
  var operators = ['+'];
  var checkedOperators = function() {
    operators = [];
    var checkbox = document.getElementsByClassName('checkbox');
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        operators.push(checkbox[i].value);
      };
    };
  };
  
  // [function] Pick one arithmetic operator for the question 
  var decideOperator = function() {
    var index = Math.floor(Math.random() * operators.length);
    return operators[index];
  };

  // [function] Generate Question
  var answer = 0;
  var generateQuestion = function() {
    // 0~9
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var operator = decideOperator();
    var printAnswer = $('#equation').html(num1 + operator + num2);
    if (operator == '+') {
      answer = num1 + num2;
      printAnswer;
    } else if (operator == '-' && (num1 - num2) > 0) {
      answer = num1 - num2;
      printAnswer;
    } else if (operator == 'x') {
      answer = num1 * num2;
      printAnswer;
    } else if (operator == '÷' && Number.isInteger(num1 / num2)) {
      answer = num1 / num2;
      printAnswer;
    } else {
      generateQuestion();
    };
  };

  // [function] Check Answer
  var currentScore = 0;
  $('#currentScore').html(currentScore);
  var highScore = 0;
  $('#highScore').html(highScore);
  
  var checkAnswer = function() {
    if ($('#answer').val() == answer) {
      time++;
      $('#equation').html('');
      $('#answer').val('');
      $('#judgement').html('correct');
      $('#judgement').css('color', 'green');
      generateQuestion();
      currentScore++;
      $('#currentScore').html(currentScore);
    } else {
      $('#answer').val('');
      $('#judgement').html('wrong answer!');
      $('#judgement').css('color', 'red');
    };
  };

  // 計算式の桁数増やす？

  // Events
  // Count start & check the input by keydowns
  var countStart;
  var timeout;
  $('#answer').on('keydown', function() {
    // countdownTimer()
    if (countStart !== true) {
      countdownTimer();
      countStart = true;
    };
    // checkAnswer()
    clearTimeout(timeout);
    timeout = setTimeout( function() {
      checkAnswer();
    }, 300);
  });

  // Detect which arithmetic operators are checked
  $('.checkbox').on('change', checkedOperators);
  
  // Change the number limit
  $('#limitRange').on('change', function() {
    $('#limit').html($('#limitRange').val());
  });
  
  // Reset the game by clicking 'Play again' button
  $('#playAgainBtn').on('click', function() {
    time = 10;
    $('#count').html(time);
    if ($('#currentScore').html() > $('#highScore').html()) {
      $('#highScore').html(currentScore);
    };
    currentScore = 0;
    $('#currentScore').html(currentScore);
    generateQuestion();
    document.getElementById('answer').disabled = false;
    $('#playAgainBtn').toggleClass('hidden');
    countStart = false;
  });

  // Generate question
  generateQuestion();

});