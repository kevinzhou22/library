/* Mechanisim for removing focus outline without disturbing accessibility */
document.body.addEventListener("mousedown", () => document.body.classList.add("using-mouse"));
document.body.addEventListener("keydown", (e) => {
    if(e.key === "Tab") {
        document.body.classList.remove("using-mouse");
    }
});


/* Initilialization for various controls on a page */
const newBookButton = document.querySelector(".new-book");
const booksDisplay = document.querySelector(".books-display");
newBookButton.addEventListener("click", () => {
    document.querySelector(".bg-modal").style.display =  "flex";
});
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".cancel").addEventListener("click", closeModal);
document.querySelector(".bg-modal form .submit").addEventListener("click", submitNewBookForm);
/* Defines what a Book object is and how they are stored */

let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${title} by ${author}, ${page} pages, ${read ? "already read" : "not read yet"}`;
};

/* callback function for the "Submit" button on the modal popup that handles adding a new book to the library */
function submitNewBookForm(e) {
    const title = document.getElementById("name-text").value;
    const author = document.getElementById("author-text").value;
    const pages = document.getElementById("pages-text").value;
    const read = document.getElementById("read-book").checked;
    addBookToLibrary(title,author,pages,read);
    closeModal();
}

/* Handles adding a new book to the library */
function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    rerender();
}

/* Handles deleting a book to the library */
function deleteBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(book),1);
    rerender();
}

/* Handles updating the information associated with a book in the library */
function updateBookInLibrary(book,title,author,pages,read) {
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read=read;
    rerender();
}

/* updates the graphical display of the library to comply with the myLibrary array, 
displaying the last element in the array first on the graphical interface */
function rerender() {
    booksDisplay.textContent = "";
    for(let i = 0; i < myLibrary.length; i++) {
        const newBookContainer = document.createElement("div");
        newBookContainer.classList.add("book-container");
        const bookOptions = document.createElement("div");
        bookOptions.classList.add("options");
        const bookRemove = document.createElement("button");
        bookRemove.classList.add("remove");
        bookRemove.setAttribute("src","images/001-close.png");
        bookRemove.setAttribute("alt","remove");
        bookRemove.setAttribute("type","button");
        const bookRemoveImage = document.createElement("img");
        bookRemoveImage.setAttribute("src","images/001-close.png");
        bookRemoveImage.setAttribute("alt","remove");
        bookRemove.appendChild(bookRemoveImage);
        bookOptions.appendChild(bookRemove);
        newBookContainer.appendChild(bookOptions);
        const bookTitle = document.createElement("h2");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = myLibrary[i].title;
        newBookContainer.appendChild(bookTitle);
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = `by ${myLibrary[i].author}`;
        newBookContainer.appendChild(bookAuthor);
        const bookPages = document.createElement("p");
        bookPages.textContent = `${myLibrary[i].pages} pages`;
        bookPages.classList.add("book-pages");
        newBookContainer.appendChild(bookPages);
        const bookReadParagraph = document.createElement("p");
        bookReadParagraph.textContent = myLibrary[i].read ? "Completed" : "Not read yet";
        bookReadParagraph.classList.add("book-read");
        newBookContainer.appendChild(bookReadParagraph);
        booksDisplay.prepend(newBookContainer);
    }  

}



/* callback function for closing the modal that enables input of data for a new book */
function closeModal() {
    document.querySelector(".bg-modal").style.display = "none";
    document.querySelector(".bg-modal form").reset();
}