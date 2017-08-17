const dbConnection = require ('../database/db_connection');

const addNewBook = (book_name, author, user_id, cover_url, callback ) => {

const addBookQuery = 'INSERT INTO books(book_name, author, user_id, cover_url) VALUES ($1, $2, $3, $4);';

	// const { book_title : bookTitle , author, username, img_url : bookImgUrl } = formInput;

	const addBookArray = [book_name, author, user_id, cover_url]

	dbConnection.query(addBookQuery, addBookArray, (err) => {
		if (err) {
			console.log('error with adding book', err);
			return
		} else {
			console.log('success adding book');
			callback(null);
		}
	})
}


module.exports = addNewBook
