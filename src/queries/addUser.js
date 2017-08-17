const dbConnection = require('../database/db_connection');

const addNewUser = (username, password, callback) => { // function take the var names from handles and cb
  const addUserQuery = 'INSERT INTO users(username, password) VALUES ($1, $2);'; // from db_build.sql
  const addUserArray = [username, password]

  //technically can just keep line 8 only
  dbConnection.query(addUserQuery, addUserArray, (err) => { //conect between addUserArray to dbConnection
    if (err) {
      return callback(err)
    } else {
      console.log("added new user");
      callback(null) // null cuz we don't have a error
    }
  })

}
module.exports = addNewUser
