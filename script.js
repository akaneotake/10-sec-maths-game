$(document).ready(function() {

  // [function] Play again
  var showPlayAgainBtn = function() {
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
      time--;
      $('#count').html(time);
      setTimeout(countdownTimer, 1000);  
    } else {
      showPlayAgainBtn();
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

  // [function] Check max number and decide the numbers 
  var num1 = 0;
  var num2 = 0;
  var decideNumbers = function() {
    var limit = Number($('#limitRange').val());
    if (limit == 10) {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
    } else {
      num1 = Math.floor(Math.random() * (limit + 1));
      num2 = Math.floor(Math.random() * (limit + 1));
    };
  };

  // [function] Generate Question
  var answer = 0;
  var generateQuestion = function() {
    decideNumbers();
    checkedOperators();
    var operator = decideOperator();
    var printAnswer = $('#equation').html(num1 + operator + num2);
    if (operator == '+') {
      answer = num1 + num2;
      printAnswer;
    } else if (operator == '-' && (num1 - num2) >= 0) {
      answer = num1 - num2;
      printAnswer;
    } else if (operator == 'x') {
      answer = num1 * num2;
      printAnswer;
    } else if (operator == '÷' && Number.isInteger(num1 / num2)) {
      answer = num1 / num2;
      printAnswer;
      // 答えがマイナス（引き算）か小数（割り算）の時
    } else if ((operator == '-' && (num1 - num2) < 0) || (operator == '÷' && !Number.isInteger(num1 / num2))) {
      generateQuestion();
      // No arithmetic operator is checked 
    } else {
      console.log('something went wrong');   
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
      $('#judgement').css('color', 'lime');
      generateQuestion();
      currentScore++;
      $('#currentScore').html(currentScore);
    } else {
      $('#answer').val('');
      $('#judgement').html('wrong answer!');
      $('#judgement').css('color', 'red');
    };
  };

  // Events
  // Count start & check the input by keydowns
  var countStart;
  var timeout;
  $('#answer').on('keyup', function() {
    // countdownTimer()
    if (countStart !== true) {
      countdownTimer();
      countStart = true;
    };
    // checkAnswer()
    clearTimeout(timeout);
    timeout = setTimeout( function() {
      checkAnswer();
    }, 250);
  });

  // Detect which arithmetic operators are checked
  $('.checkbox').on('change', function() {
    checkedOperators();
    if (operators.length === 0) {
      alert('Please check at least one of the arithmetic operators!\n(+) or (-) or (x) or (÷)');
    }
  });

  // Change the number limit
  $('#limitRange').on('change', function() {
    $('#limit').html($('#limitRange').val());
  });
  
  // Reset the game by clicking 'Play again' button
  $('#playAgainBtn').on('click', function() {
    time = 10;
    $('#count').html(time);
    $('#answer').val('');
    if (Number($('#currentScore').html()) > Number($('#highScore').html())) {
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