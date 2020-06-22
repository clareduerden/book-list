// BUILD CLASSES OF BOOK AND UI
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.getElementById("book-list");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${formatDate(new Date())}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    bookList.appendChild(tr);

    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    console.log("Book added to Local Storage!");
  }

  deleteBookFromList(target) {
    target.parentElement.parentElement.remove();
  }

  showAlert(msg, classname) {
    const div = document.createElement("div");
    div.className = `alert ${classname}`;
    const text = document.createTextNode(msg);
    div.appendChild(text);
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);
    // Set div to timeout after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("isbn").value = '';
  }
}


// LOAD EVENT LISTENERS
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addBook);

const bookList = document.getElementById("book-list");
bookList.addEventListener("click", deleteBook);


// ADD BOOK FUNCTION
function addBook(e) {
  // Get our UI input elements
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate a UI instance
  const ui = new UI();

  console.log(ui);

  // Validate the UI inputs - make sure they are not empty
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

//  DELETE BOOK FUNCTION
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