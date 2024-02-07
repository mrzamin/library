//Grab DOM elements.//

const openModalBtn = document.querySelector(".add");
const closeModalBtn = document.querySelector(".close");
const overlay = document.getElementById("overlay");
const submitBtn = document.querySelector(".submit");

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector(".read");

const myLibrary = [];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary(
    title.value.trim(),
    author.value.trim(),
    pages.value.trim(),
    read.checked
  );
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

console.log(myLibrary);
