$(document).ready(function () {
$("#tweet-text").on("input", function () {
  let $numOfChars = $(this).val().length;
  let $remainingChars = (140 - $numOfChars);
  let $output = $(this).parent().find(".counter");
  $output.text($remainingChars);
  if ($remainingChars < 0) {
    $("#tweet-error").addClass("error_show");
  } else {
    $("#tweet-error").removeClass("error_show");
  }

});
});
