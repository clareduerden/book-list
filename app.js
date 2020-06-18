// Book Constructor - makes a book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor - empty function - everything else will go in prototype
function UI() { }

// Add Book to List prototype function to UI
UI.prototype.addBookToList = function (book) {
  const bookList = document.getElementById("book-list");

  // create new table row element
  const tr = document.createElement("tr");

  // Create innerHTML using template literal - shorter and better way to do it!
  tr.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td>${formatDate(new Date())}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  // const title = document.createElement("td");
  // title.textContent = book.title;
  // const author = document.createElement("td");
  // author.textContent = book.author;
  // const isbn = document.createElement("td");
  // isbn.textContent = book.isbn;
  // const date = document.createElement("td");
  // date.textContent = formatDate(new Date());
  // tr.appendChild(title);
  // tr.appendChild(author);
  // tr.appendChild(isbn);
  // tr.appendChild(date);

  // append tr element to the bookList
  bookList.appendChild(tr);
}

// UI prototype method for deleting book from the list
UI.prototype.deleteBookFromList = function (target) {
  target.parentElement.parentElement.remove();
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("isbn").value = '';
}

// Show Error Alert in UI
UI.prototype.showAlert = function (msg, classname) {
  // Create a div and add class names
  const div = document.createElement("div");
  div.className = `alert ${classname}`;
  // create a text node and append it
  const text = document.createTextNode(msg);
  div.appendChild(text);
  // Insert into the DOM before the form
  const container = document.querySelector(".container");
  const form = document.getElementById("book-form");
  container.insertBefore(div, form);

  // Set div to timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

// Load Event Listener Add Book Btn
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addBook);

// Load Event Listener for Delete Book
const bookList = document.getElementById("book-list");
bookList.addEventListener("click", deleteBook);

// addBook function
function addBook(e) {
  // Get our UI input elements
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate a UI instance
  const ui = new UI();

  // Validate the IU inputs - make sure they are not empty
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert("Please fill in all fields", "error");
  }
  else {
    // Instantiate new Book from those values
    const book = new Book(title, author, isbn);
    // Add book to the list on the ui
    ui.addBookToList(book);
    // Show success alert
    ui.showAlert("Success - Book Added", "success");
    // Clear the UI input fields
    ui.clearFields();
  }

  // prevent default submit behaviour
  e.preventDefault();
}

// deleteBook function
function deleteBook(e) {
  // Instantiate a UI instance
  const ui = new UI();

  if (e.target.classList.contains("delete")) {
    // Delete the book from the list
    ui.deleteBookFromList(e.target);
    // Show delete alert
    ui.showAlert("Book was deleted", "success");
  }

  // Prevent default behaviour
  e.preventDefault();
}

// function to format a date as DD-MM-YYYY - returns a string
function formatDate(date) {
  const day = (date.getDate());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = day + "-" + month + "-" + year;
  return formattedDate;
}