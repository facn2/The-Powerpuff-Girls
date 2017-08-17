const dbConnection = require ('../database/db_connection');

const addNewBook = (formInput, callback) => {
	const { book_title, author, username, cover_url } = formInput;

	const userInsertQuery = 'SELECT id FROM users WHERE users.username = $1;';
	const userDetailsArray = [formInput.username];

	dbConnection.query(userInsertQuery, userDetailsArray, (err, response) => {//response = id of username
		if (err) {
			return callback(err)
		}
		
		const bookInsertQuery = 'INSERT INTO books(book_name, author, user_id, cover_url) VALUES ($1, $2, $3, $4);';

		const bookDetailsArray = [book_title, author, response.rows[0].id, cover_url];

		dbConnection.query(bookInsertQuery, bookDetailsArray, (err) => {
			callback(null)
		})
	});
}

module.exports = addNewBook;
