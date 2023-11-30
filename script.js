$(document).ready(function() {

  var generateQuestions = function() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var answer = num1 + num2;
    console.log(num1 + "+" + num2 + "=" + answer);
    $('#equation').append(num1 + "+" + num2 + "=" + answer);
  };

  generateQuestions();

});