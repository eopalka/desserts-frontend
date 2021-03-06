let reviews = [
    {title: "Pastry Cream",comment: "freaking yum"},
    {title: "Fruit Tart",comment: "freaking yummy yummy"},
]

const baseUrl = "http://localhost:3000"

function main() { 
    return document.getElementById("main");
}

function titleInput() {
    return document.getElementById("title");
}

function commentInput() {
    return document.getElementById("comment");
}

function scoreInput() {
    return document.getElementById("score");
}

function authorInput() {
    return document.getElementById("author");
}

function form() {
    return document.getElementById("form");
}

function formLink() {
    return document.getElementById("form-link")
}

function reviewsLink() {
    return document.getElementById("reviews-link")
}


function fetchFunction() {
  
}

function getReviews() {
    fetch(baseUrl + '/reviews')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        reviews = data

        renderReviews();
    })
}

function resetFormInputs() {
    titleInput().value ="";
    commentInput().value ="";
    scoreInput().value ="";
}

function resetMain() {
    main().innerHTML = "";
}

function formTemplate() {
    return `
    <h3>Review a dessert:</h3>
      <form id="form">
        <div class="input-field">
          <label for="title">What did you eat?</label>
          <input type="text" name="title" id="title" />
        </div>
        <div class="input-field">
          <label for="comment">What did you think?</label><br />
          <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
        </div>
        <div class="input-field">
        <label for="score">On a scale of 1-10 how would you rate it?</label>
        <input type="number" name="score" id="score" />
      </div>
        <div class="input-field">
        <label for="author">Who are you?</label>
        <input type="text" name="author" id="author" />
      </div>
        <input type="submit" value="Create Blog" />
        </form>
        `;
}

function reviewsTemplate() {
    return `
    <h2>Here is what people are saying:</h2>
    <div id="reviews"></div>
    `;
}

function renderReview(review) {
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let span = document.createElement("span")
    let p = document.createElement("p");
    let byAuthor = document.createElement("p");
    let reviewsDiv = document.getElementById("reviews");
    // let = document.createElement("");

    h4.innerText = `Dessert: ${review.title}`;
    span.innerText = `Rating: ${review.score}`;
    p.innerText = `Opinion: ${review.comment}`;
    byAuthor.innerText = `By: ${review.author.name}`;

    div.appendChild(h4);
    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(byAuthor);

    reviewsDiv.appendChild(div);
}

function renderForm() {
    resetMain();
    main().innerHTML = formTemplate();
    form().addEventListener("submit", submitForm);
}

function renderReviews() {
    resetMain();
    main().innerHTML = reviewsTemplate();

    reviews.forEach(function (review) {
        renderReview(review);
    });

}

function submitForm(e) {
    e.preventDefault();
    alert("Yummy Yummy");

    let strongParams = {
        review: {
          title: titleInput().value,
          comment: commentInput().value,
          score: scoreInput().value,
          author_attributes: authorInput().value,
        }
      }
    
      // send data to the backend via a post request
      fetch(baseUrl + '/reviews', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams),
        method: "POST"
      })
        .then( function(resp) {
          return resp.json();
        })
        .then( function(review) {
          reviews.push(review)
          renderReviews();
        })
    
}

function formLinkEvent() {
    formLink().addEventListener("click", function(e) {
        e.preventDefault();

        renderForm();
    });
}

function reviewsLinkEvent() {
    reviewsLink().addEventListener("click", function(e) {
        e.preventDefault();

        renderReviews();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    getReviews();
    formLinkEvent();
    reviewsLinkEvent();
    //renderReviews();
})