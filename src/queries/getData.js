const dbConnection = require('../database/db_connection.js');

const getData = callback => {
	const getQuery = 'SELECT books.book_name, books.author, books.cover_url, users.username FROM books JOIN users ON books.user_id = users.id;';
	console.log(getQuery)
	dbConnection.query(getQuery, (err, res) => {
		if (err) {
			return callback(err);
		} else {
			console.log('success grabbing data!')
			callback(null, res.rows);
		}
	})
}

module.exports = getData;