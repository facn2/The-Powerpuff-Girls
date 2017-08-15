const dbConnection = require('../database/db_connection.js');

const getData = callback => {
	const getQuery = 'SELECT books.book_name, books.author, books.cover_url, users.username, FROM books JOIN users ON books.user_id = users.id;';

	dbConnection.query(getQuery, (err, res) => {
		if (err) {
			return callback(err);
		} else {
			callback(null, res.rows);
		}
	})
}

module.exports = getData;