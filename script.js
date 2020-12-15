/* Mechanisim for removing focus outline without disturbing accessibility */
document.body.addEventListener("mousedown", () => document.body.classList.add("using-mouse"));
document.body.addEventListener("keydown", (e) => {
    if(e.key === "Tab") {
        document.body.classList.remove("using-mouse");
    }
});





/* Initilialization for various controls on a page */
const newBookButton = document.querySelector(".new-book");
newBookButton.addEventListener("click", () => {
    document.querySelector(".bg-modal").style.display =  "flex";
});
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".cancel").addEventListener("click", closeModal);

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

/* Handles adding a new book to the library */
function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    rerender();
}

/* Handles deleting a book to the library */
function deleteBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(newBook,1))

}

/* Handles updating the information associated with a book in the library */
function updateBookInLibrary(book,title,author,pages,read) {
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read=read;
}

/* updates the graphical display of the library to comply with the myLibrary array, 
displaying the last element in the array first on the graphical interface */
function rerender() {

}
/* callback function for closing the modal that enables input of data for a new book */
function closeModal() {
    document.querySelector(".bg-modal").style.display = "none";
    document.querySelector(".bg-modal form").reset();
}