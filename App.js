const myLibrary = [
    {title: "Last Wish", authorName: 'Andrzej Sapkowski', genre: "fantasy", isRead: false},
    {title: "Game of Thrones", authorName: 'George R. R. Martin', genre: "fantasy", isRead: false}
];
const booksContainer = document.getElementById("books-container");
const addNewBookToLibrary = document.getElementById('show-dialog');
const dialog = document.getElementById('dialog');
const CloseBtn = dialog.querySelector('#js-close');


const renderBooks = (library) => {
    booksContainer.innerHTML = '';

    library.map((book) => {
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
            const index = myLibrary.findIndex(item => item.title === book.title);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            booksContainer.removeChild(bookCard);
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

        booksContainer.appendChild(bookCard);
    });
}
const addBookToLibrary = () => {
    addNewBookToLibrary.addEventListener("click", () => {
        dialog.showModal();
    });

    CloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const titleBookInput = document.getElementById('titleBookInput').value;
        const authorInput = document.getElementById('authorInput').value;
        const genreInput = document.getElementById('genreInput').value;
        const isReadValue = document.getElementById('isRead').checked;

        const book = {
            title: titleBookInput,
            authorName: authorInput,
            genre: genreInput,
            isRead: isReadValue
        };

        if(book.title === '' || book.authorName === '' || book.genre === ''){
            return false;
        }
        else{
            myLibrary.push(book);
            renderBooks(myLibrary);
            dialog.close();
        }
        // myLibrary.push(book);
        // renderBooks(myLibrary);
        // dialog.close();
    });
}
addBookToLibrary();
renderBooks(myLibrary);







