const libraryContainer = document.querySelector("#library");
const myLibrary = [];
const saveButton = document.querySelector(".saveBtn");

//Constructor for Book
function Book(title, author, genre, page) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.page = page;
  this.isRead = false;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

Book.prototype.cardRender = function () {
  const card = document.createElement("div");
  card.className = "book-card";

  // Creating new elements
  card.innerHTML = `
  <p><strong>Title: </strong>${this.title}</p>
  <p><strong>Author: </strong>${this.author}</p>
  <p><strong>Genre: </strong>${this.genre}</p>
  <p><strong>Pages: </strong>${this.page}</p>

  <div class="action">
  <button class="statusBtn">${this.isRead ? "Read" : "Not Read"}</button>
  <button class="removeBtn">Remove</button>
  </div>
  `;

  const statusButton = card.querySelector(".statusBtn");
  const removeButton = card.querySelector(".removeBtn");

  //Checking for status button toggle
  statusButton.addEventListener("click", () => {
    this.toggleReadStatus();

    statusButton.textContent = this.isRead ? "Read" : "Not Read";
    statusButton.classList.toggle("read", this.isRead);
  });

  //Event for handling remove
  removeButton.addEventListener("click", () => {
    card.remove();
  });

  libraryContainer.appendChild(card);
};

//Handling for Save button
saveButton.addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const pages = document.getElementById("pages").value.trim();

  if (!title || !author || !genre || !pages) {
    alert("Enter correct values");
    return;
  }

  let newBook = new Book(title, author, genre, pages);
  myLibrary.push(newBook);
  newBook.cardRender();

  clearForm();
});

//Function for resetting the for after the save button click
function clearForm() {
  title.value = "";
  author.value = "";
  genre.value = "";
  pages.value = "";
}
