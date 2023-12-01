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

  // [function] Generate Question
  var answer = 0;
  var generateQuestion = function() {
    // 0~9
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    answer = num1 + num2;
    $('#equation').html(num1 + "+" + num2);
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

  // Events
  $('#answer').on('focus', countdownTimer);

  var timeout;
  $('#answer').on('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout( function() {
      checkAnswer();
    }, 300);
  });

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
  });

  generateQuestion();

});