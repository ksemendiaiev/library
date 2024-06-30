class Book {
    constructor(title, authorName, genre, isRead = false) {
        this.title = title;
        this.authorName = authorName;
        this.genre = genre;
        this.isRead = isRead;
    }
}
class Library {
    constructor() {
        this.books = [
            new Book("Last Wish", 'Andrzej Sapkowski', "fantasy"),
            new Book("Game of Thrones", 'George R. R. Martin', "fantasy")
        ]

    }

    renderBooks(container) {
        container.innerHTML = '';
        this.books.map((book) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info-div');

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons-div');

            const title = document.createElement('h2');
            title.classList.add('book-title');
            title.textContent = book.title;

            const authorName = document.createElement('p');
            authorName.classList.add('author-name');
            authorName.textContent = book.authorName;

            const genre = document.createElement('p');
            genre.classList.add('genre');
            genre.textContent = book.genre;

            const isRead = document.createElement('input');
            isRead.setAttribute('type', 'checkbox');
            isRead.classList.add('isread-checkbox');
            isRead.checked = book.isRead

            const readButton = document.createElement('button');
            readButton.classList.add('read-button');
            readButton.textContent = 'Read';
            readButton.style.backgroundColor = 'rgb(50,205,50)';

            const notReadButton = document.createElement('button');
            notReadButton.classList.add('read-button');
            notReadButton.textContent = "Didn't read";
            notReadButton.style.backgroundColor = "rgb(255,0,0)"

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete'

            deleteButton.addEventListener('click', () => {
                this.removeBook(book.title);
                container.removeChild(bookCard);
            })

            infoDiv.appendChild(title);
            infoDiv.appendChild(authorName);
            infoDiv.appendChild(genre);

            if (isRead.checked) {
                buttonsDiv.appendChild(readButton);

            } else if (!isRead.checked) {
                buttonsDiv.appendChild(notReadButton);
            }
            buttonsDiv.appendChild(deleteButton);

            bookCard.appendChild(infoDiv);
            bookCard.appendChild(buttonsDiv);

            container.appendChild(bookCard);
        });
    }

    addBook(book){
        this.books.push(book);
    }

    removeBook(title){
        this.books = this.books.filter(book => book.title !== title)
    }
}

class DOMHandler {
    constructor() {
        this.booksContainer = document.getElementById("books-container");
        this.addNewBookToLibrary = document.getElementById('show-dialog');
        this.dialog = document.getElementById('dialog');
        this.CloseBtn = this.dialog.querySelector('#js-close');
    }

    initialize(library) {
        this.addNewBookToLibrary.addEventListener("click", () => {
            domHandler.dialog.showModal();
        });

        this.CloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const titleBookInput = document.getElementById('titleBookInput').value;
            const authorInput = document.getElementById('authorInput').value;
            const genreInput = document.getElementById('genreInput').value;
            const isReadValue = document.getElementById('isRead').checked;

            const book = new Book(titleBookInput, authorInput, genreInput, isReadValue)
            if (book.title === '' || book.authorName === '' || book.genre === '') {
                return false;
            } else {
                library.addBook(book);
                library.renderBooks(this.booksContainer);
                this.dialog.close();
            }
        });
        library.renderBooks(this.booksContainer);

    }

}

const library = new Library();
const domHandler = new DOMHandler();
domHandler.initialize(library)











