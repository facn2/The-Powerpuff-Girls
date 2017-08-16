const dbConnection = require('../database/db_connection');

const addNewUser = (username, password, callback) => { // function take the var names from handles and cb
  const addUserQuery = 'INSERT INTO users(username, password) VALUES ($1, $2);'; // from db_build.sql
  const addUserArray = [username, password]

  dbConnection.query(addUserQuery, addUserArray, (err) => { //conect between addUserArray to dbConnection
    if (err) {
      console.log('heeheehee', err);
      return
    } else {
      console.log("katia");
      callback(null) // null cuz we don't have a error
    }
  })

}
module.exports = addNewUser
