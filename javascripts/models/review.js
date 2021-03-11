class Review {
    static all = []

    constructor(attr) {
        this.id = attr.id;
        this.title = attr.title;
        this.comment = attr.comment;
        this.score = attr.score;
        this.author = attr.author;
    }

    render() {
        let div = document.createElement("div");
        let h4 = document.createElement("h4");
        let span = document.createElement("span")
        let p = document.createElement("p");
        let byAuthor = document.createElement("p");
        let deleteLink = document.createElement("a");
        let reviewsDiv = document.getElementById("reviews");


    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"

    deleteLink.addEventListener("click", Review.deleteReview)

    h4.innerText = `Dessert: ${this.title}`;
    span.innerText = `Rating: ${this.score}`;
    p.innerText = `Opinion: ${this.comment}`;
    byAuthor.innerText = `By: ${this.author.name}`;

    div.appendChild(h4);
    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(byAuthor);
    div.appendChild(deleteLink);
    reviewsDiv.appendChild(div);
    }

    save() {
        // not saving into DB, saving in array
        Review.all.push(this)
    }

    static create(attr){
        // creates and saves an object
        let review = new Review(attr);
        review.save();
        return review;
    }

    static createFormCollection(collection) {
        collection.forEach(data => Review.create(data))
    }

    // REVIEW TEMPLATES

    static reviewsTemplate() {
        return `
        <h2>Here is what people are saying:</h2>
        <div id="reviews"></div>
        `;
    }

    static formTemplate() {
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
            <input type="number" name="score" id="score" min="1" max="10" />
          </div>
            <div class="input-field">
            <label for="author">Who are you?</label>
            <input type="text" name="author" id="author" />
          </div>
            <input type="submit" value="Submit" />
        </form>
        `;
    }

    // renders

    static renderForm() {
        resetMain();
        main().innerHTML = Review.formTemplate();
        form().addEventListener("submit", Review.submitForm);
    }


    static renderReviews() {
        resetMain();
        main().innerHTML = Review.reviewsTemplate();
        
        Review.all.forEach(review => review.render());
    }

    static submitForm(e) {
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
        Api.post('/reviews', strongParams)
          .then(function(data) {
            Review.create(data);
            Review.renderReviews();
          })
    }

    static async getReviews() {
        const data = await Api.get("/reviews");
        Review.createFormCollection(data)
        Review.renderReviews();
    }

    static async deleteReview(e) {
      e.preventDefault();
      let id = e.target.dataset.id;
      const data = await Api.delete(Api.baseUrl + "/reviews/" + id);
      Review.all = Review.all.filter(function(review){
        return review.id !== data.id;
      })
      Review.renderReviews();
    }

    // static listenforKeyDown() {
    //   inputSearch().addEventListener("keydown", this.inputFilter)
    // }

    // static inputFilter() {
    //   const text = document.querySelector('#search').value 
    //   const filtered = Review.all.filter(review => this.title.includes(text))
    //   document.querySelector("#reviews").innerHTML = ""
      // filtered.forEach(review => review.addToDom())
    // }    
  
}