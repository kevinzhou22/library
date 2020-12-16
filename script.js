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

/* Initializes localStorage */
const localStorageWorks = isStorageAvailable("localStorage");
const localStorage = window.localStorage;
if(localStorageWorks) {
    if(!localStorage.getItem("myLibrary")) {
        localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
    } else {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        rerender();
    }
}





/* callback function for the "Submit" button on the modal popup that handles adding a new book to the library */
function submitNewBookForm(e) {
    const title = document.getElementById("name-text").value;
    const author = document.getElementById("author-text").value;
    const pages = document.getElementById("pages-text").value;
    const read = document.getElementById("read-book").checked;
    addBookToLibrary(title,author,pages,read);
    closeModal();
}

/* Callback function handling removing a book from the library when the X button on a book is clicked */
function onClickOfXButtonOnBook(e) {
    const bookContainer = e.currentTarget.closest(".book-container");
    const title = bookContainer.querySelector(".book-title").textContent;
    const author = bookContainer.querySelector(".book-author").textContent.slice(3);
    const pages = +bookContainer.querySelector(".book-pages").textContent.slice(0,
            bookContainer.querySelector(".book-pages").textContent.indexOf("p")-1);
    const read = bookContainer.querySelector(".book-read").textContent === "Completed" ? true : false;
    const bookToDelete = myLibrary.find(book => {
        return book.title === title && book.author === author && book.pages === pages && book.read === read;
    });
    deleteBookFromLibrary(bookToDelete);
}

/* Callback function handling toggling a book's "book read" state when the book read text is clicked */
function onClickOfBookReadText(e) {
    const bookContainer = e.currentTarget.closest(".book-container");
    const title = bookContainer.querySelector(".book-title").textContent;
    const author = bookContainer.querySelector(".book-author").textContent.slice(3);
    const pages = +bookContainer.querySelector(".book-pages").textContent.slice(0,
        bookContainer.querySelector(".book-pages").textContent.indexOf("p")-1);    const read = bookContainer.querySelector(".book-read").textContent === "Completed" ? true : false;
    const bookToUpdate = myLibrary.find(book => {
        return book.title === title && book.author === author && book.pages === pages && book.read === read;
    });
    updateBookInLibrary(bookToUpdate,title,author,pages,!read)
}


/* Handles adding a new book to the library */
function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,+pages,read);
    myLibrary.push(newBook);
    rerender();
    updateLocalStorage();
}

/* Handles deleting a book to the library */
function deleteBookFromLibrary(book) {
    myLibrary.splice(myLibrary.indexOf(book),1);
    rerender();
    updateLocalStorage();
}

/* Handles updating the information associated with a book in the library */
function updateBookInLibrary(book,title,author,pages,read) {
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read=read;
    rerender();
    updateLocalStorage();
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
        if(myLibrary[i].read) {
            bookReadParagraph.classList.add("completed");
        }
        newBookContainer.appendChild(bookReadParagraph);
        newBookContainer.querySelector(".remove").addEventListener("click",onClickOfXButtonOnBook);
        newBookContainer.querySelector(".book-read").addEventListener("click",onClickOfBookReadText);
        booksDisplay.prepend(newBookContainer);
    }  

}



/* callback function for closing the modal that enables input of data for a new book */
function closeModal() {
    document.querySelector(".bg-modal").style.display = "none";
    document.querySelector(".bg-modal form").reset();
}

/* Checks whether localStorage is supported and available */
function isStorageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = "__storage_text__";
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    } catch {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === "QuotaExceededError" ||
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            (storage && storage.length !== 0);  
    }
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
}