$(document).ready(function() {

  // [function] Countdown timer
  var time = 10;
  $('#count').append(time);

  var countdownTimer = function() {
    if (time > 0) {
      $('#count').empty();
      time--;
      console.log(time);
      setTimeout(countdownTimer, 1000);
      $('#count').append(time);
    };
  };

  // [function] Generate Question
  var answer = 0;
  var generateQuestion = function() {
    // 0~9
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    answer = num1 + num2;
    $('#equation').append(num1 + "+" + num2);
  };

  // [function] Check Answer
  var checkAnswer = function() {
    if ($('#answer').val() == answer) {
      time++;
      console.log("correct");
      $('#equation').text('');
      $('#answer').val('');
      generateQuestion();
    };
  };

  // Events
  $('#answer').on('click', countdownTimer);
  $('#answer').on('input', checkAnswer);
  generateQuestion();
});