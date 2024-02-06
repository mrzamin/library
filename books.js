//Grab DOM elements.//

const addBtn = document.getElementsByClassName("add");
const closeModalBtn = document.getElementsByClassName("close");
const overlay = document.getElementsByClassName("overlay");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.title + this.author + this.pages + this.read;
  };
}

function addBookToLibrary() {}

const book1 = new Book("title one", "Marisa Min", 100, true);

console.log(book1.info());
