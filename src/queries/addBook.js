const dbConnection = require ('../database/db_connection');


// const bookInsertQuery = 'INSERT INTO books(book_name, author, user_id, cover_url) VALUES ($1, $2, $3, $4)';
const userInsertQuery = 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING ID';

// const addNewUser = (formUser, callback) => {

// }

const addNewBook = (formBook, callback ) => {
	const { book_title : bookTitle , author, username, img_url : bookImgUrl } = formInput;

	const userDetailsArray = [username]

	dbConnection.query(bookInsertQuery, userDetailsArray, (err, response) => {
		if (err) {
			return callback(err)
		}

		const user_id = response.rows[0].id;
		const bo
	}
