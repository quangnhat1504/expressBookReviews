const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Get all books using async/await with Axios
async function getAllBooks() {
    try {
        const response = await axios.get(BASE_URL + '/');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error.message);
        return null;
    }
}

// Get book details by ISBN using async/await with Axios
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(BASE_URL + '/isbn/' + isbn);
        return response.data;
    } catch (error) {
        console.error('Error fetching book by ISBN:', error.message);
        return null;
    }
}

// Get books by author using async/await with Axios
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(BASE_URL + '/author/' + encodeURIComponent(author));
        return response.data;
    } catch (error) {
        console.error('Error fetching books by author:', error.message);
        return null;
    }
}

// Get book by title using async/await with Axios
async function getBookByTitle(title) {
    try {
        const response = await axios.get(BASE_URL + '/title/' + encodeURIComponent(title));
        return response.data;
    } catch (error) {
        console.error('Error fetching book by title:', error.message);
        return null;
    }
}

// Demonstrate all functions
(async () => {
    console.log('=== All Books ===');
    const allBooks = await getAllBooks();
    console.log(JSON.stringify(allBooks, null, 2));

    console.log('\n=== Book by ISBN (1) ===');
    const bookByISBN = await getBookByISBN(1);
    console.log(JSON.stringify(bookByISBN, null, 2));

    console.log('\n=== Books by Author (Unknown) ===');
    const booksByAuthor = await getBooksByAuthor('Unknown');
    console.log(JSON.stringify(booksByAuthor, null, 2));

    console.log('\n=== Book by Title (Things Fall Apart) ===');
    const bookByTitle = await getBookByTitle('Things Fall Apart');
    console.log(JSON.stringify(bookByTitle, null, 2));
})();
