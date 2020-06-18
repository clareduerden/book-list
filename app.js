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
  console.log(book);
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

UI.prototype.clearFields = function () {
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("isbn").value = '';
}

// Load Event Listener Add Book Btn
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", makeBook);

// Load Event Listener for Delete Book
// const bookTable = document.getElementById("book-table");
// bookTable.addEventListener("click", deleteBook);

function makeBook(e) {
  // Get our UI input elements
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const isbn = document.getElementById("isbn");

  // Instantiate new Book from those values
  const book = new Book(title.value, author.value, isbn.value);

  // Instantiate a UI instance
  const ui = new UI();

  // Add book to the list on the ui
  ui.addBookToList(book);

  // Clear the UI input fields
  ui.clearFields();

  // prevent default submit behaviour
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