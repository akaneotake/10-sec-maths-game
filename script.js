$(document).ready(function() {

  // Countdown timer
  var time = 10;
  var countdownTimer = function() {
    if (time > 0) {
      console.log(time);
      time--;
      setTimeout(countdownTimer, 1000);
    } else {
      console.log("--END--");
    }
  };

  // Generate Questions
  var generateQuestions = function() {
    // 0~9
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var answer = num1 + num2;
    $('#equation').append(num1 + "+" + num2 + "=" + answer);
  };

  countdownTimer();
  generateQuestions();

});