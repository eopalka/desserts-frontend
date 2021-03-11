// async function getReviews() {
//     // fetch to the rails api, blogs index. Grab the blogs
//     // populate the main div with the blogs
//     const data = await Api.get("/reviews");
    
//     Review.createFormCollection(data);
//     Review.renderReviews();
// }


function resetFormInputs() {
    titleInput().value ="";
    commentInput().value ="";
    scoreInput().value ="";
}

function resetMain() {
    main().innerHTML = "";
}

function formLinkEvent() {
    formLink().addEventListener("click", function(e) {
        e.preventDefault();
        Review.renderForm();
    });
}

function reviewsLinkEvent() {
    reviewsLink().addEventListener("click", function(e) {
        e.preventDefault();
        console.log(this);
        Review.renderReviews();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    Review.getReviews();
    formLinkEvent();
    reviewsLinkEvent();
    Review.listenforKeyDown();
})