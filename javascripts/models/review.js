class Review {
    static all = []

    constructor(attr) {
        this.id = attr.id;
        this.title = attr.title;
        this.comment = attr.comment;
        this.score = attr.score;
        this.author = attr.author;
    }

    save() {
      // not saving into DB, saving in array
      Review.all.push(this)
    }

    render() {
        let div = document.createElement("div");
        let cardDiv = document.createElement("div")
        let h4 = document.createElement("h4");
        let span = document.createElement("span")
        let p = document.createElement("p");
        let byAuthor = document.createElement("p");
        let deleteLink = document.createElement("a");
        let reviewsDiv = document.getElementById("reviews");

        div.setAttribute("class", "card")
        cardDiv.setAttribute("class", "card-body")
        cardDiv.style="align: center;"


    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"
    deleteLink.addEventListener("click", Review.deleteReview)

    h4.innerText = `${this.title}`;
    h4.setAttribute("class", "card-title")

    span.innerText = `${this.score}/10`;
    span.setAttribute("class", "card-subtitle mb-2 text-muted")

    p.innerText = `${this.comment}`;
    p.setAttribute("class", "card-text")

    byAuthor.innerText = `By: ${this.author.name}`;
    byAuthor.setAttribute("class", "card-title")

    cardDiv.appendChild(h4);
    cardDiv.appendChild(span);
    cardDiv.appendChild(p);
    cardDiv.appendChild(byAuthor);
    cardDiv.appendChild(deleteLink);
    div.appendChild(cardDiv);
    div.appendChild(document.createElement("br"));
    reviewsDiv.appendChild(div);
    reviewsDiv.appendChild(document.createElement("br"));
    }

    static createFromCollection(collection) {
      collection.forEach(data => Review.create(data))
    }

    static create(attr){
      // creates and saves an object
      let review = new Review(attr); // running constructor
      review.save();
      return review;
    }

    // REVIEW TEMPLATES

    static reviewsTemplate() {
        return `
        <h2>Here is what people are eating:</h2>
        <div id="reviews">  </div>
        `;
    }

    static formTemplate() {
        return `
        <h3>Review a dessert:</h3>
          <form id="form">
            <div class="input-field">
              <label for="title">What did you eat?</label><br>
              <input type="text" name="title" id="title" />
            </div>
            <div class="input-field">
              <label for="comment">What did you think?</label><br>
              <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
            </div>
            <div class="input-field">
            <label for="score">On a scale of 1-10 how would you rate it?</label><br>
            <input type="number" name="score" id="score" min="1" max="10" />
          </div>
            <div class="input-field">
            <label for="author">Who are you?</label><br>
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
        Review.createFromCollection(data)
        Review.renderReviews();
    }

    static async deleteReview(e) {
      e.preventDefault();
      let id = e.target.dataset.id;
      const data = await Api.delete("/reviews/" + id);
      Review.all = Review.all.filter(function(review){
        return review.id !== data.id;
      })
      Review.renderReviews();
    }

    static listenforKeyUp() {
      inputSearch().addEventListener("keyup", this.inputFilter)
    }

    static inputFilter() {
      const text = document.querySelector('#search').value 
      const filtered = Review.all.filter(review => review.title.includes(text))
      document.querySelector("#reviews").innerHTML = ""
      filtered.forEach(review => review.render())
    }    
  
}