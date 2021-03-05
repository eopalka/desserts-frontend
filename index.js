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

function reviewLink() {
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

