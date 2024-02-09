//Grab DOM elements for buttons, overlay, library, form, and input fields.

const openModalBtn = document.querySelector(".add");
const closeModalBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");
const overlay = document.querySelector("#overlay");
const content = document.querySelector(".content");
const form = document.querySelector("#form");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const readInput = document.querySelector("#read");

//Create library array

const myLibrary = [];

//Add placeholder books to library

addBookToLibrary("The Power of One More", "Ed Mylett", "1000", false);
addBookToLibrary("Coders", "Clive Thompson", "2000", true);

//Listen for form submit and validate form fields

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTitle(titleInput.value);
  validateAuthor(authorInput.value);
  validatePages(pagesInput.value);

  if (
    titleInput.value != "" &&
    authorInput.value != "" &&
    pagesInput.value != ""
  ) {
    addBookToLibrary(
      titleInput.value.trim(),
      authorInput.value.trim(),
      pagesInput.value.trim(),
      readInput.checked
    );

    const modal = document.querySelector(".modal.active");
    closeModal(modal);
  }
});

//Input event listeners and corresponding validation functions

titleInput.addEventListener("input", function (e) {
  validateTitle(titleInput.value);
});

function validateTitle(title) {
  const titleError = document.querySelector(".title-error");
  if (title === "") {
    titleError.textContent = "Book title required!";
  } else {
    titleError.textContent = "";
  }
}

authorInput.addEventListener("input", function (e) {
  validateAuthor(authorInput.value);
});

function validateAuthor(author) {
  const authorError = document.querySelector(".author-error");
  if (author === "") {
    authorError.textContent = "Author name required!";
  } else {
    authorError.textContent = "";
  }
}

pagesInput.addEventListener("input", function (e) {
  validatePages(pagesInput.value);
});

function validatePages(pages) {
  const pagesError = document.querySelector(".pages-error");
  if (pages === "") {
    pagesError.textContent = "Number of pages required!";
  } else {
    pagesError.textContent = "";
  }
}

// Modal event listeners and open/close functions

openModalBtn.addEventListener("click", () => {
  openModal(modal);
});

closeModalBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

function openModal(modal) {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  modal.classList.remove("active");
  overlay.classList.remove("active");

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

//Overlay event listener

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

//Book object constructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.title + this.author + this.pages + this.read;
  };
}

//Library functionality

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLibrary(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
}

function updateLibrary(newBook, index) {
  const newCard = document.createElement("div"); //New card element.
  newCard.classList.add("card");
  newCard.dataset.index = index;
  const currentBookNumber = document.createElement("p"); //Book number element.
  const currentBookTitle = document.createElement("p"); //Book title element.
  currentBookTitle.classList.add("title");
  currentBookTitle.setAttribute("title", `${newBook.title}`);
  const currentBookAuthor = document.createElement("p"); //Book author element.
  currentBookAuthor.setAttribute("title", `${newBook.author}`);
  const currentBookPages = document.createElement("p"); //Book pages element.

  const read = document.createElement("label"); //Read label + checkbox elements.
  const toggle = document.createElement("input");
  toggle.setAttribute("type", "checkbox");
  if (newBook.read == true) {
    toggle.setAttribute("checked", "checked");
  }

  const remove = document.createElement("button"); //Remove book button.
  remove.classList.add("remove");
  remove.dataset.index = index;

  /* Remove book event listener:
  1. identifies parent card
  2. removes parent card from section
  3. removes book from Library array
  4. Loops over mutated array and updates Library
  */

  remove.addEventListener("click", (e) => {
    const parentCard = document.querySelector(
      `div[data-index="${e.target.dataset.index}"]`
    );
    parentCard.remove();
    myLibrary.splice(e.target.dataset.index, 1);
    content.replaceChildren(content.lastElementChild);
    for (let i = 0; i < myLibrary.length; i++) {
      updateLibrary(myLibrary[i], i);
    }
  });

  /* Insert text into card. */
  currentBookNumber.textContent = `Book: ${index + 1}`;
  currentBookTitle.textContent = `Title: ${newBook.title}`;
  currentBookAuthor.textContent = `Author: ${newBook.author}`;
  currentBookPages.textContent = `Pages: ${newBook.pages}`;
  read.textContent = "Read:  ";
  remove.textContent = "Remove";

  /* Append elements to card. */
  newCard.appendChild(currentBookNumber);
  newCard.appendChild(currentBookTitle);
  newCard.appendChild(currentBookAuthor);
  newCard.appendChild(currentBookPages);
  newCard.appendChild(read);
  read.appendChild(toggle);
  newCard.appendChild(remove);

  /* Insert card at beginning of grid. */
  content.insertBefore(newCard, content.children[0]);
}
