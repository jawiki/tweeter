function escape(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  for (let i of tweets) {
    $(".tweets-container").prepend(createTweetElement(i));
  }
};

const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;
  let $tweet = $(`
  <article class="tweet-box">
          <div class="tweet-top">
            <div class="article-header">
            <img src=${user.avatars} />
            <header class="tweet-header">${user.name}</header> 
            </div>
            <p class="author">${user.handle}</p>
          </div>
          <div class="tweet-content">
            <label class="tweet-actual">${escape(content.text)}</label>
          </div>
          <div class="tweet-bottom">
            <footer class="tweet-footer">${timeago.format(created_at)}</footer>
            <p class="dynamic-buttons">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
            </p>
          </div>
        </article>
  `);
  return $tweet;
};

$(document).ready(function () {
  $("form").on("submit", function (e) {
    // console.log(e.target.value);
    console.log($("#tweet-text").first().val());
      if ($("#tweet-text").first().val() === "") {
        $("#tweet-error").addClass("error");
        $("#tweet-error").slideDown(400);
      } else {
        $("#tweet-error").removeClass("error");
        $("#tweet-error").slideUp(400);
         $.ajax({
           url: "/tweets",
           type: "application/json",
           data: $(this).serialize(),
           method: "POST",
           success: function () {
             $("textarea").val("");
             $.get("/tweets", (data) => {
               const newTweet = data.slice(-1);
               renderTweets(newTweet);
             });
           },
         });
      }
    e.preventDefault();
  });


  const loadTweets = function () {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };
  loadTweets();
});
