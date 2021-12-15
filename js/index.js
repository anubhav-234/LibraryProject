console.log("This is my Project Library");
// function to show the items

showBooks();
function showBooks() {
    let books = JSON.parse(localStorage.getItem("Books"));
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    if (books != null) {
        books.forEach(function (element, index) {
            tableBody.innerHTML += `
                            <tr class="table-warning">
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>@${element.type}</td>
                            <td><button type="button" class="btn-close " aria-label="Close"  onclick="remove(${index})"></button></td> 

                            </tr>`;

        });
    }
}

//Remove Books button function
function remove(index) {
    // console.log("Removing the book from library ");
    let arr = JSON.parse(localStorage.getItem("Books"));
    arr.splice(index, 1);
    localStorage.setItem("Books", JSON.stringify(arr));
    showBooks();

}

// Book Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//
function Display() {

}

//Add methods to display prototype

//Implementing the add function
Display.prototype.add = function (book) {
    // console.log("Adding book to the UI");
    let arr = localStorage.getItem('Books');
    if (arr == null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem("Books"));
    }

    arr.push(book);

    localStorage.setItem("Books", JSON.stringify(arr));
    showBooks();

}

//Implementing the clear() function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();

}

// Implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    return true;
}
//Implementing the show message
Display.prototype.show = function (type, showMessage) {

    let message = document.getElementById("message");

    message.innerHTML += `
             <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message : </strong>  ${showMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);


}
//Revmove function in Display


// implementing thr Event Listener for libraryForm

let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log("you submitted the form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    // Cooking,programming,Fiction
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;

    }

    let book = new Book(name, author, type);
    // console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your book Successfully Added ");
    }
    else {
        display.show("danger", "Sorry ! You cannot add this book ");
    }
    e.preventDefault();
}
