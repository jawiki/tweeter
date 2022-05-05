$(document).ready(function () {
$("#tweet-text").on("input", function () {
  let $numOfChars = $(this).val().length;
  let $remainingChars = (140 - $numOfChars);
  let $output = $(this).parent().find(".counter");
  $output.text($remainingChars);

  if ($remainingChars < 0) {
    $("#tweet-error").addClass("error");
    $("#tweet-error").slideDown(400);
    $(".submit-button").prop("disabled", true);
  } 
  // if ($(this).val().length === 0) {
  //   $("#tweet-error").addClass("error");
  // }
  else {
    $("#tweet-error").removeClass("error");
    $("#tweet-error").slideUp(400);
    $(".submit-button").prop("disabled", false);
  }
  console.log($(this).val.length);
});
});
