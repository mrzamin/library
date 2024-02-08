//Grab DOM elements.//

const openModalBtn = document.querySelector(".add");
const closeModalBtn = document.querySelector(".close");
const overlay = document.getElementById("overlay");
const submitBtn = document.querySelector(".submit");
const content = document.querySelector(".content");

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector("#read");

const myLibrary = [];

// addBookToLibrary("The Power of One More", "Ed Mylett", "1000", false);
// addBookToLibrary("Coders", "Clive Thompson", "2000", true);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary(
    title.value.trim(),
    author.value.trim(),
    pages.value.trim(),
    read.checked
  );

  updateLibrary(myLibrary[myLibrary.length - 1], myLibrary.length - 1);

  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

openModalBtn.addEventListener("click", () => {
  openModal(modal);
});

closeModalBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");

  closeModal(modal);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");

  closeModal(modal);
});

content.addEventListener("click", (e) => {
  const isRemoveBtn = e.target.classList.contains("remove");
  if (isRemoveBtn) {
    const parentCard = document.querySelector(
      `div[data-index="${e.target.dataset.index}"]`
    );
    parentCard.remove();
    myLibrary.splice(e.target.dataset.index, 1);
    content.replaceChildren(content.lastElementChild);
    for (let i = 0; i < myLibrary.length; i++) {
      updateLibrary(myLibrary[i], i);
    }
  }
});

function openModal(modal) {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.title + this.author + this.pages + this.read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function updateLibrary(newBook, index) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.classList.add("bookCard");
  newCard.dataset.index = index;

  const currentBookNumber = document.createElement("p");

  const currentBookTitle = document.createElement("p");
  currentBookTitle.classList.add("title");

  const currentBookAuthor = document.createElement("p");

  const currentBookPages = document.createElement("p");

  const read = document.createElement("label");

  const toggle = document.createElement("input");
  toggle.setAttribute("type", "checkbox");
  if (newBook.read == true) {
    toggle.setAttribute("checked", "checked");
  }
  toggle.classList.add("toggle");

  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.dataset.index = index;

  currentBookNumber.textContent = `Book: ${index + 1}`;
  currentBookTitle.textContent = `Title: ${newBook.title}`;
  currentBookAuthor.textContent = `Author: ${newBook.author}`;
  currentBookPages.textContent = `Pages: ${newBook.pages}`;
  read.textContent = "Red:  ";
  remove.textContent = "Remove";

  newCard.appendChild(currentBookNumber);
  newCard.appendChild(currentBookTitle);
  newCard.appendChild(currentBookAuthor);
  newCard.appendChild(currentBookPages);
  newCard.appendChild(read);
  read.appendChild(toggle);
  newCard.appendChild(remove);

  content.insertBefore(newCard, content.children[0]);
}

console.log(myLibrary);
