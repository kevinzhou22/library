document.body.addEventListener("mousedown", () => document.body.classList.add("using-mouse"));
document.body.addEventListener("keydown", (e) => {
    if(e.key === "Tab") {
        document.body.classList.remove("using-mouse");
    }
});


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

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}